import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSearchProps {
  initialQ?: string;
  initialLocation?: string;
  className?: string;
}

export default function HeroSearch({
  initialQ = "",
  initialLocation = "",
  className,
}: HeroSearchProps) {
  const [q, setQ] = useState(initialQ);
  const [location, setLocation] = useState(initialLocation);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (location.trim()) params.set("location", location.trim());
    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`w-full rounded-2xl sm:rounded-full bg-card/95 backdrop-blur-md p-2 shadow-2xl border border-white/20 flex flex-col sm:flex-row items-center gap-2 ${
        className || ""
      }`}
    >
      {/* Keyword input */}
      <div className="flex-1 w-full flex items-center gap-3 px-4 py-2">
        <Search className="h-4 w-4 text-muted-foreground shrink-0" />
        <input
          type="text"
          placeholder="Job title, skills, or company..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none font-medium"
        />
      </div>

      <div className="hidden sm:block h-6 w-[1px] bg-border" />

      {/* Location input */}
      <div className="w-full sm:w-56 flex items-center gap-3 px-4 py-2">
        <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
        <input
          type="text"
          placeholder="Dubai, Abu Dhabi, GCC..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none font-medium"
        />
      </div>

      {/* Search button */}
      <Button
        type="submit"
        variant="signal"
        size="default"
        className="w-full sm:w-auto px-6 font-bold shrink-0 cursor-pointer"
      >
        <span>Search Jobs</span>
        <ArrowRight className="h-4 w-4" />
      </Button>
    </form>
  );
}
