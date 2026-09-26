import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, SlidersHorizontal, Sparkles } from "lucide-react";
import useSeo from "@/lib/useSeo";
import { useJobs, filterJobs, useSavedJobs, JobFilterState } from "@/lib/jobs";
import { base44 } from "@/api/base44Client";
import JobCard from "@/components/jobs/JobCard";
import JobFilters from "@/components/jobs/JobFilters";
import PageHero from "@/components/site/PageHero";
import HeroSearch from "@/components/home/HeroSearch";
import { Button } from "@/components/ui/button";

export default function Jobs() {
  useSeo(
    "Explore Jobs & Careers",
    "Discover verified career opportunities across Technology, Finance, Aviation, Hospitality, Construction, and more in Dubai, UAE and the GCC."
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const { data: allJobs = [], isLoading } = useJobs();
  const { saved } = useSavedJobs();

  // Filters State initialized from searchParams
  const [filters, setFilters] = useState<JobFilterState>({
    q: searchParams.get("q") || "",
    location: searchParams.get("location") || "",
    industry: searchParams.get("industry") || "all",
    category: searchParams.get("category") || "all",
    employment_type: searchParams.get("employment_type") || "all",
    experience: searchParams.get("experience") || "all",
    salary_min: searchParams.get("salary_min") ? Number(searchParams.get("salary_min")) : undefined,
    savedOnly: searchParams.get("savedOnly") === "true",
  });

  const [sort, setSort] = useState<"newest" | "salary">("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  // Sync state if URL params change externally
  useEffect(() => {
    setFilters({
      q: searchParams.get("q") || "",
      location: searchParams.get("location") || "",
      industry: searchParams.get("industry") || "all",
      category: searchParams.get("category") || "all",
      employment_type: searchParams.get("employment_type") || "all",
      experience: searchParams.get("experience") || "all",
      salary_min: searchParams.get("salary_min") ? Number(searchParams.get("salary_min")) : undefined,
      savedOnly: searchParams.get("savedOnly") === "true",
    });
    setCurrentPage(1);
  }, [searchParams]);

  const handleFilterChange = (newFilters: JobFilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);

    // Update query params
    const nextParams = new URLSearchParams();
    if (newFilters.q) nextParams.set("q", newFilters.q);
    if (newFilters.location) nextParams.set("location", newFilters.location);
    if (newFilters.industry && newFilters.industry !== "all") nextParams.set("industry", newFilters.industry);
    if (newFilters.category && newFilters.category !== "all") nextParams.set("category", newFilters.category);
    if (newFilters.employment_type && newFilters.employment_type !== "all") nextParams.set("employment_type", newFilters.employment_type);
    if (newFilters.experience && newFilters.experience !== "all") nextParams.set("experience", newFilters.experience);
    if (newFilters.salary_min) nextParams.set("salary_min", String(newFilters.salary_min));
    if (newFilters.savedOnly) nextParams.set("savedOnly", "true");
    setSearchParams(nextParams);

    base44.analytics.track({
      eventName: "job_search",
      properties: { source: "jobs_page", filters: newFilters },
    });
  };

  const handleReset = () => {
    const emptyFilters: JobFilterState = {
      q: "",
      location: "",
      industry: "all",
      category: "all",
      employment_type: "all",
      experience: "all",
      salary_min: undefined,
      savedOnly: false,
    };
    handleFilterChange(emptyFilters);
  };

  const filtered = filterJobs(allJobs, filters, sort, saved);
  const totalResults = filtered.length;
  const totalPages = Math.ceil(totalResults / pageSize) || 1;
  const pagedJobs = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Search Bar */}
      <PageHero
        breadcrumbs={[{ label: "Career Opportunities" }]}
        eyebrow="Direct Employer Listings"
        title="Find Verified Positions"
        accentWord="across the GCC."
        description="Browse actively managed recruitment mandates for leading regional organizations. Filter by specialty, experience, and compensation."
      >
        <div className="pt-2 max-w-3xl">
          <HeroSearch
            initialQ={filters.q}
            initialLocation={filters.location}
          />
        </div>
      </PageHero>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
          {/* Left Sidebar Filters */}
          <div className="w-full">
            <JobFilters
              filters={filters}
              onChange={handleFilterChange}
              onReset={handleReset}
              totalCount={totalResults}
            />
          </div>

          {/* Right Results Column */}
          <div className="space-y-6">
            {/* Header toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border px-6 py-4 rounded-2xl shadow-xs">
              <div className="text-sm font-semibold text-foreground">
                Showing <span className="font-bold text-foreground">{totalResults}</span>{" "}
                position{totalResults === 1 ? "" : "s"}
                {filters.savedOnly && " (Saved Only)"}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground font-semibold">Sort by:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as "newest" | "salary")}
                  className="h-9 rounded-xl border border-input bg-card px-3 text-xs font-semibold text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
                >
                  <option value="newest">Newest Listed First</option>
                  <option value="salary">Highest Salary</option>
                </select>
              </div>
            </div>

            {/* Results Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div
                    key={n}
                    className="h-72 rounded-2xl border border-border bg-muted/40 animate-pulse p-6"
                  />
                ))}
              </div>
            ) : pagedJobs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {pagedJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center space-y-4">
                <Sparkles className="h-10 w-10 text-muted-foreground mx-auto" />
                <h3 className="text-xl font-bold text-foreground">
                  No opportunities match your search.
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Try adjusting your keywords, expanding your location, or removing salary and experience filters.
                </p>
                <div className="pt-2">
                  <Button variant="default" onClick={handleReset} className="font-bold">
                    Reset All Filters
                  </Button>
                </div>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-8">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl border border-border bg-card text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`h-9 w-9 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      currentPage === page
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "border border-border bg-card text-foreground hover:bg-muted"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl border border-border bg-card text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  aria-label="Next Page"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
