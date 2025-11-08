import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="container mx-auto flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
