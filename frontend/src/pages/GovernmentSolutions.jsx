import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import PageHero from '../components/ui/PageHero';
import './About.css';

const CAPABILITY_GROUPS = [
  {
    title: 'Technology & IT Equipment',
    items: [
      'Computer Peripherals', 'Monitors and Displays', 'Docking Stations',
      'Networking Equipment', 'Cables and Adapters', 'Storage Products',
      'Printers and Accessories', 'UPS/Power Products', 'Audio/Video Equipment',
    ],
  },
  {
    title: 'General & Workplace Supplies',
    items: [
      'Office Supplies', 'Paper Products', 'Workplace Equipment',
      'Safety/PPE', 'General Institutional Supplies',
    ],
  },
  {
    title: 'Facilities & Maintenance Supplies',
    items: [
      'Janitorial Consumables', 'Cleaning Products', 'Trash Liners',
      'Paper/Tissue Products', 'Grounds and Facility Supplies',
    ],
  },
  {
    title: 'Professional Services',
    items: [
      'IT Consulting', 'Cybersecurity/GRC', 'Program/Project Management',
      'Risk and Compliance', 'Technical Training',
    ],
  },
];

const CONTRACT_INFO = [
  { label: 'Legal Name', value: 'PhaseCore Consulting LLC' },
  { label: 'Business Location', value: 'Celina, Texas' },
  { label: 'UEI', value: 'HHQRP9NBRSE5' },
  { label: 'SAM.gov', value: 'Registered' },
  { label: 'Business Type', value: 'Small business — subject to applicable size standards' },
  { label: 'Core NAICS', value: '423430, 424120, 423850, 541611' },
  { label: 'Other NAICS', value: 'Additional supply, IT, facility, and landscaping codes available upon request' },
  { label: 'Contact', value: 'contracts@phasecoreconsulting.com' },
];

export default function GovernmentSolutions() {
  return (
    <>
      <PageHero
        label="Government Contracting"
        title="Government Procurement, Technology & Business Solutions"
        subtitle="Supporting federal, state, and local government agencies with technology products, office supplies, facility solutions, and specialized professional services."
      />

      <section className="section" style={{ background: 'var(--off-white)' }}>
        <div className="container about-approach">
          <div className="approach-content">
            <span className="section-label">Government Procurement & Contracting</span>
            <h2 className="section-title">Built for Government Requirements</h2>
            <div className="gold-line" />
            <p>
              PhaseCore Consulting LLC supports federal, state, local government, and educational
              customers with responsive product sourcing, technology procurement, operational
              supplies, and professional services.
            </p>
            <p style={{ marginTop: 16 }}>
              We work with manufacturers, distributors, and service partners to provide compliant,
              competitively priced solutions aligned with agency requirements, delivery schedules,
              and applicable procurement standards.
            </p>
          </div>
        </div>
      </section>

      <section className="section-sm about-values">
        <div className="container">
          <div className="section-header center">
            <span className="section-label">What We Deliver</span>
            <h2 className="section-title">Core Capabilities</h2>
            <div className="gold-line center" />
          </div>
          <div className="values-grid gov-capability-grid" style={{ marginTop: 32 }}>
            {CAPABILITY_GROUPS.map((g) => (
              <div key={g.title} className="value-card">
                <h3>{g.title}</h3>
                <ul style={{ listStyle: 'none', marginTop: 12 }}>
                  {g.items.map((item) => (
                    <li key={item} style={{ fontSize: 13.5, color: 'var(--text-secondary)', padding: '5px 0', borderBottom: '1px solid var(--gray-200)' }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm about-mv">
        <div className="container">
          <div className="section-header center">
            <span className="section-label">Contracting Information</span>
            <h2 className="section-title">Ready to Engage</h2>
            <div className="gold-line center" />
          </div>
          <div className="mv-grid" style={{ marginTop: 32 }}>
            {CONTRACT_INFO.map((c) => (
              <div key={c.label} className="mv-card">
                <div className="mv-label">{c.label}</div>
                <p>{c.value}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Link to="/capability-statement" className="btn btn-outline-dark">View Capability Statement</Link>
          </div>
        </div>
      </section>

      <section className="section about-serve">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title light">Ready to Discuss a Requirement?</h2>
          <div className="gold-line center" />
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 520, margin: '0 auto 32px' }}>
            Reach out to discuss contracting, subcontracting, or teaming opportunities.
          </p>
          <Link to="/request-a-quote" className="btn btn-primary">Request a Quote <FiArrowRight /></Link>
        </div>
      </section>
    </>
  );
}
