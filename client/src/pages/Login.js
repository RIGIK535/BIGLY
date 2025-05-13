import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/login';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post(API_URL, form);
      localStorage.setItem('token', res.data.token);
      setMessage('Вход успешен!');
      setForm({ email: '', password: '' });
    } catch (err) {
      setMessage('Ошибка входа: ' + (err.response?.data?.error || 'Неизвестная ошибка'));
    }
  };

  return (
    <div>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Пароль" value={form.password} onChange={handleChange} required />
        <button type="submit">Войти</button>
      </form>
      {message && <p style={{ marginTop: 16, color: message.includes('Ошибка') ? 'red' : 'green' }}>{message}</p>}
    </div>
  );
};

export default Login;
