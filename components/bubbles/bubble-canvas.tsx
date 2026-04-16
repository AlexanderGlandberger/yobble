"use client";

import { useEffect, useMemo, useState } from "react";
import { mockJobs } from "@/lib/mock-jobs";
import { getMatchScore } from "@/lib/match";
import { BubbleCard } from "./bubble-card";
import { CategoryTabs } from "./category-tabs";
import { Job, CategoryTab } from "@/types/job";

type BubbleNode = Job & {
  px: number;
  py: number;
  radius: number;
};

const CANVAS_WIDTH = 1320;
const CANVAS_HEIGHT = 860;
const PADDING = 36;
const GAP = 14;

function getRadius(size: Job["size"]) {
  if (size === "xs") return 54;
  if (size === "sm") return 72;
  if (size === "md") return 92;
  if (size === "lg") return 118;
  return 146;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function insideBounds(x: number, y: number, radius: number) {
  return (
    x >= radius + PADDING &&
    x <= CANVAS_WIDTH - radius - PADDING &&
    y >= radius + PADDING &&
    y <= CANVAS_HEIGHT - radius - PADDING
  );
}

function overlaps(
  x: number,
  y: number,
  radius: number,
  placed: BubbleNode[]
): boolean {
  for (const node of placed) {
    const dx = node.px - x;
    const dy = node.py - y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const minDist = node.radius + radius + GAP;

    if (dist < minDist) return true;
  }

  return false;
}

function scorePosition(
  x: number,
  y: number,
  preferredX: number,
  preferredY: number
) {
  const dx = x - preferredX;
  const dy = y - preferredY;
  return Math.sqrt(dx * dx + dy * dy);
}

function findSpot(job: Job, placed: BubbleNode[]): BubbleNode {
  const radius = getRadius(job.size);

  const centerX = CANVAS_WIDTH * 0.5;
  const centerY = CANVAS_HEIGHT * 0.48;

  const preferredX = clamp(
    centerX + (job.x - 50) * 3.2,
    radius + PADDING,
    CANVAS_WIDTH - radius - PADDING
  );

  const preferredY = clamp(
    centerY + (job.y - 50) * 2.4,
    radius + PADDING,
    CANVAS_HEIGHT - radius - PADDING
  );

  if (
    insideBounds(preferredX, preferredY, radius) &&
    !overlaps(preferredX, preferredY, radius, placed)
  ) {
    return { ...job, radius, px: preferredX, py: preferredY };
  }

  const angleSeed = ((job.x * 13 + job.y * 7) / 100) * Math.PI;

  for (let ring = 0; ring < 220; ring++) {
    const spiralRadius = 18 + ring * 12;
    const steps = 28 + ring * 8;

    for (let step = 0; step < steps; step++) {
      const angle = angleSeed + (step / steps) * Math.PI * 2;
      const x = preferredX + Math.cos(angle) * spiralRadius;
      const y = preferredY + Math.sin(angle) * spiralRadius;

      if (!insideBounds(x, y, radius)) continue;
      if (overlaps(x, y, radius, placed)) continue;

      return { ...job, radius, px: x, py: y };
    }
  }

  let bestX: number | null = null;
  let bestY: number | null = null;
  let bestScore = Number.POSITIVE_INFINITY;
  const stepSize = 16;

  for (
    let y = radius + PADDING;
    y <= CANVAS_HEIGHT - radius - PADDING;
    y += stepSize
  ) {
    for (
      let x = radius + PADDING;
      x <= CANVAS_WIDTH - radius - PADDING;
      x += stepSize
    ) {
      if (overlaps(x, y, radius, placed)) continue;

      const score = scorePosition(x, y, preferredX, preferredY);
      if (score < bestScore) {
        bestScore = score;
        bestX = x;
        bestY = y;
      }
    }
  }

  if (bestX !== null && bestY !== null) {
    return {
      ...job,
      radius,
      px: bestX,
      py: bestY,
    };
  }

  return {
    ...job,
    radius,
    px: preferredX,
    py: preferredY,
  };
}

function separateAll(nodes: BubbleNode[]) {
  for (let iteration = 0; iteration < 400; iteration++) {
    let moved = false;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];

        let dx = b.px - a.px;
        let dy = b.py - a.py;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist === 0) {
          dx = 1;
          dy = 0;
          dist = 1;
        }

        const minDist = a.radius + b.radius + GAP;

        if (dist < minDist) {
          const overlap = minDist - dist;
          const nx = dx / dist;
          const ny = dy / dist;
          const push = overlap / 2;

          a.px -= nx * push;
          a.py -= ny * push;
          b.px += nx * push;
          b.py += ny * push;

          a.px = clamp(
            a.px,
            a.radius + PADDING,
            CANVAS_WIDTH - a.radius - PADDING
          );
          a.py = clamp(
            a.py,
            a.radius + PADDING,
            CANVAS_HEIGHT - a.radius - PADDING
          );

          b.px = clamp(
            b.px,
            b.radius + PADDING,
            CANVAS_WIDTH - b.radius - PADDING
          );
          b.py = clamp(
            b.py,
            b.radius + PADDING,
            CANVAS_HEIGHT - b.radius - PADDING
          );

          moved = true;
        }
      }
    }

    if (!moved) break;
  }
}

function buildPackedCluster(jobs: Job[]): BubbleNode[] {
  const sorted = [...jobs].sort(
    (a, b) => getRadius(b.size) - getRadius(a.size)
  );

  const placed: BubbleNode[] = [];

  for (const job of sorted) {
    placed.push(findSpot(job, placed));
  }

  separateAll(placed);

  return placed;
}

function hashString(value: string) {
  let hash = 0;

  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash);
}

function createSeededRandom(seed: number) {
  let state = seed % 2147483647;

  if (state <= 0) state += 2147483646;

  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
}

function shuffleArray<T>(items: T[], random: () => number) {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function normalizeJobsForCanvas(jobs: Job[], seedKey: string): Job[] {
  const random = createSeededRandom(hashString(seedKey));

  const sizePool: Job["size"][] = [
    "xl",
    "lg",
    "lg",
    "md",
    "md",
    "md",
    "md",
    "md",
    "sm",
    "sm",
    "sm",
    "sm",
    "sm",
    "xs",
    "xs",
    "md",
    "lg",
    "sm",
  ];

  const shuffledSizes = shuffleArray(sizePool, random);

  return jobs.slice(0, 18).map((job, index) => {
    const spreadX = 14 + Math.floor(random() * 72);
    const spreadY = 14 + Math.floor(random() * 62);

    return {
      ...job,
      size: shuffledSizes[index] ?? "sm",
      x: spreadX,
      y: spreadY,
    };
  });
}

export function BubbleCanvas() {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<CategoryTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cityQuery, setCityQuery] = useState("");

  const filteredJobs = useMemo(() => {
    let jobs: Job[] = [];

    if (activeTab === "for_you") {
      jobs = [...mockJobs]
        .sort((a, b) => getMatchScore(b) - getMatchScore(a))
        .slice(0, 18);
    } else if (activeTab === "all") {
      jobs = mockJobs.filter((job) => job.isPopular).slice(0, 18);
    } else {
      jobs = mockJobs
        .filter((job) => job.category === activeTab)
        .slice(0, 18);
    }

    if (searchQuery.trim()) {
      const normalizedSearch = searchQuery.trim().toLowerCase();
      jobs = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(normalizedSearch) ||
          job.company.toLowerCase().includes(normalizedSearch)
      );
    }

    if (cityQuery.trim()) {
      const normalizedCity = cityQuery.trim().toLowerCase();
      jobs = jobs.filter((job) =>
        job.location.toLowerCase().includes(normalizedCity)
      );
    }

    return normalizeJobsForCanvas(
      jobs,
      `${activeTab}-${searchQuery}-${cityQuery}`
    );
  }, [activeTab, searchQuery, cityQuery]);

  useEffect(() => {
    setSelectedJobId(null);
  }, [activeTab, searchQuery, cityQuery]);

  const nodes = useMemo(() => buildPackedCluster(filteredJobs), [filteredJobs]);

  return (
    <div className="space-y-4">
      <CategoryTabs activeTab={activeTab} onChange={setActiveTab} />

      <div className="grid gap-3 md:grid-cols-[1fr_280px]">
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Sök jobb, företag eller plats"
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
          <input
            value={cityQuery}
            onChange={(e) => setCityQuery(e.target.value)}
            placeholder="Filtrera stad"
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4">
        <div className="overflow-x-auto">
          <div
            className="relative mx-auto overflow-hidden rounded-[28px]"
            style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
          >
            {nodes.map((job) => (
              <BubbleCard
                key={job.id}
                job={job}
                isSelected={selectedJobId === job.id}
                onClick={() => setSelectedJobId(job.id)}
                style={{
                  left: job.px,
                  top: job.py,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}