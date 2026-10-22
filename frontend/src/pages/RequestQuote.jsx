import { useState } from 'react';
import { FiMail, FiPhone, FiSend, FiCheckCircle, FiPaperclip, FiX } from 'react-icons/fi';
import PageHero from '../components/ui/PageHero';
import api from '../utils/api';
import './Contact.css';

const MAX_FILE_MB = 10;

export default function RequestQuote() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', organization: '',
    itemsNeeded: '', quantity: '', deliveryLocation: '', deadline: '', notes: '',
  });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email';
    if (!form.itemsNeeded.trim()) e.itemsNeeded = 'Please describe the items or specifications needed';
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (f.size > MAX_FILE_MB * 1024 * 1024) {
      setServerError(`File must be under ${MAX_FILE_MB}MB.`);
      e.target.value = '';
      return;
    }
    setServerError('');
    setFile(f);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }

    setLoading(true);
    setServerError('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (file) fd.append('specFile', file);

      await api.post('/quotes', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', organization: '', itemsNeeded: '', quantity: '', deliveryLocation: '', deadline: '', notes: '' });
      setFile(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setServerError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        label="Request a Quote"
        title="Request a Quote"
        subtitle="Tell us what you need — technology equipment, office supplies, facility solutions, or professional services — and we'll put together a competitive, compliant quote."
      />

      <section className="section contact-page">
        <div className="container contact-grid">
          {/* Info column */}
          <div className="contact-info">
            <h2 className="section-title">Let's Build Your Quote</h2>
            <div className="gold-line" />
            <p>
              Upload a specification sheet or describe your requirements directly, along with
              quantities, delivery location, and your deadline — our team will respond with a
              detailed, compliant quote.
            </p>

            <div className="contact-details">
              <a href="mailto:contracts@phasecoreconsulting.com" className="contact-detail">
                <div className="cd-icon"><FiMail /></div>
                <div>
                  <div className="cd-label">Contracts</div>
                  <div className="cd-value">contracts@phasecoreconsulting.com</div>
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
              <strong>Response Time:</strong> We respond to all quote requests within 1–2 business days.
            </div>
          </div>

          {/* Form column */}
          <div className="contact-form-wrap">
            {success ? (
              <div className="contact-success">
                <FiCheckCircle className="success-icon" />
                <h3>Request Received</h3>
                <p>Thank you for your request for quote. Our team has received your requirements and will respond within 1–2 business days.</p>
                <button className="btn btn-outline-dark" onClick={() => setSuccess(false)}>
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <h3 className="form-title">Quote Request Details</h3>

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
                    <label>Organization / Agency</label>
                    <input name="organization" value={form.organization} onChange={handleChange} placeholder="Agency or company name" />
                  </div>
                </div>

                <div className={`form-group ${errors.itemsNeeded ? 'has-error' : ''}`}>
                  <label>Items / Specifications Needed *</label>
                  <textarea name="itemsNeeded" value={form.itemsNeeded} onChange={handleChange} rows={5} placeholder="Describe the products, supplies, or services you need..." />
                  {errors.itemsNeeded && <span className="form-error">{errors.itemsNeeded}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Quantity</label>
                    <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="e.g. 25 units" />
                  </div>
                  <div className="form-group">
                    <label>Delivery Location</label>
                    <input name="deliveryLocation" value={form.deliveryLocation} onChange={handleChange} placeholder="City, State" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Deadline</label>
                  <input name="deadline" value={form.deadline} onChange={handleChange} placeholder="e.g. Needed by 11/15/2026" />
                </div>

                <div className="form-group">
                  <label>Additional Notes</label>
                  <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder="Anything else we should know?" />
                </div>

                <div className="form-group">
                  <label>Attach Specifications (PDF, Word, Excel, or image — max {MAX_FILE_MB}MB)</label>
                  {file ? (
                    <div className="file-attached">
                      <FiPaperclip /> {file.name}
                      <button type="button" className="file-remove" onClick={() => setFile(null)} aria-label="Remove file">
                        <FiX />
                      </button>
                    </div>
                  ) : (
                    <input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.webp" onChange={handleFileChange} />
                  )}
                </div>

                {serverError && <div className="server-error">{serverError}</div>}

                <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
                  {loading ? 'Submitting...' : <><FiSend /> Submit Request for Quote</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
