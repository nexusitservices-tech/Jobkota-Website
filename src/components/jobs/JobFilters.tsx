import { useState } from "react";
import { SlidersHorizontal, RotateCcw, Bookmark, Search } from "lucide-react";
import { industries, categories } from "@/lib/content";
import { JobFilterState } from "@/lib/jobs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface JobFiltersProps {
  filters: JobFilterState;
  onChange: (newFilters: JobFilterState) => void;
  onReset: () => void;
  totalCount: number;
}

export default function JobFilters({
  filters,
  onChange,
  onReset,
  totalCount,
}: JobFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const update = (patch: Partial<JobFilterState>) => {
    onChange({ ...filters, ...patch });
  };

  return (
    <aside className="w-full">
      {/* Mobile Toggle Bar */}
      <div className="lg:hidden flex items-center justify-between mb-4 bg-card border border-border p-4 rounded-2xl">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center gap-2 text-sm font-bold text-foreground cursor-pointer"
        >
          <SlidersHorizontal className="h-4 w-4 text-signal" />
          <span>Filters & Categories</span>
        </button>
        <span className="text-xs text-muted-foreground font-medium">
          {totalCount} positions
        </span>
      </div>

      <div
        className={`bg-card border border-border rounded-2xl p-6 shadow-xs space-y-6 lg:block ${
          mobileOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-signal" />
            <h3 className="text-sm font-bold text-foreground tracking-wide">Filters</h3>
          </div>
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset</span>
          </button>
        </div>

        {/* Saved Jobs Toggle */}
        <div>
          <button
            type="button"
            onClick={() => update({ savedOnly: !filters.savedOnly })}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              filters.savedOnly
                ? "bg-signal/20 border-signal/50 text-foreground"
                : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <span className="flex items-center gap-2">
              <Bookmark className={`h-3.5 w-3.5 ${filters.savedOnly ? "fill-current" : ""}`} />
              <span>Saved Jobs Only</span>
            </span>
            {filters.savedOnly && <span className="text-[10px] uppercase font-bold text-primary">Active</span>}
          </button>
        </div>

        {/* Keyword Filter */}
        <div className="space-y-2">
          <Label htmlFor="filter-q">Keyword / Title</Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="filter-q"
              placeholder="e.g. React, Manager, M&A"
              value={filters.q || ""}
              onChange={(e) => update({ q: e.target.value })}
              className="pl-9 h-10 text-xs"
            />
          </div>
        </div>

        {/* Location Filter */}
        <div className="space-y-2">
          <Label htmlFor="filter-location">Location</Label>
          <Input
            id="filter-location"
            placeholder="e.g. Dubai, Abu Dhabi"
            value={filters.location || ""}
            onChange={(e) => update({ location: e.target.value })}
            className="h-10 text-xs"
          />
        </div>

        {/* Industry Filter */}
        <div className="space-y-2">
          <Label htmlFor="filter-industry">Industry</Label>
          <select
            id="filter-industry"
            value={filters.industry || "all"}
            onChange={(e) => update({ industry: e.target.value })}
            className="flex h-10 w-full rounded-xl border border-input bg-card px-3 py-2 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="all">All Industries</option>
            {industries.map((ind) => (
              <option key={ind.slug} value={ind.slug}>
                {ind.name}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div className="space-y-2">
          <Label htmlFor="filter-category">Category</Label>
          <select
            id="filter-category"
            value={filters.category || "all"}
            onChange={(e) => update({ category: e.target.value })}
            className="flex h-10 w-full rounded-xl border border-input bg-card px-3 py-2 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Employment Type */}
        <div className="space-y-2">
          <Label htmlFor="filter-type">Employment Type</Label>
          <select
            id="filter-type"
            value={filters.employment_type || "all"}
            onChange={(e) => update({ employment_type: e.target.value })}
            className="flex h-10 w-full rounded-xl border border-input bg-card px-3 py-2 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="all">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Temporary">Temporary</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        {/* Experience Level */}
        <div className="space-y-2">
          <Label htmlFor="filter-exp">Minimum Experience (Years)</Label>
          <select
            id="filter-exp"
            value={filters.experience || "all"}
            onChange={(e) => update({ experience: e.target.value })}
            className="flex h-10 w-full rounded-xl border border-input bg-card px-3 py-2 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="all">Any Experience</option>
            <option value="2">2+ Years</option>
            <option value="5">5+ Years</option>
            <option value="8">8+ Years</option>
            <option value="10">10+ Years</option>
          </select>
        </div>

        {/* Minimum Monthly Salary (AED) */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="filter-salary">Min Monthly Salary</Label>
            <span className="text-[11px] font-mono text-muted-foreground">
              {filters.salary_min ? `${filters.salary_min.toLocaleString()} AED` : "Any"}
            </span>
          </div>
          <input
            id="filter-salary"
            type="range"
            min={0}
            max={60000}
            step={5000}
            value={filters.salary_min || 0}
            onChange={(e) => update({ salary_min: Number(e.target.value) || undefined })}
            className="w-full accent-primary h-2 bg-muted rounded-lg cursor-pointer"
          />
        </div>

        <div className="pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="w-full text-xs font-semibold"
          >
            Clear All Filters
          </Button>
        </div>
      </div>
    </aside>
  );
}
