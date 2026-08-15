import { useState } from 'react';
import { FiMail, FiPhone, FiSend, FiCheckCircle } from 'react-icons/fi';
import PageHero from '../components/ui/PageHero';
import api from '../utils/api';
import './Contact.css';

const SERVICES = [
  { value: '', label: 'Select a service area' },
  { value: 'cybersecurity', label: 'Cybersecurity, Risk & Compliance' },
  { value: 'it-digital', label: 'IT & Digital Solutions' },
  { value: 'management-professional', label: 'Management & Professional Services' },
  { value: 'healthcare', label: 'Healthcare Technology & Compliance' },
  { value: 'workforce-training', label: 'Workforce, Training & Administrative Support' },
  { value: 'facilities', label: 'Facilities & Operational Services' },
  { value: 'other', label: 'Other / General Inquiry' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', organization: '', service: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 20) e.message = 'Please provide more detail (min 20 characters)';
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }

    setLoading(true);
    setServerError('');
    try {
      await api.post('/contact', form);
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', organization: '', service: '', message: '' });
    } catch (err) {
      setServerError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        label="Get In Touch"
        title="Contact PhaseCore Consulting"
        subtitle="Ready to discuss your requirements? Reach out and a member of our team will respond within 1–2 business days."
      />

      <section className="section contact-page">
        <div className="container contact-grid">
          {/* Info column */}
          <div className="contact-info">
            <h2 className="section-title">Let's Solve Your Mission Challenges</h2>
            <div className="gold-line" />
            <p>
              Whether you have a specific requirement or want to explore how PhaseCore can support your
              organization, we encourage you to reach out. We welcome opportunities to discuss government
              contracting, subcontracting, and teaming arrangements.
            </p>

            <div className="contact-details">
              <a href="mailto:contracts@phasecoreconsulting.com" className="contact-detail">
                <div className="cd-icon"><FiMail /></div>
                <div>
                  <div className="cd-label">Contracts</div>
                  <div className="cd-value">contracts@phasecoreconsulting.com</div>
                </div>
              </a>
              <a href="mailto:admin@phasecoreconsulting.com" className="contact-detail">
                <div className="cd-icon"><FiMail /></div>
                <div>
                  <div className="cd-label">General Inquiries</div>
                  <div className="cd-value">admin@phasecoreconsulting.com</div>
                </div>
              </a>
              <a href="tel:7738659937" className="contact-detail">
                <div className="cd-icon"><FiPhone /></div>
                <div>
                  <div className="cd-label">Phone</div>
                  <div className="cd-value">(773) 865-9937</div>
                </div>
              </a>
            </div>

            <div className="response-note">
              <strong>Response Time:</strong> We respond to all inquiries within 1–2 business days.
              For urgent matters, contact us directly by phone or email.
            </div>
          </div>

          {/* Form column */}
          <div className="contact-form-wrap">
            {success ? (
              <div className="contact-success">
                <FiCheckCircle className="success-icon" />
                <h3>Message Received</h3>
                <p>Thank you for reaching out to PhaseCore Consulting LLC. We have received your inquiry and will respond within 1–2 business days.</p>
                <button className="btn btn-outline-dark" onClick={() => setSuccess(false)}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <h3 className="form-title">Send Us a Message</h3>

                <div className="form-row">
                  <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
                    <label>Full Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>
                  <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                    <label>Email Address *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="(000) 000-0000" />
                  </div>
                  <div className="form-group">
                    <label>Organization</label>
                    <input name="organization" value={form.organization} onChange={handleChange} placeholder="Agency or company name" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Service Area</label>
                  <select name="service" value={form.service} onChange={handleChange}>
                    {SERVICES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>

                <div className={`form-group ${errors.message ? 'has-error' : ''}`}>
                  <label>Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={6} placeholder="Please describe your requirement, project, or question in as much detail as possible..." />
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>

                {serverError && <div className="server-error">{serverError}</div>}

                <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
                  {loading ? 'Sending...' : <><FiSend /> Send Message</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
