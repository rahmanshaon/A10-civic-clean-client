import React from "react";
import { HiMenu } from "react-icons/hi";
import { Link, NavLink, useNavigate } from "react-router";
import CustomNavLink from "./CustomNavLink";
import logo from "../assets/logo.png";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = ({ handleToggle, theme }) => {
  const { user, logOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully.");
        navigate("/");
      })
      .catch((error) => {
        toast.error("Failed to log out.");
      });
  };

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
        {/* Left Side: Logo & Mobile Dropdown */}
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <HiMenu className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
            >

              {/* Mobile Menu Links */}
              <CustomNavLink links={finalLinks} />
              <div className="divider my-2"></div>

              {/* Mobile Menu User Actions */}
              {user ? (
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn btn-sm btn-gradient text-white"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/login" className="btn btn-sm btn-gradient mb-2">
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/register" className="btn btn-sm btn-gradient">
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Logo and Site Name */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <img src={logo} alt="Logo" className="w-14 md:w-18" />
            <span className="text-gradient text-2xl md:text-3xl font-black">
              CivicClean
            </span>
          </Link>
        </div>

        {/* Center: Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2">
            <CustomNavLink links={finalLinks} />
          </ul>
        </div>

        {/* Right Side: Theme Toggle & User Info */}
        <div className="navbar-end">

          {/* Theme Toggle */}
          <label className="swap swap-rotate mr-2 md:mr-4">
            <input
              type="checkbox"
              onChange={handleToggle}
              checked={theme === "dark"}
            />
            <FaSun className="swap-on fill-current w-6 h-6 text-blue-500" />
            <FaMoon className="swap-off fill-current w-6 h-6 text-blue-500" />
          </label>

          {/* Loading or User/Guest Actions */}
          {loading ? (
            <span className="loading loading-bars text-blue-500"></span>
          ) : user ? (
            // Desktop User Info Dropdown
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div
                  className="w-10 rounded-full ring ring-blue-500 ring-offset-base-100 ring-offset-2"
                  title={user.displayName || "User"}
                >
                  <img
                    src={user.photoURL || "https://i.ibb.co/wZQG7SwS/user.png"}
                    alt="User"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li className="p-2">
                  <p className="font-bold">{user.displayName}</p>
                </li>
                <div className="divider my-0"></div>
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn btn-gradient text-white"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            // Desktop Login/Register Buttons
            <div className="hidden md:flex gap-2">
              <NavLink
                to="/login"
                className="btn btn-gradient font-semibold text-lg"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="btn btn-gradient font-semibold text-lg"
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
