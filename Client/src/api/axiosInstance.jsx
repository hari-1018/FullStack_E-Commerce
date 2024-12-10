import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the logged-in user data from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const token = loggedInUser?.Token; // Ensure we get the token correctly
    if (token) {
      config.headers.authorization = `Bearer ${token}`; // Add token to headers
    }
    return config;
  },
  (error) => Promise.reject(error) // Handle request errors
);

// Add a response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response, // Return the response if no errors
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized errors (e.g., token expired)
      console.error("Unauthorized access, please log in again.");
      // Optional: Clear localStorage and redirect to login page
      localStorage.removeItem("loggedInUser");
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error); // Forward the error
  }
);

export default axiosInstance;
