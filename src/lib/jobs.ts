import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44, JobEntity } from "@/api/base44Client";

export function useJobs() {
  return useQuery<JobEntity[]>({
    queryKey: ["jobs"],
    queryFn: () => base44.entities.Job.list("-created_date", 200),
  });
}

export interface JobFilterState {
  q?: string;
  location?: string;
  industry?: string;
  employment_type?: string;
  experience?: string;
  category?: string;
  salary_min?: number;
  salary_max?: number;
  savedOnly?: boolean;
}

export function filterJobs(
  jobs: JobEntity[] = [],
  filters: JobFilterState = {},
  sort: "newest" | "salary" = "newest",
  savedIds: string[] = []
): JobEntity[] {
  let result = jobs.filter((job) => job.status === "Published");

  if (filters.savedOnly) {
    result = result.filter((j) => savedIds.includes(j.id));
  }

  if (filters.q && filters.q.trim()) {
    const term = filters.q.toLowerCase().trim();
    result = result.filter((j) => {
      const inTitle = j.title?.toLowerCase().includes(term);
      const inCompany = j.company?.toLowerCase().includes(term);
      const inSkills = j.skills?.some((s) => s.toLowerCase().includes(term));
      const inDesc = j.description?.toLowerCase().includes(term);
      return inTitle || inCompany || inSkills || inDesc;
    });
  }

  if (filters.location && filters.location.trim()) {
    const loc = filters.location.toLowerCase().trim();
    result = result.filter((j) => j.location?.toLowerCase().includes(loc));
  }

  if (filters.industry && filters.industry !== "all") {
    result = result.filter((j) => j.industry === filters.industry);
  }

  if (filters.category && filters.category !== "all") {
    result = result.filter((j) => j.category === filters.category);
  }

  if (filters.employment_type && filters.employment_type !== "all") {
    result = result.filter((j) => j.employment_type === filters.employment_type);
  }

  if (filters.experience && filters.experience !== "all") {
    const expNum = parseInt(filters.experience, 10);
    if (!isNaN(expNum)) {
      result = result.filter((j) => {
        const min = j.experience_min ?? 0;
        const max = j.experience_max ?? 99;
        return expNum >= min && expNum <= max;
      });
    }
  }

  if (filters.salary_min) {
    result = result.filter((j) => (j.salary_max || j.salary_min || 0) >= filters.salary_min!);
  }

  if (sort === "salary") {
    result.sort((a, b) => (b.salary_max ?? b.salary_min ?? 0) - (a.salary_max ?? a.salary_min ?? 0));
  } else {
    // Newest first
    result.sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime());
  }

  return result;
}

export function useSavedJobs() {
  const [saved, setSaved] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("jobkota:saved");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("jobkota:saved", JSON.stringify(saved));
    } catch (err) {
      console.error("Failed to save jobs state:", err);
    }
  }, [saved]);

  const toggle = (id: string) => {
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isSaved = (id: string) => saved.includes(id);

  return { saved, toggle, isSaved };
}

export function initials(name?: string): string {
  if (!name) return "?";
  return (
    name
      .split(" ")
      .filter(Boolean)
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?"
  );
}

export function formatSalary(job: Partial<JobEntity>): string {
  if (!job.salary_min && !job.salary_max) return "Competitive";
  const currency = job.currency || "AED";
  const fmt = (n?: number) => (n !== undefined ? n.toLocaleString() : "");
  if (job.salary_min && job.salary_max) {
    return `${currency} ${fmt(job.salary_min)}–${fmt(job.salary_max)}/mo`;
  }
  if (job.salary_min) {
    return `From ${currency} ${fmt(job.salary_min)}/mo`;
  }
  return `Up to ${currency} ${fmt(job.salary_max)}/mo`;
}
