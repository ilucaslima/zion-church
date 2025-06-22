import axios from "axios";
import Cookies from "js-cookie";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3333/"
    : "https://zion-church-api-production.up.railway.app/";

export const api = axios.create({
  baseURL: url,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
