require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const Portfolio = require('../models/Portfolio');

const services = [
  {
    title: 'Cybersecurity, Risk & Compliance',
    slug: 'cybersecurity-risk-compliance',
    icon: 'shield',
    shortDescription: 'Identify risk, strengthen security controls, and build sustainable compliance programs.',
    fullDescription: 'Protecting information and maintaining compliance requires more than technology. PhaseCore helps organizations identify risk, strengthen security controls, manage vulnerabilities, prepare for audits, and establish sustainable cybersecurity and compliance programs.',
    features: [
      'Cybersecurity risk assessments', 'Governance, Risk & Compliance (GRC)',
      'Vulnerability management', 'Security operations support',
      'IT general controls', 'Internal control assessments',
      'Audit readiness and remediation', 'Identity and access management support',
      'Third-party risk management', 'Security policy and procedure development',
      'Compliance assessments', 'Cybersecurity program support',
    ],
    frameworks: ['NIST CSF', 'NIST 800-53', 'ISO 27001', 'SOC 2', 'CMMC', 'PCI DSS', 'SOX', 'COBIT'],
    order: 1,
  },
  {
    title: 'IT & Technology Services',
    slug: 'it-technology-services',
    icon: 'cpu',
    shortDescription: 'Modernize operations, improve efficiency, and strengthen security through technology.',
    fullDescription: 'Technology should enable the mission — not complicate it. PhaseCore provides technology consulting and implementation support designed to help organizations modernize operations, improve efficiency, strengthen security, and make better use of technology.',
    features: [
      'IT consulting', 'Technology assessments',
      'Systems implementation support', 'Cloud and infrastructure support',
      'Application and system support', 'Data processing and analysis',
      'Technology modernization', 'Technical documentation',
      'Web and digital solutions', 'IT operations support',
      'Technology implementation coordination', 'Technical assistance',
    ],
    frameworks: [],
    order: 2,
  },
  {
    title: 'Project & Program Management',
    slug: 'project-program-management',
    icon: 'clipboard',
    shortDescription: 'Structured planning, coordination, and execution for complex initiatives.',
    fullDescription: 'Complex initiatives require disciplined planning, coordination, and execution. PhaseCore provides structured project and program management services that help organizations move initiatives from concept through implementation.',
    features: [
      'Project planning and scheduling', 'Program coordination',
      'Requirements gathering', 'Stakeholder management',
      'Risk and issue management', 'Milestone and dependency tracking',
      'Vendor and subcontractor coordination', 'Budget and resource tracking',
      'Implementation management', 'Quality assurance',
      'Executive reporting', 'Deployment and launch readiness',
    ],
    frameworks: [],
    order: 3,
  },
  {
    title: 'Business & Management Consulting',
    slug: 'business-management-consulting',
    icon: 'briefcase',
    shortDescription: 'Turning strategic priorities into practical operating solutions.',
    fullDescription: 'PhaseCore helps organizations transform strategic priorities into practical operating solutions.',
    features: [
      'Business process improvement', 'Operational assessments',
      'Requirements analysis', 'Governance and internal controls',
      'Risk management', 'Policy and procedure development',
      'Organizational improvement', 'Performance measurement',
      'Management reporting', 'Process documentation',
      'Strategic planning support', 'Program implementation',
    ],
    frameworks: [],
    order: 4,
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
