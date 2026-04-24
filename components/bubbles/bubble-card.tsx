"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { Job } from "@/types/job";
import { categoryIcons, categoryStyles } from "@/lib/categories";

const sizeStyles: { [K in Job["size"]]: string } = {
  xs: "h-[108px] w-[108px] p-3",
  sm: "h-[144px] w-[144px] p-4",
  md: "h-[184px] w-[184px] p-5",
  lg: "h-[236px] w-[236px] p-6",
  xl: "h-[292px] w-[292px] p-7",
};

type BubbleCardProps = {
  job: Job;
  layoutId?: string;
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
  const Icon = categoryIcons[job.category];
  const contentFrame = "mx-auto w-full max-w-[90%]";
  const lineFade =
    "max-w-full overflow-hidden whitespace-nowrap pr-1 [mask-image:linear-gradient(to_right,#000_95%,transparent)] [-webkit-mask-image:linear-gradient(to_right,#000_95%,transparent)]";

  if (job.size === "xs" || job.size === "sm") {
    return (
      <div className="relative z-20 flex h-full w-full flex-col items-center justify-center px-4 py-2 text-center">
        <div className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/85 bg-white/70 text-current shadow-sm backdrop-blur">
          <Icon className="h-3.5 w-3.5" />
        </div>
        <p className={clsx(contentFrame, "text-sm font-semibold leading-tight", lineFade)}>
          {job.title}
        </p>
        <p className={clsx(contentFrame, "mt-1 text-xs opacity-80", lineFade)}>
          {job.company}
        </p>
        <p className={clsx(contentFrame, "mt-2 text-xs opacity-80", lineFade)}>
          {job.location}
        </p>
      </div>
    );
  }

  if (job.size === "md") {
    return (
      <div className="relative z-20 flex h-full w-full flex-col items-center justify-center px-5 py-3 text-center">
        <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/85 bg-white/70 text-current shadow-sm backdrop-blur">
          <Icon className="h-4 w-4" />
        </div>
        <p className={clsx(contentFrame, "text-base font-semibold leading-tight", lineFade)}>
          {job.title}
        </p>
        <p className={clsx(contentFrame, "mt-3 text-sm opacity-80", lineFade)}>
          {job.company}
        </p>
        <p className={clsx(contentFrame, "mt-2 text-xs opacity-75", lineFade)}>
          {job.location}
        </p>
      </div>
    );
  }

  return (
    <div className="relative z-20 flex h-full w-full flex-col items-center justify-center px-6 py-4 text-center">
      <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/85 bg-white/70 text-current shadow-sm backdrop-blur">
        <Icon className="h-[18px] w-[18px]" />
      </div>
      <p
        className={clsx(
          contentFrame,
          "text-[clamp(16px,1.6vw,22px)] font-semibold leading-tight",
          lineFade
        )}
      >
        {job.title}
      </p>

      <p
        className={clsx(
          contentFrame,
          "mt-3 text-[clamp(13px,1vw,16px)] opacity-85",
          lineFade
        )}
      >
        {job.company}
      </p>

      <div className={clsx(contentFrame, "mt-4 text-[clamp(11px,0.9vw,14px)] opacity-75")}>
        <p className={lineFade}>{job.location}</p>
      </div>
    </div>
  );
}

export function BubbleCard({
  job,
  layoutId,
  isSelected = false,
  onClick,
  style,
  initialStyle,
  animateStyle,
  transition,
}: BubbleCardProps) {
  const floatSeed =
    job.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % 7;
  const floatDuration = 7.6 + floatSeed * 0.45;
  const floatDelay = floatSeed * 0.12;

  return (
    <motion.div
      className="absolute"
      style={style}
      initial={initialStyle}
      animate={animateStyle}
      transition={transition}
    >
      <motion.button
        layoutId={layoutId}
        type="button"
        animate={{ y: [0, -2.5, 0, 2, 0] }}
        whileHover={{
          scale: 1.03,
          scaleX: 1.04,
          scaleY: 0.975,
          boxShadow: "0 18px 42px rgba(15, 23, 42, 0.19)",
        }}
        whileTap={{ scale: 0.988, scaleX: 1.01, scaleY: 0.99 }}
        transition={{
          y: {
            duration: floatDuration,
            delay: floatDelay,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          },
          type: "spring",
          stiffness: 220,
          damping: 24,
          mass: 0.9,
        }}
        onClick={onClick}
        className={clsx(
          "group relative flex -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center overflow-hidden rounded-full border text-center shadow-md backdrop-blur-sm",
          "before:pointer-events-none before:absolute before:-top-[24%] before:left-[14%] before:h-[42%] before:w-[58%] before:rounded-full before:bg-white/55 before:blur-md before:content-['']",
          "after:pointer-events-none after:absolute after:inset-[14%] after:rounded-full after:border after:border-white/50 after:content-['']",
          sizeStyles[job.size],
          categoryStyles[job.category],
          isSelected && "ring-4 ring-white/65 shadow-xl"
        )}
      >
        <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_24%,rgba(255,255,255,0.42),transparent_56%)] opacity-90" />
        <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_78%,rgba(255,255,255,0.14),transparent_58%)]" />
        {renderBubbleContent(job)}
      </motion.button>
    </motion.div>
  );
}
