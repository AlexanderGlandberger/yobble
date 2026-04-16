import { Job } from "@/types/job";
import { mockUser } from "./mock-user";

export function getMatchScore(job: Job): number {
  let score = 0;

  if (job.category === mockUser.category) score += 50;
  if (job.location === mockUser.location) score += 30;
  if (job.title.toLowerCase().includes("frontend")) score += 20;

  return score;
}