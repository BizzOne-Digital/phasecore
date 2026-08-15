import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import AdminLayout from '../components/AdminLayout';
import api from '../../utils/api';

const EMPTY = { question: '', answer: '', category: 'general', order: 0, isPublished: true };

export default function FAQAdmin() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/faqs/admin');
      setFaqs(data.faqs || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(EMPTY); setEditing(null); setError(''); setModal(true); };
  const openEdit = (faq) => { setForm({ ...faq }); setEditing(faq._id); setError(''); setModal(true); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (editing) {
        const { data } = await api.put(`/faqs/${editing}`, form);
        setFaqs(prev => prev.map(f => f._id === editing ? data.faq : f));
      } else {
        const { data } = await api.post('/faqs', form);
        setFaqs(prev => [...prev, data.faq]);
      }
      setModal(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed.');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this FAQ?')) return;
    await api.delete(`/faqs/${id}`);
    setFaqs(prev => prev.filter(f => f._id !== id));
  };

  const togglePublish = async (faq) => {
    const { data } = await api.put(`/faqs/${faq._id}`, { isPublished: !faq.isPublished });
    setFaqs(prev => prev.map(f => f._id === faq._id ? data.faq : f));
  };

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">FAQs</div>
          <div className="admin-page-sub">{faqs.length} questions managed</div>
        </div>
        <button className="btn btn-primary" onClick={openNew} style={{ fontSize: 13, padding: '10px 20px' }}>
          <FiPlus /> Add FAQ
        </button>
      </div>

      <div className="admin-card">
        <div style={{ overflow: 'auto' }}>
          <table className="admin-table">
            <thead><tr><th>#</th><th>Question</th><th>Category</th><th>Published</th><th>Actions</th></tr></thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: 40, color: '#9ca3af' }}>Loading...</td></tr>
              ) : faqs.length === 0 ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: 40, color: '#9ca3af' }}>No FAQs yet.</td></tr>
              ) : faqs.map((faq, i) => (
                <tr key={faq._id}>
                  <td style={{ color: '#9ca3af', width: 40 }}>{i + 1}</td>
                  <td style={{ maxWidth: 400 }}>
                    <div style={{ fontWeight: 600, marginBottom: 4, fontSize: 14 }}>{faq.question}</div>
                    <div style={{ color: '#9ca3af', fontSize: 12, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 380 }}>{faq.answer}</div>
                  </td>
                  <td><span style={{ textTransform: 'capitalize', fontSize: 12, background: '#f3f4f6', padding: '3px 10px', borderRadius: 4 }}>{faq.category}</span></td>
                  <td>
                    <button onClick={() => togglePublish(faq)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13, color: faq.isPublished ? '#10b981' : '#ef4444' }}>
                      {faq.isPublished ? 'Yes' : 'No'}
                    </button>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => openEdit(faq)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: 4 }}><FiEdit2 /></button>
                      <button onClick={() => handleDelete(faq._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: 4 }}><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 24 }} onClick={() => setModal(false)}>
          <div style={{ background: 'white', borderRadius: 12, padding: 32, maxWidth: 560, width: '100%', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setModal(false)} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#9ca3af' }}><FiX /></button>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--navy)', marginBottom: 24 }}>{editing ? 'Edit' : 'Add'} FAQ</h3>

            <form onSubmit={handleSave} className="admin-form">
              <div className="admin-form-group">
                <label>Question *</label>
                <input value={form.question} onChange={e => setForm({ ...form, question: e.target.value })} required placeholder="Enter the question" />
              </div>
              <div className="admin-form-group">
                <label>Answer *</label>
                <textarea value={form.answer} onChange={e => setForm({ ...form, answer: e.target.value })} rows={5} required placeholder="Enter the detailed answer..." />
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Category</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    <option value="general">General</option>
                    <option value="services">Services</option>
                    <option value="contracting">Contracting</option>
                    <option value="pricing">Pricing</option>
                  </select>
                </div>
                <div className="admin-form-group">
                  <label>Order</label>
                  <input type="number" value={form.order} onChange={e => setForm({ ...form, order: Number(e.target.value) })} min={0} />
                </div>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, cursor: 'pointer' }}>
                <input type="checkbox" checked={form.isPublished} onChange={e => setForm({ ...form, isPublished: e.target.checked })} />
                Published (visible on website)
              </label>
              {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 6, padding: '10px 14px', fontSize: 14, color: '#dc2626' }}>{error}</div>}
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setModal(false)} className="btn btn-outline-dark" style={{ fontSize: 13, padding: '10px 20px' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ fontSize: 13, padding: '10px 20px' }} disabled={saving}>
                  {saving ? 'Saving...' : editing ? 'Update FAQ' : 'Create FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
