import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cart, setCart, cutleryCount, setCutleryCount }) => {
  // Если корзина хранится в localStorage или глобальном стейте, можно получить её здесь
  // Для примера используем localStorage
  const [localCart, setLocalCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart')) || [];
    } catch {
      return [];
    }
  });
  const [localCutlery, setLocalCutlery] = useState(() => {
    try {
      return Number(localStorage.getItem('cutleryCount')) || 0;
    } catch {
      return 0;
    }
  });

  // Синхронизация с localStorage при изменениях
  const updateCart = newCart => {
    setLocalCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };
  const updateCutlery = val => {
    setLocalCutlery(val);
    localStorage.setItem('cutleryCount', val);
  };

  const total = localCart.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0);

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
          </nav>
          <div style={{ fontSize: 24, color: '#fff', marginLeft: 18, opacity: 0.7, cursor: 'not-allowed' }} title="Корзина">
            <span role="img" aria-label="cart">🛒</span>
          </div>
        </div>
      </header>
      <div style={{ minHeight: '100vh', background: '#232323', padding: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '96%', maxWidth: 1200, margin: '40px auto 0 auto' }}>
          {/* Левая колонка: карточка товара */}
          <div style={{ flex: 1, marginRight: 36 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <h1 style={{ color: '#fff', fontWeight: 800, fontSize: 40, margin: 0 }}>Корзина</h1>
              <button onClick={() => { updateCart([]); updateCutlery(0); }} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 28, cursor: 'pointer', marginLeft: 24 }} title="Очистить корзину">🗑️</button>
            </div>
            {localCart.length === 0 ? (
              <div style={{ color: '#bbb', fontSize: 20, marginTop: 40 }}>Корзина пуста</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 600 }}>
                {localCart.map(item => (
                  <div key={item._id} style={{ background: '#595959', borderRadius: 20, padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 70, boxShadow: '0 2px 8px #0002', gap: 18 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      {item.image && <img src={item.image} alt={item.name} style={{ width: 54, height: 54, borderRadius: 12, objectFit: 'cover', background: '#fff', boxShadow: '0 1px 4px #0002' }} />}
                      <div style={{ color: '#fff', fontSize: 18, fontWeight: 500, maxWidth: 320, lineHeight: 1.2 }}>{item.name}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10, minWidth: 220 }}>
                      <span style={{ color: '#b04a3e', fontWeight: 700, fontSize: 20, marginBottom: 2 }}>{item.price} ₽</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <button onClick={() => updateCart(localCart.map(i => i._id === item._id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i))} style={{ background: 'none', color: '#fff', border: '2px solid #aaa', borderRadius: 16, width: 38, height: 30, fontSize: 20, cursor: 'pointer', fontWeight: 700, lineHeight: 1, transition: 'background .15s' }}>−</button>
                        <span style={{ fontWeight: 700, fontSize: 17, minWidth: 24, textAlign: 'center', color: '#fff' }}>{item.quantity || 1}</span>
                        <button onClick={() => updateCart(localCart.map(i => i._id === item._id ? { ...i, quantity: (i.quantity || 1) + 1 } : i))} style={{ background: 'none', color: '#fff', border: '2px solid #aaa', borderRadius: 16, width: 38, height: 30, fontSize: 20, cursor: 'pointer', fontWeight: 700, lineHeight: 1, transition: 'background .15s' }}>+</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Правая колонка: итог */}
          <div style={{ background: '#595959', borderRadius: 20, padding: '24px 32px', minWidth: 350, maxWidth: 400, boxShadow: '0 2px 8px #0002', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'stretch' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 22, color: '#fff' }}>🍴 Приборы</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button onClick={() => updateCutlery(Math.max(0, localCutlery - 1))} style={{ background: 'none', color: '#fff', border: '2px solid #aaa', borderRadius: 16, width: 38, height: 30, fontSize: 20, cursor: 'pointer', fontWeight: 700, lineHeight: 1 }}>−</button>
                <span style={{ fontWeight: 700, fontSize: 17, minWidth: 24, textAlign: 'center', color: '#fff' }}>{localCutlery}</span>
                <button onClick={() => updateCutlery(localCutlery + 1)} style={{ background: 'none', color: '#fff', border: '2px solid #aaa', borderRadius: 16, width: 38, height: 30, fontSize: 20, cursor: 'pointer', fontWeight: 700, lineHeight: 1 }}>+</button>
              </div>
            </div>
            <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 5, color: '#fff' }}>Стоимость заказа</div>
            <div style={{ color: '#b04a3e', fontWeight: 700, fontSize: 20, marginBottom: 2, textAlign: 'right' }}>{total} ₽</div>
            <div style={{ color: '#ddd', fontSize: 13, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ fontSize: 15, color: '#aaa' }}>ⓘ</span>
              <span>Стоимость заказа определяется в процессе оформления</span>
            </div>
            <button style={{ width: '100%', background: '#b04a3e', color: '#fff', border: 'none', borderRadius: 10, padding: '15px 0', fontSize: 20, fontWeight: 700, cursor: 'pointer', marginTop: 2, boxShadow: '0 1px 6px #0002', letterSpacing: 0.5 }}>
              Оформить
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
