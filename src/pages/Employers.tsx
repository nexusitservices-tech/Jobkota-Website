import { Link } from "react-router-dom";
import { ArrowRight, UserCheck, ShieldCheck, CheckCircle2 } from "lucide-react";
import useSeo from "@/lib/useSeo";
import PageHero from "@/components/site/PageHero";
import ServicesGrid from "@/components/home/ServicesGrid";
import IndustriesGrid from "@/components/home/IndustriesGrid";
import CtaBand from "@/components/site/CtaBand";
import SectionHeading from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";

export default function Employers() {
  useSeo(
    "For Employers & HR Leaders",
    "Partner with JobKota for executive recruitment, volume manpower, HR outsourcing, and compliant payroll across UAE and GCC."
  );

  const employerSteps = [
    {
      num: "01",
      title: "Specify Headcount & Skills",
      desc: "Submit your role specifications, seniority benchmarks, and target timelines using our streamlined talent portal.",
    },
    {
      num: "02",
      title: "Receive Screened Shortlists",
      desc: "Our sector specialists conduct competency interviews and reference verifications before presenting high-fidelity candidates.",
    },
    {
      num: "03",
      title: "Interview & Onboard",
      desc: "We coordinate stakeholder interviews, offer negotiation, visa processing, and statutory compliance for a smooth start.",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHero
        breadcrumbs={[{ label: "For Employers" }]}
        eyebrow="Corporate Talent Acquisition"
        title="Recruit Qualified Professionals"
        accentWord="with certainty."
        description="Scalable workforce solutions tailored to regional compliance standards. Access pre-vetted executive talent and rapidly mobilizable manpower."
      >
        <div className="pt-2 flex flex-wrap items-center gap-4">
          <Link to="/employers/request-talent">
            <Button variant="signal" size="lg" className="font-bold">
              <span>Request Talent</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/contact">
            <Button
              variant="outline"
              size="lg"
              className="text-primary-foreground border-primary-foreground/30 hover:bg-white/10"
            >
              Talk to a Practice Lead
            </Button>
          </Link>
        </div>
      </PageHero>

      {/* 3-Step Process */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          centered
          eyebrow="Simple 3-Step Flow"
          title="How Organizations Hire Through JobKota"
          accentWord="seamlessly."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {employerSteps.map((step, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-border bg-card p-8 space-y-4 shadow-xs"
            >
              <span className="font-mono text-3xl font-black text-muted-foreground/30">
                {step.num}
              </span>
              <h3 className="text-xl font-bold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <ServicesGrid />

      {/* Industries Grid (Limit 4) */}
      <IndustriesGrid limit={4} />

      <CtaBand
        title="Ready to discuss your hiring plan?"
        accentWord="We're on standby."
        description="Get in touch with an executive talent partner or submit role requirements directly online."
        primaryLabel="Request Talent Now"
        primaryTo="/employers/request-talent"
      />
    </div>
  );
}
