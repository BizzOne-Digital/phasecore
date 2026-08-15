import { useState, useEffect, useRef } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiUpload } from 'react-icons/fi';
import AdminLayout from '../components/AdminLayout';
import api from '../../utils/api';

const EMPTY = { title: '', category: 'cybersecurity', description: '', outcome: '', tags: '', isFeatured: false, order: 0 };
const CATS = [
  { value: 'cybersecurity', label: 'Cybersecurity' },
  { value: 'it-technology', label: 'IT & Technology' },
  { value: 'project-management', label: 'Project Management' },
  { value: 'business-consulting', label: 'Business Consulting' },
];

export default function PortfolioAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef();

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/portfolio/admin');
      setItems(data.items || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(EMPTY); setEditing(null); setImageFile(null); setPreview(''); setError(''); setModal(true); };
  const openEdit = (item) => {
    setForm({ ...item, tags: item.tags?.join(', ') || '', isFeatured: item.isFeatured || false });
    setEditing(item._id);
    setPreview(item.image?.url || '');
    setImageFile(null);
    setError('');
    setModal(true);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editing && !imageFile) { setError('Please select an image.'); return; }
    setSaving(true);
    setError('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (imageFile) fd.append('image', imageFile);

      if (editing) {
        const { data } = await api.put(`/portfolio/${editing}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        setItems(prev => prev.map(i => i._id === editing ? data.item : i));
      } else {
        const { data } = await api.post('/portfolio', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        setItems(prev => [data.item, ...prev]);
      }
      setModal(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed.');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this portfolio item permanently?')) return;
    await api.delete(`/portfolio/${id}`);
    setItems(prev => prev.filter(i => i._id !== id));
  };

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">Portfolio</div>
          <div className="admin-page-sub">{items.length} items published</div>
        </div>
        <button className="btn btn-primary" onClick={openNew} style={{ fontSize: 13, padding: '10px 20px' }}>
          <FiPlus /> Add Item
        </button>
      </div>

      <div className="admin-card">
        <div style={{ overflow: 'auto' }}>
          <table className="admin-table">
            <thead><tr><th>Image</th><th>Title</th><th>Category</th><th>Featured</th><th>Published</th><th>Actions</th></tr></thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: 40, color: '#9ca3af' }}>Loading...</td></tr>
              ) : items.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: 40, color: '#9ca3af' }}>No portfolio items yet. Click "Add Item" to create one.</td></tr>
              ) : items.map(item => (
                <tr key={item._id}>
                  <td>
                    {item.image?.url
                      ? <img src={item.image.url} alt="" style={{ width: 60, height: 44, objectFit: 'cover', borderRadius: 6 }} />
                      : <div style={{ width: 60, height: 44, background: '#f3f4f6', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#d1d5db' }}>📷</div>
                    }
                  </td>
                  <td style={{ fontWeight: 600 }}>{item.title}</td>
                  <td><span style={{ textTransform: 'capitalize', fontSize: 12, background: '#f3f4f6', padding: '3px 10px', borderRadius: 4 }}>{item.category}</span></td>
                  <td>{item.isFeatured ? '⭐' : '—'}</td>
                  <td><span style={{ color: item.isPublished ? '#10b981' : '#ef4444', fontWeight: 600, fontSize: 13 }}>{item.isPublished ? 'Yes' : 'No'}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => openEdit(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: 4 }}><FiEdit2 /></button>
                      <button onClick={() => handleDelete(item._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: 4 }}><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', zIndex: 1000, padding: '40px 24px', overflowY: 'auto' }} onClick={() => setModal(false)}>
          <div style={{ background: 'white', borderRadius: 12, padding: 32, maxWidth: 600, width: '100%', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setModal(false)} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#9ca3af' }}><FiX /></button>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--navy)', marginBottom: 24 }}>{editing ? 'Edit' : 'Add'} Portfolio Item</h3>

            <form onSubmit={handleSave} className="admin-form">
              {/* Image upload */}
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', display: 'block', marginBottom: 8 }}>Image {!editing && '*'}</label>
                <div style={{ border: '2px dashed #e5e7eb', borderRadius: 8, padding: 20, textAlign: 'center', cursor: 'pointer', background: '#fafafa' }} onClick={() => fileRef.current?.click()}>
                  {preview
                    ? <img src={preview} alt="preview" style={{ maxHeight: 160, margin: '0 auto', borderRadius: 6, objectFit: 'cover' }} />
                    : <div style={{ color: '#9ca3af' }}><FiUpload style={{ fontSize: 28, marginBottom: 8 }} /><div style={{ fontSize: 14 }}>Click to upload image</div><div style={{ fontSize: 12 }}>JPG, PNG, WebP — max 5MB</div></div>
                  }
                </div>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Title *</label>
                  <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required placeholder="Project title" />
                </div>
                <div className="admin-form-group">
                  <label>Category *</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    {CATS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
              </div>

              <div className="admin-form-group">
                <label>Description *</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} required placeholder="Brief description of the engagement..." />
              </div>

              <div className="admin-form-group">
                <label>Outcome</label>
                <input value={form.outcome} onChange={e => setForm({ ...form, outcome: e.target.value })} placeholder="Key result or measurable outcome" />
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Tags (comma separated)</label>
                  <input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} placeholder="NIST, CMMC, Cloud" />
                </div>
                <div className="admin-form-group">
                  <label>Display Order</label>
                  <input type="number" value={form.order} onChange={e => setForm({ ...form, order: e.target.value })} min={0} />
                </div>
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, cursor: 'pointer' }}>
                <input type="checkbox" checked={form.isFeatured} onChange={e => setForm({ ...form, isFeatured: e.target.checked })} />
                Mark as Featured
              </label>

              {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 6, padding: '10px 14px', fontSize: 14, color: '#dc2626' }}>{error}</div>}

              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setModal(false)} className="btn btn-outline-dark" style={{ fontSize: 13, padding: '10px 20px' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ fontSize: 13, padding: '10px 20px' }} disabled={saving}>
                  {saving ? 'Saving...' : editing ? 'Update Item' : 'Create Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
