import useSeo from "@/lib/useSeo";
import PageHero from "@/components/site/PageHero";
import IndustriesGrid from "@/components/home/IndustriesGrid";
import CtaBand from "@/components/site/CtaBand";

export default function Industries() {
  useSeo(
    "Industries & Sectors",
    "Explore specialized recruitment and workforce solutions across Technology, Finance, Aviation, Hospitality, Construction, Healthcare, Logistics, and Real Estate in UAE and GCC."
  );

  return (
    <div className="flex flex-col">
      <PageHero
        breadcrumbs={[{ label: "Industries" }]}
        eyebrow="Specialized Sector Practice"
        title="Industry-Specific Talent Strategy"
        accentWord="for regional scale."
        description="Our practice groups understand the compliance standards, regulatory credentials, and commercial milestones driving key Gulf business verticals."
      />
      <IndustriesGrid limit={12} />
      <CtaBand
        title="Operating in a specialized regional sector?"
        accentWord="We know your market."
        description="Connect with our vertical practice directors for candidate market maps and compensation benchmarks."
        primaryLabel="Talk to Sector Lead"
        primaryTo="/contact"
      />
    </div>
  );
}
