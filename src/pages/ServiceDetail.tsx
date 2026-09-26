import { useParams, Link } from "react-router-dom";
import {
  Users,
  HardHat,
  ClipboardList,
  Wallet,
  ShieldCheck,
  Code2,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import useSeo from "@/lib/useSeo";
import { getService, getIndustry } from "@/lib/content";
import PageHero from "@/components/site/PageHero";
import Faq from "@/components/site/Faq";
import CtaBand from "@/components/site/CtaBand";
import PageNotFound from "@/lib/PageNotFound";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, any> = {
  Users,
  HardHat,
  ClipboardList,
  Wallet,
  ShieldCheck,
  Code2,
};

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getService(slug) : undefined;

  useSeo(
    service ? `${service.title} Solutions` : "Service Detail",
    service ? service.hero : undefined
  );

  if (!service) {
    return <PageNotFound />;
  }

  const IconComponent = iconMap[service.icon] || Users;
  const relatedIndustries = service.industries
    .map((indSlug) => getIndustry(indSlug))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero */}
      <PageHero
        breadcrumbs={[
          { label: "Services", to: "/services" },
          { label: service.title },
        ]}
        eyebrow="Specialized Service Delivery"
        title={service.title}
        accentWord="Solutions"
        description={service.hero}
        backgroundImage={service.image}
      >
        <div className="pt-2 flex flex-wrap items-center gap-4">
          <Link to="/employers/request-talent">
            <Button variant="signal" size="lg" className="font-bold">
              <span>{service.cta}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/contact">
            <Button
              variant="outline"
              size="lg"
              className="text-primary-foreground border-primary-foreground/30 hover:bg-white/10"
            >
              Consult an Advisor
            </Button>
          </Link>
        </div>
      </PageHero>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-20">
        {/* Problem vs Solution Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-destructive/20 bg-destructive/5 p-8 sm:p-10 space-y-4">
            <div className="flex items-center gap-2 text-destructive font-bold text-sm uppercase tracking-wider">
              <AlertCircle className="h-4 w-4" />
              <span>The Industry Challenge</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground">
              Operational friction & resource drain
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {service.problem}
            </p>
          </div>

          <div className="rounded-3xl border border-signal/40 bg-signal/10 p-8 sm:p-10 space-y-4">
            <div className="flex items-center gap-2 text-foreground font-bold text-sm uppercase tracking-wider">
              <CheckCircle2 className="h-4 w-4 text-signal" />
              <span>The JobKota Solution</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground">
              Engineered for velocity and certainty
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {service.solution}
            </p>
          </div>
        </div>

        {/* Core Capabilities Bento */}
        <div className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
              Capabilities
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              What We Deliver
            </h3>
            <p className="text-sm text-muted-foreground">
              Comprehensive scope of practice for the {service.title} discipline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-3"
              >
                <span className="font-mono text-xs font-bold text-signal bg-signal/20 px-2.5 py-1 rounded-full border border-signal/30">
                  0{idx + 1}
                </span>
                <h4 className="text-base font-bold text-foreground pt-1">
                  {cap}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* Measured Benefits */}
        <div className="rounded-3xl bg-primary text-primary-foreground p-8 sm:p-12 relative overflow-hidden border border-primary-foreground/10">
          <div className="absolute inset-0 grain-grid pointer-events-none opacity-30" />
          <div className="relative z-10 max-w-3xl mb-8 space-y-2">
            <span className="text-xs uppercase tracking-widest text-signal font-bold">
              Commercial Advantages
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-primary-foreground">
              Measurable Outcomes for Your Enterprise
            </h3>
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3 backdrop-blur-xs"
              >
                <CheckCircle2 className="h-6 w-6 text-signal" />
                <p className="text-sm font-semibold text-primary-foreground leading-relaxed">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Industries */}
        {relatedIndustries.length > 0 && (
          <div className="space-y-6">
            <div className="max-w-xl space-y-1">
              <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
                Vertical Application
              </span>
              <h3 className="text-2xl font-bold text-foreground">
                Key Sectors Leveraging {service.title}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedIndustries.map((ind: any) => (
                <Link
                  key={ind.slug}
                  to={`/industries/${ind.slug}`}
                  className="group rounded-2xl border border-border bg-card p-5 shadow-xs hover:border-foreground/30 transition-all space-y-2"
                >
                  <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {ind.name}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {ind.short}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* FAQs */}
        {service.faqs && service.faqs.length > 0 && (
          <div className="space-y-6 max-w-3xl">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-signal" />
              <h3 className="text-2xl font-bold text-foreground">
                Frequently Asked Questions
              </h3>
            </div>
            <Faq items={service.faqs} />
          </div>
        )}
      </div>

      <div className="mt-20">
        <CtaBand
          title={`Deploy ${service.title} for Your Organization`}
          accentWord="starting today."
          description="Speak with our sector headhunters or request immediate talent deployment terms."
          primaryLabel="Request Talent Now"
          primaryTo="/employers/request-talent"
        />
      </div>
    </div>
  );
}
