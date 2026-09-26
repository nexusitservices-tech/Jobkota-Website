import useSeo from "@/lib/useSeo";
import PageHero from "@/components/site/PageHero";
import ServicesGrid from "@/components/home/ServicesGrid";
import HowItWorks from "@/components/home/HowItWorks";
import CtaBand from "@/components/site/CtaBand";

export default function Services() {
  useSeo(
    "Workforce & Recruitment Services",
    "Comprehensive B2B workforce solutions across the UAE & GCC: permanent executive recruitment, manpower supply, HR outsourcing, WPS payroll, EOR employer services, and IT staffing."
  );

  return (
    <div className="flex flex-col">
      <PageHero
        breadcrumbs={[{ label: "Services" }]}
        eyebrow="Specialized B2B Solutions"
        title="Comprehensive Workforce Infrastructure"
        accentWord="for growth."
        description="From single executive placements to high-volume mobilizations and legal employer of record services. Built for regional compliance and commercial velocity."
      />
      <ServicesGrid />
      <HowItWorks />
      <CtaBand
        title="Need a tailored workforce strategy?"
        accentWord="Let's build it."
        description="Our practice leaders design custom service level agreements for enterprise and high-growth clients."
        primaryLabel="Request Workforce"
        primaryTo="/employers/request-talent"
      />
    </div>
  );
}
