import { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Search, UserCheck, LayoutDashboard, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { useAuth } from "@/lib/AuthContext";

const links = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/industries", label: "Industries" },
  { to: "/jobs", label: "Jobs" },
  { to: "/employers", label: "For Employers" },
  { to: "/candidates", label: "For Candidates" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Certain pages like home, job detail, request talent, and employer pages start with a dark hero
  const hasDarkHero =
    location.pathname === "/" ||
    location.pathname === "/jobs" ||
    location.pathname.startsWith("/jobs/") ||
    location.pathname === "/employers" ||
    location.pathname === "/employers/request-talent" ||
    location.pathname === "/candidates" ||
    location.pathname === "/about" ||
    location.pathname.startsWith("/services") ||
    location.pathname.startsWith("/industries");

  const isLightText = hasDarkHero && !scrolled;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border py-3 shadow-xs"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Logo */}
        <div className="flex items-center gap-6">
          <Logo light={isLightText} />
        </div>

        {/* Zone 2: Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium tracking-wide transition-colors hover:text-signal whitespace-nowrap",
                  isLightText
                    ? isActive
                      ? "text-signal font-semibold"
                      : "text-primary-foreground/80 hover:text-primary-foreground"
                    : isActive
                    ? "text-primary font-semibold border-b-2 border-primary pb-0.5"
                    : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/jobs"
            className={cn(
              "p-2 rounded-full transition-colors lg:hidden",
              isLightText
                ? "text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
            aria-label="Search Jobs"
          >
            <Search className="h-5 w-5" />
          </Link>

          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                to="/dashboard"
                className={cn(
                  "inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full border transition-colors",
                  isLightText
                    ? "border-primary-foreground/30 text-primary-foreground hover:bg-white/10"
                    : "border-border text-foreground hover:bg-muted"
                )}
              >
                <LayoutDashboard className="h-3.5 w-3.5" />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={() => logout("/")}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  isLightText
                    ? "text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
                title="Log out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className={cn(
                "hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full transition-colors",
                isLightText
                  ? "text-primary-foreground/80 hover:text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <UserCheck className="h-3.5 w-3.5" />
              <span>Log in</span>
            </Link>
          )}

          <Link
            to="/employers/request-talent"
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-signal px-5 py-2.5 text-xs sm:text-sm font-bold text-primary shadow-sm hover:brightness-105 active:scale-[0.98] transition-all whitespace-nowrap"
          >
            Hire Talent
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn(
              "lg:hidden p-2 rounded-xl transition-colors cursor-pointer",
              isLightText
                ? "text-primary-foreground hover:bg-white/10"
                : "text-foreground hover:bg-muted"
            )}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-card border-b border-border shadow-2xl px-6 py-8 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "text-xl font-bold transition-colors py-1",
                    isActive ? "text-primary underline" : "text-muted-foreground hover:text-foreground"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div className="pt-4 border-t border-border flex flex-col gap-3">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="flex items-center justify-center gap-2 rounded-xl border border-border py-3 text-sm font-semibold text-foreground hover:bg-muted"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Employer Dashboard</span>
                  </Link>
                  <button
                    onClick={() => logout("/")}
                    className="flex items-center justify-center gap-2 rounded-xl bg-muted py-2.5 text-sm font-semibold text-muted-foreground hover:text-foreground"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log Out</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 rounded-xl border border-border py-3 text-sm font-semibold text-foreground hover:bg-muted"
                >
                  <UserCheck className="h-4 w-4" />
                  <span>Log in</span>
                </Link>
              )}

              <Link
                to="/employers/request-talent"
                className="flex items-center justify-center rounded-full bg-signal py-3.5 text-base font-bold text-primary shadow-sm"
              >
                Hire Talent
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
