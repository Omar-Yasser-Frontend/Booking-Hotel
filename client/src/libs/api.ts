import axios, { type AxiosError } from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_API}/api/v1`,
  withCredentials: true,
});

interface FailResponse {
  status: "fail" | "error";
  message: string;
}

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    const data = response.data;
    if (data?.message) toast.success(data.message);

    const authHeader = response.headers["authorization"];
    if (authHeader && authHeader.startsWith("Bearer")) {
      const accessToken = authHeader.replace("Bearer ", "");
      localStorage.setItem("accessToken", accessToken);
    }

    return data;
  },
  (err: AxiosError<FailResponse>) => {
    const url = err.config?.url;

    if (url?.includes("/user/me") && err.config?.method === "get")
      return Promise.reject(err);

    const message = err.response?.data?.message || "Something went wrong";
    toast.error(message);
    return Promise.reject({ message });
  },
);

export default api;
