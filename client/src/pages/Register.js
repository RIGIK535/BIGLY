import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/register';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    try {
      await axios.post(API_URL, form);
      setMessage('Регистрация успешна! Теперь войдите в аккаунт.');
      setForm({ name: '', email: '', password: '' });
    } catch (err) {
      setMessage('Ошибка регистрации: ' + (err.response?.data?.error || 'Неизвестная ошибка'));
    }
  };

  return (
    <div>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input name="name" placeholder="Имя" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Пароль" value={form.password} onChange={handleChange} required />
        <button type="submit">Зарегистрироваться</button>
      </form>
      {message && <p style={{ marginTop: 16, color: message.includes('Ошибка') ? 'red' : 'green' }}>{message}</p>}
    </div>
  );
};

export default Register;
