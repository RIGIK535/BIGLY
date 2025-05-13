import React from 'react';

const Order = () => {
  // Получаем корзину из localStorage
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const total = cart.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0);

  const [pickupType, setPickupType] = React.useState('pickup'); // 'pickup' | 'delivery'
  const [deliveryTime, setDeliveryTime] = React.useState('В ближайшее время');
  const [showTimeSelect, setShowTimeSelect] = React.useState(false);
  const [address, setAddress] = React.useState('');

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
            <a href="/" style={{ color: '#fff', textDecoration: 'none' }}>Меню</a>
            <a href="/cart" style={{ color: '#fff', textDecoration: 'none' }}>Корзина</a>
            <a href="/order" style={{ color: '#fff', textDecoration: 'none', opacity: 0.7, cursor: 'not-allowed' }}>Оформление</a>
          </nav>
          <div style={{ fontSize: 24, color: '#fff', marginLeft: 18, opacity: 0.7, cursor: 'not-allowed' }} title="Корзина">
            <span role="img" aria-label="cart">🛒</span>
          </div>
        </div>
      </header>
      <div style={{ minHeight: '100vh', background: '#232323', padding: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '96%', maxWidth: 1200, margin: '40px auto 0 auto' }}>
          {/* Левая колонка: форма */}
          <form style={{ flex: 1, marginRight: 36, background: '#2d2d2d', borderRadius: 18, padding: '32px 36px', boxShadow: '0 2px 8px #0002', display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 520 }}>
            <h1 style={{ color: '#fff', fontWeight: 800, fontSize: 38, marginBottom: 16 }}>Оформление заказа</h1>
            <div style={{ marginBottom: 16 }}>
              <div style={{ color: '#fff', fontSize: 19, fontWeight: 600, marginBottom: 6 }}>Способ получения</div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button type="button" onClick={() => setPickupType('pickup')} style={{ background: pickupType==='pickup' ? '#b04a3e' : '#232323', color: pickupType==='pickup' ? '#fff' : '#ffb4b4', borderRadius: 10, padding: '10px 18px', fontWeight: 700, fontSize: 18, border: '1px solid #b04a3e', minWidth: 120, cursor: 'pointer', transition: 'background .15s' }}>Самовывоз</button>
                <button type="button" onClick={() => setPickupType('delivery')} style={{ background: pickupType==='delivery' ? '#b04a3e' : '#232323', color: pickupType==='delivery' ? '#fff' : '#ffb4b4', borderRadius: 10, padding: '10px 18px', fontWeight: 700, fontSize: 18, border: '1px solid #b04a3e', minWidth: 120, cursor: 'pointer', transition: 'background .15s' }}>Доставка</button>
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ color: '#fff', fontSize: 18, fontWeight: 500, marginBottom: 6 }}>Время доставки</div>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <button type="button" onClick={() => setShowTimeSelect(v => !v)} style={{ background: '#232323', color: '#bbb', borderRadius: 10, padding: '10px 18px', fontSize: 16, border: '1px solid #444', display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer', minWidth: 170 }}>
                  <span role="img" aria-label="clock">⏰</span> {deliveryTime}
                </button>
                {showTimeSelect && (
                  <div style={{ position: 'absolute', top: '110%', left: 0, background: '#232323', border: '1px solid #444', borderRadius: 10, boxShadow: '0 2px 8px #0006', zIndex: 10, minWidth: 170 }}>
                    {['В ближайшее время', 'Через 30 минут', 'Через 1 час', 'Выбрать время...'].map(opt => (
                      <div key={opt} onClick={() => { setDeliveryTime(opt); setShowTimeSelect(false); }} style={{ padding: '10px 18px', cursor: 'pointer', color: deliveryTime===opt ? '#b04a3e' : '#fff', fontWeight: deliveryTime===opt ? 700 : 400, background: deliveryTime===opt ? '#232323' : 'none' }}>{opt}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <label style={{ color: '#fff', fontSize: 18, fontWeight: 500, marginBottom: 6 }}>Комментарий к заказу
              <textarea placeholder="Вы можете добавить примечание к заказу" style={{ width: '100%', marginTop: 7, padding: '12px 16px', borderRadius: 10, border: '1px solid #444', background: '#232323', color: '#fff', fontSize: 17, outline: 'none', resize: 'vertical', minHeight: 60 }} />
            </label>
            <div style={{ display: 'flex', gap: 15 }}>
              <label style={{ flex: 1, color: '#fff', fontSize: 18, fontWeight: 500 }}>Получатель
                <input type="text" required placeholder="Ваше имя" style={{ width: '100%', marginTop: 7, padding: '12px 16px', borderRadius: 10, border: '1px solid #444', background: '#232323', color: '#fff', fontSize: 17, outline: 'none' }} />
              </label>
              <label style={{ flex: 1, color: '#fff', fontSize: 18, fontWeight: 500, marginLeft: 0 }}>Телефон
                <input type="tel" required placeholder="+7" style={{ width: '100%', marginTop: 7, padding: '12px 16px', borderRadius: 10, border: '1px solid #444', background: '#232323', color: '#fff', fontSize: 17, outline: 'none' }} />
              </label>
            </div>
            {pickupType === 'delivery' && (
              <label style={{ color: '#fff', fontSize: 18, fontWeight: 500, marginTop: 6 }}>Адрес доставки
                <input type="text" required placeholder="Город, улица, дом, квартира" value={address} onChange={e => setAddress(e.target.value)} style={{ width: '100%', marginTop: 7, padding: '12px 16px', borderRadius: 10, border: '1px solid #b04a3e', background: '#232323', color: '#fff', fontSize: 17, outline: 'none' }} />
              </label>
            )}
          </form>
          {/* Правая колонка: итог */}
          <div style={{ background: '#595959', borderRadius: 20, padding: '28px 36px', minWidth: 350, maxWidth: 400, boxShadow: '0 2px 8px #0002', display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'stretch' }}>
            <div style={{ fontWeight: 700, fontSize: 22, color: '#fff', marginBottom: 10 }}>Ваш заказ</div>
            <div style={{ color: '#fff', fontSize: 17, marginBottom: 7, maxHeight: 120, overflowY: 'auto' }}>
              {cart.length === 0 ? <div style={{ color: '#bbb' }}>Нет товаров</div> : cart.map(i => (
                <div key={i._id || i.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'inline-block' }}>{i.name}{i.quantity > 1 ? ` ×${i.quantity}` : ''}</span>
                  <span style={{ fontWeight: 700, color: '#fff', marginLeft: 8 }}>{i.price * (i.quantity || 1)} ₽</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: 16, margin: '12px 0 0 0' }}>
              <span style={{ color: '#bbb' }}>Стоимость заказа</span>
              <span style={{ fontWeight: 700 }}>{total} ₽</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: 16 }}>
              <span style={{ color: '#bbb' }}>Самовывоз</span>
              <span style={{ fontWeight: 700 }}>Итого</span>
            </div>
            <div style={{ color: '#b04a3e', fontWeight: 700, fontSize: 20, marginBottom: 2, textAlign: 'right' }}>{total} ₽</div>
            <button style={{ width: '100%', background: '#b04a3e', color: '#fff', border: 'none', borderRadius: 8, padding: '15px 0', fontSize: 19, fontWeight: 700, cursor: 'pointer', marginTop: 2, boxShadow: '0 1px 6px #0002', letterSpacing: 0.5 }}>Всё верно, продолжить</button>
            <button style={{ width: '100%', background: '#ccc', color: '#222', border: 'none', borderRadius: 8, padding: '13px 0', fontSize: 18, fontWeight: 700, cursor: 'pointer', marginTop: 3 }}>Назад</button>
            <div style={{ color: '#bbb', fontSize: 12, marginTop: 10, textAlign: 'center' }}>Продолжая, вы соглашаетесь на обработку персональных данных и условия пользовательского соглашения</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
