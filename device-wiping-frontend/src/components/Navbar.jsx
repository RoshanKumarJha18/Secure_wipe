import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminName, setAdminName] = useState("");
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Devices", path: "/devices" },
    { name: "About", path: "/about" }
  ];

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
    setAdminName(localStorage.getItem("adminName") || "");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("adminName");
    setIsAuthenticated(false);
    setAdminName("");
    navigate("/login");
  };

  const activeLinkStyle = "text-indigo-400";
  const baseLinkStyle = "text-gray-300 hover:text-indigo-400 transition-colors duration-300";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-black/30 backdrop-blur-xl shadow-lg fixed w-full top-0 z-50 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 ">
            <Link to="/" className="flex items-center gap-3 text-white text-xl font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" className="text-indigo-500"/>
              </svg>
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
                SecureWipe 
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `${baseLinkStyle} px-3 py-2 rounded-md text-sm font-medium ${isActive ? activeLinkStyle : ""}`}
              >
                {item.name}
              </NavLink>
            ))}
            {isAuthenticated && adminName && (
              <span className="text-sm text-gray-400 px-3 py-2">
                Welcome, {adminName}
              </span>
            )}
            {isAuthenticated && (
              <button onClick={handleLogout} className="bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/40 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ height: isMenuOpen ? 'auto' : 0 }}
        className="md:hidden overflow-hidden"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${baseLinkStyle} ${isActive ? activeLinkStyle : ""}`}
            >
              {item.name}
            </NavLink>
          ))}
          {isAuthenticated && adminName && (
            <div className="px-3 py-2">
              <span className="text-sm text-gray-400">Welcome, {adminName}</span>
            </div>
          )}
          {isAuthenticated && (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/40"
            >
              Logout
            </button>
          )}
        </div>
      </motion.div>
    </motion.nav>
  );
}
