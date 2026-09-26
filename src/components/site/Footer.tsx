import { Link } from "react-router-dom";
import Logo from "./Logo";
import { siteConfig, services } from "@/lib/content";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-12 border-t border-primary-foreground/10 relative overflow-hidden">
      <div className="absolute inset-0 grain-grid pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo light={true} />
            <p className="font-display italic text-lg text-signal">
              "{siteConfig.tagline}"
            </p>
            <p className="text-sm text-primary-foreground/70 max-w-sm leading-relaxed">
              {siteConfig.promise}
            </p>

            <div className="pt-2 space-y-2 text-xs text-primary-foreground/60">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-signal shrink-0" />
                <span>{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-signal shrink-0" />
                <span>{siteConfig.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-signal shrink-0" />
                <span>{siteConfig.email}</span>
              </div>
            </div>

            <div className="inline-block text-xs uppercase tracking-widest text-signal font-semibold pt-1">
              Markets: {siteConfig.markets}
            </div>
          </div>

          {/* Column 1: Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/40">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link to="/about" className="hover:text-signal transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/why-jobkota" className="hover:text-signal transition-colors">
                  Why JobKota
                </Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-signal transition-colors">
                  Industries
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-signal transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/40">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              {services.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="hover:text-signal transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: For Candidates */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/40">
              Candidates
            </h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link to="/jobs" className="hover:text-signal transition-colors">
                  Browse All Jobs
                </Link>
              </li>
              <li>
                <Link to="/candidates" className="hover:text-signal transition-colors">
                  Candidate Hub
                </Link>
              </li>
              <li>
                <Link to="/jobs?category=Technology" className="hover:text-signal transition-colors">
                  Tech Roles
                </Link>
              </li>
              <li>
                <Link to="/jobs?category=Finance" className="hover:text-signal transition-colors">
                  Banking & Finance
                </Link>
              </li>
              <li>
                <Link to="/jobs?category=Hospitality" className="hover:text-signal transition-colors">
                  Hospitality Roles
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: For Employers */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/40">
              Employers
            </h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link to="/employers" className="hover:text-signal transition-colors">
                  Employer Overview
                </Link>
              </li>
              <li>
                <Link
                  to="/employers/request-talent"
                  className="hover:text-signal transition-colors font-medium text-signal"
                >
                  Request Talent
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-signal transition-colors">
                  Employer Dashboard
                </Link>
              </li>
              <li>
                <Link to="/dashboard/post" className="hover:text-signal transition-colors">
                  Post a Job
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between text-xs text-primary-foreground/50 gap-4">
          <p>© {new Date().getFullYear()} JobKota Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-signal transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-signal transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-signal transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
