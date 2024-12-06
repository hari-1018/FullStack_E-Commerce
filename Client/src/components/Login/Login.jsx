import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import axiosInstance from "../../api/axiosInstance";
import endPoints from "../../api/endPoints";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setError(""); // Reset any existing errors
      try {
        // Send POST request with email and password
        const response = await axiosInstance.post(endPoints.AUTH.LOGIN, {
          email: values.email,
          password: values.password,
        });

        const user = response.data;

        // Handle the response from your backend
        if (user) {
          if (user.blocked) {
            setError("Your account is temporarily blocked. Try again later.");
            return;
          }

          localStorage.setItem("loggedInUser", JSON.stringify(user));
          localStorage.setItem("id", user.id);
          localStorage.setItem("cart", JSON.stringify(user.cart || []));
          window.dispatchEvent(new Event("loginChange"));

          if (user.admin) {
            toast.success(
              <div
                style={{
                  backgroundColor: "#ffe5b4",
                  border: "1px solid #ffcc00",
                  borderRadius: "8px",
                  padding: "10px",
                }}
              >
                <span style={{ fontWeight: "bold", color: "black" }}>
                  Welcome Back Admin! Ready to manage things? 🛠️✨
                </span>
              </div>
            );
            navigate("/admin");
          } else {
            toast.success(
              <div
                style={{
                  backgroundColor: "#ffe5b4",
                  border: "1px solid #ffcc00",
                  borderRadius: "8px",
                  padding: "10px",
                }}
              >
                <span style={{ fontWeight: "bold", color: "black" }}>
                  You&apos;re in! Time to explore all baby things! ✨🎉
                </span>
              </div>
            );
            navigate("/");
          }
        } else {
          setError("Incorrect Email or Password. Please Try Again.");
        }
      } catch (err) {
        // Check if the error is related to incorrect credentials
        if (err.response && err.response.status === 401) {
          setError("Incorrect Email or Password. Please Try Again.");
        } else {
          setError("An error occurred while logging in. Please try again.");
        }
      }
    },
  });

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      formik.setValues({ email: user.email, password: user.password });
    }
  }, []);

  return (
    <div className="flex items-center justify-center bg-blue-100 mt-28">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white mt-8 mb-8 p-6 rounded-lg shadow-lg w-full max-w-lg transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-pink-400">
          Welcome Back - Unlock Your Space 🤩
        </h2>

        <h3 className="text-base font-bold mb-4 text-center text-blue-400">
          Let&apos;s Get Started 🎉
        </h3>

        <p className="text-gray-600 mb-6 text-center">Just a Click Away..!</p>

        <label className="block mb-4">
          <b className="text-pink-400 text-lg">Email:</b>
          <input
            className="w-full mt-2 p-3 border text-gray-900 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition-shadow duration-300 hover:shadow-md"
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            required
          />
        </label>

        <label className="block mb-4 relative">
          <b className="text-pink-400 text-lg">Password:</b>
          <input
            className="w-full mt-2 p-3 border text-gray-900 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition-shadow duration-300 hover:shadow-md"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Your Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </label>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="button"
          onClick={() => navigate("/forgot-password")}
          className="text-pink-400 ml-36 font-semibold hover:text-blue-400 transition-colors duration-300"
        >
          Forgot Password? 😞
        </button>

        <input
          type="submit"
          className="mt-8 w-full bg-pink-400 text-white font-bold text-xl py-3 px-4 rounded-lg shadow-md hover:bg-blue-400 transition-colors duration-300 cursor-pointer"
          value="Log In"
        />

        <div className="flex items-center justify-center mt-4">
          <span className="text-sm text-gray-600">
            Don&apos;t have an account?
            <button
              onClick={() => navigate("/register")}
              className="ml-2 text-pink-400 text-base font-semibold underline hover:text-blue-400 transition-colors duration-300"
            >
              Register
            </button>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
