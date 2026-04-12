import axios from "axios";

// 1. Base URL ni aniqlash
const baseURL = import.meta.env.DEV
  ? "/api"
  : import.meta.env.VITE_API_URL;

// 2. Axios instance yaratish
const api = axios.create({
  baseURL: baseURL, // Bu yerda yuqoridagi o'zgaruvchini ishlatish kerak
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
