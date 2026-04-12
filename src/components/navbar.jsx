import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, Search, User, ShoppingBasket, Phone, 
  ChevronDown, Menu, X, Trash2, ShoppingCart
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectCartItems,
  selectCartCount,
  selectCartTotal,
  removeFromCart,
  addToCart,
  decreaseQuantity,
} from '../store/cartSlice';
import logo from '../assets/logo.svg';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef(null);

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartCount = useSelector(selectCartCount);
  const cartTotal = useSelector(selectCartTotal);

  // Close cart dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setIsCartOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const topNavItems = [
    { name: 'О нас', active: true },
    { name: 'Доставка и оплата' },
    { name: 'Вопросы и ответы' },
    { name: 'Отзывы' },
    { name: 'Статьи' },
    { name: 'Контакты' },
    { name: 'Еще', isDropdown: true },
  ];

  const categoryItems = [
    'Кошки', 'Собаки', 'Грызуны', 'Птицы', 
    'Аквариумистика', 'Ветаптека', 'Акции', 
    'Франчайзинг', 'Ветклиника'
  ];

  return (
    <header className="w-full font-sans text-xs antialiased relative">
      
      {/* 1. TOP BAR (Desktop only) */}
      <div className="hidden lg:block bg-[#f2f2f2] text-[#4d4d4d] py-2 border-b border-gray-200">
        <div className="container flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 cursor-pointer">
              <MapPin size={16} className="text-[#bfbfbf]" />
              <span>Новый Уренгой</span>
              <ChevronDown size={14} className="text-[#bfbfbf]" />
            </div>
            <div className="flex items-center gap-1.5">
              <Phone size={16} className="text-[#ff9800]" />
              <a href="tel:+73432594943" className="font-medium text-[#222]">+7 (3432) 59-49-43</a>
            </div>
          </div>
          <nav className="flex-1 flex justify-center">
            <ul className="flex items-center gap-5 whitespace-nowrap">
              {topNavItems.map((item, index) => (
                <li key={index} className={`cursor-pointer hover:text-[#ff9800] ${item.active ? 'text-[#ff9800] font-medium' : ''}`}>
                  {item.name}
                </li>
              ))}
            </ul>
          </nav>
          <button className="text-[#ff9800] font-medium hover:underline">Заказать звонок</button>
        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      <div className="bg-white py-3 lg:py-4 shadow-sm">
        <div className="container flex items-center justify-between">
          
          {/* LOGO */}
          <div className="flex-shrink-0 cursor-pointer">
            <img src={logo} alt="Logo" className="h-9 lg:h-14 w-auto" />
          </div>

          {/* DESKTOP SEARCH */}
          <div className="hidden lg:flex flex-1 mx-10 relative max-w-2xl">
            <input 
              type="search" 
              placeholder="Поиск товаров" 
              className="w-full bg-[#f9f9f9] border border-gray-200 rounded-full pl-6 pr-12 py-3 text-sm focus:outline-none focus:border-[#ff9800]"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4d4d4d]"><Search size={20} /></button>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">
            {/* Desktop buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <button className="px-6 py-3 border border-gray-200 rounded-full flex items-center gap-2 hover:bg-gray-50 transition-colors">
                <User size={22} className="text-[#bfbfbf]" />
                <span className="font-medium text-[#222]">Николай</span>
              </button>
              
              {/* CART BUTTON */}
              <div className="relative" ref={cartRef}>
                <button
                  onClick={() => setIsCartOpen((prev) => !prev)}
                  className="px-6 py-3 border border-gray-200 rounded-full flex items-center gap-2 relative hover:bg-gray-50 transition-colors"
                >
                  <ShoppingBasket size={22} className="text-[#bfbfbf]" />
                  {cartCount > 0 && (
                    <span className="absolute top-2 left-7 min-w-[18px] h-[18px] bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold px-1">
                      {cartCount}
                    </span>
                  )}
                  <span className="font-medium text-[#222]">
                    {cartTotal > 0 ? `${cartTotal.toLocaleString()} ₽` : 'Корзина'}
                  </span>
                </button>

                {/* CART DROPDOWN */}
                {isCartOpen && (
                  <div className="absolute right-0 top-[calc(100%+10px)] w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-[200] overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                      <h3 className="font-bold text-[#333] text-base flex items-center gap-2">
                        <ShoppingCart size={18} className="text-[#ff9800]" />
                        Корзина
                        {cartCount > 0 && (
                          <span className="bg-[#ff9800] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            {cartCount}
                          </span>
                        )}
                      </h3>
                      <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-gray-600">
                        <X size={18} />
                      </button>
                    </div>

                    {cartItems.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                        <ShoppingBasket size={48} className="mb-3 opacity-30" />
                        <p className="text-sm">Корзина пуста</p>
                      </div>
                    ) : (
                      <>
                        <ul className="max-h-[320px] overflow-y-auto divide-y divide-gray-50">
                          {cartItems.map((item) => (
                            <li key={item.id} className="flex items-center gap-3 px-5 py-3">
                              {/* Image */}
                              <div className="w-14 h-14 rounded-xl bg-[#fff8ef] flex-shrink-0 overflow-hidden">
                                {item.imageUrl ? (
                                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain p-1" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                                    <ShoppingBasket size={20} />
                                  </div>
                                )}
                              </div>

                              {/* Info */}
                              <div className="flex-1 min-w-0">
                                <Link
                                  to={`/products/${item.id}`}
                                  onClick={() => setIsCartOpen(false)}
                                  className="text-sm font-medium text-[#333] hover:text-[#ff9800] line-clamp-2 leading-snug"
                                >
                                  {item.name}
                                </Link>
                                <p className="text-xs text-gray-400 mt-0.5">{item.price} ₽ / шт.</p>
                              </div>

                              {/* Quantity controls */}
                              <div className="flex items-center gap-1.5 flex-shrink-0">
                                <button
                                  onClick={() => dispatch(decreaseQuantity(item.id))}
                                  className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#ff9800] hover:text-[#ff9800] transition"
                                >
                                  <span className="text-lg leading-none">−</span>
                                </button>
                                <span className="text-sm font-bold w-5 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => dispatch(addToCart({ id: item.id, name: item.name, price: item.price, imageUrl: item.imageUrl }))}
                                  className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#ff9800] hover:text-[#ff9800] transition"
                                >
                                  <span className="text-lg leading-none">+</span>
                                </button>
                              </div>

                              {/* Price + delete */}
                              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                                <span className="text-sm font-bold text-[#333]">
                                  {(item.price * item.quantity).toLocaleString()} ₽
                                </span>
                                <button
                                  onClick={() => dispatch(removeFromCart(item.id))}
                                  className="text-gray-300 hover:text-red-400 transition"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>

                        {/* TOTAL + CHECKOUT */}
                        <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-sm text-gray-500">Итого:</span>
                            <span className="text-lg font-black text-[#ff9800]">
                              {cartTotal.toLocaleString()} ₽
                            </span>
                          </div>
                          <Link
                            to={`/checkout/cart`}
                            onClick={() => setIsCartOpen(false)}
                            className="block w-full text-center bg-[#ff9800] hover:bg-[#e68600] text-white font-semibold py-3 rounded-full transition text-sm"
                          >
                            Оформить заказ →
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* MOBILE HAMBURGER */}
            <button 
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu size={30} />
            </button>
          </div>

        </div>
      </div>

      {/* 3. CATEGORIES BAR (Desktop only) */}
      <div className="hidden lg:block bg-white pb-3 border-b border-gray-100">
        <div className="container">
          <ul className="flex items-center justify-between text-[#4d4d4d] whitespace-nowrap">
            {categoryItems.map((item, index) => (
              <li key={index} className="cursor-pointer py-2 px-1 hover:text-[#316c8c] transition-colors flex items-center gap-1.5">
                {item}
                {item === 'Акции' && <span className="w-2.5 h-2.5 bg-[#ff9800] rounded-full"></span>}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 4. MOBILE DRAWER */}
      <div className={`
        lg:hidden fixed inset-0 bg-white z-[100] transition-transform duration-300 ease-in-out
        ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="p-4 flex flex-col h-full">
          <div className="flex justify-between items-center mb-8 border-b pb-4">
            <img src={logo} alt="Logo" className="h-9" />
            <button 
              onClick={() => setIsMenuOpen(false)} 
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-6">
            <div className="relative">
              <input 
                type="search" 
                placeholder="Поиск товаров" 
                className="w-full bg-gray-100 rounded-xl p-4 outline-none text-base"
              />
              <Search className="absolute right-4 top-4 text-gray-400" size={20} />
            </div>

            <nav>
              <h3 className="font-bold text-lg mb-4 text-[#316c8c] border-l-4 border-[#316c8c] pl-3">Категории</h3>
              <ul className="space-y-4">
                {categoryItems.map((item, index) => (
                  <li key={index} className="flex items-center justify-between text-lg text-gray-700 border-b border-gray-50 pb-2 active:text-[#ff9800]">
                    {item}
                    <ChevronDown size={18} className="-rotate-90 text-gray-300" />
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mt-auto pt-6 border-t border-gray-100 space-y-4">
            <div className="flex items-center gap-3 text-xl font-bold text-[#ff9800]">
              <Phone /> +7 (3432) 59-49-43
            </div>
            <div className="flex items-center gap-3 text-gray-500 text-sm font-medium">
              <MapPin size={18} /> Новый Уренгой
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;