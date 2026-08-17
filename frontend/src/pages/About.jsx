import PageHero from '../components/ui/PageHero';
import { FiTarget, FiEye, FiCheckCircle } from 'react-icons/fi';
import './About.css';

const VALUES = [
  { title: 'Integrity', desc: 'We conduct business ethically, communicate transparently, and take responsibility for our commitments.' },
  { title: 'Accountability', desc: 'We establish clear expectations and maintain ownership of deliverables and outcomes.' },
  { title: 'Security', desc: 'Risk and compliance are embedded into how we plan and deliver every engagement.' },
  { title: 'Excellence', desc: 'We pursue quality in our work, partnerships, documentation, and customer service.' },
  { title: 'Collaboration', desc: 'Successful solutions require cooperation between people, processes, technology, customers, and partners.' },
  { title: 'Agility', desc: 'We scale resources and adapt delivery to match evolving mission requirements.' },
];

const DELIVERY_STEPS = [
  {
    title: 'Assess',
    tagline: 'Understand the mission. Identify the need.',
    desc: 'We begin by understanding your objectives, requirements, operating environment, risks, constraints, and expected outcomes. Whether the engagement involves cybersecurity, IT, management consulting, operational support, or professional services, we establish a clear picture of what success requires.',
  },
  {
    title: 'Plan',
    tagline: 'Build the roadmap for successful delivery.',
    desc: 'We translate requirements into a practical execution plan with defined scope, responsibilities, timelines, resources, deliverables, performance measures, and risk considerations. Our planning approach creates accountability and keeps every engagement aligned with contractual and operational expectations.',
  },
  {
    title: 'Mobilize',
    tagline: 'Put the right resources in place.',
    desc: 'Once the plan is established, we assemble the personnel, technical expertise, partners, subcontractors, tools, and resources required for delivery. Our flexible model allows PhaseCore to scale capabilities according to project requirements while maintaining clear oversight and accountability.',
  },
  {
    title: 'Execute',
    tagline: 'Deliver with discipline and responsiveness.',
    desc: 'We perform the work according to the approved scope, schedule, quality standards, and client requirements. Throughout execution, PhaseCore maintains active communication, monitors progress, coordinates stakeholders, manages risks, and addresses issues before they affect delivery.',
  },
  {
    title: 'Validate',
    tagline: 'Verify quality, compliance, and performance.',
    desc: 'Delivery does not end when the work is completed. We evaluate results against established requirements, performance measures, quality expectations, and applicable standards. Findings, deliverables, and corrective actions are documented to provide transparency and demonstrate that objectives have been achieved.',
  },
  {
    title: 'Improve',
    tagline: 'Turn every engagement into lasting value.',
    desc: 'We identify lessons learned, improvement opportunities, efficiencies, and recommendations that can strengthen future performance. Our goal is not simply to complete an engagement, but to help clients build more resilient, efficient, secure, and sustainable operations.',
  },
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
        subtitle="PhaseCore Consulting LLC is a multidisciplinary services firm supporting government and commercial clients with cybersecurity, IT, management consulting, healthcare technology, workforce solutions, and operational support."
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
              <p>Deliver secure, scalable, and practical solutions that improve operations, reduce risk, and support mission success.</p>
            </div>
            <div className="mv-card">
              <div className="mv-label">Our Vision</div>
              <p>To be a trusted partner recognized for reliability, integrity, and consistent delivery.</p>
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

      {/* Delivery Model */}
      <section className="section-sm about-mv">
        <div className="container">
          <div className="section-header center">
            <span className="section-label">How We Work</span>
            <h2 className="section-title">Our Delivery Model</h2>
            <div className="gold-line center" />
          </div>
          <div className="delivery-model">
            {DELIVERY_STEPS.map((step, i) => (
              <div key={step.title} className="delivery-step">
                <div className="delivery-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="delivery-body">
                  <h3 className="delivery-title">{step.title}</h3>
                  <p className="delivery-tagline">{step.tagline}</p>
                  <p className="delivery-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="approach-closing">
            <span className="section-label">The PhaseCore Approach</span>
            <h3>Assess. Plan. Mobilize. Execute. Validate. Improve.</h3>
            <p className="approach-lede">One disciplined delivery framework — from requirement to result.</p>
            <p>
              PhaseCore combines specialized expertise, scalable resources, strong project governance,
              and a commitment to measurable performance to help organizations move from complex
              requirements to dependable outcomes.
            </p>
            <p className="approach-lede">Structured delivery. Responsive execution. Measurable results.</p>
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
