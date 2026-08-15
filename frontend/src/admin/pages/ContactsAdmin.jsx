import { useState, useEffect } from 'react';
import { FiTrash2, FiEye, FiX } from 'react-icons/fi';
import AdminLayout from '../components/AdminLayout';
import api from '../../utils/api';

const STATUSES = ['all', 'new', 'read', 'replied', 'archived'];

export default function ContactsAdmin() {
  const [contacts, setContacts] = useState([]);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const params = filter !== 'all' ? `?status=${filter}` : '';
      const { data } = await api.get(`/contact${params}`);
      setContacts(data.contacts || []);
      setTotal(data.total || 0);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [filter]);

  const updateStatus = async (id, status) => {
    await api.put(`/contact/${id}`, { status });
    setContacts(prev => prev.map(c => c._id === id ? { ...c, status } : c));
    if (selected?._id === id) setSelected({ ...selected, status });
  };

  const deleteContact = async (id) => {
    if (!confirm('Delete this contact permanently?')) return;
    await api.delete(`/contact/${id}`);
    setContacts(prev => prev.filter(c => c._id !== id));
    if (selected?._id === id) setSelected(null);
  };

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">Contact Inquiries</div>
          <div className="admin-page-sub">{total} total inquiries received</div>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {STATUSES.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`filter-btn ${filter === s ? 'active' : ''}`}
            style={{ padding: '7px 16px', borderRadius: 100, border: '1.5px solid', borderColor: filter === s ? 'var(--navy)' : 'var(--gray-200)', background: filter === s ? 'var(--navy)' : 'transparent', color: filter === s ? 'white' : 'var(--text-secondary)', fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-body)', textTransform: 'capitalize' }}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="admin-card">
        <div style={{ overflow: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Organization</th>
                <th>Service</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} style={{ textAlign: 'center', padding: 40, color: '#9ca3af' }}>Loading...</td></tr>
              ) : contacts.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: 'center', padding: 40, color: '#9ca3af' }}>No contacts found.</td></tr>
              ) : contacts.map(c => (
                <tr key={c._id}>
                  <td style={{ fontWeight: 600 }}>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.organization || '—'}</td>
                  <td style={{ textTransform: 'capitalize', fontSize: 12 }}>{c.service || '—'}</td>
                  <td>
                    <select
                      value={c.status}
                      onChange={e => updateStatus(c._id, e.target.value)}
                      style={{ padding: '4px 8px', borderRadius: 4, border: '1px solid #e5e7eb', fontSize: 12, cursor: 'pointer' }}
                    >
                      {['new','read','replied','archived'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td style={{ color: '#9ca3af', fontSize: 13 }}>{new Date(c.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => { setSelected(c); updateStatus(c._id, c.status === 'new' ? 'read' : c.status); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: 4 }} title="View"><FiEye /></button>
                      <button onClick={() => deleteContact(c._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: 4 }} title="Delete"><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', z: 1000, padding: 24 }} onClick={() => setSelected(null)}>
          <div style={{ background: 'white', borderRadius: 12, padding: 32, maxWidth: 560, width: '100%', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#9ca3af' }}><FiX /></button>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--navy)', marginBottom: 20 }}>Inquiry Details</h3>
            {[
              ['Name', selected.name],
              ['Email', selected.email],
              ['Phone', selected.phone || 'Not provided'],
              ['Organization', selected.organization || 'Not provided'],
              ['Service', selected.service || 'Not specified'],
              ['Status', selected.status],
              ['Date', new Date(selected.createdAt).toLocaleString()],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', gap: 12, marginBottom: 10, fontSize: 14 }}>
                <span style={{ color: '#9ca3af', width: 110, flexShrink: 0 }}>{k}:</span>
                <span style={{ color: 'var(--navy)', fontWeight: 500, textTransform: k === 'Status' || k === 'Service' ? 'capitalize' : 'none' }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #f3f4f6' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Message</div>
              <p style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.7 }}>{selected.message}</p>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
