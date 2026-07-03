import React from 'react';
import AuthForm from '../components/AuthForm';

export default function AuthPage({ mode, setMode, form, onChange, onSubmit, loading }) {
  return (
    <section className="page-shell auth-page">
      <div className="page-header glass-card">
        <div>
          <p className="eyebrow">Account</p>
          <h1>{mode === 'login' ? 'Sign in to your account' : 'Create your account'}</h1>
          <p>{mode === 'login' ? 'Access room inventory and reservation tools.' : 'Register to book rooms and manage your profile.'}</p>
        </div>
      </div>

      <div className="auth-card glass-card">
        <div className="tabs">
          <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>Login</button>
          <button className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')}>Register</button>
        </div>
        <AuthForm mode={mode} form={form} onChange={onChange} onSubmit={onSubmit} loading={loading} />
      </div>
    </section>
  );
}
