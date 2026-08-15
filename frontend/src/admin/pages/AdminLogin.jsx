import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiMail } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import './AdminLogin.css';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(form.email, form.password);
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="admin-login">
      <div className="al-card">
        <div className="al-logo">
          <div className="al-logo-mark">PC</div>
          <div>
            <div className="al-logo-name">PhaseCore</div>
            <div className="al-logo-sub">Admin Portal</div>
          </div>
        </div>

        <h2>Sign In</h2>
        <p className="al-desc">Access the PhaseCore management dashboard</p>

        {error && <div className="al-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="al-field">
            <FiMail className="al-field-icon" />
            <input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
              autoFocus
            />
          </div>
          <div className="al-field">
            <FiLock className="al-field-icon" />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="al-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="al-back">
          <a href="/">← Back to Website</a>
        </div>
      </div>
    </div>
  );
}
