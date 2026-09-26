import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { categories } from "@/lib/content";
import { useJobs } from "@/lib/jobs";
import JobCard from "@/components/jobs/JobCard";
import SectionHeading from "@/components/site/SectionHeading";
import Reveal from "@/components/site/Reveal";

export default function FeaturedJobs() {
  const { data: jobs = [], isLoading } = useJobs();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const publishedJobs = jobs.filter((j) => j.status === "Published");

  const filteredJobs = publishedJobs
    .filter((j) => (selectedCategory === "all" ? true : j.category === selectedCategory))
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    .slice(0, 6);

  return (
    <section className="py-24 bg-card border-b border-border/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <SectionHeading
            eyebrow="Curated Openings"
            title="Featured Career Opportunities"
            accentWord="in high demand."
            description="Explore selected executive and technical mandates actively recruiting in the UAE and GCC region."
            className="mb-0"
          />

          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-xs font-bold text-foreground hover:bg-muted transition-all shrink-0 cursor-pointer"
          >
            <span>View All Open Positions ({publishedJobs.length})</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Category Filter Tabs (Interactive Segmented Buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === "all"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "bg-background border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            All Roles
          </button>
          {categories.slice(0, 6).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-background border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-64 rounded-2xl border border-border bg-muted/40 animate-pulse p-6"
              />
            ))}
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job, idx) => (
              <Reveal key={job.id} delay={idx * 0.06}>
                <JobCard job={job} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-border bg-muted/30 p-12 text-center space-y-3">
            <Sparkles className="h-8 w-8 text-muted-foreground mx-auto" />
            <p className="text-base font-bold text-foreground">
              New opportunities are coming soon.
            </p>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Our recruiters are onboarding active listings in this category. Browse other sectors or submit an inquiry.
            </p>
            <button
              onClick={() => setSelectedCategory("all")}
              className="mt-2 text-xs font-bold text-primary underline underline-offset-4 cursor-pointer"
            >
              Reset Category Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
