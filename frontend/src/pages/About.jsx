import PageHero from '../components/ui/PageHero';
import { FiTarget, FiEye, FiCheckCircle } from 'react-icons/fi';
import './About.css';

const VALUES = [
  { title: 'Integrity', desc: 'We conduct business ethically, communicate transparently, and take responsibility for our commitments.' },
  { title: 'Accountability', desc: 'We establish clear expectations and maintain ownership of deliverables and outcomes.' },
  { title: 'Excellence', desc: 'We pursue quality in our work, partnerships, documentation, and customer service.' },
  { title: 'Responsiveness', desc: 'We recognize that organizations operate in rapidly changing environments and require responsive partners.' },
  { title: 'Collaboration', desc: 'Successful solutions require cooperation between people, processes, technology, customers, and partners.' },
  { title: 'Continuous Improvement', desc: 'We continuously evaluate opportunities to improve processes, strengthen performance, and deliver greater value.' },
];

const CLIENTS = [
  'Federal Agencies', 'State Agencies', 'Local Governments',
  'Prime Government Contractors', 'Commercial Organizations',
  'Healthcare Organizations', 'Educational Institutions', 'Nonprofit Organizations',
];

export default function About() {
  return (
    <>
      <PageHero
        label="About PhaseCore"
        title="Built Around Execution"
        subtitle="PhaseCore Consulting LLC is a professional services and solutions company focused on helping organizations successfully navigate technology, cybersecurity, compliance, project execution, and operational challenges."
      />

      {/* Approach */}
      <section className="section">
        <div className="container about-approach">
          <div className="approach-content">
            <span className="section-label">Our Philosophy</span>
            <h2 className="section-title">Strategy + Execution</h2>
            <div className="gold-line" />
            <p>
              Our philosophy is built around the idea that successful consulting should extend beyond
              recommendations. Organizations need partners who can understand the problem, develop the
              strategy, coordinate the right resources, and help execute the solution.
            </p>
            <p style={{ marginTop: 16 }}>
              Every organization has different priorities, constraints, and operating environments. That is
              why PhaseCore does not believe in one-size-fits-all consulting. We evaluate the requirement,
              identify the appropriate resources, establish a structured delivery approach, and execute
              against clearly defined expectations.
            </p>
          </div>

          <div className="approach-cards">
            <div className="approach-card">
              <FiTarget className="approach-icon" />
              <h3>Strategy</h3>
              <p>We work to understand objectives, requirements, risks, stakeholders, technology, regulations, resources, and expected outcomes to establish a solid foundation.</p>
            </div>
            <div className="approach-card featured">
              <FiEye className="approach-icon" />
              <h3>Execution</h3>
              <p>Through structured project management, specialized expertise, technology, operational support, and strategic partnerships, we help organizations move initiatives forward.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-sm about-mv">
        <div className="container">
          <div className="mv-grid">
            <div className="mv-card">
              <div className="mv-label">Our Mission</div>
              <p>To provide practical, reliable, and scalable solutions that help organizations strengthen operations, manage risk, leverage technology, and accomplish their mission.</p>
            </div>
            <div className="mv-card">
              <div className="mv-label">Our Vision</div>
              <p>To become a trusted solutions partner to government and commercial organizations seeking dependable expertise, disciplined execution, and measurable results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section about-values">
        <div className="container">
          <div className="section-header center">
            <span className="section-label">What We Stand For</span>
            <h2 className="section-title">Our Core Values</h2>
            <div className="gold-line center" />
          </div>
          <div className="values-grid">
            {VALUES.map((v) => (
              <div key={v.title} className="value-card">
                <FiCheckCircle className="value-icon" />
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="section about-serve">
        <div className="container">
          <div className="section-header center">
            <span className="section-label">Government & Commercial Solutions</span>
            <h2 className="section-title light">Organizations We Serve</h2>
            <div className="gold-line center" />
            <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 560, margin: '0 auto' }}>
              Whether supporting a technology implementation, cybersecurity initiative, compliance
              requirement, or government program, we approach every engagement with quality and accountability.
            </p>
          </div>
          <div className="serve-grid">
            {CLIENTS.map((c) => (
              <div key={c} className="serve-pill">{c}</div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
