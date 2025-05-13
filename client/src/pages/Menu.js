import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/menu';

const Menu = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart')) || [];
    } catch {
      return [];
    }
  });
  const [cutleryCount, setCutleryCount] = useState(() => {
    try {
      return Number(localStorage.getItem('cutleryCount')) || 0;
    } catch {
      return 0;
    }
  });
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState('');

  // Добавить блюдо в корзину
  const handleAddToCart = (item) => {
    setCart(prevCart => {
      // Если блюдо уже есть в корзине — увеличиваем количество
      const existing = prevCart.find(i => i._id === item._id);
      if (existing) {
        return prevCart.map(i => i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      // Если нет — добавляем с quantity: 1
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  useEffect(() => {
    axios.get(API_URL)
      .then(res => {
        setMenu(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Ошибка загрузки меню');
        setLoading(false);
      });
  }, []);

  // Сохраняем корзину и приборы в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem('cutleryCount', cutleryCount);
  }, [cutleryCount]);

  return (
    <>
      {/* Шапка */}
      <header style={{ background: '#232323', color: '#fff', padding: 0, borderBottom: '2px solid #b04a3e', width: '100%', margin: 0, position: 'relative', left: 0, top: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70, width: '100%', boxSizing: 'border-box', padding: 0, margin: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <img src="/logo192.png" alt="BIGLY" style={{ height: 48, marginRight: 14 }} />
            <span style={{ fontWeight: 'bold', fontSize: 26, letterSpacing: 2 }}>BIGLY</span>
          </div>
          <nav style={{ display: 'flex', gap: 24, fontSize: 18, alignItems: 'center' }}>
            <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Меню</Link>
            <Link to="/order" style={{ color: '#fff', textDecoration: 'none' }}>Заказ</Link>
            <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Вход</Link>
            <Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>Регистрация</Link>
            <Link to="/admin" style={{ color: '#fff', textDecoration: 'none' }}>Админка</Link>
            {localStorage.getItem('token') && (
              <button
                style={{ marginLeft: 16, background: '#b04a3e', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 12px', cursor: 'pointer', fontSize: 16 }}
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.reload();
                }}
              >
                Выйти
              </button>
            )}
          </nav>
          <div style={{ fontSize: 26, cursor: 'pointer', marginLeft: 18 }} title="Корзина" onClick={() => navigate('/cart')} tabIndex={0} role="button" aria-label="Открыть корзину" onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate('/cart'); }}>
            <span role="img" aria-label="cart">🛒</span>
          </div>
        </div>
      </header>

      {/* Баннер */}
      <section style={{ background: '#191919', color: '#fff', padding: '36px 0 24px 0', borderBottom: '2px solid #b04a3e', width: '100%', margin: 0, position: 'relative', left: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
          <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: 2, marginBottom: 12 }}>
            <span style={{ marginRight: 18 }}>本物の味を、世界へ</span>
            <span style={{ marginRight: 18 }}>UN VIAGGIO DI SAPORI SENZA PASSAPORTO</span>
            <span style={{ marginRight: 18 }}>Когда я ем — я глух и нем</span>
            <span>One Bite. Every Culture.</span>
          </div>
          <div style={{ fontSize: 38, fontWeight: 800, margin: '12px 0 12px 0', letterSpacing: 3 }}>BIGLY</div>
          <div style={{ fontSize: 18, marginBottom: 20 }}>
            <span style={{ marginRight: 18 }}>Sabores del mundo, servidos con pasión</span>
            <span style={{ marginRight: 18 }}>Вкус мира в каждом блюде</span>
            <span>Saveurs du monde entier</span>
          </div>
          <button style={{ background: '#b04a3e', color: '#fff', padding: '12px 28px', fontSize: 20, borderRadius: 8, border: 'none', cursor: 'pointer', marginTop: 12, fontWeight: 600, letterSpacing: 1 }}
            onClick={() => { window.scrollTo({ top: 400, behavior: 'smooth' }); }}>
            ПОСМОТРЕТЬ МЕНЮ
          </button>
        </div>
      </section>

      {/* Категории и меню */}
      <div style={{ width: '100%', margin: 0, padding: 0, background: '#232323', minHeight: 120 }}>
        {/* Категории */}
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '24px 0 0 0', justifyContent: 'center' }}>
          {['Горячее','Паста','Супы','Салаты','Закуски','Гарниры','Десерты','Чай и кофе','Соя и морсы','Безалкогольные коктейли'].map(cat => (
            <button key={cat} style={{
              background: '#191919', color: '#fff', border: '2px solid #b04a3e', borderRadius: 18, padding: '8px 22px', fontSize: 17, fontWeight: 500, cursor: 'pointer', marginBottom: 8, whiteSpace: 'nowrap', transition: 'background 0.2s', marginRight: 0
            }}>{cat}</button>
          ))}
        </div>
        {/* Заголовок меню */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '16px 0 8px 0' }}>
          <div style={{ fontSize: 26, color: '#fff', letterSpacing: 2, fontWeight: 700, marginBottom: 4 }}>МЕНЮ</div>
          <div style={{ width: 120, height: 3, background: '#fff', borderRadius: 2, marginBottom: 12, opacity: 0.35 }}></div>
        </div>
        {/* Сетка карточек + корзина */}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', gap: 32, padding: '0 0 36px 0', width: '100%' }}>
          {/* Сетка карточек */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 18, flex: 1, maxWidth: 900 }}>
            {menu.map(item => (
              <div key={item._id} style={{ background: '#2d2d2d', borderRadius: 14, boxShadow: '0 2px 12px #0002', padding: '16px 14px 14px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 300, position: 'relative' }}>
                {item.image && <img src={item.image} alt={item.name} style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: '50%', background: '#fff', marginBottom: 12, boxShadow: '0 1px 8px #0003' }} />}
                <div style={{ fontWeight: 600, fontSize: 17, color: '#fff', textAlign: 'center', marginBottom: 4 }}>{item.name}</div>
                <div style={{ color: '#ccc', fontSize: 15, textAlign: 'center', marginBottom: 8 }}>{item.description || '350 г'}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ color: '#fff', fontSize: 16, fontWeight: 500 }}>{item.weight ? `${item.weight} г` : ''}</span>
                  <span style={{ color: '#b04a3e', fontWeight: 700, fontSize: 18 }}>{item.price} ₽</span>
                </div>
                <button onClick={() => handleAddToCart(item)} style={{ width: '100%', background: '#b04a3e', color: '#fff', border: 'none', borderRadius: 7, padding: '8px 0', fontSize: 16, fontWeight: 600, cursor: 'pointer', marginTop: 'auto', boxShadow: '0 1px 6px #0002', letterSpacing: 0.5 }}>+ Добавить</button>
              </div>
            ))}
          </div> {/* end grid */}
          {/* Корзина сбоку */}
          <div style={{ background: '#444', borderRadius: 14, padding: '18px 18px 14px 18px', minWidth: 320, maxWidth: 340, color: '#fff', boxShadow: '0 2px 16px #0003', marginTop: 0, marginLeft: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, fontSize: 20, marginBottom: 10 }}>
              <span style={{ fontSize: 22 }}>🛒</span> Корзина
            </div>
            {/* Товары в корзине */}
            {cart.length === 0 ? (
              <div style={{ color: '#bbb', fontSize: 16, marginBottom: 20 }}>Корзина пуста</div>
            ) : (
              cart.map(item => (
                <div key={item._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#393939', borderRadius: 9, padding: '10px 10px 10px 8px', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {item.image && <img src={item.image} alt={item.name} style={{ width: 38, height: 38, borderRadius: 7, objectFit: 'cover', background: '#fff', boxShadow: '0 1px 4px #0002', marginRight: 6 }} />}
                    <span style={{ fontWeight: 500, fontSize: 16 }}>{item.name}</span>
                    <button onClick={() => setCart(cart => cart.filter(i => i._id !== item._id))} style={{ background: 'none', border: 'none', color: '#b04a3e', fontSize: 18, marginLeft: 6, cursor: 'pointer', fontWeight: 700 }} title="Убрать из корзины">✕</button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <span style={{ color: '#b04a3e', fontWeight: 700, fontSize: 17 }}>{item.price} ₽</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                      <button onClick={() => setCart(cart => cart.map(i => i._id === item._id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i))} style={{ background: '#333', color: '#fff', border: 'none', borderRadius: 5, width: 24, height: 24, fontSize: 18, cursor: 'pointer', fontWeight: 700, lineHeight: 1 }}>-</button>
                      <span style={{ fontWeight: 600, fontSize: 16, minWidth: 18, textAlign: 'center' }}>{item.quantity || 1}</span>
                      <button onClick={() => setCart(cart => cart.map(i => i._id === item._id ? { ...i, quantity: (i.quantity || 1) + 1 } : i))} style={{ background: '#333', color: '#fff', border: 'none', borderRadius: 5, width: 24, height: 24, fontSize: 18, cursor: 'pointer', fontWeight: 700, lineHeight: 1 }}>+</button>
                    </div>
                  </div>
                </div>
              ))
            )}
            {/* Приборы */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#393939', borderRadius: 9, padding: '10px 10px 10px 8px', marginBottom: 8, marginTop: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 20 }}>🍴</span>
                <span style={{ fontWeight: 500, fontSize: 16 }}>Приборы</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <button onClick={() => setCutleryCount(c => Math.max(0, c - 1))} style={{ background: '#333', color: '#fff', border: 'none', borderRadius: 5, width: 24, height: 24, fontSize: 18, cursor: 'pointer', fontWeight: 700, lineHeight: 1 }}>-</button>
                <span style={{ fontWeight: 600, fontSize: 16, minWidth: 18, textAlign: 'center' }}>{cutleryCount}</span>
                <button onClick={() => setCutleryCount(c => c + 1)} style={{ background: '#333', color: '#fff', border: 'none', borderRadius: 5, width: 24, height: 24, fontSize: 18, cursor: 'pointer', fontWeight: 700, lineHeight: 1 }}>+</button>
              </div>
            </div>
            {/* Итог */}
            <div style={{ borderTop: '1px solid #666', margin: '12px 0 6px 0' }}></div>
            <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 2 }}>Стоимость заказа</div>
            <div style={{ color: '#b04a3e', fontWeight: 700, fontSize: 20, marginBottom: 8 }}>
              {cart.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0)} ₽
            </div>
            <div style={{ color: '#aaa', fontSize: 13, marginBottom: 10 }}>
              Стоимость заказа не включает доставку и упаковку
            </div>
            <button style={{ width: '100%', background: '#b04a3e', color: '#fff', border: 'none', borderRadius: 7, padding: '10px 0', fontSize: 17, fontWeight: 700, cursor: 'pointer', marginTop: 2, boxShadow: '0 1px 6px #0002', letterSpacing: 0.5 }}>
              Оформить
            </button>
          </div>
        </div> {/* end flex-row */}
      </div> {/* end категории и меню */}
    </>
  );
};

export default Menu;
