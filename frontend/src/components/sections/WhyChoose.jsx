import { FiCheckCircle } from 'react-icons/fi';
import './WhyChoose.css';

const REASONS = [
  'Proven expertise in government and regulated industries',
  'Security and compliance built into everything we do',
  'Tailored solutions aligned to your mission and goals',
  'Trusted partner from strategy through execution',
  'Multi-disciplinary team across IT, cyber, and management',
  'Clear accountability, milestones, and measurable outcomes',
];

const STATS = [
  { value: '4', suffix: '+', label: 'Core Service Pillars' },
  { value: '100', suffix: '%', label: 'Mission-First Approach' },
  { value: 'NIST', suffix: '', label: 'CMMC, SOC 2, ISO 27001' },
  { value: '24/7', suffix: '', label: 'Responsive Support' },
];

export default function WhyChoose() {
  return (
    <section className="section why-section">
      <div className="container">
        <div className="why-grid">
          <div className="why-content">
            <span className="section-label">Why PhaseCore</span>
            <h2 className="section-title">Built Around Execution</h2>
            <div className="gold-line" />
            <p className="why-intro">
              We combine deep expertise, industry best practices, and a mission-first mindset to deliver
              secure, effective, and sustainable outcomes. Organizations need partners who can
              understand the problem, develop the strategy, and help execute the solution.
            </p>
            <ul className="why-list">
              {REASONS.map((r) => (
                <li key={r}>
                  <FiCheckCircle className="why-check" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="why-stats">
            <div className="stats-grid">
              {STATS.map((s) => (
                <div key={s.label} className="stat-box">
                  <div className="stat-value">{s.value}<span>{s.suffix}</span></div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="why-image-placeholder">
              <div className="image-overlay-text">
                <div className="image-tagline">Strategy + Execution</div>
                <div className="image-sub">Practical. Reliable. Scalable.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
