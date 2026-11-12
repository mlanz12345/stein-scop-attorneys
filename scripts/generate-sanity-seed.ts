import fs from 'fs';
import path from 'path';
import { allMembers } from '../src/data/team.ts';

const docs: any[] = [];

// 1. Site Settings Document
docs.push({
  _id: 'siteSettings',
  _type: 'siteSettings',
  firmName: 'Stein Scop Attorneys Inc.',
  telephone: '+27 (0)11 380 80 80',
  infoEmail: 'info@steinscop.com',
  admissionsEmail: 'admissions@steinscop.com',
  physicalAddress: 'Second Floor, Capital Hill\n6 Benmore Road, Morningside\nSandton, Gauteng, 2057',
  officeHours: 'Monday — Friday: 08:00 — 17:00',
  googleSiteVerification: 'jIYet-YQeDqd2ymKePJMEivj8N9cSyJB6aDUFJVuStk',
  googleAnalyticsId: 'GTM-NCVSCLRN',
  defaultSeo: {
    metaTitle: 'Stein Scop Attorneys | Commercial Law Firm Sandton',
    metaDescription: 'Premier commercial law firm based in Sandton, Johannesburg. Specialising in M&A, high-stakes dispute resolution, corporate governance, and complex commercial matters.',
    noIndex: false,
  },
});

// 2. Core Pages
const pages = [
  {
    slug: 'home',
    title: 'Homepage',
    heroTag: 'Commercial Law Firm',
    heroTitle: 'A Modern Standard in Commercial Law',
    heroSubtitle: 'Stein Scop Attorneys is an agile, director-led commercial law firm in Sandton delivering strategic counsel for high-value transactions, complex litigation, and enterprise governance.',
    metaTitle: 'Stein Scop Attorneys | Commercial Law Firm Sandton',
    metaDescription: 'Stein Scop Attorneys is an agile, director-led commercial law firm in Sandton delivering strategic counsel for high-value transactions, complex litigation, and enterprise governance.',
  },
  {
    slug: 'about',
    title: 'About Us',
    heroTag: 'The Firm',
    heroTitle: 'Agile. Director-Led. Commercial Precision.',
    heroSubtitle: 'Stein Scop Attorneys was established to deliver partner-level expertise with senior attention on every instruction. We advise corporate leaders, multinationals, and financial institutions across South Africa.',
    metaTitle: 'About Us | Stein Scop Attorneys',
    metaDescription: 'Stein Scop Attorneys is a premier Sandton commercial law firm established by Glenn Stein and Bradley Scop, delivering senior director-led legal advisory across Africa.',
  },
  {
    slug: 'practice-areas',
    title: 'Practice Areas',
    heroTag: 'Specializations',
    heroTitle: 'Our Practice',
    heroSubtitle: 'Stein Scop Attorneys Inc. provides end-to-end legal solutions across the entire commercial spectrum, driven by deep market insight.',
    metaTitle: 'Practice Areas | Stein Scop Attorneys',
    metaDescription: 'Stein Scop Attorneys advises across M&A, commercial litigation, employment & labour, insolvency & business rescue, competition law, mining law, securities law, and technology law in South Africa.',
  },
  {
    slug: 'careers',
    title: 'Careers & Admissions',
    heroTag: 'Admissions & Recruitment',
    heroTitle: 'Join Our Practice',
    heroSubtitle: 'We recruit ambitious, commercially minded law graduates seeking rigorous training and direct mentorship from industry-leading directors.',
    metaTitle: 'Careers | Stein Scop Attorneys',
    metaDescription: 'Apply for Articles of Clerkship or the Winter Vacation Programme at Stein Scop Attorneys in Sandton. Applications open for 2027 and 2028 intakes.',
  },
  {
    slug: 'contact',
    title: 'Contact Us',
    heroTag: 'Connect',
    heroTitle: 'Engage Our Expertise',
    heroSubtitle: 'Reach out to our Sandton office to discuss your commercial legal requirements or schedule a consultation with one of our directors.',
    metaTitle: 'Contact Us | Stein Scop Attorneys',
    metaDescription: 'Contact Stein Scop Attorneys at our Sandton office. Call +27 (0)11 380 80 80, email info@steinscop.com, or submit an enquiry. We respond within one business day.',
  },
  {
    slug: 'privacy',
    title: 'Privacy, POPIA & PAIA Compliance',
    heroTag: 'Regulatory & Statutory Compliance',
    heroTitle: 'Privacy, POPIA & PAIA Compliance.',
    heroSubtitle: 'Stein Scop Attorneys Incorporated is committed to safeguarding personal information and upholding constitutional rights of privacy and access to information in accordance with South African law.',
    metaTitle: 'Privacy Policy, POPIA & PAIA Manual | Stein Scop Attorneys',
    metaDescription: 'Stein Scop Attorneys Inc. POPIA External Privacy Policy, PAIA Section 51 Manual, and Cookie Policy in accordance with South African data protection law.',
  },
];

for (const p of pages) {
  docs.push({
    _id: `page-${p.slug}`,
    _type: 'page',
    title: p.title,
    slug: { _type: 'slug', current: p.slug },
    heroTag: p.heroTag,
    heroTitle: p.heroTitle,
    heroSubtitle: p.heroSubtitle,
    seo: {
      metaTitle: p.metaTitle,
      metaDescription: p.metaDescription,
      noIndex: false,
    },
  });
}

// 3. Practice Areas
const practiceAreas = [
  {
    id: 'corporate-commercial',
    title: 'Corporate and Commercial',
    tag: 'Advisory',
    detail: 'Cross-Border & Domestic Transactions',
    desc: 'Advising on mergers and acquisitions, joint ventures, and complex commercial agreements. We provide strategic counsel for business structures and corporate governance across South Africa and the broader African continent.',
    featuredOnHome: true,
    order: 1,
  },
  {
    id: 'litigation-dispute-resolution',
    title: 'Litigation and Dispute Resolution',
    tag: 'Dispute',
    detail: 'High Court & Arbitration',
    desc: 'Renowned for resolving high-stakes commercial disputes. Our strategy-first approach ensures alignment with client commercial objectives during complex litigation across all South African High Courts, the Supreme Court of Appeal, and international arbitration forums.',
    featuredOnHome: true,
    order: 2,
  },
  {
    id: 'banking-finance',
    title: 'Banking and Finance',
    tag: 'Finance',
    detail: 'Lender & Borrower Representation',
    desc: 'Expertise in structured finance, regulatory compliance, and debt restructuring. We advise both lenders and borrowers — including leading financial institutions and development finance institutions — on sophisticated financial instruments and transactions.',
    featuredOnHome: true,
    order: 3,
  },
  {
    id: 'insolvency-restructuring',
    title: 'Insolvency and Restructuring',
    tag: 'Recovery',
    detail: 'Business Rescue & Liquidations',
    desc: 'Guiding distressed companies, creditors, and affected parties through the full spectrum of insolvency and restructuring proceedings — including business rescue, provisional and final liquidations, and judicial management.',
    featuredOnHome: true,
    order: 4,
  },
  {
    id: 'employment-labor',
    title: 'Employment and Labor',
    tag: 'Workforce',
    detail: 'Executive & Labour Court Advisory',
    desc: 'Advising JSE-listed entities and private enterprises on executive appointments and terminations, restraint of trade, workforce restructuring, and representation in the CCMA and Labour Courts. We manage sensitive workforce issues with the discretion they demand.',
    featuredOnHome: true,
    order: 5,
  },
  {
    id: 'competition-regulatory',
    title: 'Competition Law & Regulatory Matters',
    tag: 'Regulatory',
    detail: 'Merger Approvals & Compliance',
    desc: 'Advising clients on merger filings before the Competition Commission and Tribunal, behavioural investigations, market inquiries, and regulatory compliance across regulated commercial sectors.',
    featuredOnHome: false,
    order: 6,
  },
  {
    id: 'mining-natural-resources',
    title: 'Mining and Natural Resources',
    tag: 'Resources',
    detail: 'Licensing & Commercial Mandates',
    desc: 'Advising mining companies and resource investors on regulatory compliance, mineral rights transfers, joint ventures, and mineral development agreements in South Africa and southern Africa.',
    featuredOnHome: false,
    order: 7,
  },
  {
    id: 'communications-technology',
    title: 'Communications & Technology',
    tag: 'Tech Law',
    detail: 'Telecoms, Tech & Digital Infrastructure',
    desc: 'Pioneering telecommunications and technology law counsel for leading operators, digital platforms, infrastructure providers, and software innovators.',
    featuredOnHome: false,
    order: 8,
  },
];

for (const pa of practiceAreas) {
  docs.push({
    _id: `practiceArea-${pa.id}`,
    _type: 'practiceArea',
    title: pa.title,
    slug: { _type: 'slug', current: pa.id },
    tag: pa.tag,
    detail: pa.detail,
    desc: pa.desc,
    featuredOnHome: pa.featuredOnHome,
    order: pa.order,
    seo: {
      metaTitle: `${pa.title} | Stein Scop Attorneys`,
      metaDescription: pa.desc.slice(0, 155),
    },
  });
}

// 4. Career Programmes & Openings
const careerProgrammes = [
  {
    id: 'articles-2028',
    title: 'Articles of Clerkship',
    statusBadge: '2027 Closed · 2028 Open',
    location: 'Sandton',
    duration: 'Two-Year Contract',
    audience: 'Candidate Attorney',
    notice: 'Kindly note that applications for articles of clerkship commencing in 2027 have closed.',
    description:
      'If you are interested in applying for articles of clerkship commencing in 2028, kindly send your CV and full academic transcript to admissions@steinscop.com or use the online application form via the Apply Now button.',
    admissionsEmail: 'admissions@steinscop.com',
    emailSubject: 'Application: Articles of Clerkship 2028',
    emailBody:
      'Dear Admissions Team,\n\nPlease find attached my CV and full academic transcript for consideration for Articles of Clerkship commencing in 2028.\n\nKind regards,',
    active: true,
    order: 1,
  },
  {
    id: 'winter-vac-2027',
    title: 'Winter Vacation Programme',
    statusBadge: '2026 Closed · 2027 Open',
    location: 'Sandton',
    duration: 'Vacation Programme',
    audience: 'Law Students',
    notice: 'Kindly note that applications for our winter vacation work programme for 2026 have closed.',
    description:
      'If you are interested in applying for our winter vacation work programme for 2027, kindly send your CV and full academic transcript to admissions@steinscop.com or use the online application form via the Apply Now button.',
    admissionsEmail: 'admissions@steinscop.com',
    emailSubject: 'Application: Winter Vacation Programme 2027',
    emailBody:
      'Dear Admissions Team,\n\nPlease find attached my CV and full academic transcript for consideration for the Winter Vacation Work Programme commencing in 2027.\n\nKind regards,',
    active: true,
    order: 2,
  },
];

for (const cp of careerProgrammes) {
  docs.push({
    _id: `careerProgramme-${cp.id}`,
    _type: 'careerProgramme',
    title: cp.title,
    slug: { _type: 'slug', current: cp.id },
    statusBadge: cp.statusBadge,
    location: cp.location,
    duration: cp.duration,
    audience: cp.audience,
    notice: cp.notice,
    description: cp.description,
    admissionsEmail: cp.admissionsEmail,
    emailSubject: cp.emailSubject,
    emailBody: cp.emailBody,
    active: cp.active,
    order: cp.order,
  });
}

// 5. Attorneys & Team Members (all 26 members)
allMembers.forEach((m, idx) => {
  docs.push({
    _id: `attorney-${m.id}`,
    _type: 'attorney',
    name: m.name,
    slug: { _type: 'slug', current: m.id },
    title: m.title,
    qualifications: m.qualifications,
    email: m.email,
    practiceAreas: m.practiceAreas,
    bio: m.bio,
    order: idx + 1,
    seo: {
      metaTitle: `${m.name} - ${m.title} | Stein Scop Attorneys`,
      metaDescription: m.bio.slice(0, 155),
      noIndex: false,
    },
  });
});

// Write to NDJSON
const outputPath = path.resolve('sanity/seed-data.ndjson');
const ndjsonContent = docs.map((d) => JSON.stringify(d)).join('\n');
fs.writeFileSync(outputPath, ndjsonContent, 'utf-8');

console.log(`Generated ${docs.length} documents into ${outputPath}`);
