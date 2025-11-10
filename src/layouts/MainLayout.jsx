import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router";
import Loader from "../components/Loader";

const MainLayout = () => {

// --- Navigation Loading Logic ---
  const location = useLocation();
  const [navigating, setNavigating] = useState(false);

  useEffect(() => {
    setNavigating(true);
    const timer = setTimeout(() => setNavigating(false), 500);
    return () => clearTimeout(timer);
  }, [location.pathname]); 

  // --- Theme Toggling Logic ---
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar handleToggle={handleToggle} theme={theme} />

      <main className="flex-1">
        {navigating ? <Loader message="Loading page..." /> : <Outlet />}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
