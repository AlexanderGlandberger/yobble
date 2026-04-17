"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import {
  Briefcase,
  HeartPulse,
  Monitor,
  Wrench,
  CircleUserRound,
  Megaphone,
  SlidersHorizontal,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";
import { mockJobs } from "@/lib/mock-jobs";
import { categoryLabels, categoryStyles } from "@/lib/categories";
import { Job, JobCategory } from "@/types/job";

type FilterTab =
  | "all"
  | "tech_it"
  | "sales_marketing"
  | "healthcare"
  | "industry"
  | "other";

type SortMode = "best_match" | "popularity" | "title";

const tabs: { id: FilterTab; label: string }[] = [
  { id: "all", label: "Alla branscher" },
  { id: "tech_it", label: "Tech & IT" },
  { id: "sales_marketing", label: "Sälj & Marknad" },
  { id: "healthcare", label: "Hälsa & Vård" },
  { id: "industry", label: "Bygg & Hantverk" },
  { id: "other", label: "Övrigt" },
];

function getIcon(category: JobCategory) {
  if (category === "tech") return Monitor;
  if (category === "sales_marketing") return Megaphone;
  if (category === "healthcare") return HeartPulse;
  if (category === "industry") return Wrench;
  if (category === "finance_admin") return Briefcase;
  if (category === "design") return CircleUserRound;
  return Briefcase;
}

function matchesTab(job: Job, tab: FilterTab) {
  if (tab === "all") return true;
  if (tab === "tech_it") return job.category === "tech" || job.category === "design";
  if (tab === "sales_marketing") return job.category === "sales_marketing";
  if (tab === "healthcare") return job.category === "healthcare";
  if (tab === "industry") return job.category === "industry";
  return job.category === "finance_admin" || job.category === "service";
}

export function JobsList() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("best_match");

  const jobs = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const normalizedCity = city.trim().toLowerCase();

    const filtered = mockJobs.filter((job) => {
      if (!matchesTab(job, activeTab)) return false;

      if (normalizedSearch) {
        const inText =
          job.title.toLowerCase().includes(normalizedSearch) ||
          job.company.toLowerCase().includes(normalizedSearch);

        if (!inText) return false;
      }

      if (normalizedCity && !job.location.toLowerCase().includes(normalizedCity)) {
        return false;
      }

      return true;
    });

    const sorted = [...filtered];

    if (sortMode === "best_match") {
      sorted.sort((a, b) => b.matchScore - a.matchScore);
    } else if (sortMode === "popularity") {
      sorted.sort((a, b) => b.popularityScore - a.popularityScore);
    } else {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }

    return sorted;
  }, [activeTab, city, search, sortMode]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              "rounded-full border px-5 py-2 text-sm font-medium transition",
              activeTab === tab.id
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px_220px]">
          <div>
            <h2 className="text-3 font-semibold text-slate-900">Jobböversikt</h2>
            <p className="text-sm text-slate-500">Sortera och filtrera jobb i en klassisk listvy.</p>

            <label className="mt-3 flex items-center gap-2 rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-500">
              <Search className="h-4 w-4" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent outline-none placeholder:text-slate-400"
                placeholder="Sök jobb eller företag"
              />
            </label>
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <SlidersHorizontal className="h-4 w-4" />
              Sortera
            </label>
            <select
              value={sortMode}
              onChange={(e) => setSortMode(e.target.value as SortMode)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none"
            >
              <option value="best_match">Bäst match</option>
              <option value="popularity">Högst popularitet</option>
              <option value="title">A-Ö</option>
            </select>
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <MapPin className="h-4 w-4" />
              Stad
            </label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400"
              placeholder="t.ex. Göteborg"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {jobs.map((job) => {
          const Icon = getIcon(job.category);
          const isPrioritized = job.matchScore >= 80;

          return (
            <article
              key={job.id}
              className="grid items-center gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1.5fr_0.6fr_0.6fr_0.7fr_0.5fr]"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-slate-200 p-3 text-slate-500">
                  <Icon className="h-7 w-7" />
                </div>

                <div>
                  <h3 className="text-2 font-semibold text-slate-900">{job.title}</h3>
                  <p className="text-sm text-slate-500">{job.company}</p>
                </div>
              </div>

              <p className="text-sm text-slate-700">{job.location}</p>

              <span
                className={clsx(
                  "inline-flex w-fit rounded-full border px-3 py-1 text-sm",
                  categoryStyles[job.category]
                )}
              >
                {categoryLabels[job.category]}
              </span>

              <div className="text-sm">
                <p className="font-semibold text-slate-900">{job.matchScore}% match</p>
                <p className="text-slate-500">Pop {job.popularityScore}</p>
              </div>

              <div>
                {isPrioritized ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
                    <Sparkles className="h-4 w-4" /> Prioriterad
                  </span>
                ) : (
                  <span className="text-sm text-slate-500">{job.status}</span>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
