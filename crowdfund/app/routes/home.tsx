import { Card } from "~/components/card";
import type { Route } from "./+types/home";
import { TextRotate } from "~/components/text-rotate";
import { Donut } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useWallet } from "~/hooks/use-wallet";
import { useNativeBalance } from "~/hooks/use-native-balance";
import { useSubmitTransaction } from "~/hooks/use-submit-transaction";
import * as Crowdfund from "../../packages/CCZ7PMSCNHXO4XWRFBKLYCT7IDHS4JORM2BJBXK2E52V23NU4UKQT4WC";
import { signTransaction } from "~/config/wallet.client";
import { useState, useMemo, useEffect } from "react";
import CampaignDashboard from "~/components/CampaignDashboard";
import CampaignCard from "~/components/CampaignCard";
import CreateCampaignForm from "~/components/CreateCampaignForm";
import { getCampaignOverviewLive } from "~/lib/campaignClient";
import { getAllCampaigns, getActiveCampaigns, addDonationToCampaign, getCampaign } from "~/lib/campaignStorage";
import { migrateCampaignsToV2 } from "~/lib/migrateCampaigns";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Stellar Crowdfunding - Platform Donasi Terdesentralisasi" },
    { name: "description", content: "Platform crowdfunding terdesentralisasi di Stellar Network. Buat campaign, terima donasi XLM, dan monitor progress real-time." },
    { name: "keywords", content: "stellar, crowdfunding, xlm, blockchain, soroban, smart contract, donasi" },
  ];
}

export default function Home() {
  const RPC_URL = "https://soroban-testnet.stellar.org:443";
  const { address, isConnected } = useWallet();
  const { balance, refetch: refetchBalance } = useNativeBalance(address);

  const [amount, setAmount] = useState<string>("");
  const [total, setTotal] = useState(0);
  const [previousTotal, setPreviousTotal] = useState(0);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>("");

  const contract = useMemo(() => {
    if (!isConnected || address === "-") return null;

    return new Crowdfund.Client({
      ...Crowdfund.networks.testnet,
      rpcUrl: RPC_URL,
      signTransaction,
      publicKey: address,
    });
  }, [isConnected, address]);

  const { submit, isSubmitting } = useSubmitTransaction({
    rpcUrl: RPC_URL,
    networkPassphrase: Crowdfund.networks.testnet.networkPassphrase,
    onSuccess: handleOnSuccess,
    onError: (error) => {
      console.error("Donation failed", error);
    },
  });

  async function handleOnSuccess() {
    // Add donation to selected campaign
    if (selectedCampaignId && amount.trim()) {
      const xlmAmount = parseFloat(amount.trim());
      addDonationToCampaign(selectedCampaignId, xlmAmount);
      
      // Refresh campaigns display
      refreshCampaigns();
    }
    
    // Fetch updated total from contract
    if (contract) {
      setPreviousTotal(total);
      const totalTx = await contract.get_total_raised();
      const updated = BigInt(totalTx.result as any);
      setTotal(Number(updated));
    }
    await refetchBalance();
    setAmount("");
  }

  async function handleSubmit() {
    if (!isConnected || !contract) return;
    if (!amount.trim()) return;

    try {
      // Convert XLM to stroops (multiply by 10^7)
      const xlmAmount = parseFloat(amount.trim());
      const stroopsAmount = Math.floor(xlmAmount * 10_000_000);

      const tx = await contract.donate({
        donor: address,
        amount: BigInt(stroopsAmount),
      }) as any;

      await submit(tx);
    } catch (e) {
      console.error("Failed to create donation transaction", e);
    }
  }

  useEffect(() => {
    if (!contract) return;

    (async () => {
      try {
        const tx = await contract.get_total_raised();
        const total = Number(BigInt(tx.result));

        setTotal(total);
      } catch (err) {
        setTotal(0);
      }
    })();
  }, [contract]);

  // Load campaigns from localStorage
  useEffect(() => {
    // Migrate old campaigns to add raisedXLM field
    migrateCampaignsToV2();
    
    const loadedCampaigns = getAllCampaigns();
    setCampaigns(loadedCampaigns);
    
    // Auto-select first campaign if available
    if (loadedCampaigns.length > 0 && !selectedCampaignId) {
      setSelectedCampaignId(loadedCampaigns[0].id);
    }
  }, [selectedCampaignId]);

  // Refresh campaigns after creating new one
  const refreshCampaigns = () => {
    const loadedCampaigns = getAllCampaigns();
    setCampaigns(loadedCampaigns);
  };

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <div className="w-full py-12 px-4 flex flex-col items-center gap-8 border-b border-zinc-800/50 bg-gradient-to-b from-zinc-900/50 to-transparent">
        <div className="flex flex-row items-center gap-x-6">
          <p className="text-4xl font-bold text-zinc-100">Project</p>
          <TextRotate
            texts={["Stellar", "Rust", "Contract", "Frontend"]}
            mainClassName="bg-white text-black rounded-lg text-4xl px-6 py-3 font-bold"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </div>
        <p className="text-zinc-400 text-center max-w-2xl">
          Platform crowdfunding terdesentralisasi di Stellar Network
        </p>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Create Campaign Section */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100">
              Buat Campaign Baru
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              Mulai kampanye crowdfunding Anda dan raih target funding
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <CreateCampaignForm
              address={address}
              isConnected={isConnected}
              contract={contract}
              rpcUrl={RPC_URL}
              networkPassphrase={Crowdfund.networks.testnet.networkPassphrase}
              onSuccess={() => {
                console.log("Campaign created successfully!");
                // Refresh campaigns list
                refreshCampaigns();
                // Scroll to campaigns section after successful creation
                setTimeout(() => {
                  const campaignsSection = document.querySelector('[data-section="campaigns"]');
                  if (campaignsSection) {
                    campaignsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }, 1000);
              }}
            />
          </div>
        </section>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800/50"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-zinc-950 px-4 text-sm text-zinc-500">Campaign Aktif</span>
          </div>
        </div>

        {/* Campaigns Section - Grid Display */}
        <section className="space-y-6" data-section="campaigns">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100">
              Campaign Aktif
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              Semua campaign crowdfunding yang sedang berjalan
            </p>
          </div>
          
          {campaigns.length === 0 ? (
            <div className="max-w-2xl mx-auto p-8 text-center">
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-8">
                <p className="text-zinc-400 mb-2">Belum ada campaign</p>
                <p className="text-sm text-zinc-500">Buat campaign pertama Anda di atas!</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {campaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  id={campaign.id}
                  title={campaign.title}
                  goalXLM={campaign.goalXLM}
                  raisedXLM={campaign.raisedXLM || 0}
                  deadlineMs={campaign.deadlineMs}
                  compact={true}
                />
              ))}
            </div>
          )}
        </section>

        {/* Donation Section - Grid Layout */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100">
              Berikan Donasi
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              Dukung campaign dengan donasi XLM Anda
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Donation Form */}
            <Card className="flex flex-col gap-y-6 py-6 px-8 h-fit">
              <div className="flex flex-row items-center gap-x-3 pb-2 border-b border-zinc-800/50">
                <Donut className="size-6 text-emerald-400" />
                <h3 className="text-xl font-semibold text-zinc-100">Form Donasi</h3>
              </div>

              {/* Campaign Selector */}
              <div className="space-y-2">
                <label htmlFor="campaignSelect" className="text-sm font-medium text-zinc-300">
                  Pilih Campaign
                </label>
                <select
                  id="campaignSelect"
                  value={selectedCampaignId}
                  onChange={(e) => setSelectedCampaignId(e.target.value)}
                  disabled={campaigns.length === 0}
                  className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {campaigns.length === 0 ? (
                    <option value="">Belum ada campaign</option>
                  ) : (
                    campaigns.map((campaign) => (
                      <option key={campaign.id} value={campaign.id}>
                        {campaign.title} (Goal: {campaign.goalXLM.toLocaleString()} XLM)
                      </option>
                    ))
                  )}
                </select>
                <p className="text-xs text-zinc-500">
                  {campaigns.length === 0 
                    ? "Buat campaign terlebih dahulu untuk mulai menerima donasi"
                    : "Pilih campaign yang ingin Anda dukung"
                  }
                </p>
              </div>

              <div className="flex flex-row justify-between items-center p-4 rounded-lg bg-zinc-900/50 border border-zinc-800/50">
                <div className="flex flex-row items-center gap-4">
                  <img src="/xlm.svg" alt="XLM" className="size-12 rounded-full bg-zinc-900 border border-zinc-700" />
                  <div>
                    <p className="text-sm text-zinc-400">Asset</p>
                    <p className="font-medium text-zinc-100">XLM</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-zinc-400">Balance</p>
                  <p className="tabular-nums font-medium text-zinc-100">
                    {!isConnected && <span className="text-amber-500 text-sm">Connect wallet</span>}
                    {isConnected && balance === "-" && <span>-</span>}
                    {isConnected && balance !== "-" && (
                      <span>{balance} XLM</span>
                    )}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="donationAmount" className="text-sm font-medium text-zinc-300">
                  Jumlah Donasi (XLM)
                </label>
                <Input
                  id="donationAmount"
                  type="text"
                  inputMode="decimal"
                  placeholder="0.001"
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                  disabled={isSubmitting || campaigns.length === 0}
                  className="text-lg py-6"
                />
              </div>

              <Button
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6 text-lg"
                onClick={handleSubmit}
                disabled={!isConnected || isSubmitting || !amount.trim() || !selectedCampaignId}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⏳</span>
                    Memproses Donasi...
                  </span>
                ) : (
                  "Kirim Donasi"
                )}
              </Button>
            </Card>

            {/* Statistics Card */}
            <Card className="flex flex-col gap-y-6 py-6 px-8 h-fit">
              <div className="flex flex-row items-center gap-x-3 pb-2 border-b border-zinc-800/50">
                <div className="size-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <div className="size-3 rounded-full bg-emerald-500 animate-pulse"></div>
                </div>
                <h3 className="text-xl font-semibold text-zinc-100">Live Statistics</h3>
              </div>

              <div className="space-y-6">
                {/* Selected Campaign Stats */}
                {selectedCampaignId && (() => {
                  const selectedCampaign = campaigns.find(c => c.id === selectedCampaignId);
                  if (selectedCampaign) {
                    const raised = selectedCampaign.raisedXLM || 0;
                    const percent = selectedCampaign.goalXLM > 0 
                      ? Math.min(100, Math.round((raised / selectedCampaign.goalXLM) * 100))
                      : 0;
                    return (
                      <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
                        <p className="text-xs text-zinc-500 mb-2">Campaign Dipilih</p>
                        <p className="text-sm font-medium text-zinc-200 mb-3">{selectedCampaign.title}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-zinc-400">Progress</span>
                            <span className="text-emerald-400 font-medium">{percent}%</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-emerald-500 to-lime-400 transition-all duration-500"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-zinc-400">
                              {raised.toFixed(2)} XLM
                            </span>
                            <span className="text-zinc-500">
                              / {selectedCampaign.goalXLM.toLocaleString()} XLM
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })()}

                {/* Total Raised */}
                <div className="p-6 rounded-lg bg-gradient-to-br from-emerald-500/10 to-lime-500/10 border border-emerald-500/20">
                  <p className="text-sm text-zinc-400 mb-2">Total Terkumpul (Smart Contract)</p>
                  <p className="text-4xl font-bold text-emerald-400 tabular-nums">
                    {(total / 10_000_000).toFixed(2)}
                  </p>
                  <p className="text-lg text-zinc-300 mt-1">XLM</p>
                  {previousTotal > 0 && previousTotal !== total && (
                    <div className="mt-4 pt-4 border-t border-emerald-500/20">
                      <p className="text-sm text-emerald-400 flex items-center gap-2">
                        <span className="text-xl">↗</span>
                        +{((total - previousTotal) / 10_000_000).toFixed(7)} XLM baru ditambahkan
                      </p>
                    </div>
                  )}
                </div>

                {/* Additional Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800/50">
                    <p className="text-xs text-zinc-500 mb-1">Status</p>
                    <p className="text-sm font-medium text-emerald-400">● Aktif</p>
                  </div>
                  <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800/50">
                    <p className="text-xs text-zinc-500 mb-1">Network</p>
                    <p className="text-sm font-medium text-zinc-200">Testnet</p>
                  </div>
                </div>

                {!isConnected && (
                  <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <p className="text-sm text-amber-400">
                      💡 Connect wallet untuk mulai berdonasi
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}