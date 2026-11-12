import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { FileText, Download, ExternalLink, ShieldCheck, Scale, Cookie, MapPin, Phone } from 'lucide-react';

type TabKey = 'popia' | 'paia' | 'cookies';

interface PolicySection {
  num: string;
  title: string;
  intro?: string;
  paragraphs?: string[];
  items?: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
  footer?: string;
}

const popiaSections: PolicySection[] = [
  {
    num: '1',
    title: 'Definitions / Acronyms',
    intro: 'Unless clearly inconsistent with or otherwise indicated by the context:',
    items: [
      '1.1 Client means a client of the Firm;',
      '1.2 Constitution means the Constitution of the Republic of South Africa, No. 108 of 1996;',
      '1.3 Data Subject means the person to whom Personal Information relates as defined in section 1 of POPIA;',
      '1.4 Deputy Information Officer means the person designated as the deputy information officer of the Firm from time to time;',
      '1.5 EEA means Employment Equity Act, No. 55 of 1998 (as amended);',
      '1.6 Employee means an employee of the Firm who has access to and/or is responsible for Processing the Personal Information of Data Subjects;',
      '1.7 FICA means the Financial Intelligence Centre Act, No. 38 of 2001 (as amended);',
      '1.8 Firm means Stein Scop Attorneys Incorporated (registration number: 2015/306625/21), a personal liability company incorporated in accordance with the laws of the Republic;',
      '1.9 GDPR means the European Union\'s General Data Protection Regulation 2016/679;',
      '1.10 Information Officer means the person designated as the information officer of the Firm from time to time;',
      '1.11 LPA means the Legal Practice Act, No. 28 of 2014 (as amended);',
      '1.12 LPC means the South African Legal Practice Council established in terms of section 4 of the LPA;',
      '1.13 LRA means Labour Relations Act, No. 66 of 1995 (as amended);',
      '1.14 Operator means a person who Processes Personal Information for a Responsible Party in terms of a contract or mandate, without coming under the direct authority of that party;',
      '1.15 Personal Information means information relating to an identifiable, living, natural person, and where it is applicable, an identifiable, existing juristic person, including, but not limited to: (1.15.1) race, gender, sex, pregnancy, marital status, national, ethnic or social origin, colour, sexual orientation, age, physical or mental health, well-being, disability, religion, conscience, belief, culture, language and birth; (1.15.2) education or medical, financial, criminal or employment history; (1.15.3) any identifying number, symbol, e-mail address, physical address, telephone number, location information, online identifier or other particular assignment; (1.15.4) biometric information; (1.15.5) personal opinions, views or preferences; (1.15.6) private or confidential correspondence; (1.15.7) views or opinions of another individual about the person; and (1.15.8) the name of the person if it appears with other Personal Information or if its disclosure would reveal information about the person;',
      '1.16 Policy means this Policy, as amended from time to time;',
      '1.17 POPIA means the Protection of Personal Information Act, No. 4 of 2013;',
      '1.18 POPIA Regulations means the Regulations relating to the Protection of Personal Information promulgated in terms of section 112(2) of POPIA;',
      '1.19 Processing means any operation or activity or any set of operations, whether or not by automatic means, concerning Personal Information, including: (1.19.1) collection, receipt, recording, organisation, collation, storage, updating or modification, retrieval, alteration, consultation or use; (1.19.2) dissemination by means of transmission, distribution or making available in any other form; or (1.19.3) merging, linking, as well as restriction, degradation, erasure or destruction of information;',
      '1.20 Regulator means the Information Regulator established in terms of section 39 of POPIA;',
      '1.21 Republic means the Republic of South Africa;',
      '1.22 Responsible Party means a public or private body or any other person which, alone or in conjunction with others, determines the purpose of and means for Processing Personal Information; and',
      '1.23 Special Personal Information means Personal Information as referred to in section 26 of POPIA, concerning religious or philosophical beliefs, race or ethnic origin, trade union membership, political persuasion, health or sex life, biometric information, or criminal behaviour.',
    ],
  },
  {
    num: '2',
    title: 'Introduction',
    items: [
      '2.1 The Firm is a law firm of legal practitioners operating within the Republic and regulated in terms of the LPA.',
      '2.2 Section 14 of the Constitution enshrines the right of privacy for every individual.',
      '2.3 POPIA was enacted to give further effect to this constitutional right to privacy and, as such, the purpose of POPIA is to, amongst other things, ensure that Data Subjects\' Personal Information is safeguarded when it is Processed by a Responsible Party, subject to justifiable limitations that are aimed at: (2.3.1) balancing the right to privacy against other rights, particularly the right of access to information; and (2.3.2) protecting important interests, including the free flow of information within the Republic and across international borders.',
    ],
  },
  {
    num: '3',
    title: 'Policy',
    items: [
      '3.1 This Policy has been prepared in accordance with POPIA (and the POPIA Regulations) for the Firm and its purpose is to regulate the manner in which the Firm, as a Responsible Party and, in certain limited instances, as an Operator, Processes the Personal Information and Special Personal Information of Data Subjects.',
      '3.2 This Policy will be updated on a regular basis and will be made available: (3.2.1) on the Firm\'s website; (3.2.2) at the Firm\'s principal place of business for public inspection during normal business hours; and (3.2.3) to the Regulator upon request.',
    ],
  },
  {
    num: '4',
    title: 'Effective Date and Applicability of Policy',
    items: [
      '4.1 This Policy will be effective from 7 June 2021 and will be reviewed on a regular basis.',
      '4.2 This Policy applies to: (4.2.1) all Data Subjects whose Personal Information is Processed by the Firm; (4.2.2) to the Firm and all Employees of the Firm who are responsible for Processing the Personal Information of Data Subjects; and (4.2.3) to all Operators engaged by the Firm.',
    ],
  },
  {
    num: '5',
    title: 'Personal Information Collected',
    intro: 'The Personal Information which the Firm Processes can be broadly divided into the following categories:',
    table: {
      headers: ['Category of Records', 'Description of Records'],
      rows: [
        ['5.1 Financial records', 'Financial statements, financial, accounting and taxation records'],
        ['5.2 Company secretarial', 'Incorporation documents, company register, company records'],
        ['5.3 FICA records', 'Customer due diligence records and all other FICA-related records'],
        ['5.4 Client data', 'Client-related records'],
        ['5.5 Human Resources', 'Employee-related records, employment equity data, payroll data'],
        ['5.6 Marketing', 'Marketing-related records, client mailing list'],
        ['5.7 Administration', 'Supplier-related records, insurance-related records, LPC-related records, internal policies and procedures, health and safety-related documents, information technology-related records'],
      ],
    },
  },
  {
    num: '6',
    title: 'Special Personal Information',
    items: [
      '6.1 The Firm may be required to Process Special Personal Information and is permitted to do so in the following circumstances: (6.1.1) the Processing is carried out with the consent of a Data Subject; (6.1.2) the Processing is necessary for the establishment, exercise or defence of a right or obligation in law; (6.1.3) the Processing is necessary to comply with an obligation of international public law; (6.1.4) the Processing is for historical, statistical or research purposes where the purpose serves a public interest or asking for consent is impossible or involves a disproportionate effort and sufficient guarantees are provided; or (6.1.5) information has deliberately been made public by the Data Subject.',
      '6.2 To the extent that the Firm is required to Process any Special Personal Information in any other circumstances other than those listed above, the Firm will obtain consent of Data Subjects to process the Special Personal Information. If any Employee is uncertain whether consent of the Data Subject is required, such Employee must seek guidance from the Information Officer or Deputy Information Officer.',
    ],
  },
  {
    num: '7',
    title: 'Personal Information of Children',
    items: [
      '7.1 The Firm does not intend to Process any Personal Information relating to children. The Firm will only Process the Personal Information of children where the Processing is: (7.1.1) carried out with the prior consent of a competent person; (7.1.2) necessary for the establishment, exercise or defence of a right or obligation in law; (7.1.3) necessary to comply with an obligation of international public law; (7.1.4) for historical, statistical or research purposes with sufficient guarantees; or (7.1.5) of Personal Information which has deliberately been made public by the child with the consent of a competent person.',
    ],
  },
  {
    num: '8',
    title: 'Consent, Justification and Objection',
    items: [
      '8.1 Personal Information of a Data Subject may only be Processed if the Data Subject consents to the Processing or if one of the following justifiable circumstances apply: (8.1.1) the Processing is necessary to carry out actions for the conclusion or performance of a contract to which the Data Subject is party; (8.1.2) the Processing complies with an obligation imposed by law on the Firm; (8.1.3) the Processing protects a legitimate interest of the Data Subject; (8.1.4) the Processing is necessary for the proper performance of a public law duty by a public body; or (8.1.5) the Processing is necessary for pursuing the legitimate interests of the Firm or of a third party to whom the information is supplied.',
      '8.2 Save where the Processing falls within one or more of the aforementioned justifiable circumstances, Data Subjects may withdraw the consent given to the Firm to Process Personal Information at any time in writing addressed to the Information Officer and/or Deputy Information Officer.',
      '8.3 Data Subjects may object, at any time, to the Processing of Personal Information: (8.3.1) in the circumstances referred to in paragraphs 8.1.3 to 8.1.5 above, in the prescribed manner on Form 1 attached to the POPIA Regulations (Schedule 1 to this Policy); or (8.3.2) for purposes of direct marketing other than direct marketing by means of unsolicited electronic communications as referred to in section 69 of POPIA.',
      '8.4 If a Data Subject has objected to the Processing of Personal Information as per paragraph 8.3 above, the Firm will no longer Process the Personal Information.',
    ],
  },
  {
    num: '9',
    title: 'Purpose for Which the Personal Information is Collected',
    intro: '9.1 The Processing of Personal Information will be limited to lawful Processing across the eight conditions of lawful Processing in POPIA (Accountability, Processing limitation, Purpose specification, Further Processing limitation, Information quality, Openness, Security safeguards, and Data subject participation). 9.3 The purpose and justification for which Personal Information is collected by the Firm is set out below:',
    table: {
      headers: ['Category', 'Data Subject', 'Purpose of Processing', 'Consent / Justification (s11(1) of POPIA)'],
      rows: [
        ['Financial Records', 'Firm / Clients / Correspondents / Creditors', 'Financial reporting, tax compliance, provision of legal services, receipt of business services', 'Obligation imposed by law (s11(1)(c)) & Necessary for performance of contract (s11(1)(b))'],
        ['Company Secretarial', 'Firm, shareholders, Employees, auditors', 'Maintenance of Firm records and financial reporting', 'Obligation imposed by law (s11(1)(c))'],
        ['FICA Records', 'Clients, prospective clients and connected persons (including ultimate beneficial owners)', 'Compliance with FICA as an Accountable Institution', 'Obligation imposed by law (s11(1)(c) and s27(1)(b))'],
        ['Client Data', 'Clients and other relevant third parties', 'Provision of legal services', 'Performance of contract (s11(1)(b)), legitimate interest of Data Subject (s11(1)(d)), establishment/defence of a right in law (s27(1)(b) / s35(1)(b))'],
        ['Human Resources', 'Firm and Employees', 'Business operations and compliance with labour laws', 'Obligation imposed by law (s11(1)(c) and s33(2) & (3))'],
        ['Marketing', 'Firm, Employees and Clients', 'Marketing', 'Consent of Data Subject required (s11(1)(a))'],
        ['Administration', 'Firm, Employees, Clients and suppliers', 'Business operations', 'Obligation imposed by law (s11(1)(c)), performance of contract (s11(1)(b)), legitimate interests of Responsible Party (s11(1)(f)), or consent (s11(1)(a))'],
      ],
    },
  },
  {
    num: '10',
    title: 'Information Processed by the Firm as an Operator',
    items: [
      '10.1 Where the Firm Processes Personal Information or Special Personal Information as an Operator (for example where the Firm acts as correspondent attorneys on behalf of another law firm), the Firm will: (10.1.1) Process such information only with the knowledge or authorisation of the Responsible Party; and (10.1.2) treat such information as confidential and not disclose it, unless required by law or in the course of the proper performance of its duties as an Operator.',
      '10.2 Where the Firm acts as an Operator it is entitled to assume that the Responsible Party has complied with POPIA in obtaining and Processing the Personal Information or Special Personal Information.',
    ],
  },
  {
    num: '11',
    title: 'Recipient/s of the Personal Information',
    items: [
      '11.1 Employees of the Firm who have access to Personal Information are required to process it only with consent or under justifiable circumstances, use it only for the purpose obtained, maintain security and confidentiality, notify the Information Officer immediately of any suspected unauthorised access, and not retain it longer than necessary.',
      '11.2 Third party vendors or Operators processing data on behalf of the Firm are required to treat Personal Information as confidential, maintain adequate security measures, and notify the Firm immediately of any suspected unauthorised access.',
      '11.3 Where Personal Information is transferred outside of South Africa, the recipient must be subject to a law, binding corporate rules, or binding agreement providing an adequate level of protection substantially similar to POPIA.',
      '11.4 Only the following parties will have access to the Personal Information: (11.4.1) the Firm\'s authorised directors, shareholders and Employees; (11.4.2) third party vendors or Operators (accountants and auditors, correspondents, suppliers, financial institutions, counsel); (11.4.3) regulatory authorities (including SARS, LPC, CIPC, FIC, Director-General of Labour Department and Department of Health); and (11.4.4) Clients\' nominated recipients.',
    ],
  },
  {
    num: '12',
    title: 'Rights of Data Subjects',
    items: [
      '12.1 A Data Subject has the right to have their Personal Information processed in accordance with the conditions for lawful Processing, including the right: (12.1.1) to be notified when Personal Information is collected (s18) or accessed by an unauthorised person (s22); (12.1.2) to establish whether the Firm holds Personal Information and to request access (s23); (12.1.3) to request correction, destruction or deletion of Personal Information on Form 2 (Schedule 2 to this Policy) in terms of section 24; (12.1.4) to object on reasonable grounds in terms of section 11(3)(a); (12.1.5–12.1.6) to object to processing for direct marketing (s11(3)(b) and s69); (12.1.7) not to be subject to automated profiling decisions (s71); (12.1.8) to submit a complaint to the Regulator (s74); and (12.1.9) to institute civil proceedings (s99).',
    ],
  },
  {
    num: '13–16',
    title: 'Rectification, Retention, Information Officer Duties & Security Safeguards',
    items: [
      '13. Right to Rectify: Data Subjects have the right to access and rectify Personal Information provided to the Firm and undertake to report changes to keep data accurate.',
      '14. Retention: Records of Personal Information will not be retained any longer than necessary for achieving the purpose for which it was collected unless required or authorised by law, reasonably required for lawful functions or activities, required by contract, or consented to by the Data Subject.',
      '15. Duties of Information Officer & Deputy Information Officer: Responsible for ensuring compliance with POPIA, working with the Regulator, and dealing with requests from Data Subjects.',
      '16. Security Safeguards: The Firm limits the number of persons who have access to Personal Information, maintains security on internal servers and physical files, notifies the Regulator and Data Subject in writing if unauthorised access occurs, and ensures third-party Operators maintain adequate security measures.',
    ],
  },
  {
    num: '17–19',
    title: 'Failure to Provide Information, Complaints Procedure & GDPR',
    items: [
      '17. Consequences of Failure to Provide Personal Information: Where Personal Information is mandatory to comply with statutory obligations, failure to provide it or furnish consent will render the Firm unable to carry out the client mandate.',
      '18. Complaints Procedure: Data Subjects may address complaints in writing to the Information Officer or Deputy Information Officer within five (5) working days of the occurrence. The Information Officer will endeavour to resolve the complaint within five (5) working days. Data Subjects may also lodge a complaint directly with the Information Regulator using Part I of Form 5 (Schedule 3 to this Policy) at: General enquiries: enquiries@inforegulator.org.za | Complaints: POPIAComplaints@inforegulator.org.za | Tel: 010 023 5200 | Physical address: JD House, 27 Stiemens Street, Braamfontein, Johannesburg, 2001.',
      '19. GDPR: To the extent applicable where the Firm processes data of European Union citizens or residents, the Firm will ensure compliance with the provisions of the GDPR (EU 2016/679).',
    ],
  },
  {
    num: '20',
    title: 'Contact Details & Statutory Schedules (Forms 1, 2 & 5)',
    items: [
      'Information Officer: Safiyyah Buckas — safiyyah@steinscop.com',
      'Deputy Information Officer(s): Casper Badenhorst — casper@steinscop.com',
      'Postal Address: Postnet Suite 274, Private Bag X1, Melrose Arch, 2076',
      'Physical Address: Second Floor Capital Hill, 6 Benmore Road, Morningside, Sandton, 2057',
      'Telephone Number: +27(0)11 380 8080 | Email Address: info@steinscop.com | Website: www.steinscop.com',
    ],
    footer:
      'Schedules included in the downloadable POPIA Policy PDF: Schedule 1 (Form 1 — Objection to the Processing of Personal Information in terms of Section 11(3)), Schedule 2 (Form 2 — Request for Correction or Deletion of Personal Information in terms of Section 24(1)), and Schedule 3 (Part I of Form 5 — Complaint Regarding Interference with the Protection of Personal Information in terms of Section 74).',
  },
];

const paiaSections: PolicySection[] = [
  {
    num: '1',
    title: 'Definitions / Acronyms',
    intro: 'Unless clearly inconsistent with or otherwise indicated by the context:',
    items: [
      '1.1 Deputy Information Officer means the person designated as the deputy information officer of the Firm from time to time, being the person designated as such by the Information Officer;',
      '1.2 FICA means the Financial Intelligence Centre Act, No. 38 of 2001 (as amended);',
      '1.3 Firm means Stein Scop Attorneys Incorporated (registration number: 2015/306625/21), a personal liability company incorporated in accordance with the laws of the Republic;',
      '1.4 Information Officer means the person designated as the information officer of the Firm from time to time, being the person authorised to handle PAIA requests;',
      '1.5 Information Regulator means the Information Regulator established in terms of section 39 of POPIA;',
      '1.6 LPA means the Legal Practice Act, No. 28 of 2014 (as amended);',
      '1.7 Manual means this Manual, as amended from time to time;',
      '1.8 PAIA means the Promotion of Access to Information Act, No. 2 of 2000 (as amended);',
      '1.9 POPIA means the Protection of Personal Information Act, No. 4 of 2013;',
      '1.10 Republic means the Republic of South Africa; and',
      '1.11 SAHRC means the South African Human Rights Commission.',
    ],
  },
  {
    num: '2–3',
    title: 'Introduction & Purpose of Manual',
    items: [
      '2. Introduction: The Firm is a law firm of legal practitioners operating within the Republic and regulated in terms of the LPA.',
      '3.1 This Manual has been prepared in accordance with section 51 of PAIA for the Firm and its purpose is to provide information to those who wish to request access to records of the Firm in terms of PAIA.',
      '3.2 This Manual will be updated on a regular basis and will be made available: (3.2.1) on the Firm\'s website; (3.2.2) at the Firm\'s principal place of business for public inspection during normal business hours, at no cost; (3.2.3) to any person upon request and upon payment of the prescribed fee (Schedule 2); and (3.2.4) to the Information Regulator upon request.',
    ],
  },
  {
    num: '4',
    title: 'Contact Details',
    items: [
      'Directors: Bradley Scop, Glenn Stein, Sian van der Weele, Safiyyah Buckas, Casper Badenhorst, Brooke Roxburgh, Jemma Brasler and Simone Meades',
      'Head of the Firm: Bradley Scop — bradley@steinscop.com',
      'Information Officer: Safiyyah Buckas — safiyyah@steinscop.com',
      'Deputy Information Officer(s): Casper Badenhorst — casper@steinscop.com',
      'Postal Address: Postnet Suite 274, Private Bag X1, Melrose Arch, 2076',
      'Physical Address: Second Floor Capital Hill, 6 Benmore Road, Morningside, Sandton, 2057',
      'Telephone Number: +27(0)11 380 8080 | Email Address: info@steinscop.com | Website: www.steinscop.com',
    ],
  },
  {
    num: '5–7',
    title: 'PAIA, Section 10 Guide & Section 52 Disclosure',
    items: [
      '5. PAIA: Grants a requester access to records of a private body if the record is required for the exercise or protection of any rights. Requests shall be made in accordance with the prescribed procedures and rates in paragraphs 11 and 12.',
      '6.1 SAHRC Section 10 Guide: Braampark Forum, 33 Hoofd Street, Braamfontein, 2017 | Tel: +27(0)11 877 3600 | Website: www.sahrc.org.za.',
      '6.2 Information Regulator: JD House, 27 Stiemens Street, Braamfontein, 2001 | General Enquiries: inforeg@justice.gov.za | Website: www.justice.gov.za/inforeg.',
      '7. Section 52 Disclosure: No records are available in terms of section 52 of PAIA.',
    ],
  },
  {
    num: '8',
    title: 'Records Available in Terms of Other Legislation',
    intro: 'The following are some of the statutes in terms of which records are held by the Firm (this is not an exhaustive list and these records are not necessarily available to requesters in terms of PAIA):',
    items: [
      'Companies Act, 71 of 2008',
      'Basic Conditions of Employment Act, 75 of 1997',
      'Employment Equity Act, 55 of 1998',
      'Financial Intelligence Centre Act, 38 of 2001',
      'Income Tax Act, 58 of 1962',
      'Labour Relations Act, 66 of 1995',
      'Legal Practice Act, 28 of 2014',
      'Occupational Health and Safety Act, 85 of 1993',
      'Skills Development Act, 97 of 1998',
      'Value-Added Tax Act, 89 of 1991',
    ],
  },
  {
    num: '9',
    title: 'Schedule of Records',
    intro: 'The Firm holds the following categories of records in relation to the following subjects (subject to section 63(1) of PAIA):',
    table: {
      headers: ['Category of Records', 'Description of Records'],
      rows: [
        ['Financial Records', 'Financial statements, financial, accounting and taxation records'],
        ['Company Secretarial', 'Incorporation documents, company register, company records'],
        ['FICA Records', 'Customer due diligence records and all other FICA-related records'],
        ['Client Data', 'Client-related records'],
        ['Human Resources', 'Employee-related records, employment equity data, payroll data'],
        ['Marketing', 'Marketing-related records, client mailing list'],
        ['Administration', 'Supplier-related records, insurance-related records, Legal Practice Council-related records, internal policies and procedures, health and safety-related documents, information technology-related records'],
      ],
    },
  },
  {
    num: '10',
    title: 'POPIA Disclosures (Section 51(1)(c) of PAIA)',
    items: [
      '10.1 Categories of Personal Information, Data Subjects, Purpose of Processing, and Categories of Recipients are detailed in the statutory table in Section 10.1 of the Manual (covering Financial Records, Company Secretarial, FICA Records, Client Data, Human Resources, Marketing, and Administration).',
      '10.2 Planned Transborder Flows of Information (s51(1)(c)(iv)): (10.2.1) transfer of the Firm\'s data stored on Microsoft Office 365 Exchange and backed up into the cloud located in the European Union (Microsoft Office 365 Trust Centre) and Microsoft Power Apps located in the UK Microsoft Office 365 Trust Centre; (10.2.2) possible transfer of client information to correspondents (such as foreign law firms) as part of rendering legal professional services; and (10.2.3) transfer of Firm and employee-related information for marketing, all in accordance with section 72 of POPIA.',
      '10.3 Information Security Measures (s51(1)(c)(v)): The Firm has implemented encrypted back-ups, secure hosted services, anti-malware, and firewalls to ensure the confidentiality, integrity, and availability of any information processed by the Firm.',
    ],
  },
  {
    num: '11',
    title: 'Request Procedure',
    items: [
      '11.1 A request for access to records held by the Firm must be made by completing the prescribed Form C (attached as Schedule 1 to the Manual).',
      '11.2 The request form must identify: (11.2.1) the record(s) requested; (11.2.2) the requester (and proof of capacity if acting on behalf of another person); (11.2.3) the form of access required; (11.2.4) the postal address, telephone number, email address and/or fax number of the requester within the Republic; (11.2.5) the preferred manner of notification; and (11.2.6) the right which the requester is seeking to exercise or protect with an explanation of why the record is required.',
      '11.3–11.4 The completed request form must be submitted to the Information Officer, Deputy Information Officer, or Head of the Firm, who shall decide within 30 days whether or not to grant the request.',
      '11.5–11.7 Requests are subject to the grounds of refusal in Chapter 4 of Part 3 of PAIA and third-party notification procedures in sections 71 to 73 of PAIA.',
    ],
  },
  {
    num: '12–13',
    title: 'Prescribed Fees (Schedule 2) & Disclaimer',
    table: {
      headers: ['Description', 'Prescribed Fee'],
      rows: [
        ['Copy of Manual (per A4 page or part thereof)', 'R1.10'],
        ['Request Fee', 'R50.00'],
        ['Access Fee — Copy per A4 page (or part thereof)', 'R1.10'],
        ['Access Fee — Printing per A4 page (or part thereof)', 'R0.75'],
        ['Access Fee — Copy on a CD', 'R70.00'],
        ['Access Fee — Transcription of visual images per A4 page / Copy of visual image', 'R40.00 / R60.00'],
        ['Access Fee — Transcription of audio recording per A4 page / Copy of audio recording', 'R20.00 / R30.00'],
        ['Search and preparation of record for disclosure (beyond 6 prescribed hours)', 'R30.00 per hour (or part thereof)'],
        ['Postage Fee', 'Actual Postage Fee'],
      ],
    },
    footer:
      '13. Disclaimer: No information provided in this Manual shall in any way be construed as legal advice from the Firm and/or any of its personnel, and the Firm does not warrant the correctness, completeness or accuracy of the information contained in this Manual.',
  },
];

export default function PrivacyPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawTab = searchParams.get('tab');
  const activeTab: TabKey =
    rawTab === 'paia' ? 'paia' : rawTab === 'cookies' ? 'cookies' : 'popia';

  const setTab = (tab: TabKey) => {
    setSearchParams(tab === 'popia' ? {} : { tab }, { replace: true });
  };

  const openCookiePreferences = () => {
    window.dispatchEvent(new CustomEvent('open-cookie-banner'));
  };

  return (
    <main className="bg-brand-cream min-h-screen text-brand-primary">
      <Helmet>
        <title>Privacy Policy, POPIA &amp; PAIA Manual | Stein Scop Attorneys</title>
        <meta
          name="description"
          content="Official POPIA Policy (Act 4 of 2013) and Section 51 PAIA Manual (Act 2 of 2000) for Stein Scop Attorneys Incorporated (Reg. No. 2015/306625/21)."
        />
      </Helmet>

      {/* Hero — Matches Practice Areas standard */}
      <section className="pt-36 pb-12 px-6 md:px-12 lg:px-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <span className="text-xs uppercase tracking-[0.4em] text-brand-accent font-bold">
              Statutory Compliance
            </span>
            <h1 className="text-6xl md:text-8xl font-serif leading-tight italic">
              Privacy &amp; PAIA
            </h1>
            <p className="text-xl font-light text-brand-primary/60 max-w-2xl leading-relaxed text-pretty">
              Our official Protection of Personal Information Act (POPIA) Policy,{' '}
              <span className="whitespace-nowrap">Section 51 PAIA Manual,</span> and website cookie information.
            </p>
            <div className="w-16 h-px bg-brand-accent" />
          </motion.div>
        </div>
      </section>

      {/* Official PDF Download Cards & Statutory Entity Dossier */}
      <section className="bg-white py-14 lg:py-20 px-6 md:px-12 lg:px-24 border-t border-brand-border">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Top Dossier Grid: Left Statutory Entity Info (5 cols) + Right Official PDF Downloads (7 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Statutory Registration Dossier */}
            <div className="lg:col-span-5 bg-brand-primary text-brand-cream rounded-2xl p-8 lg:p-10 border border-brand-accent/30 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-brand-accent font-semibold">
                    Company Registration
                  </span>
                  <span className="text-[11px] font-mono text-white/50">
                    2015/306625/21
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl font-serif text-white mb-1">
                    Stein Scop Attorneys Inc.
                  </h2>
                  <p className="text-xs text-white/55 font-light">
                    Regulated in terms of the Legal Practice Act, No. 28 of 2014
                  </p>
                </div>

                <dl className="space-y-3.5 text-xs border-t border-white/10 pt-5">
                  <div className="flex justify-between gap-4">
                    <dt className="text-white/45 uppercase tracking-wider">Head of the Firm</dt>
                    <dd className="text-white font-medium text-right">
                      Bradley Scop (<a href="mailto:bradley@steinscop.com" className="text-brand-accent hover:underline">bradley@steinscop.com</a>)
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-white/45 uppercase tracking-wider">Information Officer</dt>
                    <dd className="text-white font-medium text-right">
                      Safiyyah Buckas (<a href="mailto:safiyyah@steinscop.com" className="text-brand-accent hover:underline">safiyyah@steinscop.com</a>)
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-white/45 uppercase tracking-wider">Deputy Officer</dt>
                    <dd className="text-white font-medium text-right">
                      Casper Badenhorst (<a href="mailto:casper@steinscop.com" className="text-brand-accent hover:underline">casper@steinscop.com</a>)
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="border-t border-white/10 pt-5 space-y-2 text-xs text-white/60 font-light">
                <p className="flex items-start gap-2.5">
                  <MapPin size={14} className="text-brand-accent shrink-0 mt-0.5" />
                  <span>Second Floor Capital Hill, 6 Benmore Road, Morningside, Sandton, 2057 · Postnet Suite 274, Private Bag X1, Melrose Arch, 2076</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Phone size={14} className="text-brand-accent shrink-0" />
                  <span>+27 (0)11 380 8080 · info@steinscop.com</span>
                </p>
              </div>
            </div>

            {/* Official PDF Download Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* POPIA Policy PDF Card */}
              <div className="bg-brand-cream/50 border border-brand-border hover:border-brand-accent/60 rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 group">
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <img
                      src="/popia-icon.png"
                      alt="POPIA Privacy Policy"
                      loading="lazy"
                      decoding="async"
                      width={555}
                      height={450}
                      className="h-12 w-auto object-contain"
                    />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent bg-brand-accent/10 px-3 py-1 rounded-full font-semibold">
                      POPIA Policy V2.0
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-serif text-brand-primary mb-2">
                      POPIA Privacy Policy
                    </h3>
                    <p className="text-xs text-brand-primary/65 font-light leading-relaxed">
                      The Protection of Personal Information Act, No. 4 of 2013 (POPIA) Policy (Latest Version: 9 September 2024 · Implementation Date: 7 June 2021), including Schedules 1, 2, and 3 (Forms 1, 2 &amp; 5).
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-brand-border/80 flex flex-wrap items-center gap-3">
                  <a
                    href="/Stein-Scop-POPIA-Privacy-Policy.pdf"
                    download="Stein-Scop-POPIA-Privacy-Policy.pdf"
                    className="btn inline-flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-white hover:bg-brand-accent rounded-full text-[10px] uppercase tracking-[2px] font-bold transition-colors"
                  >
                    <Download size={12} /> Download PDF
                  </a>
                  <a
                    href="/Stein-Scop-POPIA-Privacy-Policy.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn inline-flex items-center gap-1.5 px-4 py-2.5 border border-brand-primary/25 text-brand-primary hover:border-brand-accent hover:text-brand-accent rounded-full text-[10px] uppercase tracking-[1.5px] font-bold transition-colors"
                  >
                    Open PDF <ExternalLink size={11} />
                  </a>
                </div>
              </div>

              {/* PAIA Manual PDF Card */}
              <div className="bg-brand-cream/50 border border-brand-border hover:border-brand-accent/60 rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 group">
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <img
                      src="/stein-scop-knight.png"
                      alt="Stein Scop Logo"
                      loading="lazy"
                      decoding="async"
                      width={108}
                      height={144}
                      className="h-12 w-auto object-contain"
                    />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent bg-brand-accent/10 px-3 py-1 rounded-full font-semibold">
                      PAIA Manual V1.0
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-serif text-brand-primary mb-2">
                      Section 51 PAIA Manual
                    </h3>
                    <p className="text-xs text-brand-primary/65 font-light leading-relaxed">
                      The Promotion of Access to Information Act, No. 2 of 2000 (as amended) Manual (Implementation Date: 1 June 2021), including Schedule 1 (PAIA Form C) and Schedule 2 (Prescribed Fees).
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-brand-border/80 flex flex-wrap items-center gap-3">
                  <a
                    href="/Stein-Scop-PAIA-Manual.pdf"
                    download="Stein-Scop-PAIA-Manual.pdf"
                    className="btn inline-flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-white hover:bg-brand-accent rounded-full text-[10px] uppercase tracking-[2px] font-bold transition-colors"
                  >
                    <Download size={12} /> Download PDF
                  </a>
                  <a
                    href="/Stein-Scop-PAIA-Manual.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn inline-flex items-center gap-1.5 px-4 py-2.5 border border-brand-primary/25 text-brand-primary hover:border-brand-accent hover:text-brand-accent rounded-full text-[10px] uppercase tracking-[1.5px] font-bold transition-colors"
                  >
                    Open PDF <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Document Switcher Tabs */}
          <div className="pt-6 border-t border-brand-border">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
              <div className="inline-flex flex-wrap p-1.5 bg-brand-cream border border-brand-border rounded-full gap-1">
                <button
                  type="button"
                  onClick={() => setTab('popia')}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold transition-all cursor-pointer ${
                    activeTab === 'popia'
                      ? 'bg-brand-primary text-white shadow-sm'
                      : 'text-brand-primary/60 hover:text-brand-primary'
                  }`}
                >
                  <FileText size={13} />
                  POPIA Policy
                </button>
                <button
                  type="button"
                  onClick={() => setTab('paia')}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold transition-all cursor-pointer ${
                    activeTab === 'paia'
                      ? 'bg-brand-primary text-white shadow-sm'
                      : 'text-brand-primary/60 hover:text-brand-primary'
                  }`}
                >
                  <Scale size={13} />
                  PAIA Manual
                </button>
                <button
                  type="button"
                  onClick={() => setTab('cookies')}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold transition-all cursor-pointer ${
                    activeTab === 'cookies'
                      ? 'bg-brand-primary text-white shadow-sm'
                      : 'text-brand-primary/60 hover:text-brand-primary'
                  }`}
                >
                  <Cookie size={13} />
                  Cookie Settings Explained
                </button>
              </div>

              <button
                type="button"
                onClick={openCookiePreferences}
                className="text-[11px] uppercase tracking-[0.2em] font-bold text-brand-accent hover:text-brand-primary transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Cookie size={13} />
                Change My Cookie Choice
              </button>
            </div>

            {/* Tab Content: POPIA or PAIA */}
            {(activeTab === 'popia' || activeTab === 'paia') && (
              <div className="space-y-8">
                <div className="border-b border-brand-border pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-brand-accent font-bold block mb-2">
                      {activeTab === 'popia'
                        ? 'POPIA Policy V2.0 · Date of Compilation: 1 June 2021 · Latest Version: 9 September 2024 · Implementation Date: 7 June 2021'
                        : 'PAIA Manual V1.0 · Implementation Date: 1 June 2021'}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif text-brand-primary">
                      {activeTab === 'popia'
                        ? 'The Protection of Personal Information Act, No. 4 of 2013 (POPIA) Policy'
                        : 'Manual in terms of Section 51 of the Promotion of Access to Information Act, No. 2 of 2000'}
                    </h2>
                  </div>
                  <a
                    href={
                      activeTab === 'popia'
                        ? '/Stein-Scop-POPIA-Privacy-Policy.pdf'
                        : '/Stein-Scop-PAIA-Manual.pdf'
                    }
                    download
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-brand-accent hover:text-brand-primary shrink-0 transition-colors"
                  >
                    <Download size={14} /> Download Official PDF (with Forms)
                  </a>
                </div>

                <div className="divide-y divide-brand-border border-b border-brand-border">
                  {(activeTab === 'popia' ? popiaSections : paiaSections).map((sec) => (
                    <div
                      key={sec.num}
                      className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10"
                    >
                      <div className="lg:col-span-4 space-y-1">
                        <span className="text-xs font-mono text-brand-accent font-semibold">
                          Paragraph {sec.num}
                        </span>
                        <h3 className="text-xl font-serif text-brand-primary leading-snug">
                          {sec.title}
                        </h3>
                      </div>

                      <div className="lg:col-span-8 space-y-4 text-sm text-brand-primary/75 font-light leading-relaxed">
                        {sec.intro && (
                          <p className="font-normal text-brand-primary/90">{sec.intro}</p>
                        )}
                        {sec.paragraphs?.map((p, idx) => <p key={idx}>{p}</p>)}
                        {sec.items && (
                          <ul className="space-y-2.5 pl-4 border-l border-brand-accent/40">
                            {sec.items.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        )}
                        {sec.table && (
                          <div className="overflow-x-auto border border-brand-border rounded-xl">
                            <table className="w-full text-left border-collapse text-xs">
                              <thead>
                                <tr className="bg-brand-cream border-b border-brand-border text-brand-primary font-semibold">
                                  {sec.table.headers.map((h, i) => (
                                    <th key={i} className="p-3.5">
                                      {h}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-brand-border">
                                {sec.table.rows.map((row, rIdx) => (
                                  <tr key={rIdx} className="hover:bg-brand-cream/30">
                                    {row.map((cell, cIdx) => (
                                      <td
                                        key={cIdx}
                                        className={`p-3.5 align-top ${
                                          cIdx === 0 ? 'font-medium text-brand-primary' : 'text-brand-primary/75'
                                        }`}
                                      >
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                        {sec.footer && (
                          <p className="pt-2 text-xs text-brand-primary/70 bg-brand-cream/60 p-4 rounded-xl border border-brand-border">
                            {sec.footer}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab Content: Plain-English Cookie Explanation */}
            {activeTab === 'cookies' && (
              <div className="space-y-8 max-w-4xl">
                <div className="border-b border-brand-border pb-6">
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-brand-accent font-bold block mb-2">
                    Plain-Language Guide
                  </span>
                  <h2 className="text-3xl md:text-5xl font-serif text-brand-primary">
                    What Our Cookie Options Mean
                  </h2>
                </div>

                <div className="space-y-6 text-sm text-brand-primary/75 font-light leading-relaxed">
                  <p>
                    When you visit <strong>www.steinscop.com</strong>, our cookie banner gives you a simple choice between <strong>Essential Only</strong> and <strong>Accept All</strong>. Here is what each option does in plain language:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="p-6 rounded-xl bg-brand-cream/50 border border-brand-border space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-serif text-brand-primary">1. Essential Only</h3>
                        <span className="text-[10px] uppercase tracking-widest text-brand-accent font-bold bg-brand-accent/10 px-2.5 py-1 rounded-full">
                          Basic Site Function
                        </span>
                      </div>
                      <p className="text-xs text-brand-primary/70 leading-relaxed">
                        Choosing <strong>Essential Only</strong> means the website only remembers basic settings needed for your visit—such as keeping the cookie banner closed after you make a choice, and remembering that the welcome screen has already played so it does not repeat on every page.
                      </p>
                      <p className="text-xs text-brand-primary font-medium">
                        No visitor tracking or analytics are turned on.
                      </p>
                    </div>

                    <div className="p-6 rounded-xl bg-brand-cream/50 border border-brand-border space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-serif text-brand-primary">2. Accept All</h3>
                        <span className="text-[10px] uppercase tracking-widest text-brand-primary/60 font-bold bg-white border border-brand-border px-2.5 py-1 rounded-full">
                          Optional Analytics
                        </span>
                      </div>
                      <p className="text-xs text-brand-primary/70 leading-relaxed">
                        Choosing <strong>Accept All</strong> keeps the basic website settings above and also allows anonymous visitor and page-speed statistics. This helps us see which pages are visited most often and whether pages and videos load smoothly on desktop and mobile devices.
                      </p>
                      <p className="text-xs text-brand-primary font-medium">
                        All statistics are aggregated and never identify you personally.
                      </p>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-brand-primary text-brand-cream flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-base font-serif text-white">Change Your Preference Anytime</p>
                      <p className="text-xs text-white/65">
                        You can switch between <strong>Essential Only</strong> and <strong>Accept All</strong> at any time, or contact our Information Officer, Safiyyah Buckas, at{' '}
                        <a href="mailto:safiyyah@steinscop.com" className="text-brand-accent hover:underline">
                          safiyyah@steinscop.com
                        </a>.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={openCookiePreferences}
                      className="px-6 py-3 bg-brand-accent text-white rounded-full text-[10px] uppercase tracking-[2px] font-bold shrink-0 hover:bg-white hover:text-brand-primary transition-colors cursor-pointer"
                    >
                      Reopen Cookie Banner
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
