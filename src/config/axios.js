import axios from "axios";

// VITE_API_URL bo'lsa o'shani oladi, bo'lmasa qo'lda yozilgan manzilni
const API_URL = import.meta.env.VITE_API_URL || "https://e-commerce-api-v4.nt.azimumarov.uz";

const api = axios.create({
  // Lokalda "/api" ishlatish (proxy uchun), Vercelda esa to'liq manzil
  baseURL: import.meta.env.DEV ? "/api" : API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;