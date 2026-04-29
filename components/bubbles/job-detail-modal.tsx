"use client";

import { X } from "lucide-react";
import { Job } from "@/types/job";

type JobDetailModalProps = {
  job: Job | null;
  open: boolean;
  onClose: () => void;
};

function scoreTone(score: number) {
  if (score >= 80) return "text-emerald-700 bg-emerald-50 border-emerald-200";
  if (score >= 60) return "text-blue-700 bg-blue-50 border-blue-200";
  return "text-amber-700 bg-amber-50 border-amber-200";
}

export function JobDetailModal({ job, open, onClose }: JobDetailModalProps) {
  if (!open || !job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        aria-label="Close modal backdrop"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/35"
      />

      <div className="relative z-10 w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl md:p-7">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="space-y-5">
          <header className="pr-10">
            <h2 className="text-2xl font-semibold text-slate-900">{job.title}</h2>
            <p className="mt-1 text-sm text-slate-600">
              {job.company} · {job.location}
            </p>
          </header>

          <p className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
            {job.shortDescription}
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 p-3">
              <p className="text-xs text-slate-500">Matching score</p>
              <p className={`mt-1 inline-flex rounded-md border px-2 py-1 text-sm font-medium ${scoreTone(job.matchScore)}`}>
                {job.matchScore}%
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-3">
              <p className="text-xs text-slate-500">Popularity score</p>
              <p className="mt-1 text-sm font-medium text-slate-800">{job.popularityScore}/100</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-3">
              <p className="text-xs text-slate-500">Status</p>
              <p className="mt-1 text-sm font-medium text-slate-800">{job.status}</p>
            </div>
          </div>

          <section className="rounded-2xl border border-violet-100 bg-violet-50/40 p-4">
            <h3 className="text-sm font-semibold text-slate-900">AI matching</h3>
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
                <p className="text-xs text-slate-500">Skills to improve</p>
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
              View job
            </button>
            <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              Save
            </button>
            <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              Compare
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
