import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="checkout/:id" element={<Checkout />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/:id" element={<ProductDetail />} />
      </Route>
    </Routes>
  );
}
