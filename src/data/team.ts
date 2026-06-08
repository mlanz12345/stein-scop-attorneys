export interface TeamMember {
  id: string;
  name: string;
  title: string;
  qualifications: string;
  bio: string;
  image: string;
  email: string;
  linkedin?: string;
  practiceAreas: string[];
}

export const directors: TeamMember[] = [
  {
    id: 'glenn-stein',
    name: 'Glenn Stein',
    title: 'Director',
    qualifications: 'BA; LLB',
    bio: 'Co-founder of the firm, Glenn has practised commercial law for over three decades with a particular focus on mergers and acquisitions, technology law, and high-stakes commercial litigation. He is recognised as a leading attorney in the South African telecommunications industry and has handled several landmark cases that have shaped the regulatory landscape. Glenn has represented multinational corporations and leading South African enterprises across the continent — including in Nigeria, Zambia, Zimbabwe, the DRC, and Mozambique — and his dispute resolution experience spans both domestic High Courts and complex multi-jurisdictional arbitrations.',
    image: '/glenn.png',
    email: 'info@steinscop.com',
    practiceAreas: ['Mergers & Acquisitions', 'Technology Law', 'Commercial Litigation', 'Telecommunications', 'Multi-jurisdictional Arbitration'],
  },
  {
    id: 'bradley-scop',
    name: 'Bradley Scop',
    title: 'Director',
    qualifications: 'BCom; LLB',
    bio: "Co-founder and one of South Africa's most recognised M&A and technology lawyers, Bradley brings nearly three decades of transactional expertise to the firm. He trained at a leading Johannesburg commercial practice and served as an M&A partner at the Johannesburg office of an international law firm before co-founding Stein Scop. His deal experience spans mining, media, telecommunications, technology, engineering, and financial services, and he has advised clients on cross-border transactions throughout sub-Saharan Africa. Bradley has also led litigation in several landmark industry matters, cementing his reputation as a lawyer who combines deep transactional knowledge with commercial litigation acumen.",
    image: '/bradley-scop.png',
    email: 'info@steinscop.com',
    practiceAreas: ['Mergers & Acquisitions', 'Technology Law', 'Mining', 'Media', 'Banking & Finance', 'Commercial Litigation'],
  },
  {
    id: 'sian-van-der-weele',
    name: 'Sian van der Weele',
    title: 'Director',
    qualifications: 'BBusSci; LLB (cum laude)',
    bio: "Sian graduated cum laude and completed her articles in 2016 at one of the world's leading international law firms, where she worked as an associate in the commercial litigation division before joining Stein Scop at its founding. She specialises in complex commercial disputes and has run large-scale commercial trials and motion proceedings across multiple South African High Courts and arbitration forums. Her practice spans contractual disputes, telecommunications, insolvency and business rescue proceedings, shareholder and director conflicts, and competition commission referrals. Clients value her combination of rigorous analytical thinking and decisive courtroom strategy.",
    image: '/sian-van-der-weele.png',
    email: 'info@steinscop.com',
    practiceAreas: ['Commercial Litigation', 'Insolvency & Business Rescue', 'Shareholder Disputes', 'Competition Law', 'Arbitration'],
  },
  {
    id: 'safiyyah-buckas',
    name: 'Safiyyah Buckas',
    title: 'Director',
    qualifications: 'LLB; LLM',
    bio: "Safiyyah holds a Master's degree in Business and Commercial Law and completed her articles in 2016 at a major international law firm. She is a specialist employment and labour law attorney with extensive experience in CCMA disputes, Labour Court applications, Section 189 retrenchment proceedings, and executive-level disciplinary matters. In addition to her labour practice, Safiyyah handles commercial litigation in the High Court, administrative law applications, and private arbitrations. She is known for the precision of her legal analysis and her ability to manage sensitive employment matters with both strategic focus and discretion.",
    image: '/safiyyah.png',
    email: 'info@steinscop.com',
    practiceAreas: ['Employment & Labour Law', 'CCMA Disputes', 'Commercial Litigation', 'Administrative Law', 'Private Arbitration'],
  },
  {
    id: 'casper-badenhorst',
    name: 'Casper Badenhorst',
    title: 'Director',
    qualifications: 'LLB; LLM',
    bio: "Casper holds an LLM in International Commercial Law with a focus on cross-border transactions and disputes, and completed his articles in 2017 before joining Stein Scop's commercial department. His practice spans corporate governance, competition law, intellectual property, banking and finance, and international commercial arbitrations. He advises clients on complex, multidisciplinary matters that require a command of both South African and international legal frameworks, and has particular experience navigating the regulatory and structural complexity of cross-border deals in the African context.",
    image: '/casper-badenhorst.png',
    email: 'info@steinscop.com',
    practiceAreas: ['Corporate Governance', 'Competition Law', 'Intellectual Property', 'Banking & Finance', 'International Arbitration'],
  },
  {
    id: 'brooke-roxburgh',
    name: 'Brooke Roxburgh',
    title: 'Director',
    qualifications: 'LLB',
    bio: "Brooke completed her articles at Stein Scop in 2021 and was appointed Director shortly thereafter, a testament to the quality and pace of her development. She specialises in corporate mergers and acquisitions and general commercial law, advising domestic, regional, and international clients on cross-border M&A transactions across the banking, mining, and energy sectors. Brooke is known for her meticulous approach to deal structuring and her ability to manage complex, time-sensitive transactions with calm authority. She works closely with both the firm's founders on large-ticket advisory mandates.",
    image: '/brooke-roxburgh.png',
    email: 'info@steinscop.com',
    practiceAreas: ['Mergers & Acquisitions', 'Corporate Commercial', 'Banking', 'Mining', 'Energy'],
  },
  {
    id: 'jemma-brasler',
    name: 'Jemma Brasler',
    title: 'Director',
    qualifications: 'LLB',
    bio: "Jemma is the firm's dedicated employment and labour specialist, advising JSE-listed companies and large corporates on the full spectrum of workforce legal issues. Her practice covers executive appointments and dismissals, restraint of trade enforcement, Section 189 restructurings, senior disciplinary proceedings, and Labour Court litigation. She is adept at handling matters that require both legal precision and high levels of commercial sensitivity — particularly where the reputations of key individuals or the operational continuity of an organisation are at stake. Clients consistently commend her for resolving complex employment disputes quickly and discreetly.",
    image: '/jemma-brasler.png',
    email: 'info@steinscop.com',
    practiceAreas: ['Employment & Labour Law', 'Executive Matters', 'Restraint of Trade', 'Section 189 Restructuring', 'Labour Court Litigation'],
  },
];

export const consultants: TeamMember[] = [
  {
    id: 'amelia-berman',
    name: 'Amelia Berman',
    title: 'Consultant',
    qualifications: 'LLB',
    bio: 'Amelia brings extensive experience in commercial drafting and corporate governance to her consulting role at the firm. She focuses on ensuring that client interests are robustly protected through precision-engineered commercial agreements and comprehensive regulatory compliance frameworks. Her meticulous approach to contract construction has made her a trusted adviser to businesses seeking certainty in their commercial relationships.',
    image: '/amelia-berman.png',
    email: 'info@steinscop.com',
    practiceAreas: ['Commercial Drafting', 'Corporate Governance', 'Regulatory Compliance', 'Contract Law'],
  },
  {
    id: 'alexandra-rakitzis-ho',
    name: 'Alexandra Rakitzis Ho',
    title: 'Consultant',
    qualifications: 'LLB',
    bio: "Alexandra is an experienced commercial attorney who consults across several of the firm's practice areas, bringing broad transactional and advisory expertise to complex client mandates. Her depth of knowledge in South African commercial law, combined with her practical deal experience, makes her a valued resource on matters requiring senior input and nuanced legal judgment.",
    image: '/alexandra-rakitzis-ho.png',
    email: 'info@steinscop.com',
    practiceAreas: ['Corporate Commercial', 'Transactional Law', 'Advisory'],
  },
  {
    id: 'natalie-napier',
    name: 'Natalie Napier',
    title: 'Consultant',
    qualifications: 'LLB',
    bio: "Natalie provides specialist consulting support to Stein Scop's commercial and litigation practices, drawing on extensive experience across South African commercial law. She advises on a range of matters requiring senior practitioner input, and her collegial working style and deep understanding of commercial dynamics make her an effective contributor to the firm's most complex client engagements.",
    image: '/natalie-napier.png',
    email: 'info@steinscop.com',
    practiceAreas: ['Commercial Litigation', 'Commercial Law', 'Advisory'],
  },
];

export const seniorAssociates: TeamMember[] = [
  {
    id: 'liebet-grobler',
    name: 'Liebet Grobler',
    title: 'Senior Associate',
    qualifications: 'LLB',
    bio: 'Liebet is a Senior Associate at Stein Scop with broad experience across commercial litigation, corporate transactions, and regulatory matters. She works closely with the firm\'s directors on complex commercial mandates, bringing a methodical approach to both dispute resolution and transactional work. Her practice spans contractual disputes, corporate advisory, and employment-related matters.',
    image: '/liebet-grobler.png',
    email: 'info@steinscop.com',
    practiceAreas: ['Commercial Litigation', 'Corporate Commercial', 'Employment Law'],
  },
  {
    id: 'simone-meades',
    name: 'Simone Meades',
    title: 'Senior Associate',
    qualifications: 'LLB',
    bio: 'Simone is a Senior Associate whose practice focuses on commercial dispute resolution and corporate advisory work. She assists directors on high-value litigation matters and transactional mandates, and is known for her thorough legal analysis and strong client communication skills. Simone brings both precision and pragmatism to every matter she handles.',
    image: '/simone-meades.png',
    email: 'info@steinscop.com',
    practiceAreas: ['Commercial Litigation', 'Corporate Advisory', 'Dispute Resolution'],
  },
  {
    id: 'lauren-brabant',
    name: 'Lauren Brabant',
    title: 'Senior Associate',
    qualifications: 'LLB',
    bio: 'Lauren is a Senior Associate with experience spanning mergers and acquisitions, general commercial law, and contract drafting. She plays an integral role in the firm\'s transactional practice, supporting directors on cross-border M&A mandates and corporate commercial matters. Her ability to manage complex transaction workstreams efficiently has made her a valued member of the firm\'s deal team.',
    image: '/lauren-brabant.png',
    email: 'info@steinscop.com',
    practiceAreas: ['Mergers & Acquisitions', 'Corporate Commercial', 'Contract Law'],
  },
];

export const associates: TeamMember[] = [
  {
    id: 'brooke-badenhorst',
    name: 'Brooke Badenhorst',
    title: 'Associate',
    qualifications: 'LLB',
    bio: 'Brooke is an Associate in the firm\'s commercial practice, assisting directors across a range of corporate and commercial matters. She has developed particular competence in contract drafting, corporate governance advisory, and commercial dispute support. Her diligence and attention to detail have made her an effective contributor to the firm\'s transactional and litigation teams.',
    image: '/brooke-badenhorst.png',
    email: 'info@steinscop.com',
    practiceAreas: ['Corporate Commercial', 'Contract Law', 'Corporate Governance'],
  },
  {
    id: 'jacques-erasmus',
    name: 'Jacques Erasmus',
    title: 'Associate',
    qualifications: 'LLB',
    bio: 'Jacques is an Associate whose practice spans commercial litigation, corporate advisory, and employment law. He works closely with the firm\'s senior attorneys on complex disputes and transactional mandates, bringing sharp analytical skills and a practical approach to legal problem-solving. Jacques is a committed member of the firm\'s litigation support team.',
    image: '/jacques-erasmus.png',
    email: 'info@steinscop.com',
    practiceAreas: ['Commercial Litigation', 'Corporate Advisory', 'Employment Law'],
  },
  {
    id: 'naledi-lekena',
    name: 'Naledi Lekena',
    title: 'Associate',
    qualifications: 'LLB',
    bio: 'Naledi is an Associate with a focus on commercial law, dispute resolution, and regulatory compliance. She brings a keen intellect and strong research capabilities to her work, supporting the firm\'s directors on a wide range of advisory and litigation matters. Naledi is committed to delivering rigorous, well-considered legal work on every mandate.',
    image: '/naledi-lekena.png',
    email: 'info@steinscop.com',
    practiceAreas: ['Commercial Law', 'Dispute Resolution', 'Regulatory Compliance'],
  },
  {
    id: 'marco-vieira',
    name: 'Marco Vieira',
    title: 'Associate',
    qualifications: 'LLB',
    bio: 'Marco is an Associate with experience in corporate transactions, commercial drafting, and litigation support. He assists directors across a broad range of mandates, with particular involvement in M&A transaction support, contract review, and corporate restructuring matters. His commercial awareness and work ethic are consistently recognised by the firm\'s directors.',
    image: '/marco-vieira.png',
    email: 'info@steinscop.com',
    practiceAreas: ['Mergers & Acquisitions', 'Corporate Commercial', 'Commercial Drafting'],
  },
];

export const candidateAttorneys: TeamMember[] = [
  {
    id: 'keagan-devonport',
    name: 'Keagan Devonport',
    title: 'Candidate Attorney',
    qualifications: 'LLB',
    bio: 'Keagan is a Candidate Attorney completing his articles at Stein Scop. He works across the firm\'s commercial, litigation, and corporate practice areas, gaining broad exposure to complex, director-led mandates. His enthusiasm and commitment to legal excellence reflect the firm\'s values from the outset of his professional career.',
    image: 'https://www.steinscop.com/wp-content/uploads/2023/04/keagan.jpeg',
    email: 'info@steinscop.com',
    practiceAreas: ['Commercial Law', 'Litigation', 'Corporate'],
  },
  {
    id: 'javahl-balia',
    name: 'Javahl Balia',
    title: 'Candidate Attorney',
    qualifications: 'LLB',
    bio: 'Javahl is a Candidate Attorney whose articles expose him to the full breadth of the firm\'s commercial and litigation practice. He assists directors and senior associates on a range of matters, developing the analytical rigour and commercial judgment that define the Stein Scop standard. Javahl brings a sharp mind and a strong work ethic to every instruction he receives.',
    image: '/javahl-balia.png',
    email: 'info@steinscop.com',
    practiceAreas: ['Commercial Law', 'Dispute Resolution', 'Corporate'],
  },
  {
    id: 'yola-elefu',
    name: 'Yola Elefu',
    title: 'Candidate Attorney',
    qualifications: 'LLB',
    bio: 'Yola is a Candidate Attorney completing her articles at the firm. She is gaining comprehensive exposure to Stein Scop\'s commercial, employment, and litigation practices, working directly alongside directors and senior associates. Yola combines intellectual curiosity with a disciplined approach to legal work, and has quickly established herself as a valued member of the team.',
    image: '/yola-elefu.png',
    email: 'info@steinscop.com',
    practiceAreas: ['Commercial Law', 'Employment Law', 'Litigation'],
  },
  {
    id: 'nikita-rama',
    name: 'Nikita Rama',
    title: 'Candidate Attorney',
    qualifications: 'LLB',
    bio: 'Nikita is a Candidate Attorney whose articles at Stein Scop provide exposure to complex director-led mandates across commercial law, corporate transactions, and dispute resolution. She brings diligence, precision, and a genuine commitment to client service to all aspects of her work, embodying the firm\'s standards from the earliest stage of her legal career.',
    image: '/nikita-rama.png',
    email: 'info@steinscop.com',
    practiceAreas: ['Commercial Law', 'Corporate', 'Dispute Resolution'],
  },
];

export const management: TeamMember[] = [
  {
    id: 'yolande-de-waal',
    name: 'Yolandé de Waal',
    title: 'Chief Operating Officer',
    qualifications: '',
    bio: 'Yolandé oversees the operational infrastructure of Stein Scop, ensuring that the firm\'s internal systems, processes, and support functions operate at the highest standard. Her leadership enables the firm\'s directors and attorneys to focus on delivering exceptional legal service, while the operational backbone of the practice is managed with precision and efficiency.',
    image: '/yolande-de-waal.png',
    email: 'info@steinscop.com',
    practiceAreas: ['Operations', 'Firm Management'],
  },
  {
    id: 'franco-smit',
    name: 'Franco Smit',
    title: 'Chief Financial Officer',
    qualifications: '',
    bio: 'Franco is responsible for the financial management and reporting of Stein Scop Attorneys Inc. He oversees the firm\'s financial controls, budgeting, and compliance frameworks, ensuring that the practice is well-governed and financially sound. His expertise supports the firm\'s continued growth and stability across all practice areas.',
    image: '/franco-smit.png',
    email: 'info@steinscop.com',
    practiceAreas: ['Finance', 'Firm Management'],
  },
];

export const allMembers: TeamMember[] = [...directors, ...consultants, ...seniorAssociates, ...associates, ...candidateAttorneys, ...management];
