"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Job } from "@/types/job";

type JobDetailModalProps = {
  job: Job | null;
  layoutId?: string;
  onClose: () => void;
};

function scoreTone(score: number) {
  if (score >= 80) return "text-emerald-700 bg-emerald-50 border-emerald-200";
  if (score >= 60) return "text-blue-700 bg-blue-50 border-blue-200";
  return "text-amber-700 bg-amber-50 border-amber-200";
}

export function JobDetailModal({ job, layoutId, onClose }: JobDetailModalProps) {
  useEffect(() => {
    if (!job) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [job, onClose]);

  return (
    <AnimatePresence>
      {job && (
        <motion.div
          key={job.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        >
          <motion.button
            aria-label="Close modal backdrop"
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/45 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />

          <motion.div
            layoutId={layoutId}
            transition={{ layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
            className="relative z-10 w-full max-w-2xl rounded-[32px] border border-slate-200 bg-white/95 p-6 shadow-2xl md:p-7"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.22, delay: 0.12, ease: "easeOut" }}
              className="space-y-5"
            >
              <header className="pr-10">
                <h2 className="text-2xl font-semibold text-slate-900">{job.title}</h2>
                <p className="mt-1 text-sm text-slate-600">
                  {job.company} · {job.location}
                </p>
              </header>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-200 p-3">
                  <p className="text-xs text-slate-500">MatchScore</p>
                  <p className={`mt-2 inline-flex rounded-md border px-2 py-1 text-lg font-semibold ${scoreTone(job.matchScore)}`}>
                    {job.matchScore}%
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 p-3">
                  <p className="text-xs text-slate-500">PopularityScore</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{job.popularityScore}</p>
                </div>
                <div className="rounded-xl border border-slate-200 p-3">
                  <p className="text-xs text-slate-500">Status</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{job.status}</p>
                </div>
              </div>

              <section className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {job.shortDescription}
              </section>

              <section className="rounded-2xl border border-violet-100 bg-violet-50/40 p-4">
                <h3 className="text-sm font-semibold text-slate-900">AI Matching</h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-slate-500">Matching skills</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {job.matchingSkills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Missing skills</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {job.missingSkills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <div className="flex flex-wrap gap-2 pt-1">
                <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700">
                  Visa jobb
                </button>
                <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                  Spara
                </button>
                <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                  Jämför
                </button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
