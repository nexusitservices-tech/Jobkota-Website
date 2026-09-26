export const siteConfig = {
  name: "JobKota",
  tagline: "Talent. Opportunities. Growth.",
  promise: "Making recruitment simpler, faster, and more connected.",
  email: "hello@jobkota.com",
  phone: "+971 4 820 4000",
  address: "DIFC Gate Precinct 4, Level 5, Dubai, UAE",
  markets: "UAE · GCC · International",
};

export const defaultSteps = [
  {
    title: "Understand",
    text: "We learn your goals, timelines, culture and the exact skills you need.",
  },
  {
    title: "Plan",
    text: "We design a sourcing or service approach tailored to your requirement.",
  },
  {
    title: "Deliver",
    text: "Screened talent or managed services are delivered with clear communication.",
  },
  {
    title: "Support",
    text: "We stay close after placement to support onboarding and long-term success.",
  },
];

export interface ServiceItem {
  slug: string;
  icon: string;
  title: string;
  short: string;
  hero: string;
  problem: string;
  solution: string;
  capabilities: string[];
  benefits: string[];
  industries: string[];
  faqs: { q: string; a: string }[];
  cta: string;
}

export const services: ServiceItem[] = [
  {
    slug: "recruitment",
    icon: "Users",
    title: "Recruitment",
    short: "Permanent, contract, and executive search designed to secure qualified talent.",
    hero: "Recruit the right people with confidence.",
    problem:
      "Hiring mistakes drain leadership attention, inflate talent acquisition cycles, and disrupt commercial roadmaps. Traditional recruiting agencies rely on shallow keyword filters without assessing organizational readiness or authentic cultural competence.",
    solution:
      "JobKota deploys dedicated sector headhunters with exhaustive regional networks across the UAE and GCC. We evaluate domain pedigree, verified career milestones, and workplace dynamic compatibility before presenting curated shortlists.",
    capabilities: [
      "Executive & C-Suite Search",
      "Contingency Professional Placements",
      "Multi-Role Campaign Sourcing",
      "Competency & Behavioral Evaluations",
      "Salary Benchmarking & Market Intelligence",
      "Confidential Replacement Sourcing",
    ],
    benefits: [
      "Average time-to-shortlist reduced to 5 business days",
      "94% first-year candidate retention rate",
      "Pre-vetted regional and expatriate talent pools",
      "Replacement guarantees on all retained searches",
    ],
    industries: ["technology", "finance", "aviation", "healthcare", "real-estate"],
    faqs: [
      {
        q: "What is your typical recruitment timeline?",
        a: "For specialist and mid-management roles, we deliver verified shortlists within 4 to 6 business days. Executive mandates generally span 2 to 3 weeks.",
      },
      {
        q: "Do you offer placement warranties?",
        a: "Yes. All permanent placements include a comprehensive replacement guarantee period of up to 90 days.",
      },
    ],
    cta: "Hire Permanent Talent",
  },
  {
    slug: "manpower-supply",
    icon: "HardHat",
    title: "Manpower Supply",
    short: "Rapidly mobilizable, compliant temporary and volume workforce solutions.",
    hero: "Flexible workforce, ready when you are.",
    problem:
      "Surging project demands and seasonal peaks create operational bottlenecks when visa quotas, labor accommodations, and local labor clearances take months to negotiate.",
    solution:
      "We provide pre-screened, visa-sponsored, fully compliant labor forces for industrial, construction, hospitality, and logistics operations with complete mobilization oversight.",
    capabilities: [
      "Skilled, Semi-Skilled, and General Labor",
      "Project-Based On-Demand Mobilization",
      "Accommodation, Catering, and Transit Logistics",
      "MOHRE & Regional Labor Law Compliance",
      "Site Supervisors and Safety Marshals",
      "Workforce Replacement & Rotation Support",
    ],
    benefits: [
      "Instant scale-up and scale-down capabilities",
      "Zero administrative exposure to local labor compliance penalties",
      "On-time shifts with biometric attendance reporting",
      "Complete medical, insurance, and welfare management",
    ],
    industries: ["construction", "hospitality", "logistics", "food", "energy"],
    faqs: [
      {
        q: "Are supplied workers legally sponsored by JobKota?",
        a: "Yes, all personnel are deployed under strictly audited, MOHRE-compliant corporate visas with statutory insurance coverage.",
      },
      {
        q: "What notice is required for volume staffing?",
        a: "For teams of 10 to 50 workers, mobilization can be arranged within 48 to 72 hours from existing standby reserves.",
      },
    ],
    cta: "Request Manpower",
  },
  {
    slug: "hr-outsourcing",
    icon: "ClipboardList",
    title: "HR Outsourcing",
    short: "End-to-end human resource operations, employee relations, and policy compliance.",
    hero: "HR operations, handled.",
    problem:
      "Emerging enterprises and regional branch offices spend excessive overhead managing repetitive HR admin, visa processing, onboarding paperwork, and statutory filings rather than driving core revenue.",
    solution:
      "JobKota acts as your dedicated fractional or full-scale people operations department, delivering seamless employee lifecycle management from offer letters to end-of-service settlements.",
    capabilities: [
      "Employee Onboarding & Exit Protocols",
      "Visa, Labor Card, and Residency Administration",
      "Company Policy & Employee Handbook Formulation",
      "Performance Management Systems",
      "Statutory MOHRE / Labor Dispute Resolution",
      "Digital HRIS Records Management",
    ],
    benefits: [
      "Lower operational overhead compared to in-house HR departments",
      "100% statutory compliance with latest UAE Labor Decrees",
      "Dedicated HR account manager assigned to your organization",
      "Smooth employee support with automated helpdesk response",
    ],
    industries: ["technology", "finance", "retail", "professional-services"],
    faqs: [
      {
        q: "Can you manage our existing employees?",
        a: "Yes. We can seamlessly transition your existing team into our managed HR operational workflows without operational disruption.",
      },
    ],
    cta: "Outsource HR Operations",
  },
  {
    slug: "payroll",
    icon: "Wallet",
    title: "Payroll Services",
    short: "Accurate, automated Wages Protection System (WPS) payroll and benefits disbursement.",
    hero: "Payroll that runs on time, every time.",
    problem:
      "Navigating UAE Wages Protection System (WPS) compliances, bank SIF files, gratuity calculations, overtime tracking, and deductions risks severe fines and banking holds.",
    solution:
      "JobKota manages enterprise-grade payroll processing with automated calculation engines, compliant WPS routing, detailed pay slips, and comprehensive audit trails.",
    capabilities: [
      "End-to-End Monthly Payroll Calculation",
      "WPS SIF File Generation and Bank Dispatch",
      "Overtime, Bonus, and Deduction Processing",
      "UAE End of Service Gratuity (EOSG) Calculation",
      "Itemized Digital Payslips for Employees",
      "Statutory Audit Reports and General Ledger Feeds",
    ],
    benefits: [
      "Zero WPS fines and automated bank clearance",
      "Guaranteed on-time monthly salary disbursement",
      "Transparent employee inquiry support",
      "Confidential executive payroll separation",
    ],
    industries: ["technology", "finance", "hospitality", "construction", "retail"],
    faqs: [
      {
        q: "How do you guarantee WPS compliance?",
        a: "Our banking integrations validate SIF files against central bank parameters prior to cut-off dates, ensuring timely salary clearing without labor holds.",
      },
    ],
    cta: "Streamline Payroll",
  },
  {
    slug: "peo",
    icon: "ShieldCheck",
    title: "Employer Services",
    short: "Employer of Record (EOR / PEO) solutions to hire talent legally without establishing local entities.",
    hero: "Employ talent without the administrative weight.",
    problem:
      "International firms looking to test UAE or GCC markets face costly, multi-month corporate registration, commercial licensing, physical office leases, and banking hurdles before hiring their first employee.",
    solution:
      "Through JobKota's Employer of Record (EOR) infrastructure, your international enterprise can legally hire, sponsor, and manage employees in the region in as little as 48 hours without a local corporate entity.",
    capabilities: [
      "Legal Employment Sponsorship on JobKota Licensures",
      "Fast-Track Residence Visa & Emirates ID Processing",
      "Compliant Local Employment Contracts",
      "Medical Insurance and Comprehensive Benefits Enrollment",
      "Monthly Salary and Tax/Statutory Administration",
      "Offboarding and Liquidation Oversight",
    ],
    benefits: [
      "Launch regional operations in days instead of months",
      "Zero initial capital commitment for entity formation",
      "Complete protection against cross-border employment liabilities",
      "Single consolidated monthly billing invoice",
    ],
    industries: ["technology", "finance", "aviation", "energy", "professional-services"],
    faqs: [
      {
        q: "Who directs the employee's day-to-day work in an EOR arrangement?",
        a: "Your organization maintains 100% operational command over day-to-day responsibilities, tasks, and deliverables. JobKota handles the legal employer compliance and administration.",
      },
    ],
    cta: "Hire via Employer Services",
  },
  {
    slug: "it-staffing",
    icon: "Code2",
    title: "IT Staffing",
    short: "Specialized software engineers, cloud architects, and data practitioners on contract or full-time.",
    hero: "Technology talent for what you're building next.",
    problem:
      "Digital transformation, modern product builds, and enterprise cloud migrations stall when engineering teams cannot source senior developers who pass rigorous technical bars.",
    solution:
      "We pair engineering leaders with vetted software engineers, cybersecurity specialists, DevOps architects, and product leads across modern enterprise stacks.",
    capabilities: [
      "Full-Stack Web & Mobile Software Engineers",
      "Cloud Infrastructure & DevOps Specialists (AWS, GCP, Azure)",
      "Data Engineers, AI/ML Engineers & Analytics Leads",
      "Cybersecurity, Governance, and Pen-Testing Experts",
      "Agile Project Managers, Scrum Masters, and Product Owners",
      "Dedicated Squad Augmentation & Nearshore Pods",
    ],
    benefits: [
      "Rigorous hands-on coding and systems design assessments",
      "Deployment in less than 7 calendar days",
      "Flexible contract-to-hire or permanent engagement models",
      "High overlap with UAE & GCC business timezones",
    ],
    industries: ["technology", "finance", "retail", "logistics", "healthcare"],
    faqs: [
      {
        q: "Do you assess technical skills before submission?",
        a: "Yes. Every engineering candidate undergoes live technical code review and system architecture validation by senior technical interviewers.",
      },
    ],
    cta: "Source IT Engineers",
  },
];

export interface IndustryItem {
  slug: string;
  name: string;
  image: string;
  short: string;
  challenges: string[];
  roles: string[];
  services: string[];
}

export const industries: IndustryItem[] = [
  {
    slug: "technology",
    name: "Technology & IT",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    short: "Fueling digital scale with elite software engineers, cloud architects, and product innovators.",
    challenges: [
      "Intense global competition for senior backend and AI talent",
      "Rapid technological shifts requiring niche modern frameworks",
      "Balancing regional on-site collaboration with distributed technical squads",
    ],
    roles: [
      "Staff Software Engineers (Go, Node, Python, Rust)",
      "Cloud Platform & DevOps Leads",
      "AI/Machine Learning Engineers",
      "Chief Technology Officers (CTO)",
    ],
    services: ["it-staffing", "recruitment", "peo"],
  },
  {
    slug: "finance",
    name: "Finance & Banking",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    short: "Rigorous talent acquisition for investment funds, fintech pioneers, and tier-one banking institutions.",
    challenges: [
      "Stringent regulatory governance and compliance standards (DFSA, ADGM)",
      "Shortage of quantitative analysts and risk management experts",
      "Complex cross-border wealth management capabilities",
    ],
    roles: [
      "Investment Bankers & M&A Directors",
      "Fintech Product Architects",
      "Chief Risk & Compliance Officers",
      "Financial Controllers and Auditors",
    ],
    services: ["recruitment", "payroll", "peo"],
  },
  {
    slug: "aviation",
    name: "Aviation",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
    short: "Sourcing certified aerospace engineers, flight operations coordinators, and ground crews.",
    challenges: [
      "Rigid international GCAA/FAA safety certifications and background checks",
      "24/7 round-the-clock ground dispatch operational intensity",
      "Specialized maintenance (MRO) engineering requirements",
    ],
    roles: [
      "Licensed Aircraft Maintenance Engineers (B1/B2)",
      "Flight Dispatchers & Operations Supervisors",
      "Ground Handling & Ramp Service Coordinators",
      "Aviation Safety Officers",
    ],
    services: ["recruitment", "manpower-supply", "hr-outsourcing"],
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    short: "Supplying luxury guest service professionals, culinary masters, and hotel operations leaders.",
    challenges: [
      "Seasonal occupancy swings demanding immediate workforce elasticity",
      "High baseline standards for five-star multilingual guest etiquette",
      "Front-of-house and back-of-house retention pressure",
    ],
    roles: [
      "Executive Chefs and Culinary Brigades",
      "Front Office & Concierge Managers",
      "Banquet & Event Operations Personnel",
      "Spa, Wellness, and Butler Specialists",
    ],
    services: ["manpower-supply", "recruitment", "payroll"],
  },
  {
    slug: "food",
    name: "Food & Beverage",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    short: "High-volume culinary brigades, restaurant floor managers, and multi-unit franchise operators.",
    challenges: [
      "Food hygiene and HACCP compliance certifications",
      "Rapid staff turnover during peak dining windows",
      "Speed-to-deploy for new venue and dark kitchen rollouts",
    ],
    roles: [
      "Restaurant General Managers",
      "Head Baristas and Mixologists",
      "Line Cooks and Prep Staff",
      "Central Production Kitchen Supervisors",
    ],
    services: ["manpower-supply", "recruitment", "payroll"],
  },
  {
    slug: "retail",
    name: "Retail & Luxury",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    short: "Empowering flagship boutiques, retail chains, and luxury department stores with client advisors.",
    challenges: [
      "Delivering high conversion through bespoke luxury clienteling",
      "Seasonal festive surges and mall festival staffing spikes",
      "Inventory shrink control and visual merchandising standards",
    ],
    roles: [
      "Luxury Brand Store Directors",
      "Bilingual Client Advisors (Arabic/Mandarin/Russian)",
      "Visual Merchandisers",
      "Inventory & Stockroom Coordinators",
    ],
    services: ["recruitment", "manpower-supply", "hr-outsourcing"],
  },
  {
    slug: "logistics",
    name: "Logistics & Supply Chain",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    short: "Orchestrating warehouse operations, freight forwarding specialists, and last-mile dispatchers.",
    challenges: [
      "Port and freezone regulatory customs clearance expertise",
      "Peak e-commerce demand swings needing on-call warehouse labor",
      "Cold-chain and pharmaceutical storage precision",
    ],
    roles: [
      "Supply Chain & Logistics Directors",
      "Freight Forwarding Specialists",
      "Certified Forklift & Material Handlers",
      "Warehouse Inventory Supervisors",
    ],
    services: ["manpower-supply", "recruitment", "payroll"],
  },
  {
    slug: "construction",
    name: "Construction & Infrastructure",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80",
    short: "Supplying civil engineers, MEP supervisors, and reliable site manpower for landmark builds.",
    challenges: [
      "Strict project completion timelines tied to milestone penalties",
      "Comprehensive site safety (HSE) and heat stress protocols",
      "Massive workforce mobilization coordination across camps",
    ],
    roles: [
      "Senior Project Managers & Civil Engineers",
      "MEP (Mechanical, Electrical, Plumbing) Supervisors",
      "HSE & Site Safety Officers",
      "Skilled Trades & Construction Crews",
    ],
    services: ["manpower-supply", "recruitment", "payroll"],
  },
  {
    slug: "healthcare",
    name: "Healthcare & Life Sciences",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    short: "DHA, DOH, and MOH licensed physicians, nurses, allied health, and clinical administrators.",
    challenges: [
      "Rigid credentialing and Dataflow primary source verification",
      "Global nurse and specialist physician scarcity",
      "Specialty hospital expansion timelines across UAE",
    ],
    roles: [
      "Consultant & Specialist Physicians",
      "Licensed Critical Care & Ward Nurses",
      "Clinical Laboratory Technologists",
      "Hospital Operations Directors",
    ],
    services: ["recruitment", "peo", "hr-outsourcing"],
  },
  {
    slug: "real-estate",
    name: "Real Estate & Development",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    short: "High-performing property consultants, asset managers, and facilities directors.",
    challenges: [
      "High competition in luxury property brokerage markets",
      "RERA certification and legal leasing compliance",
      "Master-planned community asset maintenance requirements",
    ],
    roles: [
      "Off-Plan & Secondary Property Consultants",
      "Commercial Real Estate Brokers",
      "Asset & Portfolio Directors",
      "Facilities Management Leaders",
    ],
    services: ["recruitment", "payroll", "peo"],
  },
  {
    slug: "energy",
    name: "Energy & Utilities",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80",
    short: "Powering traditional energy, renewables, solar farms, and regional power utilities.",
    challenges: [
      "Transition toward renewable solar and hydrogen technologies",
      "Hazardous plant environments requiring strict safety records",
      "Offshore technical rig qualifications",
    ],
    roles: [
      "Renewable Energy Project Engineers",
      "Offshore Drilling Supervisors",
      "Substation & High-Voltage Technicians",
      "Environmental Compliance Officers",
    ],
    services: ["recruitment", "manpower-supply", "peo"],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
    short: "Management consultants, corporate attorneys, and tax advisory professionals.",
    challenges: [
      "UAE Corporate Tax implementation demands",
      "Bespoke advisory mandates requiring niche industry pedigrees",
      "High partner-track expectations and client retention",
    ],
    roles: [
      "Corporate Tax Advisors",
      "Bilingual Legal Counsel",
      "Strategy & Operations Consultants",
      "Audit & Advisory Managers",
    ],
    services: ["recruitment", "hr-outsourcing", "peo"],
  },
];

export const categories: string[] = [
  "Technology",
  "Finance",
  "Hospitality",
  "Construction",
  "Logistics",
  "Retail",
  "Healthcare",
  "Aviation",
  "Real Estate",
  "Energy",
];

export function getService(slug: string): ServiceItem | undefined {
  return services.find((s) => s.slug === slug);
}

export function getIndustry(slug: string): IndustryItem | undefined {
  return industries.find((i) => i.slug === slug);
}

export function img(id: string): string {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;
}
