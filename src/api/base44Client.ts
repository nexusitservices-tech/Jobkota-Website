export interface JobEntity {
  id: string;
  created_date: string;
  updated_date: string;
  created_by_id: string;
  title: string;
  slug: string;
  company: string;
  location: string;
  employment_type: 'Full-time' | 'Part-time' | 'Contract' | 'Temporary' | 'Internship';
  industry: string;
  category: string;
  department?: string;
  experience_min?: number;
  experience_max?: number;
  salary_min?: number;
  salary_max?: number;
  currency?: string;
  education?: string;
  description?: string;
  responsibilities?: string[];
  requirements?: string[];
  skills?: string[];
  benefits?: string[];
  about_company?: string;
  vacancies?: number;
  deadline?: string;
  featured?: boolean;
  status: 'Draft' | 'Pending Review' | 'Published' | 'Paused' | 'Closed';
}

export interface ApplicationEntity {
  id: string;
  created_date: string;
  updated_date: string;
  created_by_id?: string;
  job_id: string;
  job_title: string;
  company: string;
  full_name: string;
  email: string;
  phone?: string;
  location?: string;
  cv_file_uri?: string;
  cv_file_name?: string;
  cover_letter?: string;
  consent?: boolean;
  status: 'Applied' | 'Under Review' | 'Shortlisted' | 'Interview' | 'Selected' | 'Rejected' | 'Withdrawn';
  notes?: string;
  rating?: number;
  interview_date?: string;
  linkedin_url?: string;
  source?: string;
}

export interface LeadEntity {
  id: string;
  created_date: string;
  updated_date: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  source?: string;
  topic?: string;
  message?: string;
  status: 'New Lead' | 'Contacted' | 'Qualified' | 'Proposal' | 'Active Client' | 'Closed';
  notes?: string;
}

export interface WorkforceRequestEntity {
  id: string;
  created_date: string;
  updated_date: string;
  company: string;
  contact_name: string;
  email: string;
  phone?: string;
  industry?: string;
  service?: string;
  position: string;
  employees_needed?: number;
  employment_type?: string;
  location?: string;
  experience?: string;
  skills?: string;
  start_date?: string;
  budget?: string;
  requirements?: string;
  status: 'New' | 'In Review' | 'Active' | 'Fulfilled' | 'Closed';
  notes?: string;
}

export interface UserEntity {
  id: string;
  created_date: string;
  full_name: string;
  email: string;
  role: 'admin' | 'user';
  is_verified_session?: boolean;
}

const DEFAULT_USER: UserEntity = {
  id: 'usr_admin_01',
  created_date: new Date(Date.now() - 90 * 86400000).toISOString(),
  full_name: 'Nexus Talent Director',
  email: 'nexus.itservices06@gmail.com',
  role: 'admin',
  is_verified_session: true,
};

const SEED_JOBS: JobEntity[] = [
  {
    id: 'job_01',
    created_date: new Date(Date.now() - 2 * 86400000).toISOString(),
    updated_date: new Date(Date.now() - 2 * 86400000).toISOString(),
    created_by_id: 'usr_admin_01',
    title: 'Senior React & Cloud Platform Engineer',
    slug: 'senior-react-cloud-platform-engineer',
    company: 'FinApex Technologies',
    location: 'Dubai Internet City, UAE',
    employment_type: 'Full-time',
    industry: 'technology',
    category: 'Technology',
    department: 'Engineering',
    experience_min: 5,
    experience_max: 9,
    salary_min: 22000,
    salary_max: 30000,
    currency: 'AED',
    education: "Bachelor's in Computer Science or related degree",
    description: 'We are seeking a seasoned Senior React & Cloud Platform Engineer to architect high-throughput frontend web applications and event-driven microservices for our regional fintech ecosystem.',
    responsibilities: [
      'Lead front-end architecture and state management across critical trading and payment workflows',
      'Collaborate with product designers and cloud DevOps teams on rapid deployment pipelines',
      'Conduct rigorous code reviews and mentor intermediate software engineers',
      'Optimize web performance, Core Web Vitals, and responsive touch interfaces',
    ],
    requirements: [
      '5+ years of production experience in React, TypeScript, and modern state architectures',
      'Strong knowledge of cloud platforms (AWS, GCP) and containerized workflows (Docker/K8s)',
      'Demonstrated expertise in REST/GraphQL API integration and browser performance profiling',
      'Excellent verbal and written English communication skills',
    ],
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'AWS', 'Next.js', 'System Architecture'],
    benefits: [
      'Comprehensive private health & dental insurance for employee and dependents',
      'Annual flight ticket allowance to home country',
      'Flexible hybrid working arrangements (2 days remote per week)',
      'Annual performance bonus and education stipend',
    ],
    about_company: 'FinApex is an institutional fintech platform powering cross-border payments and algorithmic wealth management for top GCC financial houses.',
    vacancies: 2,
    deadline: '2026-11-30',
    featured: true,
    status: 'Published',
  },
  {
    id: 'job_02',
    created_date: new Date(Date.now() - 4 * 86400000).toISOString(),
    updated_date: new Date(Date.now() - 4 * 86400000).toISOString(),
    created_by_id: 'usr_admin_01',
    title: 'Investment Banking Associate — M&A',
    slug: 'investment-banking-associate-ma',
    company: 'Al Khaleej Capital Partners',
    location: 'DIFC, Dubai, UAE',
    employment_type: 'Full-time',
    industry: 'finance',
    category: 'Finance',
    department: 'Advisory & Capital Markets',
    experience_min: 4,
    experience_max: 7,
    salary_min: 28000,
    salary_max: 38000,
    currency: 'AED',
    education: 'MBA, CFA, or Bachelor’s in Finance/Economics',
    description: 'Premier regional investment banking house looking for an experienced M&A Associate to execute cross-border sell-side and buy-side mandates across the GCC and Levant.',
    responsibilities: [
      'Build robust 3-statement financial models, LBO calculations, and valuation matrices (DCF, Trading Multiples)',
      'Prepare institutional CIMs (Confidential Information Memorandums) and executive pitch decks',
      'Coordinate diligence processes with external legal counsels, auditors, and management teams',
    ],
    requirements: [
      '4+ years within Tier-1 bulge bracket or boutique investment bank or Big 4 transaction advisory',
      'Superior financial modeling acumen in Excel',
      'Bilingual proficiency (Arabic & English) is an advantage',
    ],
    skills: ['M&A Valuation', 'Financial Modeling', 'Due Diligence', 'LBO Analysis', 'Pitch Decks'],
    benefits: [
      'Top-quartile discretionary annual deal bonus',
      'Comprehensive tier-1 DIFC executive medical insurance',
      'Fast-track Vice President promotion pathway',
    ],
    about_company: 'Al Khaleej Capital Partners is a DFSA-regulated advisory firm managing $3B+ in landmark regional M&A transactions.',
    vacancies: 1,
    deadline: '2026-12-15',
    featured: true,
    status: 'Published',
  },
  {
    id: 'job_03',
    created_date: new Date(Date.now() - 6 * 86400000).toISOString(),
    updated_date: new Date(Date.now() - 6 * 86400000).toISOString(),
    created_by_id: 'usr_admin_01',
    title: 'Director of Food & Beverage',
    slug: 'director-of-food-and-beverage',
    company: 'Mirage Luxury Resorts & Spas',
    location: 'Palm Jumeirah, Dubai, UAE',
    employment_type: 'Full-time',
    industry: 'hospitality',
    category: 'Hospitality',
    department: 'Hospitality Operations',
    experience_min: 8,
    experience_max: 14,
    salary_min: 30000,
    salary_max: 42000,
    currency: 'AED',
    education: 'Degree in Hospitality Management or equivalent experience',
    description: 'We are seeking a visionary Director of F&B to oversee 8 signature Michelin-caliber restaurant concepts, high-profile beach lounges, and extensive banqueting facilities.',
    responsibilities: [
      'Lead total F&B financial performance, cost of sales, and culinary innovation strategies',
      'Manage over 220 front and back-of-house staff across multiple dining venues',
      'Enforce five-star luxury standards, guest feedback protocols, and HACCP compliance',
    ],
    requirements: [
      'Demonstrated track record heading F&B divisions in luxury 5-star properties or resort chains',
      'Deep expertise in P&L accountability, menu engineering, and wine/beverage programs',
      'Charismatic guest relations and proven staff retention leadership',
    ],
    skills: ['F&B Strategy', 'Luxury Hospitality', 'P&L Management', 'Culinary Operations', 'Team Leadership'],
    benefits: [
      'Executive housing allowance / executive accommodation',
      'Family health insurance and annual flight tickets',
      'Performance-linked annual bonus',
    ],
    about_company: 'Mirage Luxury Resorts operates prestigious ultra-luxury waterfront properties celebrated globally for culinary distinction.',
    vacancies: 1,
    deadline: '2026-11-20',
    featured: true,
    status: 'Published',
  },
  {
    id: 'job_04',
    created_date: new Date(Date.now() - 8 * 86400000).toISOString(),
    updated_date: new Date(Date.now() - 8 * 86400000).toISOString(),
    created_by_id: 'usr_admin_01',
    title: 'Senior Civil Project Engineer — Infrastructure',
    slug: 'senior-civil-project-engineer-infrastructure',
    company: 'Emirates Contracting Consortium',
    location: 'Abu Dhabi, UAE',
    employment_type: 'Full-time',
    industry: 'construction',
    category: 'Construction',
    department: 'Site Operations',
    experience_min: 6,
    experience_max: 10,
    salary_min: 20000,
    salary_max: 27000,
    currency: 'AED',
    education: 'B.Sc. in Civil Engineering (UPDA / Municipality certified)',
    description: 'Seeking a high-caliber Civil Project Engineer to direct major highway, bridge, and utilities infrastructure execution in Abu Dhabi.',
    responsibilities: [
      'Supervise on-site sub-contractors, site engineers, and material testing protocols',
      'Ensure strict conformance to municipal building codes, FIDIC standards, and project timelines',
      'Coordinate site safety inspections, HSE compliance, and progress documentation',
    ],
    requirements: [
      'B.Sc. Civil Engineering with at least 6 years UAE infrastructure experience',
      'Proficiency in Primavera P6, AutoCAD, and construction management software',
      'Valid UAE driving license and approved engineering registration',
    ],
    skills: ['Civil Engineering', 'Primavera P6', 'Infrastructure', 'Quality Control', 'FIDIC'],
    benefits: [
      'Company vehicle and fuel allowance',
      'Full family medical coverage',
      'Site bonus incentive structure',
    ],
    about_company: 'Emirates Contracting Consortium has shaped landmark roads, marine works, and civil structures across the UAE since 1998.',
    vacancies: 3,
    deadline: '2026-12-01',
    featured: false,
    status: 'Published',
  },
  {
    id: 'job_05',
    created_date: new Date(Date.now() - 10 * 86400000).toISOString(),
    updated_date: new Date(Date.now() - 10 * 86400000).toISOString(),
    created_by_id: 'usr_admin_01',
    title: 'Supply Chain & Freight Operations Lead',
    slug: 'supply-chain-freight-operations-lead',
    company: 'Apex Global Logistics Hub',
    location: 'Jebel Ali Freezone (JAFZA), Dubai',
    employment_type: 'Full-time',
    industry: 'logistics',
    category: 'Logistics',
    department: 'Freight Forwarding',
    experience_min: 4,
    experience_max: 8,
    salary_min: 16000,
    salary_max: 23000,
    currency: 'AED',
    education: 'Bachelor’s degree in Supply Chain Management or Business Administration',
    description: 'Oversee regional ocean and air freight shipments, customs documentation (Dubai Customs / Mirsal 2), and multimodal cross-dock distribution.',
    responsibilities: [
      'Manage sea & air shipping line negotiations and charter bookings',
      'Ensure seamless customs clearance documentation and duty exemptions under freezone laws',
      'Coordinate with 3PL partners to optimize container dwell times and demurrage expenses',
    ],
    requirements: [
      '4+ years managing ocean/air freight in UAE or GCC',
      'Thorough mastery of Mirsal 2, Port Operations, and Incoterms 2020',
      'Exceptional analytical problem-solving and vendor negotiation skills',
    ],
    skills: ['Freight Forwarding', 'Dubai Customs', 'Incoterms', 'Ocean Freight', 'Supply Chain'],
    benefits: [
      'Performance-based logistics incentive bonus',
      'Comprehensive healthcare plan',
      'Free zone visa sponsorship',
    ],
    about_company: 'Apex Global Logistics operates 150,000 sqm of bonded warehousing and multimodal freight infrastructure in JAFZA.',
    vacancies: 2,
    deadline: '2026-11-25',
    featured: false,
    status: 'Published',
  },
  {
    id: 'job_06',
    created_date: new Date(Date.now() - 12 * 86400000).toISOString(),
    updated_date: new Date(Date.now() - 12 * 86400000).toISOString(),
    created_by_id: 'usr_admin_01',
    title: 'Luxury Retail Store Manager',
    slug: 'luxury-retail-store-manager',
    company: 'Maison Étoile Horlogerie',
    location: 'The Dubai Mall, Fashion Avenue',
    employment_type: 'Full-time',
    industry: 'retail',
    category: 'Retail',
    department: 'Retail Operations',
    experience_min: 5,
    experience_max: 10,
    salary_min: 24000,
    salary_max: 32000,
    currency: 'AED',
    education: 'High School Diploma or Bachelor’s degree in Retail/Marketing',
    description: 'Lead the flagship boutique of an esteemed Swiss haute horlogerie brand, delivering memorable VIP clienteling experiences and surpassing sales quotas.',
    responsibilities: [
      'Direct flagship boutique operations, sales team coaching, and visual merchandising',
      'Build and nurture bespoke private relationships with high-net-worth watch collectors',
      'Maintain rigorous inventory shrinkage controls and luxury store security compliance',
    ],
    requirements: [
      '5+ years leadership experience within prestigious Swiss luxury timepiece or high jewelry boutiques',
      'Proven clienteling track record across GCC ultra-high-net-worth collectors',
      'Fluency in English; Arabic, Mandarin, or Russian is highly regarded',
    ],
    skills: ['Luxury Clienteling', 'Haute Horlogerie', 'VIP Relations', 'Store Operations', 'Sales Leadership'],
    benefits: [
      'Generous quarterly boutique sales commission',
      'Comprehensive private health cover',
      'Product discounts and Geneva factory training trips',
    ],
    about_company: 'Maison Étoile Horlogerie represents centuries of Swiss watchmaking excellence and artisanal mechanical mastery.',
    vacancies: 1,
    deadline: '2026-12-20',
    featured: true,
    status: 'Published',
  },
  {
    id: 'job_07',
    created_date: new Date(Date.now() - 15 * 86400000).toISOString(),
    updated_date: new Date(Date.now() - 15 * 86400000).toISOString(),
    created_by_id: 'usr_admin_01',
    title: 'Consultant Cardiologist (DHA / DOH Licensed)',
    slug: 'consultant-cardiologist-dha-doh',
    company: 'Zayed Premier Specialty Hospital',
    location: 'Abu Dhabi & Dubai, UAE',
    employment_type: 'Full-time',
    industry: 'healthcare',
    category: 'Healthcare',
    department: 'Cardiology',
    experience_min: 8,
    experience_max: 18,
    salary_min: 55000,
    salary_max: 75000,
    currency: 'AED',
    education: 'CCST, American Board, German Facharzt, or equivalent in Cardiology',
    description: 'Prestigious specialty hospital network seeks a board-certified Consultant Cardiologist with non-invasive and clinical cardiology expertise to lead outpatient diagnostic consultations.',
    responsibilities: [
      'Provide expert clinical cardiology consultations and cardiac imaging interpretation',
      'Collaborate with multidisciplinary intensive care and emergency physicians',
      'Contribute to clinical research and international accreditation benchmarks (JCI)',
    ],
    requirements: [
      'Active Consultant license from DHA, DOH, or MOH (or direct eligibility)',
      'Tier 1 Western specialty qualification with minimum 8 years post-fellowship practice',
      'Impeccable patient satisfaction and peer clinical reviews',
    ],
    skills: ['Clinical Cardiology', 'Echocardiography', 'JCI Standards', 'DHA / DOH Licensed', 'Patient Care'],
    benefits: [
      'Tax-free executive compensation package',
      'Premium family health insurance, schooling allowance, and housing support',
      'Annual business-class flight allowance and CME sponsorship',
    ],
    about_company: 'Zayed Premier Specialty Hospital is a JCI-accredited tertiary medical institution recognized for clinical excellence across the Middle East.',
    vacancies: 1,
    deadline: '2026-12-31',
    featured: true,
    status: 'Published',
  },
  {
    id: 'job_08',
    created_date: new Date(Date.now() - 18 * 86400000).toISOString(),
    updated_date: new Date(Date.now() - 18 * 86400000).toISOString(),
    created_by_id: 'usr_admin_01',
    title: 'B1 / B2 Licensed Aircraft Maintenance Engineer',
    slug: 'b1-b2-licensed-aircraft-maintenance-engineer',
    company: 'Gulf Aerospace Technical Services',
    location: 'Dubai South (DWC), UAE',
    employment_type: 'Contract',
    industry: 'aviation',
    category: 'Aviation',
    department: 'MRO Line Maintenance',
    experience_min: 5,
    experience_max: 12,
    salary_min: 24000,
    salary_max: 34000,
    currency: 'AED',
    education: 'GCAA / EASA Part-66 B1 or B2 License',
    description: 'Performing scheduled and unscheduled line maintenance on Boeing 777 / 787 and Airbus A350 aircraft fleets at Dubai South aviation terminal.',
    responsibilities: [
      'Conduct pre-flight, transit, and daily maintenance checks and defect rectification',
      'Release aircraft to service under GCAA CAR 145 certification regulations',
      'Maintain accurate logbook entries and technical delay reporting',
    ],
    requirements: [
      'Valid EASA or GCAA Part-66 B1 or B2 with type ratings on B777 / B787 / A350',
      'Minimum 5 years active certifying experience on modern widebody airframes',
      'Current Human Factors, EWIS, and Fuel Tank Safety certificates',
    ],
    skills: ['GCAA Part-66', 'Line Maintenance', 'Boeing 777', 'Airbus A350', 'Avionics'],
    benefits: [
      'Tax-free contract rates with shift allowance and overtime premium',
      'Medical insurance and airport security pass sponsorship',
      'Annual flight ticket to home residence',
    ],
    about_company: 'Gulf Aerospace Technical Services is a premier independent MRO provider servicing global commercial airlines across the Middle East.',
    vacancies: 4,
    deadline: '2026-11-15',
    featured: false,
    status: 'Published',
  },
];

class StorageTable<T extends { id: string }> {
  private key: string;

  constructor(key: string, initialData: T[] = []) {
    this.key = `jobkota:${key}`;
    if (typeof window !== 'undefined') {
      try {
        const existing = localStorage.getItem(this.key);
        if (!existing && initialData.length > 0) {
          localStorage.setItem(this.key, JSON.stringify(initialData));
        } else if (existing) {
          const parsed = JSON.parse(existing);
          if (Array.isArray(parsed) && parsed.length === 0 && initialData.length > 0) {
            localStorage.setItem(this.key, JSON.stringify(initialData));
          }
        }
      } catch {
        if (initialData.length > 0) {
          localStorage.setItem(this.key, JSON.stringify(initialData));
        }
      }
    }
  }

  public reset(data: T[]): void {
    this.writeAll(data);
  }

  private readAll(): T[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(this.key);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private writeAll(items: T[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(this.key, JSON.stringify(items));
    } catch (err) {
      console.error(`Failed to write table ${this.key}:`, err);
    }
  }

  async list(sort = '-created_date', limit = 100): Promise<T[]> {
    let items = this.readAll();
    if (sort) {
      const desc = sort.startsWith('-');
      const field = desc ? sort.slice(1) : sort;
      items.sort((a: any, b: any) => {
        const va = a[field] ?? '';
        const vb = b[field] ?? '';
        if (va < vb) return desc ? 1 : -1;
        if (va > vb) return desc ? -1 : 1;
        return 0;
      });
    }
    return items.slice(0, limit);
  }

  async filter(filterObj: Record<string, any>, sort = '-created_date', limit = 100): Promise<T[]> {
    let items = this.readAll();
    items = items.filter((item: any) => {
      for (const [key, val] of Object.entries(filterObj)) {
        if (val && typeof val === 'object' && '$in' in val) {
          if (!val.$in.includes(item[key])) return false;
        } else if (item[key] !== val) {
          return false;
        }
      }
      return true;
    });

    if (sort) {
      const desc = sort.startsWith('-');
      const field = desc ? sort.slice(1) : sort;
      items.sort((a: any, b: any) => {
        const va = a[field] ?? '';
        const vb = b[field] ?? '';
        if (va < vb) return desc ? 1 : -1;
        if (va > vb) return desc ? -1 : 1;
        return 0;
      });
    }
    return items.slice(0, limit);
  }

  async get(id: string): Promise<T | null> {
    const items = this.readAll();
    return items.find((item) => item.id === id) || null;
  }

  async create(data: Partial<T>): Promise<T> {
    const items = this.readAll();
    const now = new Date().toISOString();
    const currentUserId = typeof window !== 'undefined'
      ? (() => {
          try {
            return JSON.parse(localStorage.getItem('jobkota:auth:user') || '{}')?.id;
          } catch {
            return null;
          }
        })()
      : null;

    const newItem: any = {
      ...data,
      id: data.id || `rec_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      created_date: (data as any).created_date || now,
      updated_date: now,
      created_by_id: (data as any).created_by_id || currentUserId || 'usr_system',
    };
    items.unshift(newItem);
    this.writeAll(items);
    return newItem;
  }

  async update(id: string, updates: Partial<T>): Promise<T> {
    const items = this.readAll();
    const index = items.findIndex((i) => i.id === id);
    if (index === -1) throw new Error(`Record ${id} not found`);
    const updated = {
      ...items[index],
      ...updates,
      updated_date: new Date().toISOString(),
    };
    items[index] = updated;
    this.writeAll(items);
    return updated;
  }

  async delete(id: string): Promise<{ success: boolean }> {
    let items = this.readAll();
    items = items.filter((i) => i.id !== id);
    this.writeAll(items);
    return { success: true };
  }

  async bulkCreate(records: Partial<T>[]): Promise<T[]> {
    const results: T[] = [];
    for (const rec of records) {
      const created = await this.create(rec);
      results.push(created);
    }
    return results;
  }

  async updateMany(filterObj: Record<string, any>, updateOps: { $set?: Partial<T> }): Promise<number> {
    const items = this.readAll();
    let count = 0;
    const updatedItems = items.map((item: any) => {
      let matches = true;
      for (const [k, v] of Object.entries(filterObj)) {
        if (item[k] !== v) matches = false;
      }
      if (matches && updateOps.$set) {
        count++;
        return { ...item, ...updateOps.$set, updated_date: new Date().toISOString() };
      }
      return item;
    });
    this.writeAll(updatedItems);
    return count;
  }

  async deleteMany(filterObj: Record<string, any>): Promise<number> {
    const items = this.readAll();
    let count = 0;
    const remaining = items.filter((item: any) => {
      let matches = true;
      for (const [k, v] of Object.entries(filterObj)) {
        if (item[k] !== v) matches = false;
      }
      if (matches) count++;
      return !matches;
    });
    this.writeAll(remaining);
    return count;
  }

  subscribe(callback: (items: T[]) => void): () => void {
    const handler = (e: StorageEvent) => {
      if (e.key === this.key) {
        callback(this.readAll());
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }
}

export const SEED_APPLICATIONS: ApplicationEntity[] = [
  {
    id: 'app_01',
    created_date: new Date(Date.now() - 3 * 86400000).toISOString(),
    updated_date: new Date(Date.now() - 3 * 86400000).toISOString(),
    job_id: 'job_01',
    job_title: 'Senior React & Cloud Platform Engineer',
    company: 'FinApex Technologies',
    full_name: 'Omar Al-Mansouri',
    email: 'omar.mansouri@example.com',
    phone: '+971 50 123 4567',
    location: 'Dubai, UAE',
    cv_file_name: 'Omar_AlMansouri_Senior_CV.pdf',
    cover_letter: 'Passionate frontend engineer with 6 years experience architecting cloud apps and fintech portals in Dubai Internet City.',
    consent: true,
    status: 'Shortlisted',
    rating: 5,
    interview_date: new Date(Date.now() + 2 * 86400000).toISOString(),
    notes: 'Exceptional system architecture background. Passed live coding round with 96% score. Salary expectation 26,000 AED/mo. Ready in 30 days notice.',
    linkedin_url: 'https://linkedin.com/in/omar-almansouri-dev',
  },
  {
    id: 'app_02',
    created_date: new Date(Date.now() - 1 * 86400000).toISOString(),
    updated_date: new Date(Date.now() - 1 * 86400000).toISOString(),
    job_id: 'job_02',
    job_title: 'Investment Banking Associate — M&A',
    company: 'Al Khaleej Capital Partners',
    full_name: 'Sara K. Haddad',
    email: 'sara.haddad@example.com',
    phone: '+971 55 987 6543',
    location: 'Abu Dhabi, UAE',
    cv_file_name: 'Sara_Haddad_IB_Resume.pdf',
    cover_letter: 'Ex-Big 4 Transaction Services professional with strong M&A valuation expertise and cross-border DCM advisory track record.',
    consent: true,
    status: 'Interview',
    rating: 4,
    interview_date: new Date(Date.now() + 4 * 86400000).toISOString(),
    notes: 'CFA charterholder. Managed 3 regional divestiture deals. Partner round scheduled for Thursday at DIFC office.',
    linkedin_url: 'https://linkedin.com/in/sara-haddad-cfa',
  },
  {
    id: 'app_03',
    created_date: new Date(Date.now() - 5 * 86400000).toISOString(),
    updated_date: new Date(Date.now() - 2 * 86400000).toISOString(),
    job_id: 'job_03',
    job_title: 'Director of Food & Beverage',
    company: 'Mirage Luxury Resorts & Spas',
    full_name: 'Tariq Mahmoud',
    email: 'tariq.mahmoud@luxuryhospitality.me',
    phone: '+971 54 882 1920',
    location: 'Palm Jumeirah, Dubai',
    cv_file_name: 'Tariq_Mahmoud_Hospitality_Director.pdf',
    cover_letter: 'Over 12 years of ultra-luxury 5-star hotel executive leadership directing multi-outlet Michelin-star culinary concepts.',
    consent: true,
    status: 'Selected',
    rating: 5,
    notes: 'Top tier candidate. Managed 220 staff across 8 signature restaurants at Burj Al Arab. Official offer letter dispatched and accepted in principle.',
    linkedin_url: 'https://linkedin.com/in/tariq-mahmoud-hospitality',
  },
  {
    id: 'app_04',
    created_date: new Date(Date.now() - 2 * 86400000).toISOString(),
    updated_date: new Date(Date.now() - 1 * 86400000).toISOString(),
    job_id: 'job_01',
    job_title: 'Senior React & Cloud Platform Engineer',
    company: 'FinApex Technologies',
    full_name: 'Priya Ramaswamy',
    email: 'priya.ramaswamy@techdev.io',
    phone: '+971 56 312 9081',
    location: 'Dubai Marina, UAE',
    cv_file_name: 'Priya_Ramaswamy_Frontend_Lead.pdf',
    cover_letter: 'Lead frontend architect with deep TypeScript, Next.js, and serverless infrastructure background across GCC high-growth startups.',
    consent: true,
    status: 'Interview',
    rating: 4,
    interview_date: new Date(Date.now() + 3 * 86400000).toISOString(),
    notes: 'Technical test was outstanding. Moving to team culture and architectural assessment.',
  },
  {
    id: 'app_05',
    created_date: new Date(Date.now() - 6 * 86400000).toISOString(),
    updated_date: new Date(Date.now() - 4 * 86400000).toISOString(),
    job_id: 'job_04',
    job_title: 'Senior Civil Project Engineer — Infrastructure',
    company: 'Emirates Contracting Consortium',
    full_name: 'Khaled Al-Zahrani',
    email: 'k.alzahrani@infrastructure-ae.com',
    phone: '+971 52 443 9012',
    location: 'Abu Dhabi, UAE',
    cv_file_name: 'Khaled_AlZahrani_Civil_Engineer.pdf',
    cover_letter: 'PMP-certified Senior Civil Engineer with 9 years executing major highway interchange and bridge projects in the UAE.',
    consent: true,
    status: 'Under Review',
    rating: 3,
    notes: 'Solid project track record with Musanada and DOT. Verified degree attestation and Society of Engineers card.',
  },
  {
    id: 'app_06',
    created_date: new Date(Date.now() - 4 * 86400000).toISOString(),
    updated_date: new Date(Date.now() - 3 * 86400000).toISOString(),
    job_id: 'job_06',
    job_title: 'HR Operations & People Partner',
    company: 'Gulf Enterprise Holdings',
    full_name: 'Elena Rostova',
    email: 'elena.rostova@workforce-gcc.com',
    phone: '+971 58 776 2311',
    location: 'Dubai, UAE',
    cv_file_name: 'Elena_Rostova_HR_Partner.pdf',
    cover_letter: 'SHRM-SCP certified HR Business Partner with 7 years managing end-to-end employee lifecycles and MOHRE labor compliance.',
    consent: true,
    status: 'Applied',
    rating: 4,
    notes: 'Fluent English and Russian, working conversational Arabic. Strong UAE Labor Law knowledge.',
  },
  {
    id: 'app_07',
    created_date: new Date(Date.now() - 8 * 86400000).toISOString(),
    updated_date: new Date(Date.now() - 5 * 86400000).toISOString(),
    job_id: 'job_07',
    job_title: 'Bilingual Corporate Paralegal — DIFC Laws',
    company: 'Al Tamimi & Horizon Legal',
    full_name: 'Mohammed Al-Balooshi',
    email: 'm.albalooshi@law-gcc.ae',
    phone: '+971 50 654 3210',
    location: 'DIFC, Dubai, UAE',
    cv_file_name: 'Mohammed_AlBalooshi_Paralegal.pdf',
    cover_letter: 'Law graduate with 4 years drafting corporate resolutions, commercial contracts, and managing regulatory filings in DIFC and ADGM.',
    consent: true,
    status: 'Shortlisted',
    rating: 5,
    notes: 'Native Arabic and fluent legal English. Experience with DFSA compliance frameworks.',
  },
  {
    id: 'app_08',
    created_date: new Date(Date.now() - 7 * 86400000).toISOString(),
    updated_date: new Date(Date.now() - 6 * 86400000).toISOString(),
    job_id: 'job_05',
    job_title: 'Retail General Store Manager — Luxury Flagship',
    company: 'Al Tayer Luxury Brands',
    full_name: 'Jessica Vance',
    email: 'jessica.vance@retailfashion.co',
    phone: '+971 55 432 1098',
    location: 'Dubai Mall, UAE',
    cv_file_name: 'Jessica_Vance_Retail_CV.pdf',
    cover_letter: '10 years luxury retail general management experience across Mayfair London and Dubai Mall flagship locations.',
    consent: true,
    status: 'Applied',
    rating: 3,
    notes: 'Exceeded sales targets by 22% in previous tenure. High client VIP book.',
  },
];

export const SEED_LEADS: LeadEntity[] = [
  {
    id: 'lead_01',
    created_date: new Date(Date.now() - 2 * 86400000).toISOString(),
    updated_date: new Date(Date.now() - 1 * 86400000).toISOString(),
    name: 'Karim El-Masri',
    company: 'Emaar Hospitality Group',
    email: 'karim.elmasri@emaar.ae',
    phone: '+971 4 367 3333',
    source: 'contact',
    topic: 'Recruitment Mandate',
    message: 'Seeking specialized executive recruitment partner for 3 General Manager appointments for our upcoming luxury resorts in Ras Al Khaimah and Dubai Creek.',
    status: 'Qualified',
    notes: 'Initial discovery call completed. Prepared executive proposal for 18% placement fee structure.',
  },
  {
    id: 'lead_02',
    created_date: new Date(Date.now() - 1 * 86400000).toISOString(),
    updated_date: new Date(Date.now() - 1 * 86400000).toISOString(),
    name: 'Fatima Al-Suwaidi',
    company: 'DP World Logistics',
    email: 'f.alsuwaidi@dpworld.com',
    phone: '+971 4 889 7000',
    source: 'contact',
    topic: 'Manpower Supply',
    message: 'We require 120 certified logistics, crane, and forklift operators for Q4 peak seasonal operations in Jafza terminal.',
    status: 'New Lead',
    notes: 'High-value inquiry. Operations director needs to provide site accommodation and visa quota breakdown.',
  },
  {
    id: 'lead_03',
    created_date: new Date(Date.now() - 4 * 86400000).toISOString(),
    updated_date: new Date(Date.now() - 2 * 86400000).toISOString(),
    name: 'Dr. Jason Miller',
    company: 'Mediclinic Middle East',
    email: 'jason.miller@mediclinic.ae',
    phone: '+971 4 435 9999',
    source: 'contact',
    topic: 'HR Outsourcing',
    message: 'Exploring managed payroll outsourcing and healthcare professional licensing administration for 450 clinical staff.',
    status: 'Proposal',
    notes: 'Submitted SLA and WPS compliance assurance documents. Awaiting board sign-off.',
  },
  {
    id: 'lead_04',
    created_date: new Date(Date.now() - 5 * 86400000).toISOString(),
    updated_date: new Date(Date.now() - 3 * 86400000).toISOString(),
    name: 'Hisham Qureshi',
    company: 'Careem Technologies',
    email: 'hisham.q@careem.com',
    phone: '+971 50 771 2288',
    source: 'contact',
    topic: 'PEO / Employer of Record',
    message: 'Need Employer of Record services in Riyadh and Muscat to employ 15 remote senior software engineers.',
    status: 'Contacted',
    notes: 'Shared regional fee rate cards for Saudi and Oman entities.',
  },
];

export const SEED_WORKFORCE: WorkforceRequestEntity[] = [
  {
    id: 'wf_01',
    created_date: new Date(Date.now() - 3 * 86400000).toISOString(),
    updated_date: new Date(Date.now() - 1 * 86400000).toISOString(),
    company: 'Etihad Rail Infrastructure JV',
    contact_name: 'Eng. Mansoor Al-Ketbi',
    email: 'm.alketbi@etihadrail-jv.ae',
    phone: '+971 2 444 8899',
    industry: 'construction',
    service: 'Manpower Supply',
    position: 'Heavy Rail Equipment Operators & Certified Riggers',
    employees_needed: 45,
    employment_type: 'Contract',
    location: 'Abu Dhabi & Fujairah, UAE',
    experience: '5+ years railway or heavy civil infrastructure',
    skills: 'Doosan / CAT heavy machinery, rigging certificates, HSE level 2',
    start_date: '2026-11-01',
    budget: '12,000 - 16,000 AED/mo per operator',
    requirements: 'Immediate security pass clearances, camp accommodation provided by client.',
    status: 'Active',
    notes: 'First batch of 20 candidate files forwarded for site gate passes.',
  },
  {
    id: 'wf_02',
    created_date: new Date(Date.now() - 2 * 86400000).toISOString(),
    updated_date: new Date(Date.now() - 1 * 86400000).toISOString(),
    company: 'Mandarin Oriental Luxury Resort',
    contact_name: 'Sophie Laurent',
    email: 'slaurent@mohg.com',
    phone: '+971 4 777 2000',
    industry: 'hospitality',
    service: 'Recruitment',
    position: 'Bilingual VIP Concierge & Guest Experience Executives',
    employees_needed: 8,
    employment_type: 'Full-time',
    location: 'Jumeirah Beach, Dubai',
    experience: '3+ years luxury 5-star resort reception/concierge',
    skills: 'Opera PMS, multilingual (French, Russian, or Arabic)',
    start_date: '2026-10-15',
    budget: '14,000 - 18,000 AED/mo + service charge',
    requirements: 'Must have immaculate grooming standards and strong VIP problem-solving.',
    status: 'In Review',
    notes: 'Shortlisting 16 candidate profiles for panel interviews next Tuesday.',
  },
  {
    id: 'wf_03',
    created_date: new Date(Date.now() - 1 * 86400000).toISOString(),
    updated_date: new Date(Date.now() - 1 * 86400000).toISOString(),
    company: 'Sovereign Wealth Digital Bank',
    contact_name: 'Tariq Al-Nuaimi',
    email: 'tariq@ad-fintech.ae',
    phone: '+971 2 699 1000',
    industry: 'technology',
    service: 'Recruitment',
    position: 'Senior Kubernetes & Cloud Security Consultants',
    employees_needed: 3,
    employment_type: 'Full-time',
    location: 'ADGM, Abu Dhabi',
    experience: '6+ years DevSecOps in regulated banking environments',
    skills: 'AWS, Kubernetes, Terraform, CIS Benchmarks, SOC2',
    start_date: '2026-11-15',
    budget: '35,000 - 45,000 AED/mo',
    requirements: 'CISP or CKS certification preferred.',
    status: 'New',
    notes: 'Newly received mandate. Assigning senior tech recruiter.',
  },
];

// Global Entities Tables
const jobTable = new StorageTable<JobEntity>('jobs', SEED_JOBS);
const appTable = new StorageTable<ApplicationEntity>('applications', SEED_APPLICATIONS);
const leadTable = new StorageTable<LeadEntity>('leads', SEED_LEADS);
const workforceTable = new StorageTable<WorkforceRequestEntity>('workforce_requests', SEED_WORKFORCE);

interface StoredAccount {
  email: string;
  password: string;
  full_name: string;
  role: "admin" | "user";
}

// Auth helper
class AuthClient {
  private userKey = "jobkota:auth:user";
  private accountsKey = "jobkota:auth:accounts";

  private getAccounts(): StoredAccount[] {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(this.accountsKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  private saveAccount(account: StoredAccount): void {
    if (typeof window === "undefined") return;
    const accounts = this.getAccounts().filter((a) => a.email !== account.email);
    accounts.push(account);
    localStorage.setItem(this.accountsKey, JSON.stringify(accounts));
  }

  getCurrentUser(): UserEntity | null {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem(this.userKey);
    if (!stored) {
      // Default state is always LOGGED OUT
      return null;
    }
    try {
      const parsed = JSON.parse(stored);
      // Clean up legacy mock auto-login if it wasn't authenticated via /login
      if (parsed?.id === "usr_admin_01" && !parsed?.is_verified_session) {
        localStorage.removeItem(this.userKey);
        return null;
      }
      return parsed;
    } catch {
      localStorage.removeItem(this.userKey);
      return null;
    }
  }

  async me(): Promise<UserEntity> {
    const user = this.getCurrentUser();
    if (!user) throw new Error("Not authenticated");
    return user;
  }

  async isAuthenticated(): Promise<boolean> {
    return !!this.getCurrentUser();
  }

  async logout(redirectUrl = "/"): Promise<void> {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.userKey);
      window.location.href = redirectUrl;
    }
  }

  redirectToLogin(nextUrl?: string): void {
    if (typeof window !== "undefined") {
      const query = nextUrl ? `?returnTo=${encodeURIComponent(nextUrl)}` : "";
      window.location.href = `/login${query}`;
    }
  }

  async updateMe(data: Partial<UserEntity>): Promise<UserEntity> {
    const current = this.getCurrentUser();
    if (!current) throw new Error("Not authenticated");
    const updated = { ...current, ...data };
    if (typeof window !== "undefined") {
      localStorage.setItem(this.userKey, JSON.stringify(updated));
    }
    return updated;
  }

  async loginViaEmailPassword(email: string, password: string): Promise<UserEntity> {
    const normalizedEmail = email.trim().toLowerCase();

    // Dedicated Authorized Administrator credentials
    const ADMIN_CREDENTIALS: Record<string, string> = {
      "admiin@jobkota.com": "JOBkota12321.$",
      "admin@jobkota.com": "JOBkota12321.$",
      "nexus.itservices06@gmail.com": "JOBkota12321.$",
    };

    if (ADMIN_CREDENTIALS[normalizedEmail]) {
      const expectedPassword = ADMIN_CREDENTIALS[normalizedEmail];
      if (password !== expectedPassword) {
        throw new Error("Invalid password for administrator account. Please verify credentials.");
      }

      const user: UserEntity = {
        id: "usr_admin_01",
        created_date: new Date().toISOString(),
        full_name: "JobKota Administrator",
        email: normalizedEmail,
        role: "admin",
        is_verified_session: true,
      };

      if (typeof window !== "undefined") {
        localStorage.setItem(this.userKey, JSON.stringify(user));
      }
      return user;
    }

    // Check registered accounts store
    const accounts = this.getAccounts();
    const existing = accounts.find((a) => a.email.toLowerCase() === normalizedEmail);

    if (existing) {
      if (existing.password !== password) {
        throw new Error("Incorrect password. Please try again.");
      }

      const user: UserEntity = {
        id: `usr_${Date.now()}`,
        created_date: new Date().toISOString(),
        full_name: existing.full_name,
        email: existing.email,
        role: existing.role,
        is_verified_session: true,
      };

      if (typeof window !== "undefined") {
        localStorage.setItem(this.userKey, JSON.stringify(user));
      }
      return user;
    }

    // For any general user registration test account with minimum password requirement
    if (password && password.length >= 6) {
      const user: UserEntity = {
        id: `usr_${Date.now()}`,
        created_date: new Date().toISOString(),
        full_name: email.split("@")[0],
        email: normalizedEmail,
        role: normalizedEmail.includes("admin") || normalizedEmail.includes("nexus") ? "admin" : "user",
        is_verified_session: true,
      };

      if (typeof window !== "undefined") {
        localStorage.setItem(this.userKey, JSON.stringify(user));
      }
      return user;
    }

    throw new Error("Invalid email or password. Please verify credentials or register.");
  }

  async loginWithProvider(provider: string, _fromUrl?: string): Promise<UserEntity> {
    const user: UserEntity = {
      id: `usr_prov_${Date.now()}`,
      created_date: new Date().toISOString(),
      full_name: `Verified Account`,
      email: `nexus.itservices06@gmail.com`,
      role: "admin",
      is_verified_session: true,
    };
    if (typeof window !== "undefined") {
      localStorage.setItem(this.userKey, JSON.stringify(user));
    }
    return user;
  }

  async register({ email, password }: { email: string; password: string }): Promise<{ success: boolean; email: string }> {
    const normalizedEmail = email.trim().toLowerCase();
    this.saveAccount({
      email: normalizedEmail,
      password,
      full_name: normalizedEmail.split("@")[0],
      role: normalizedEmail.includes("admin") ? "admin" : "user",
    });
    return { success: true, email: normalizedEmail };
  }

  async verifyOtp({ email, otpCode: _otpCode }: { email: string; otpCode: string }): Promise<{ access_token: string; user: UserEntity }> {
    const normalizedEmail = email.trim().toLowerCase();
    const existing = this.getAccounts().find((a) => a.email === normalizedEmail);
    const user: UserEntity = {
      id: `usr_${Date.now()}`,
      created_date: new Date().toISOString(),
      full_name: existing?.full_name || normalizedEmail.split("@")[0],
      email: normalizedEmail,
      role: existing?.role || (normalizedEmail.includes("admin") ? "admin" : "user"),
      is_verified_session: true,
    };
    if (typeof window !== "undefined") {
      localStorage.setItem(this.userKey, JSON.stringify(user));
    }
    return { access_token: `token_${Date.now()}`, user };
  }

  async resendOtp(_email: string): Promise<{ success: boolean }> {
    return { success: true };
  }

  async resetPasswordRequest(_email: string): Promise<{ success: boolean }> {
    return { success: true };
  }

  async resetPassword({ _resetToken, _newPassword }: any): Promise<{ success: boolean }> {
    return { success: true };
  }
}

export const base44 = {
  entities: {
    Job: jobTable,
    Application: appTable,
    Lead: leadTable,
    WorkforceRequest: workforceTable,
  },
  auth: new AuthClient(),
  integrations: {
    Core: {
      async UploadPublicFile({ file }: { file: File }): Promise<{ file_url: string }> {
        return { file_url: URL.createObjectURL(file) };
      },
      async UploadPrivateFile({ file }: { file: File }): Promise<{ file_uri: string }> {
        return { file_uri: `private://cv/${Date.now()}_${file.name}` };
      },
      async CreateFileSignedUrl({ file_uri }: { file_uri: string }): Promise<{ signed_url: string }> {
        return { signed_url: file_uri };
      },
    },
  },
  analytics: {
    track({ eventName, properties }: { eventName: string; properties?: Record<string, any> }) {
      if (typeof window !== 'undefined' && (window as any).__JOBKOTA_ANALYTICS_DEBUG) {
        console.log(`[JobKota Analytics] ${eventName}`, properties);
      }
    },
  },
  demo: {
    resetToSeedData: () => {
      jobTable.reset(SEED_JOBS);
      appTable.reset(SEED_APPLICATIONS);
      leadTable.reset(SEED_LEADS);
      workforceTable.reset(SEED_WORKFORCE);
    },
  },
};
