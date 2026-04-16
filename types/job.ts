export type JobCategory =
  | "tech"
  | "sales_marketing"
  | "healthcare"
  | "design"
  | "finance_admin"
  | "industry"
  | "service";

export type CategoryTab = "all" | "for_you" | JobCategory;

export type BubbleSize = "xs" | "sm" | "md" | "lg" | "xl";

export type Job = {
  id: string;
  title: string;
  company: string;
  category: JobCategory;
  location: string;
  size: BubbleSize;
  x: number;
  y: number;
  isPopular: boolean;
};