import { useState, useEffect } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import PageHero from '../components/ui/PageHero';
import api from '../utils/api';
import './FAQ.css';

const FALLBACK_FAQS = [
  { _id: '1', question: 'What types of organizations does PhaseCore work with?', answer: 'PhaseCore supports federal, state, and local government agencies, prime contractors, commercial organizations, healthcare organizations, educational institutions, and nonprofit organizations. Our services are designed to be adaptable across both the public and private sectors.' },
  { _id: '2', question: 'Does PhaseCore hold any government contracting certifications?', answer: 'PhaseCore Consulting LLC is actively pursuing and maintaining registrations and certifications relevant to government contracting, including SAM.gov registration. Specific certifications and contract vehicles are available upon request.' },
  { _id: '3', question: 'Can PhaseCore support subcontracting relationships?', answer: 'Yes. PhaseCore actively partners with prime contractors as a subcontractor and is open to teaming arrangements where our expertise in cybersecurity, IT, project management, and business consulting adds value to a larger program or proposal.' },
  { _id: '4', question: 'How does PhaseCore approach client engagements?', answer: 'We begin every engagement by understanding the requirement, objectives, constraints, and stakeholders. From there, we develop a structured approach and execute against clearly defined expectations with regular communication, milestone tracking, and documented deliverables.' },
  { _id: '5', question: 'What cybersecurity frameworks does PhaseCore support?', answer: 'Our cybersecurity team supports recognized frameworks and standards including NIST CSF, NIST 800-53, ISO 27001, SOC 2, CMMC, PCI DSS, SOX, COBIT, and other applicable regulatory requirements.' },
  { _id: '6', question: 'How do I request a capabilities statement or proposal?', answer: 'You can reach us directly at contracts@phasecore.com or by calling (773) 865-9937. We are happy to provide a capabilities statement tailored to your specific procurement area or discuss how PhaseCore can support your program needs.' },
  { _id: '7', question: 'Can PhaseCore support both small and large-scale initiatives?', answer: 'Yes. PhaseCore is structured to scale. For engagements requiring specialized expertise, additional personnel, geographic coverage, or operational resources, we can work with qualified professionals and strategic delivery partners while maintaining centralized project coordination and performance oversight.' },
  { _id: '8', question: 'What is PhaseCore\'s pricing model?', answer: 'Our pricing depends on the scope, duration, and complexity of each engagement. We offer time-and-materials, fixed-price, and retainer-based arrangements depending on the nature of the work. Contact us to discuss your specific requirements and receive a tailored proposal.' },
];

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [open, setOpen] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/faqs')
      .then(r => setFaqs(r.data.faqs || []))
      .catch(() => setFaqs([]))
      .finally(() => setLoading(false));
  }, []);

  const display = faqs.length > 0 ? faqs : FALLBACK_FAQS;

  const toggle = (id) => setOpen(open === id ? null : id);

  return (
    <>
      <PageHero
        label="Frequently Asked Questions"
        title="Common Questions About PhaseCore"
        subtitle="Find answers to common questions about our services, approach, and contracting capabilities."
      />

      <section className="section faq-page">
        <div className="container faq-container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div className="loader" />
            </div>
          ) : (
            <div className="faq-list">
              {display.map((faq) => (
                <div
                  key={faq._id}
                  className={`faq-item ${open === faq._id ? 'open' : ''}`}
                >
                  <button className="faq-question" onClick={() => toggle(faq._id)}>
                    <span>{faq.question}</span>
                    {open === faq._id ? <FiMinus /> : <FiPlus />}
                  </button>
                  <div className="faq-answer">
                    <div className="faq-answer-inner">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="faq-cta-box">
            <h3>Still Have Questions?</h3>
            <p>Our team is ready to answer your questions and discuss how PhaseCore can support your mission.</p>
            <a href="/contact" className="btn btn-primary">Contact Us →</a>
          </div>
        </div>
      </section>
    </>
  );
}
