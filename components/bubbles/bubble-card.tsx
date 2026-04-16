"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { Job } from "@/types/job";
import { categoryLabels, categoryStyles } from "@/lib/categories";

const sizeStyles: { [K in Job["size"]]: string } = {
  xs: "h-[108px] w-[108px] p-3",
  sm: "h-[144px] w-[144px] p-4",
  md: "h-[184px] w-[184px] p-5",
  lg: "h-[236px] w-[236px] p-6",
  xl: "h-[292px] w-[292px] p-7",
};

type BubbleCardProps = {
  job: Job;
  isSelected?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
};

function renderBubbleContent(job: Job) {
  if (job.size === "xs" || job.size === "sm") {
    return (
      <div className="flex h-full w-full items-center justify-center px-3 text-center">
        <p className="line-clamp-3 break-words text-sm font-semibold leading-tight">
          {job.title}
        </p>
      </div>
    );
  }

  if (job.size === "md") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center px-4 text-center">
        <p className="line-clamp-3 break-words text-base font-semibold leading-tight">
          {job.title}
        </p>
        <p className="mt-2 line-clamp-1 text-sm opacity-80">
          {job.company}
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-5 text-center">
      <p className="line-clamp-3 break-words text-[clamp(16px,1.6vw,22px)] font-semibold leading-tight">
        {job.title}
      </p>

      <p className="mt-2 line-clamp-1 text-[clamp(13px,1vw,16px)] opacity-85">
        {job.company}
      </p>

      <div className="mt-5 text-[clamp(11px,0.9vw,14px)] opacity-75">
        <p className="line-clamp-1">{categoryLabels[job.category]}</p>
        <p className="line-clamp-1">{job.location}</p>
      </div>
    </div>
  );
}

export function BubbleCard({
  job,
  isSelected = false,
  onClick,
  style,
}: BubbleCardProps) {
  return (
    <div className="absolute" style={style}>
      <motion.button
        whileHover={{ scale: 1 }}
        whileTap={{ scale: 0.985 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        onClick={onClick}
        className={clsx(
          "flex -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full border text-center shadow-sm",
          "bg-gradient-to-br from-white via-white to-white/90",
          sizeStyles[job.size],
          categoryStyles[job.category],
          isSelected && "ring-4 ring-slate-900/10 shadow-md"
        )}
      >
        {renderBubbleContent(job)}
      </motion.button>
    </div>
  );
}