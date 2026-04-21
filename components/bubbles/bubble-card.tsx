"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { Job } from "@/types/job";
import { categoryStyles } from "@/lib/categories";

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
  initialStyle?: React.CSSProperties;
  animateStyle?: React.CSSProperties;
  transition?: {
    duration?: number;
    delay?: number;
    ease?: "linear" | "easeIn" | "easeOut" | "easeInOut";
  };
};

function renderBubbleContent(job: Job) {
  const titleFade =
    "line-clamp-3 break-words [mask-image:linear-gradient(to_bottom,#000_72%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,#000_72%,transparent)]";
  const lineFade =
    "line-clamp-1 max-w-full [mask-image:linear-gradient(to_right,#000_82%,transparent)] [-webkit-mask-image:linear-gradient(to_right,#000_82%,transparent)]";

  if (job.size === "xs" || job.size === "sm") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center px-4 py-2 text-center">
        <p className={clsx("text-sm font-semibold leading-tight", titleFade)}>
          {job.title}
        </p>
        <p className={clsx("mt-2 text-xs opacity-80", lineFade)}>{job.location}</p>
      </div>
    );
  }

  if (job.size === "md") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center px-5 py-3 text-center">
        <p className={clsx("text-base font-semibold leading-tight", titleFade)}>
          {job.title}
        </p>
        <p className={clsx("mt-3 text-sm opacity-80", lineFade)}>
          {job.company}
        </p>
        <p className={clsx("mt-2 text-xs opacity-75", lineFade)}>{job.location}</p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-6 py-4 text-center">
      <p
        className={clsx(
          "text-[clamp(16px,1.6vw,22px)] font-semibold leading-tight",
          titleFade
        )}
      >
        {job.title}
      </p>

      <p className={clsx("mt-3 text-[clamp(13px,1vw,16px)] opacity-85", lineFade)}>
        {job.company}
      </p>

      <div className="mt-4 max-w-full text-[clamp(11px,0.9vw,14px)] opacity-75">
        <p className={lineFade}>{job.location}</p>
      </div>
    </div>
  );
}

export function BubbleCard({
  job,
  isSelected = false,
  onClick,
  style,
  initialStyle,
  animateStyle,
  transition,
}: BubbleCardProps) {
  return (
    <motion.div
      className="absolute"
      style={style}
      initial={initialStyle}
      animate={animateStyle}
      transition={transition}
    >
      <motion.button
        type="button"
        whileHover={{ scale: 1 }}
        whileTap={{ scale: 0.985 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        onClick={onClick}
        className={clsx(
          "flex -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center overflow-hidden rounded-full border text-center shadow-sm",
          "bg-gradient-to-br from-white via-white to-white/90",
          sizeStyles[job.size],
          categoryStyles[job.category],
          isSelected && "ring-4 ring-slate-900/10 shadow-md"
        )}
      >
        {renderBubbleContent(job)}
      </motion.button>
    </motion.div>
  );
}
