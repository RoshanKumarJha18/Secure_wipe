import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// NOTE: For a real application, NEVER store credentials in frontend code.
// This is for demonstration purposes only.
const allowedUsers = [
  { name: 'Navya', email: 'navyabandaru65@gmail.com', password: 'admin' },
  { name: 'Roshan', email: 'roshanjhajha76@gmail.com', password: 'admin' },
  { name: 'Nandini', email: 'nandinisandineni@gmail.com', password: 'admin' },
  { name: 'Shiva', email: 'shivanaroj72@gmail.com', password: 'admin' },
  { name: 'Pranav', email: 'arandkarpranav@gmail.com', password: 'admin' },
  { name: 'Sunny', email: 'sunnykothakonda4@gmail.com', password: 'admin' },
  { name: 'Dinesh', email: 'dineshjillala@gmail.com', password: 'admin' }
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    const user = allowedUsers.find((u) => u.email === email.trim().toLowerCase());

    if (!user) {
      setMessage("Email not found or unauthorized.");
      setMessageType("error");
    } else if (user.password !== password) {
      setMessage("Incorrect password.");
      setMessageType("error");
    } else {
      setMessage("Login successful! Redirecting...");
      setMessageType("success");
      setIsSubmitting(true);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("adminName", user.name);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0e17] p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-8 bg-[#1a1b26] rounded-2xl shadow-2xl shadow-black/50 border border-white/10"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">
            Admin Sign In
          </h2>
          <p className="mt-2 text-sm text-gray-400">Access the SecureWipe  portal</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label htmlFor="email" className="sr-only">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@example.com"
              className="w-full px-4 py-3 bg-[#0f0e17] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              required
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-[#0f0e17] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              required
            />
            <span onClick={togglePassword} className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400 hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {showPassword ? (
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                ) : (
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                )}
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
          </div>
          <div>
            <button type="submit" disabled={isSubmitting} className="w-full px-4 py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1a1b26] focus:ring-indigo-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-300 transform hover:scale-[1.02]">
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </div>
          {message && (
            <p className={`text-sm text-center font-medium ${messageType === 'error' ? 'text-red-400' : 'text-green-400'}`}>
              {message}
            </p>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default Login;