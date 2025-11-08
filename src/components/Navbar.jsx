import React, { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { Link, NavLink } from "react-router";
import CustomNavLink from "./CustomNavLink";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [user, setUser] = useState(null);
  console.log("Current Navbar user state:", user);

  // public links
  const links = [
    { path: "/", label: "Home" },
    { path: "/all-issues", label: "All Issues" },
  ];

  // Private links for logged-in users
  const userLinks = [
    { path: "/add-issue", label: "Add Issues" },
    { path: "/my-issues", label: "My Issues" },
    { path: "/my-contribution", label: "My Contribution" },
  ];

  const finalLinks = user ? [...links, ...userLinks] : links;

  return (
    <div className="bg-base-100 shadow-sm sticky top-0 z-50">
      <nav className="navbar container mx-auto px-4">
        {/* Left Side: Logo */}
        <div className="navbar-start">
          {/* Mobile Dropdown Menu */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <HiMenu className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52 space-y-2"
            >
              <CustomNavLink links={finalLinks} variant="gradient" />
            </ul>
          </div>

          {/* Logo and Site Name */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <img src={logo} alt="Logo" className="w-10" />
            <span className="text-gradient text-2xl md:text-3xl font-black">
              CivicClean
            </span>
          </Link>
        </div>

        {/* Center Navbar */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-6">
            <CustomNavLink links={finalLinks} variant="gradient" />
          </ul>
        </div>

        {/* Right side (Login / User) */}
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  {/* <img src="" alt="" /> */}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <button>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <NavLink to="/login" className="btn btn-gradient mr-2">
                Login
              </NavLink>
              <NavLink to="/register" className="btn btn-gradient">
                Register
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
