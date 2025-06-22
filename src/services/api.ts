import axios from "axios";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3333/"
    : "https://zion-church-api-production.up.railway.app/";

export const api = axios.create({
  baseURL: url,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
