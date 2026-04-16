"use client";

import { useMemo, useState } from "react";
import { mockJobs } from "@/lib/mock-jobs";
import { mockUser } from "@/lib/mock-user";
import { getMatchScore } from "@/lib/match";
import { BubbleCard } from "./bubble-card";
import { ProfileBubble } from "./profile-bubble";
import { Job } from "@/types/job";

type MatchBubbleNode = Job & {
  px: number;
  py: number;
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

function getDistanceFromMatch(matchScore: number) {
  if (matchScore >= 80) return 220;
  if (matchScore >= 60) return 300;
  if (matchScore >= 40) return 380;
  return 470;
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
    const baseDistance = getDistanceFromMatch(job.matchScore);
    const angleSeed = (index / Math.max(scored.length, 1)) * Math.PI * 2;

    let found: MatchBubbleNode | null = null;

    for (let ring = 0; ring < 120; ring++) {
      const ringDistance = baseDistance + ring * 10;
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
      };
    }

    placed.push(found);
  });

  return placed;
}

export function ForYouCanvas() {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const jobs = useMemo(() => {
    return [...mockJobs]
      .sort((a, b) => getMatchScore(b) - getMatchScore(a))
      .slice(0, 18);
  }, []);

  const nodes = useMemo(() => buildForYouLayout(jobs), [jobs]);

  return (
    <div className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4">
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
            />
          ))}
        </div>
      </div>
    </div>
  );
}