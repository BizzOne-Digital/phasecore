require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const Portfolio = require('../models/Portfolio');

const services = [
  {
    title: 'Cybersecurity, Risk & Compliance',
    slug: 'cybersecurity-risk-compliance',
    icon: 'shield',
    shortDescription: 'Secure systems, manage risk, and maintain compliance.',
    fullDescription: 'Cybersecurity, governance, and compliance services aligned to federal frameworks and industry standards. PhaseCore helps organizations identify risk, strengthen security controls, manage vulnerabilities, prepare for audits, and establish sustainable cybersecurity and compliance programs.',
    features: [
      'Cybersecurity Risk Assessments', 'Governance, Risk & Compliance (GRC)',
      'Vulnerability Management', 'Security Control Assessments',
      'NIST CSF & NIST 800-53 Support', 'CMMC Readiness Support',
      'IT General Controls (ITGC)', 'Identity & Access Management (IAM)',
      'Privileged Access Management (PAM)', 'Cloud Security Assessments',
      'Security Operations Support', 'Incident Response Support',
      'Third-Party Risk Management', 'POA&M Development & Tracking',
      'Audit Readiness & Evidence Support', 'Regulatory Compliance Support',
      'Security Policy Development', 'Cybersecurity Training & Awareness',
      'Zero Trust Readiness',
    ],
    frameworks: ['NIST CSF', 'NIST 800-53', 'ISO 27001', 'SOC 2', 'CMMC', 'PCI DSS', 'SOX', 'COBIT'],
    order: 1,
  },
  {
    title: 'IT & Digital Solutions',
    slug: 'it-digital-solutions',
    icon: 'cpu',
    shortDescription: 'Modernize, integrate, and operate secure, scalable IT environments.',
    fullDescription: 'Technology services supporting secure, scalable, and efficient IT environments — from infrastructure and systems to data and digital operations.',
    features: [
      'IT Consulting & Strategy', 'Systems Integration',
      'Technology Implementation', 'IT Modernization',
      'Cloud Migration & Support', 'Infrastructure & Network Services',
      'Systems Administration', 'Help Desk & End-User Support',
      'Application Support', 'IT Service Management (ITSM)',
      'IT Asset & Configuration Management', 'Software Implementation',
      'Data Management & Processing', 'Analytics & Business Intelligence',
      'Dashboards & Reporting', 'Database Support',
      'Digital Transformation', 'Web & Portal Support',
      'Technical Documentation', 'Technology Assessments',
    ],
    frameworks: [],
    order: 2,
  },
  {
    title: 'Management & Professional Services',
    slug: 'management-professional-services',
    icon: 'briefcase',
    shortDescription: 'Plan, execute, and improve program and organizational performance.',
    fullDescription: 'Program, project, and organizational support services focused on execution, governance, and performance improvement.',
    features: [
      'Strategic Planning', 'Organizational & Operational Assessments',
      'Business Process Improvement', 'Governance Support',
      'Policy & SOP Development', 'Performance Improvement',
      'Program & Project Management', 'PMO Support',
      'Planning & Scheduling', 'Requirements & Business Analysis',
      'Stakeholder Coordination', 'Risk & Issue Management',
      'Change Management', 'Vendor Coordination',
      'Reporting & Documentation', 'Quality Assurance',
      'Enterprise Risk Management', 'Internal Controls Assessment',
      'Compliance Monitoring', 'Audit Support',
      'Control Testing', 'Remediation Tracking', 'Regulatory Readiness',
    ],
    frameworks: [],
    order: 3,
  },
  {
    title: 'Healthcare Technology & Compliance',
    slug: 'healthcare-technology-compliance',
    icon: 'heart',
    shortDescription: 'Secure healthcare systems and support regulatory compliance.',
    fullDescription: 'IT, cybersecurity, and compliance services purpose-built for healthcare organizations and regulatory requirements.',
    features: [
      'Healthcare IT Consulting', 'Healthcare Cybersecurity',
      'HIPAA Security Support', 'Risk & Security Assessments',
      'Technology Implementation', 'Data Protection & Access Controls',
      'IT Compliance Support', 'Systems Support',
      'Vendor Risk Management', 'Healthcare Project Management',
      'Policy & Procedure Development', 'Training & Awareness',
      'Reporting & Analytics Support', 'Audit Readiness',
    ],
    frameworks: ['HIPAA'],
    order: 4,
  },
  {
    title: 'Workforce, Training & Administrative Support',
    slug: 'workforce-training-administrative-support',
    icon: 'users',
    shortDescription: 'Skilled people and scalable support that extend organizational capacity.',
    fullDescription: 'Workforce, training, and administrative services that extend organizational capacity — from staff augmentation to training and back-office support.',
    features: [
      'Cybersecurity Analysts', 'IT Specialists', 'Compliance & GRC Professionals',
      'Project & Program Managers', 'Business & Data Analysts', 'QA Professionals',
      'Administrative Staff', 'Technical Support Specialists', 'Subject Matter Experts',
      'IT & Cybersecurity Training', 'Compliance Training', 'End-User Training',
      'Workforce Development', 'Technical Workshops', 'Training Documentation',
      'Professional Development', 'Program & Project Administration',
      'Scheduling & Coordination', 'Records & Document Management',
      'Reporting Support', 'Research Assistance', 'Technical Writing',
      'SOP Development', 'Back-Office Support',
    ],
    frameworks: [],
    order: 5,
  },
  {
    title: 'Facilities & Operational Services',
    slug: 'facilities-operational-services',
    icon: 'tool',
    shortDescription: 'Facility operations and maintenance, delivered directly or through partners.',
    fullDescription: 'Facility operations and maintenance services — including selective facilities and operational support such as cleaning/janitorial, facility support, and landscaping — delivered directly or through qualified subcontractors.',
    features: [
      'Facilities Management Support', 'Operations Coordination',
      'Vendor & Maintenance Management', 'Property Support Services',
      'Commercial & Government Cleaning', 'Custodial Services',
      'Floor & Restroom Care', 'Landscaping & Grounds Maintenance',
      'Exterior & Seasonal Services',
    ],
    frameworks: [],
    order: 6,
  },
];

const portfolio = [
  {
    title: 'Security Program Transformation',
    category: 'cybersecurity',
    description: 'Built and matured cybersecurity programs aligned to NIST and CMMC requirements for a federal contractor, resulting in successful CMMC assessment readiness.',
    outcome: 'Achieved CMMC Level 2 assessment readiness within 9 months.',
    image: {
      url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80',
      publicId: 'seed-placeholder-cybersecurity',
    },
    tags: ['NIST', 'CMMC', 'Risk Management'],
    isFeatured: true,
    order: 1,
  },
  {
    title: 'Cloud Modernization Program',
    category: 'it-technology',
    description: 'Migrated legacy on-premise systems to secure cloud platforms, improving performance, scalability, and cost efficiency for a healthcare organization.',
    outcome: 'Reduced infrastructure costs by 35% while improving uptime.',
    image: {
      url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
      publicId: 'seed-placeholder-it-technology',
    },
    tags: ['Cloud', 'Migration', 'Healthcare'],
    isFeatured: false,
    order: 2,
  },
  {
    title: 'Program Management Office Standup',
    category: 'project-management',
    description: 'Established a PMO for a state agency, standardizing project delivery processes and improving on-time milestone completion rates.',
    outcome: 'Improved on-time milestone delivery from 62% to 91%.',
    image: {
      url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80',
      publicId: 'seed-placeholder-project-management',
    },
    tags: ['PMO', 'Governance', 'State Agency'],
    isFeatured: false,
    order: 3,
  },
];

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB for seeding...');

  const currentSlugs = services.map((s) => s.slug);
  await Service.deleteMany({ slug: { $nin: currentSlugs } });

  for (const s of services) {
    await Service.findOneAndUpdate({ slug: s.slug }, s, { upsert: true, new: true, setDefaultsOnInsert: true });
  }
  console.log(`Seeded ${services.length} services.`);

  await Portfolio.deleteMany({ 'image.publicId': { $regex: '^seed-placeholder-' } });
  await Portfolio.insertMany(portfolio);
  console.log(`Seeded ${portfolio.length} portfolio items.`);

  await mongoose.disconnect();
  console.log('Seeding complete.');
  process.exit(0);
}

run().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
