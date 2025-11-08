"use client";

import { useState } from "react";
import { Card } from "~/components/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { PlusCircle } from "lucide-react";
import * as Crowdfund from "../../packages/CCZ7PMSCNHXO4XWRFBKLYCT7IDHS4JORM2BJBXK2E52V23NU4UKQT4WC";
import { useSubmitTransaction } from "~/hooks/use-submit-transaction";
import { addCampaign } from "~/lib/campaignStorage";

export type CreateCampaignFormProps = {
  address: string;
  isConnected: boolean;
  contract: Crowdfund.Client | null;
  rpcUrl: string;
  networkPassphrase: string;
  onSuccess?: () => void;
};

export default function CreateCampaignForm({
  address,
  isConnected,
  contract,
  rpcUrl,
  networkPassphrase,
  onSuccess,
}: CreateCampaignFormProps) {
  const [campaignName, setCampaignName] = useState<string>("");
  const [goalXLM, setGoalXLM] = useState<string>("");
  const [deadlineDays, setDeadlineDays] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const { submit, isSubmitting } = useSubmitTransaction({
    rpcUrl,
    networkPassphrase,
    onSuccess: () => {
      console.log("Campaign created successfully!");
      
      // Save campaign to localStorage campaigns list
      if (campaignName.trim() && goalXLM.trim() && deadlineDays.trim()) {
        const goalAmount = parseFloat(goalXLM.trim());
        const daysInMs = parseInt(deadlineDays.trim()) * 24 * 60 * 60 * 1000;
        const deadlineTimestamp = Date.now() + daysInMs;
        
        addCampaign({
          title: campaignName.trim(),
          goalXLM: goalAmount,
          deadlineMs: deadlineTimestamp,
        });
      }
      
      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
      
      // Reset form
      setCampaignName("");
      setGoalXLM("");
      setDeadlineDays("");
      onSuccess?.();
    },
    onError: (error) => {
      console.error("Failed to create campaign", error);
    },
  });

  async function handleCreateCampaign() {
    if (!isConnected || !contract) {
      console.error("Wallet not connected or contract not initialized");
      return;
    }

    if (!campaignName.trim() || !goalXLM.trim() || !deadlineDays.trim()) {
      console.error("All fields are required");
      return;
    }

    try {
      // Convert XLM to stroops (1 XLM = 10,000,000 stroops)
      const goalAmount = parseFloat(goalXLM.trim());
      const goalStroops = Math.floor(goalAmount * 10_000_000);

      // Calculate deadline: current time + days in seconds
      const daysInSeconds = parseInt(deadlineDays.trim()) * 24 * 60 * 60;
      const deadlineTimestamp = Math.floor(Date.now() / 1000) + daysInSeconds;

      // XLM token address on testnet (native token)
      // Note: Ini adalah address untuk native XLM token di Stellar testnet
      const XLM_TOKEN_ADDRESS = "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC";

      console.log("Creating campaign:", {
        owner: address,
        goal: goalStroops,
        deadline: deadlineTimestamp,
        xlm_token: XLM_TOKEN_ADDRESS,
      });

      // Call initialize function dari smart contract
      const tx = (await contract.initialize({
        owner: address,
        goal: BigInt(goalStroops),
        deadline: BigInt(deadlineTimestamp),
        xlm_token: XLM_TOKEN_ADDRESS,
      })) as any;

      await submit(tx);
    } catch (e) {
      console.error("Failed to create campaign transaction", e);
    }
  }

  return (
    <Card className="flex flex-col gap-y-6 py-6 px-8 w-full relative">
      {/* Success Notification */}
      {showSuccess && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-5">
          <div className="bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <span className="text-xl">✓</span>
            <span className="font-medium">Campaign berhasil dibuat! Lihat dashboard di bawah.</span>
          </div>
        </div>
      )}
      
      <div className="flex items-center gap-3 pb-2 border-b border-zinc-800/50">
        <PlusCircle className="size-6 text-emerald-400" />
        <h3 className="text-xl font-semibold text-zinc-100">Form Pembuatan Campaign</h3>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="campaignName" className="text-sm font-medium text-zinc-300">
            Nama Campaign
          </label>
          <Input
            id="campaignName"
            type="text"
            placeholder="Contoh: Lumen Impact Drive, Solar Power Initiative"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            disabled={isSubmitting}
            className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 py-6"
          />
          <p className="text-xs text-zinc-500">Nama deskriptif untuk campaign Anda</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="goalXLM" className="text-sm font-medium text-zinc-300">
              Target Goal (XLM)
            </label>
            <Input
              id="goalXLM"
              type="text"
              inputMode="decimal"
              placeholder="1000"
              value={goalXLM}
              onChange={(e) => setGoalXLM(e.target.value)}
              disabled={isSubmitting}
              className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 py-6"
            />
            <p className="text-xs text-zinc-500">Dalam satuan XLM</p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="deadlineDays" className="text-sm font-medium text-zinc-300">
              Durasi (Hari)
            </label>
            <Input
              id="deadlineDays"
              type="text"
              inputMode="numeric"
              placeholder="30"
              value={deadlineDays}
              onChange={(e) => setDeadlineDays(e.target.value)}
              disabled={isSubmitting}
              className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 py-6"
            />
            <p className="text-xs text-zinc-500">Lama campaign berjalan</p>
          </div>
        </div>

        {/* Preview Card */}
        {campaignName && goalXLM && deadlineDays && (
          <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-xs text-emerald-400 font-medium mb-2">PREVIEW</p>
            <div className="space-y-1">
              <p className="text-sm text-zinc-300">
                <span className="text-zinc-500">Campaign:</span> {campaignName}
              </p>
              <p className="text-sm text-zinc-300">
                <span className="text-zinc-500">Target:</span> {parseFloat(goalXLM || "0").toLocaleString()} XLM
              </p>
              <p className="text-sm text-zinc-300">
                <span className="text-zinc-500">Durasi:</span> {deadlineDays} hari
              </p>
            </div>
          </div>
        )}
      </div>

      <Button
        onClick={handleCreateCampaign}
        disabled={
          !isConnected ||
          isSubmitting ||
          !campaignName.trim() ||
          !goalXLM.trim() ||
          !deadlineDays.trim()
        }
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6 rounded-lg transition-colors text-lg"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <span className="animate-spin">⏳</span>
            Membuat Campaign...
          </span>
        ) : (
          "Buat Campaign"
        )}
      </Button>

      {!isConnected && (
        <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <p className="text-sm text-amber-400 text-center">
            💡 Silakan connect wallet terlebih dahulu untuk membuat campaign
          </p>
        </div>
      )}
    </Card>
  );
}

