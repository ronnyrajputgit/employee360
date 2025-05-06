import axios from "axios";
import { getAccessToken } from "../auth/authProvider";

const axiosInstance = axios.create({
  baseURL: "https://graph.microsoft.com/v1.0",
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
