import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import AdminLayout from '../components/AdminLayout';
import api from '../../utils/api';

const EMPTY = { title: '', slug: '', shortDescription: '', fullDescription: '', features: '', frameworks: '', order: 0, isPublished: true };

export default function ServicesAdmin() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/services/admin');
      setServices(data.services || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(EMPTY); setEditing(null); setError(''); setModal(true); };
  const openEdit = (s) => {
    setForm({ ...s, features: s.features?.join('\n') || '', frameworks: s.frameworks?.join(', ') || '' });
    setEditing(s._id);
    setError('');
    setModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    const payload = {
      ...form,
      features: form.features.split('\n').map(f => f.trim()).filter(Boolean),
      frameworks: form.frameworks.split(',').map(f => f.trim()).filter(Boolean),
    };
    try {
      if (editing) {
        const { data } = await api.put(`/services/${editing}`, payload);
        setServices(prev => prev.map(s => s._id === editing ? data.service : s));
      } else {
        const { data } = await api.post('/services', payload);
        setServices(prev => [...prev, data.service]);
      }
      setModal(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed.');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this service?')) return;
    await api.delete(`/services/${id}`);
    setServices(prev => prev.filter(s => s._id !== id));
  };

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">Services</div>
          <div className="admin-page-sub">{services.length} services configured</div>
        </div>
        <button className="btn btn-primary" onClick={openNew} style={{ fontSize: 13, padding: '10px 20px' }}>
          <FiPlus /> Add Service
        </button>
      </div>

      <div className="admin-card">
        <div style={{ overflow: 'auto' }}>
          <table className="admin-table">
            <thead><tr><th>Order</th><th>Title</th><th>Slug</th><th>Published</th><th>Actions</th></tr></thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: 40, color: '#9ca3af' }}>Loading...</td></tr>
              ) : services.length === 0 ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: 40, color: '#9ca3af' }}>No services yet.</td></tr>
              ) : services.map(s => (
                <tr key={s._id}>
                  <td style={{ color: '#9ca3af', width: 60 }}>{s.order}</td>
                  <td style={{ fontWeight: 600 }}>{s.title}</td>
                  <td><code style={{ fontSize: 12, background: '#f3f4f6', padding: '2px 8px', borderRadius: 4 }}>{s.slug}</code></td>
                  <td><span style={{ fontWeight: 600, fontSize: 13, color: s.isPublished ? '#10b981' : '#ef4444' }}>{s.isPublished ? 'Yes' : 'No'}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => openEdit(s)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: 4 }}><FiEdit2 /></button>
                      <button onClick={() => handleDelete(s._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: 4 }}><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', zIndex: 1000, padding: '40px 24px', overflowY: 'auto' }} onClick={() => setModal(false)}>
          <div style={{ background: 'white', borderRadius: 12, padding: 32, maxWidth: 600, width: '100%', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setModal(false)} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#9ca3af' }}><FiX /></button>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--navy)', marginBottom: 24 }}>{editing ? 'Edit' : 'Add'} Service</h3>

            <form onSubmit={handleSave} className="admin-form">
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Title *</label>
                  <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required placeholder="Service title" />
                </div>
                <div className="admin-form-group">
                  <label>Slug *</label>
                  <input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} required placeholder="service-slug" />
                </div>
              </div>
              <div className="admin-form-group">
                <label>Short Description *</label>
                <textarea value={form.shortDescription} onChange={e => setForm({ ...form, shortDescription: e.target.value })} rows={2} required />
              </div>
              <div className="admin-form-group">
                <label>Features (one per line)</label>
                <textarea value={form.features} onChange={e => setForm({ ...form, features: e.target.value })} rows={5} placeholder="Feature one&#10;Feature two&#10;Feature three" />
              </div>
              <div className="admin-form-group">
                <label>Frameworks/Standards (comma separated)</label>
                <input value={form.frameworks} onChange={e => setForm({ ...form, frameworks: e.target.value })} placeholder="NIST CSF, SOC 2, CMMC" />
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Display Order</label>
                  <input type="number" value={form.order} onChange={e => setForm({ ...form, order: Number(e.target.value) })} min={0} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', paddingTop: 24 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.isPublished} onChange={e => setForm({ ...form, isPublished: e.target.checked })} />
                    Published
                  </label>
                </div>
              </div>
              {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 6, padding: '10px 14px', fontSize: 14, color: '#dc2626' }}>{error}</div>}
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setModal(false)} className="btn btn-outline-dark" style={{ fontSize: 13, padding: '10px 20px' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ fontSize: 13, padding: '10px 20px' }} disabled={saving}>
                  {saving ? 'Saving...' : editing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
