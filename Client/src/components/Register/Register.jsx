import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import axiosInstance from "../../api/axiosInstance";
import endPoints from "../../api/endPoints";

const Register = () => {
  const navigate = useNavigate();

  // Validation function
  const validate = (values) => {
    const errors = {};
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexMobile = /^[0-9]{10}$/;

    if (!values.username) {
      errors.username = "Username is required!";
    } else if (values.username.length < 4) {
      errors.username = "Username must be more than 4 characters";
    } else if (values.username.length > 12) {
      errors.username = "Username cannot exceed more than 12 characters";
    }

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regexEmail.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.mobilenumber) {
      errors.mobilenumber = "Mobile number is required!";
    } else if (!regexMobile.test(values.mobilenumber)) {
      errors.mobilenumber = "Mobile number must be 10 digits!";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password should contain at least 6 characters.";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }

    return errors;
  };

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      mobilenumber: "", // mobile number is kept as a string here
    },
    validate,
    onSubmit: async (values) => {
      try {
        const requestData = {
          username: values.username,
          email: values.email,
          password: values.password,
          mobilenumber: values.mobilenumber, // mobile number is passed as a string
        };

        // Use the axios instance to send data to the backend
        const response = await axiosInstance.post(
          endPoints.AUTH.REGISTER,
          requestData
        );

        toast.success(
          "🎉 Welcome to the family! You're officially registered."
        );
        console.log("Registration success:", response.data);
        navigate("/login");
      } catch (error) {
        console.error("Error during registration:", error);

        // Specific error message if available
        const errorMessage =
          error.response?.data?.message || "Error registering user.";
        toast.error(errorMessage);
      }
    },
  });

  return (
    <div className="flex items-center justify-center bg-blue-100">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white mt-28 mb-16 p-4 rounded-lg shadow-lg w-full max-w-lg transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-pink-400">
          Thanks For Choosing Us..🤩
        </h2>
        <h3 className="text-xl font-bold mb-4 text-center text-blue-400">
          Register Now 🎉
        </h3>
        <p className="text-gray-600 mb-6 text-center">
          Fill out the form below to create your account.
        </p>

        <label className="block mb-4">
          <b className="text-pink-400 text-lg">Username:</b>
          <input
            className="w-full text-gray-900 mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition-shadow duration-300 hover:shadow-md"
            type="text"
            name="username"
            placeholder="Enter Your Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.username && formik.errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.username}
            </p>
          )}
        </label>

        <label className="block mb-4">
          <b className="text-pink-400 text-lg">E-mail:</b>
          <input
            className="w-full mt-2 text-gray-900 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition-shadow duration-300 hover:shadow-md"
            type="email"
            name="email"
            placeholder="Enter Your E-mail"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </label>

        <label className="block mb-4">
          <b className="text-pink-400 text-lg">Mobile Number:</b>
          <input
            className="w-full mt-2 text-gray-900 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition-shadow duration-300 hover:shadow-md"
            type="text"
            name="mobilenumber"
            placeholder="Enter Your Mobile Number"
            value={formik.values.mobilenumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.mobilenumber && formik.errors.mobilenumber && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.mobilenumber}
            </p>
          )}
        </label>

        <label className="block mb-4">
          <b className="text-pink-400 text-lg">Password:</b>
          <input
            className="w-full mt-2 text-gray-900 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition-shadow duration-300 hover:shadow-md"
            type="password"
            name="password"
            placeholder="Enter Your Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
          )}
        </label>

        <input
          type="submit"
          className="w-full bg-pink-400 text-white py-3 px-4 rounded-lg shadow-md hover:bg-blue-400 transition-colors duration-300 cursor-pointer"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default Register;
