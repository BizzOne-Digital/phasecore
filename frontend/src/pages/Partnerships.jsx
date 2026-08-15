import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import PageHero from '../components/ui/PageHero';
import './About.css';

const PARTNERSHIP_TYPES = [
  'Prime / Subcontracting',
  'Government Teaming',
  'Joint Pursuits',
  'Cybersecurity & IT Partners',
  'Healthcare Technology Partners',
  'Staffing Providers',
  'Facilities Service Providers',
  'Professional Services Firms',
  'Technology Vendors',
];

export default function Partnerships() {
  return (
    <>
      <PageHero
        label="Teaming & Partnerships"
        title="Partner With PhaseCore"
        subtitle="PhaseCore engages in subcontracting, teaming, and joint pursuit opportunities with qualified partners."
      />

      <section className="section-sm about-values">
        <div className="container">
          <div className="section-header center">
            <span className="section-label">Partnership Types</span>
            <h2 className="section-title">Ways We Work Together</h2>
            <div className="gold-line center" />
          </div>
          <div className="serve-grid" style={{ marginTop: 32 }}>
            {PARTNERSHIP_TYPES.map((p) => (
              <div key={p} className="serve-pill" style={{ background: 'var(--off-white)', border: '1px solid var(--gray-200)', color: 'var(--navy)' }}>
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-serve">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title light">Let's Explore a Partnership</h2>
          <div className="gold-line center" />
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 520, margin: '0 auto 32px' }}>
            Reach out to discuss teaming, subcontracting, or joint pursuit opportunities with PhaseCore.
          </p>
          <Link to="/contact" className="btn btn-primary">Contact PhaseCore <FiArrowRight /></Link>
        </div>
      </section>
    </>
  );
}
