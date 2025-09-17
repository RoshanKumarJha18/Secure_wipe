import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Devices from "./pages/DevicePage.jsx";
import About from "./pages/About.jsx";
import Login from "./components/Login.jsx";
import Navbar from "./components/Navbar.jsx";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {/* pt-20 provides padding to offset the fixed navbar's height */}
      <main className="pt-20">{children}</main>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <div className="bg-gray-900 text-gray-100 min-h-screen ">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Home />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/devices"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Devices />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <About />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
