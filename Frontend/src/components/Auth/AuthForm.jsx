import React from 'react';

export default function AuthForm({ mode, form, onChange, onSubmit, loading }) {
  return (
    <form className="auth-form" onSubmit={onSubmit}>
      {mode === 'register' && (
        <>
          <input
            placeholder="Full name"
            value={form.name}
            onChange={(e) => onChange({ ...form, name: e.target.value })}
            required
          />
          <input
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => onChange({ ...form, phone: e.target.value })}
          />
          <select value={form.role} onChange={(e) => onChange({ ...form, role: e.target.value })}>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </>
      )}

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => onChange({ ...form, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => onChange({ ...form, password: e.target.value })}
        required
      />
      <button type="submit" disabled={loading}>{loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Register'}</button>
    </form>
  );
}
