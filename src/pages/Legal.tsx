import useSeo from "@/lib/useSeo";
import PageHero from "@/components/site/PageHero";
import { siteConfig } from "@/lib/content";

interface LegalProps {
  type: "privacy" | "terms" | "cookies";
}

export default function Legal({ type }: LegalProps) {
  const contentMap = {
    privacy: {
      title: "Privacy Policy",
      eyebrow: "Data Governance & Protection",
      updated: "September 2026",
      desc: "How JobKota collects, stores, processes, and protects personal and commercial data across UAE and international jurisdictions.",
      sections: [
        {
          heading: "1. Information We Collect",
          body: "When you use JobKota as a candidate, job applicant, or employer partner, we may collect personal identification data (including full name, contact information, work history, resume files, and nationality/visa status). For employers, we collect corporate verification documentation, corporate credit information, and job specification parameters.",
        },
        {
          heading: "2. How We Utilize Your Data",
          body: "Candidate information is used solely to facilitate lawful recruitment, interview scheduling, and employment eligibility verification under UAE MOHRE and local labor frameworks. We never sell personal information to third-party marketing brokers. Your credentials are only submitted to client organizations with your prior awareness and consent.",
        },
        {
          heading: "3. Data Security & Storage",
          body: "All personal identifiers and uploaded resume files are stored with enterprise-grade encryption in compliant regional data centres. Strict access controls limit file inspection to authorized recruitment partners.",
        },
        {
          heading: "4. Your Rights Under UAE Data Protection Laws",
          body: "You maintain the statutory right to request an extract of all personal data held by JobKota, request rectification of outdated credentials, or request complete erasure of your candidate record from our active sourcing database by emailing privacy@jobkota.com.",
        },
      ],
    },
    terms: {
      title: "Terms of Service",
      eyebrow: "Platform Legal Framework",
      updated: "September 2026",
      desc: "Terms governing the use of JobKota's recruitment platform, job board listings, and employer workforce agreements.",
      sections: [
        {
          heading: "1. Acceptance of Terms",
          body: "By accessing or utilizing the JobKota platform, candidate portal, or employer management suite, you agree to be legally bound by these terms, alongside all applicable UAE Federal decrees governing labor mediation and digital transactions.",
        },
        {
          heading: "2. Candidate Representations",
          body: "Job seekers warrant that all credentials, professional certifications, degrees, and employment histories supplied are truthful, authentic, and accurate. Submitting fraudulent documentation constitutes grounds for immediate profile termination and notice to client organizations.",
        },
        {
          heading: "3. Employer Obligations & Fair Hiring",
          body: "Organizations publishing vacancies or contracting manpower through JobKota must hold valid commercial licensure and strictly observe UAE non-discrimination laws, Wage Protection System (WPS) regulations, and statutory workplace health and safety protocols.",
        },
        {
          heading: "4. Intellectual Property & Brand Marks",
          body: "All trademarks, system architectures, algorithms, interface layouts, and proprietary sourcing methodologies are the exclusive intellectual property of JobKota Technologies FZ-LLC.",
        },
      ],
    },
    cookies: {
      title: "Cookie Policy",
      eyebrow: "Tracking & Analytics",
      updated: "September 2026",
      desc: "Information on how JobKota uses cookies and local storage tokens to optimize platform functionality.",
      sections: [
        {
          heading: "1. What Are Cookies?",
          body: "Cookies and local storage objects are small data records saved to your browser session that enable persistent login state, saved job bookmarks, and session security verification.",
        },
        {
          heading: "2. Essential Cookies",
          body: "These cookies are mandatory for platform navigation, authentication tokens, and CSRF protection. The platform cannot function without them.",
        },
        {
          heading: "3. Functional & Preference Storage",
          body: "We use browser local storage to preserve your bookmarked job vacancies ('jobkota:saved') and search filter preferences so your experience remains seamless across page visits.",
        },
        {
          heading: "4. Managing Preferences",
          body: "You may clear or block cookies through your individual browser settings at any time; however, doing so may log you out of active candidate or employer sessions.",
        },
      ],
    },
  };

  const current = contentMap[type] || contentMap.privacy;

  useSeo(current.title, current.desc);

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHero
        breadcrumbs={[{ label: "Legal" }, { label: current.title }]}
        eyebrow={current.eyebrow}
        title={current.title}
        accentWord="Governance"
        description={current.desc}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="rounded-3xl border border-border bg-card p-8 sm:p-12 shadow-xs space-y-10">
          <div className="flex items-center justify-between pb-6 border-b border-border text-xs text-muted-foreground">
            <span>Official Policy Document</span>
            <span>Last Updated: {current.updated}</span>
          </div>

          <div className="space-y-8">
            {current.sections.map((sec, idx) => (
              <section key={idx} className="space-y-3">
                <h3 className="text-xl font-bold text-foreground">
                  {sec.heading}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {sec.body}
                </p>
              </section>
            ))}
          </div>

          <div className="pt-8 border-t border-border text-xs text-muted-foreground">
            Questions regarding our legal policies? Contact {siteConfig.email} or {siteConfig.address}.
          </div>
        </div>
      </div>
    </div>
  );
}
