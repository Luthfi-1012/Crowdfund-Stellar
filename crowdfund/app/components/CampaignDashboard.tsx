"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, Lock, RefreshCcw } from "lucide-react";
import { getCampaignOverviewStub, type CampaignOverview } from "~/lib/campaignClient";

export type CampaignDashboardProps = {
  getOverview?: () => Promise<CampaignOverview>;
  pollIntervalMs?: number;
  className?: string;
};

export default function CampaignDashboard({
  getOverview,
  pollIntervalMs = 5000,
  className = "",
}: CampaignDashboardProps) {
  const query = useQuery({
    queryKey: ["campaign-dashboard"],
    queryFn: async () => {
      const data = await (getOverview ? getOverview() : getCampaignOverviewStub());
      return data;
    },
    refetchInterval: pollIntervalMs,
    staleTime: 1000,
  });

  const title = query.data?.title ?? "Campaign";
  const goal = query.data?.goalXLM ?? 1000;
  const raised = query.data?.raisedXLM ?? 620;
  const percent = query.data?.progressPct ?? Math.min(100, Math.round((raised / goal) * 100));
  const deadlineMs = query.data?.deadlineMs ?? Date.now() + 3 * 24 * 60 * 60 * 1000;

  const [now, setNow] = useState<number>(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeLeft = useMemo(() => {
    const diff = Math.max(0, deadlineMs - now);
    const s = Math.floor(diff / 1000);
    const d = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600);
    const m = Math.floor((s % 3600) / 60);
    const ss = s % 60;
    return `${d}d ${h}h ${m}m ${ss}s`;
  }, [deadlineMs, now]);

  const percentMilestones = useMemo(() => [50, 75, 100], []);
  const achievedMilestones = useMemo(
    () => percentMilestones.map((p) => ({ value: p, achieved: percent >= p })),
    [percentMilestones, percent]
  );

  return (
    <div
      className={
        "w-full rounded-xl border border-zinc-800 bg-zinc-950/70 p-5 sm:p-6 shadow-lg shadow-black/30 " +
        "backdrop-blur " +
        className
      }
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-zinc-100 tracking-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">Deadline: {timeLeft}</p>
        </div>
        <button
          onClick={() => query.refetch()}
          className="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs sm:text-sm font-medium text-zinc-200 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-700 active:scale-[0.98] transition"
          disabled={query.isFetching}
          aria-label="Refresh"
        >
          <RefreshCcw
            className={
              "h-4 w-4 " + (query.isFetching ? "animate-spin text-zinc-300" : "text-zinc-300")
            }
          />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      <div className="mt-5 sm:mt-6">
        <div className="flex items-end justify-between">
          <div className="text-sm sm:text-base text-zinc-300">
            Raised <span className="text-zinc-100 font-semibold">{raised.toLocaleString()} XLM</span> / Goal {goal.toLocaleString()} XLM
          </div>
          <div className="text-xs sm:text-sm text-zinc-400">{percent.toFixed(0)}%</div>
        </div>

        <div className="mt-3">
          <div className="h-3 sm:h-3.5 w-full rounded-lg bg-zinc-900 border border-zinc-800 overflow-hidden relative">
            <motion.div
              key={`progress-${percent}`}
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-lime-400"
            />
            <AnimatePresence>
              {achievedMilestones.map((m) => (
                <motion.div
                  key={`glow-${m.value}-${m.achieved}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: m.achieved ? 0.3 : 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <div className="h-full w-full bg-emerald-500/20 blur-md" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="text-sm text-zinc-300 font-medium mb-3">Milestones (Progress)</div>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {achievedMilestones.map((m, idx) => {
            const unlocked = m.achieved;
            return (
              <li
                key={`${m.value}-${idx}`}
                className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 sm:p-4"
              >
                <div className="flex items-center gap-3">
                  <AnimatePresence initial={false}>
                    {unlocked ? (
                      <motion.div
                        key="icon-checked"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="text-emerald-400"
                      >
                        <CheckCircle className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="icon-locked"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-zinc-600"
                      >
                        <Lock className="h-5 w-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="flex-1">
                    <div className="text-sm text-zinc-200">Tahap {idx + 1}</div>
                    <div className="text-xs text-zinc-400">{m.value}% tercapai</div>
                  </div>
                  <AnimatePresence>
                    {unlocked && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.25 }}
                        className="text-emerald-400 text-xs"
                      >
                        Terbuka
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {query.isError && (
        <div className="mt-4 text-xs text-red-400">
          Gagal memuat data. Menampilkan simulasi jika tersedia.
        </div>
      )}
    </div>
  );
}
