import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API requests
import loginImage from '../assets/loginn.png'; // Import the image

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Use the navigate hook for redirection

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5500/etudiants/login", {
        email: formData.email,
        mdp: formData.password,
      });

      if (response.status === 200) {
        setErrorMessage(""); // Clear error message on successful submit
        console.log("Login successful:", response.data);

        // Extract user ID from the response
        const userId = response.data.etudiant.id; // Correctly extract the ID
        console.log("Extracted userId:", userId); // Debugging

        // Redirect to HomeEtudiant with user ID
        navigate("/HomeEtudiant", { state: { userId } });
      }
    } catch (error) {
      setErrorMessage("Invalid email or password");
      console.error("Error during login:", error); // Debugging
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      {/* Wrapper for both image and form */}
      <div className="flex items-center justify-center w-full max-w-screen-xl">
        {/* Image Section - Move the image a bit left */}
        <div className="hidden lg:block w-1/2 ml-10"> {/* Added margin-left */}
          <img
            src={loginImage} // Use the imported image
            alt="Login"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Login Form Section - Move the form a bit right */}
        <div className="flex flex-col w-full max-w-lg p-8 bg-white rounded-xl shadow-lg space-y-6 ml-20"> {/* Added margin-left */}
          {/* Title */}
          <h2 className="text-4xl font-extrabold text-center text-gray-800">Welcome Back!</h2>
          <p className="text-lg text-center text-gray-600">Please login to your account</p>

          {/* Error message display */}
          {errorMessage && (
            <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Email Input */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Remember me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center text-gray-600">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="mr-2"
                />
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-md shadow-lg hover:from-pink-400 hover:to-red-400 transition duration-300"
              >
                Login
              </button>
            </div>
          </form>

          {/* Register Link */}
          <p className="text-center text-gray-600">
            Not registered yet?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Create a new account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
