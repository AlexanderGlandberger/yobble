"use client";

import { useMemo, useState } from "react";
import { mockJobs } from "@/lib/mock-jobs";
import { mockUser } from "@/lib/mock-user";
import { getMatchScore } from "@/lib/match";
import { BubbleCard } from "./bubble-card";
import { ProfileBubble } from "./profile-bubble";
import { JobDetailModal } from "./job-detail-modal";
import { Job } from "@/types/job";

type MatchBubbleNode = Job & {
  px: number;
  py: number;
  spawnX: number;
  spawnY: number;
  radius: number;
  matchScore: number;
};

const CANVAS_WIDTH = 1320;
const CANVAS_HEIGHT = 860;
const CENTER_X = CANVAS_WIDTH / 2;
const CENTER_Y = CANVAS_HEIGHT / 2;
const PADDING = 36;
const GAP = 18;
const PROFILE_RADIUS = 120;

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

function overlapsProfile(x: number, y: number, radius: number) {
  const dx = x - CENTER_X;
  const dy = y - CENTER_Y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  return dist < PROFILE_RADIUS + radius + GAP;
}

function profileDistance(x: number, y: number) {
  const dx = x - CENTER_X;
  const dy = y - CENTER_Y;
  return Math.sqrt(dx * dx + dy * dy);
}

function overlapsPlaced(
  x: number,
  y: number,
  radius: number,
  placed: MatchBubbleNode[]
) {
  for (const node of placed) {
    const dx = node.px - x;
    const dy = node.py - y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const minDist = node.radius + radius + GAP;

    if (dist < minDist) return true;
  }

  return false;
}

function insideBounds(x: number, y: number, radius: number) {
  return (
    x >= radius + PADDING &&
    x <= CANVAS_WIDTH - radius - PADDING &&
    y >= radius + PADDING &&
    y <= CANVAS_HEIGHT - radius - PADDING
  );
}

function getDistanceFromMatch(matchScore: number, radius: number) {
  if (matchScore >= 85) {
    return PROFILE_RADIUS + radius + 26 + (100 - matchScore) * 2.2;
  }

  const normalized = 1 - Math.max(0, Math.min(matchScore, 100)) / 100;
  return PROFILE_RADIUS + radius + 90 + normalized * 290;
}

function separateAll(nodes: MatchBubbleNode[]) {
  for (let iteration = 0; iteration < 420; iteration++) {
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
        if (dist >= minDist) continue;

        const overlap = minDist - dist;
        const nx = dx / dist;
        const ny = dy / dist;
        const push = overlap / 2;

        a.px -= nx * push;
        a.py -= ny * push;
        b.px += nx * push;
        b.py += ny * push;
        moved = true;
      }
    }

    for (const node of nodes) {
      const dist = profileDistance(node.px, node.py);
      const minDist = PROFILE_RADIUS + node.radius + GAP;

      if (dist < minDist) {
        const push = minDist - dist;
        const nx = dist === 0 ? 1 : (node.px - CENTER_X) / dist;
        const ny = dist === 0 ? 0 : (node.py - CENTER_Y) / dist;

        node.px += nx * push;
        node.py += ny * push;
        moved = true;
      }

      node.px = clamp(
        node.px,
        node.radius + PADDING,
        CANVAS_WIDTH - node.radius - PADDING
      );
      node.py = clamp(
        node.py,
        node.radius + PADDING,
        CANVAS_HEIGHT - node.radius - PADDING
      );
    }

    if (!moved) break;
  }
}

function buildForYouLayout(jobs: Job[]): MatchBubbleNode[] {
  const scored = [...jobs]
    .map((job) => ({
      ...job,
      matchScore: getMatchScore(job),
    }))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 18);

  const placed: MatchBubbleNode[] = [];

  scored.forEach((job, index) => {
    const radius = getRadius(job.size);
    const baseDistance = getDistanceFromMatch(job.matchScore, radius);
    const angleSeed = (index / Math.max(scored.length, 1)) * Math.PI * 2;

    let found: MatchBubbleNode | null = null;

    for (let ring = 0; ring < 180; ring++) {
      const ringDistance = baseDistance + ring * 9;
      const steps = 36 + ring * 2;

      for (let step = 0; step < steps; step++) {
        const angle = angleSeed + (step / steps) * Math.PI * 2;
        const x = CENTER_X + Math.cos(angle) * ringDistance;
        const y = CENTER_Y + Math.sin(angle) * ringDistance;

        if (!insideBounds(x, y, radius)) continue;
        if (overlapsProfile(x, y, radius)) continue;
        if (overlapsPlaced(x, y, radius, placed)) continue;

        found = {
          ...job,
          radius,
          px: x,
          py: y,
          spawnX: CENTER_X + Math.cos(angle) * (ringDistance + 220),
          spawnY: CENTER_Y + Math.sin(angle) * (ringDistance + 220),
        };
        break;
      }

      if (found) break;
    }

    if (!found) {
      found = {
        ...job,
        radius,
        px: clamp(
          CENTER_X + (index - 9) * 30,
          radius + PADDING,
          CANVAS_WIDTH - radius - PADDING
        ),
        py: clamp(
          CENTER_Y + 320,
          radius + PADDING,
          CANVAS_HEIGHT - radius - PADDING
        ),
        matchScore: job.matchScore,
        spawnX: CENTER_X + (index - 9) * 60,
        spawnY: CENTER_Y + 560,
      };
    }

    placed.push(found);
  });

  separateAll(placed);

  const nonOverlapping: MatchBubbleNode[] = [];

  for (const node of placed) {
    if (overlapsPlaced(node.px, node.py, node.radius, nonOverlapping)) continue;
    if (overlapsProfile(node.px, node.py, node.radius)) continue;
    nonOverlapping.push(node);
  }

  return nonOverlapping;
}

export function ForYouCanvas() {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const jobs = useMemo(() => {
    return [...mockJobs]
      .sort((a, b) => getMatchScore(b) - getMatchScore(a))
      .slice(0, 18);
  }, []);

  const nodes = useMemo(() => buildForYouLayout(jobs), [jobs]);
  const selectedJob = nodes.find((job) => job.id === selectedJobId) ?? null;

  return (
    <div className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4">
      <p className="mb-2 px-2 text-xs text-slate-500">
        Jobs with 85%+ match are magnetized closest to your profile bubble.
      </p>
      <div className="overflow-x-auto">
        <div
          className="relative mx-auto overflow-hidden rounded-[28px]"
          style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
        >
          <ProfileBubble
            name="Alexander"
            title={mockUser.title}
            location={mockUser.location}
          />

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
              initialStyle={{
                left: job.spawnX,
                top: job.spawnY,
                opacity: 0,
              }}
              animateStyle={{
                left: job.px,
                top: job.py,
                opacity: 1,
              }}
              transition={{
                duration: 0.55 + (100 - job.matchScore) / 120,
                delay: (100 - job.matchScore) / 500,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      </div>

      <JobDetailModal
        job={selectedJob}
        open={Boolean(selectedJob)}
        onClose={() => setSelectedJobId(null)}
      />
    </div>
  );
}
