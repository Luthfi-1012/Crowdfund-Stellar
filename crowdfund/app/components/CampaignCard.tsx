"use client";

import { useMemo, useState, useEffect } from "react";
import { CheckCircle, Lock, Clock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export type CampaignCardProps = {
  id: string;
  title: string;
  goalXLM: number;
  raisedXLM: number;
  deadlineMs: number;
  className?: string;
  compact?: boolean;
};

export default function CampaignCard({
  id,
  title,
  goalXLM,
  raisedXLM,
  deadlineMs,
  className = "",
  compact = false,
}: CampaignCardProps) {
  const [now, setNow] = useState<number>(() => Date.now());
  
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const percent = useMemo(() => {
    return goalXLM > 0 ? Math.min(100, Math.round((raisedXLM / goalXLM) * 100)) : 0;
  }, [raisedXLM, goalXLM]);

  const timeLeft = useMemo(() => {
    const diff = Math.max(0, deadlineMs - now);
    const s = Math.floor(diff / 1000);
    const d = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600);
    const m = Math.floor((s % 3600) / 60);
    
    if (d > 0) return `${d}d ${h}h`;
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  }, [deadlineMs, now]);

  const isExpired = deadlineMs <= now;

  const milestones = useMemo(() => [50, 75, 100], []);
  const achievedMilestones = useMemo(
    () => milestones.map((p) => ({ value: p, achieved: percent >= p })),
    [milestones, percent]
  );

  return (
    <div
      className={
        "w-full rounded-lg border border-zinc-800 bg-zinc-950/70 shadow-lg backdrop-blur " +
        (compact ? "p-4" : "p-5") +
        " " +
        className
      }
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-zinc-100 tracking-tight truncate ${compact ? "text-base" : "text-lg"}`}>
            {title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <Clock className="size-3 text-zinc-500" />
            <p className="text-xs text-zinc-400">
              {isExpired ? "Berakhir" : timeLeft}
            </p>
          </div>
        </div>
        {isExpired && (
          <span className="px-2 py-1 text-xs bg-zinc-800 text-zinc-400 rounded">
            Selesai
          </span>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-end justify-between">
          <div className="text-xs text-zinc-400">
            <span className="text-zinc-200 font-semibold">{raisedXLM.toLocaleString()}</span>
            {" / "}
            {goalXLM.toLocaleString()} XLM
          </div>
          <div className="text-xs text-zinc-500">{percent}%</div>
        </div>

        <div className="h-2 w-full rounded-full bg-zinc-900 border border-zinc-800 overflow-hidden relative">
          <motion.div
            key={`progress-${id}-${percent}`}
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-lime-400"
          />
        </div>
      </div>

      {!compact && (
        <div className="mt-3">
          <div className="grid grid-cols-3 gap-2">
            {achievedMilestones.map((m, idx) => {
              const unlocked = m.achieved;
              return (
                <div
                  key={`${id}-${m.value}-${idx}`}
                  className="rounded border border-zinc-800 bg-zinc-900/50 p-2 flex items-center gap-2"
                >
                  <AnimatePresence initial={false}>
                    {unlocked ? (
                      <motion.div
                        key="checked"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="text-emerald-400"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="locked"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-zinc-600"
                      >
                        <Lock className="h-4 w-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="text-xs text-zinc-400">{m.value}%</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

