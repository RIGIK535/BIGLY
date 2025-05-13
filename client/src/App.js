import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Menu from './pages/Menu';
import Order from './pages/Order';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import './App.css';

function App() {
  return (
    <Router>
      {/* Верхняя плашка убрана, навигация теперь в шапке Menu.js */}
      <div style={{ padding: 0 }}>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/order" element={<Order />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
