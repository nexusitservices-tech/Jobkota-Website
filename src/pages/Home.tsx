import useSeo from "@/lib/useSeo";
import Hero from "@/components/home/Hero";
import SplitPaths from "@/components/home/SplitPaths";
import TrustBar from "@/components/home/TrustBar";
import ServicesGrid from "@/components/home/ServicesGrid";
import WhySection from "@/components/home/WhySection";
import IndustriesGrid from "@/components/home/IndustriesGrid";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import HowItWorks from "@/components/home/HowItWorks";
import CtaBand from "@/components/site/CtaBand";
import { siteConfig } from "@/lib/content";

export default function Home() {
  useSeo(
    "Recruitment & Workforce Solutions",
    "JobKota connects forward-thinking businesses with qualified professionals across the UAE, GCC, and International markets. Permanent recruitment, manpower supply, and IT staffing.",
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      description: siteConfig.promise,
      url: window.location.origin,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address,
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
      telephone: siteConfig.phone,
      email: siteConfig.email,
    }
  );

  return (
    <div className="flex flex-col">
      <Hero />
      <SplitPaths />
      <TrustBar />
      <ServicesGrid />
      <WhySection />
      <IndustriesGrid limit={8} />
      <FeaturedJobs />
      <HowItWorks />
      <CtaBand />
    </div>
  );
}
