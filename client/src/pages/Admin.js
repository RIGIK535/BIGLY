import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/menu';

const Admin = () => {
  const [form, setForm] = useState({ name: '', description: '', price: '', image: '' });
  const [message, setMessage] = useState('');

  // Для простоты токен берем из localStorage (логин реализуем позже)
  const token = localStorage.getItem('token');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    try {
      await axios.post(API_URL, {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        image: form.image
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Блюдо добавлено!');
      setForm({ name: '', description: '', price: '', image: '' });
    } catch (err) {
      setMessage('Ошибка добавления блюда (нужен токен администратора)');
    }
  };

  return (
    <div>
      <h2>Админ-панель: Добавить блюдо</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input name="name" placeholder="Название" value={form.name} onChange={handleChange} required />
        <textarea name="description" placeholder="Описание" value={form.description} onChange={handleChange} />
        <input name="price" type="number" placeholder="Цена" value={form.price} onChange={handleChange} required />
        <input name="image" placeholder="Ссылка на картинку" value={form.image} onChange={handleChange} />
        <button type="submit">Добавить блюдо</button>
      </form>
      {message && <p style={{ marginTop: 16, color: message.includes('Ошибка') ? 'red' : 'green' }}>{message}</p>}
    </div>
  );
};

export default Admin;
