import axios from "axios";
import { toast } from "react-toastify";

// ==========================================================
// Axios Instance
// ==========================================================

const api = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ==========================================================
// Request Interceptor
// ==========================================================

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ==========================================================
// Response Interceptor
// ==========================================================

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (!error.response) {
      toast.error(
        "Unable to connect to the server."
      );

      return Promise.reject(error);
    }

    // ==========================================================
    // Normalize FastAPI / Pydantic validation error format.
    // 422 responses return `detail` as an array of
    // { loc, msg, type } objects instead of a plain string,
    // which every page reads as `error.response.data.detail`.
    // Flatten it here once so the rest of the app always
    // sees a clean, readable string.
    // ==========================================================

    const detail = error.response.data?.detail;

    if (Array.isArray(detail)) {
      error.response.data.detail = detail
        .map((item) =>
          (item?.msg || "Invalid input.").replace(
            /^Value error,\s*/i,
            ""
          )
        )
        .join(" | ");
    }

    // ==========================================================
    // Session expiry — clear storage and redirect. Individual
    // pages already show their own error message for the
    // failed request, so we don't toast here as well.
    // ==========================================================

    if (error.response.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");

      if (
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/register"
      ) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;