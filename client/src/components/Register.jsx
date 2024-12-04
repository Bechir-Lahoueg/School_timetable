import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  User, 
  Mail, 
  Lock, 
  GraduationCap, 
  CheckCircle2, 
  AlertTriangle 
} from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    password: "",
    classe: "",
    agreeTerms: false,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [classes, setClasses] = useState([]);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://localhost:5500/classes/all");
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length > 7) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[$@#&!]+/)) strength++;
    return strength;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5500/etudiants/create", {
        nom: formData.nom,
        email: formData.email,
        mdp: formData.password,
        classeId: formData.classe,
      });

      setSuccessMessage("Registration successful! Please log in.");
      setErrorMessage("");
      setFormData({
        nom: "",
        email: "",
        password: "",
        classe: "",
        agreeTerms: false,
      });
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "Failed to register");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center px-4 py-8">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-4xl flex items-center justify-center">
        {/* Left Side: Gradient & Illustration */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-[#b24c6a] to-[#9e2145] text-white p-12 w-1/2">
          <div className="text-center">
            <GraduationCap size={340} className="mx-auto mb-6 animate-bounce" />
            <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
            <p className="text-xl opacity-80">
              Join our academic community and start your learning journey today.
            </p>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="p-8 md:p-12 w-full md:w-1/2">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#b24c6a]">
            Create Your Account
          </h2>

          {errorMessage && (
            <div className="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <AlertTriangle className="mr-3" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="flex items-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
              <CheckCircle2 className="mr-3" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="nom"
                placeholder="First Name"
                className="w-full pl-10 p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#b24c6a] transition"
                value={formData.nom}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full pl-10 p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#b24c6a] transition"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Input with Strength Meter */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full pl-10 p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#b24c6a] transition"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div className="mt-1 h-1 w-full bg-gray-200 rounded">
                <div 
                  className={`h-1 rounded transition-all duration-500 ${
                    passwordStrength === 0 ? 'bg-red-500 w-[20%]' :
                    passwordStrength === 1 ? 'bg-red-500 w-[40%]' :
                    passwordStrength === 2 ? 'bg-orange-500 w-[60%]' :
                    passwordStrength === 3 ? 'bg-yellow-500 w-[80%]' :
                    'bg-green-500 w-full'
                  }`}/>
              </div>
            </div>

            {/* Class Selection */}
            <div className="relative">
              <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                name="classe"
                className="w-full pl-10 p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#b24c6a] transition text-gray-600"
                value={formData.classe}
                onChange={handleChange}
                required
              >
                <option value="">Select Your Class</option>
                {classes.map((classItem) => (
                  <option key={classItem._id} value={classItem._id}>
                    {classItem.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="mr-3 text-[#b24c6a] focus:ring-[#b24c6a] rounded"
                required
              />
              <label className="text-gray-600 text-sm">
                I agree to all terms, privacy policies, and fees
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#b24c6a] text-white py-3 rounded-lg hover:bg-[#9e2145] transition duration-300 transform hover:scale-[1.02] flex items-center justify-center"
            >
              <span>Sign Up</span>
            </button>

            {/* Login Link */}
            <p className="text-gray-600 mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-[#b24c6a] hover:underline font-semibold">
                Log in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
