export type CampaignOverview = {
  title: string;
  goalXLM: number;
  raisedXLM: number;
  // Unix epoch milliseconds
  deadlineMs: number;
  // 0..100
  progressPct: number;
};

const RPC_URL = "https://soroban-testnet.stellar.org";
export const CONTRACT_ID = "CCZ7PMSCNHXO4XWRFBKLYCT7IDHS4JORM2BJBXK2E52V23NU4UKQT4WC";

// TODO: Replace this stub with a real call to Soroban method `get_campaign_data`
// Signature (as provided): get_campaign_data(env) → (goal, raised, deadline, owner, progress)
// - If goal/raised are in stroops, divide by 1e7 to get XLM
// - If deadline is in seconds, convert to ms
export async function getCampaignOverviewStub(): Promise<CampaignOverview> {
  const now = Date.now();
  const inThreeDays = now + 3 * 24 * 60 * 60 * 1000;
  const goalXLM = 1000;
  const raisedXLM = 620;
  const progressPct = Math.min(100, Math.round((raisedXLM / goalXLM) * 100));

  return {
    title: "Lumen Impact Drive",
    goalXLM,
    raisedXLM,
    deadlineMs: inThreeDays,
    progressPct,
  };
}

export async function getCampaignOverviewLive(): Promise<CampaignOverview> {
  try {
    // Dynamic import so build doesn't fail before bindings are generated
    const mod: any = await import("../../packages/CCZ7PMSCNHXO4XWRFBKLYCT7IDHS4JORM2BJBXK2E52V23NU4UKQT4WC/dist/index.js");
    const { Client } = mod;

    const client = new Client({
      rpcUrl: RPC_URL,
      networkPassphrase: "Test SDF Network ; September 2015",
      contractId: CONTRACT_ID,
    });

    const toXLM = (stroops: bigint) => Number(stroops) / 10_000_000;
    let goalXLM = 0;
    let raisedXLM = 0;
    let deadlineMs = 0;

    // Prefer new combined getter if available in regenerated bindings
    if (typeof (client as any).get_campaign_data === "function") {
      const resp = await (client as any).get_campaign_data();
      const tup = (resp as any).result as [bigint, bigint, bigint, string, bigint];
      const goal = BigInt(tup?.[0] ?? 0n);
      const raised = BigInt(tup?.[1] ?? 0n);
      const deadlineSec = BigInt(tup?.[2] ?? 0n);
      goalXLM = toXLM(goal);
      raisedXLM = toXLM(raised);
      deadlineMs = Number(deadlineSec) * 1000;
    } else {
      // Fallback: use live total + stubbed goal/deadline
      const base = await getCampaignOverviewStub();
      const totalTx = await (client as any).get_total_raised();
      const raisedStroops = BigInt((totalTx as any).result ?? 0n);
      goalXLM = base.goalXLM;
      raisedXLM = toXLM(raisedStroops);
      deadlineMs = base.deadlineMs;
    }

    const percent = goalXLM > 0 ? Math.min(100, Math.round((raisedXLM / goalXLM) * 100)) : 0;

    // Get campaign title from localStorage (stored when campaign created)
    const storedTitle = typeof window !== 'undefined' 
      ? localStorage.getItem('campaign_title') 
      : null;
    const title = storedTitle || "Campaign Aktif";

    console.info("[Soroban] Live data loaded from testnet");

    return {
      title,
      goalXLM,
      raisedXLM,
      deadlineMs,
      progressPct: percent,
    };
  } catch (e) {
    // Fallback to stub if live call/import fails
    return getCampaignOverviewStub();
  }
}

// Example shape for a real integration (when ABI/utilities are ready):
// export async function getCampaignOverviewLive(): Promise<CampaignOverview> {
//   // 1) Build a read-only invocation for get_campaign_data
//   // 2) Simulate or call via Soroban RPC
//   // 3) Decode return into native values
//   // 4) Convert stroops->XLM and seconds->ms if necessary
//   // return { title: "Lumen Impact Drive", goalXLM, raisedXLM, deadlineMs, progressPct };
// }
