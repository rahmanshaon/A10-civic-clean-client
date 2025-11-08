import React from "react";
import { HiMenu } from "react-icons/hi";
import { Link, NavLink, useNavigate } from "react-router";
import CustomNavLink from "./CustomNavLink";
import logo from "../assets/logo.png";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully.");
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
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
            <img src={logo} alt="Logo" className="w-14 md:w-18" />
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
          {loading ? (
            <span className="loading loading-bars loading-sm text-blue-500"></span>
          ) : user ? (
            <>
              {/* Desktop: Avatar + Logout button */}
              <div className="hidden md:flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-full ring ring-blue-500 ring-offset-base-100 ring-offset-2 overflow-hidden"
                  title={user.displayName || "User"}
                >
                  <img
                    src={
                      user.photoURL || "https://i.ibb.co.com/wZQG7SwS/user.png"
                    }
                    alt={user.displayName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={handleLogout}
                  className="btn btn-gradient text-white font-semibold text-lg"
                >
                  Logout
                </button>
              </div>

              {/* Mobile: Avatar with dropdown */}
              <div className="dropdown dropdown-end md:hidden">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div
                    className="w-10 rounded-full ring ring-blue-500 ring-offset-base-100 ring-offset-2 overflow-hidden"
                    title={user.displayName || "User"}
                  >
                    <img
                      src={
                        user.photoURL ||
                        "https://i.ibb.co.com/wZQG7SwS/user.png"
                      }
                      alt={user.displayName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    {/* Attach the logout handler to the button */}
                    <button onClick={handleLogout} className="btn btn-gradient">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            // If no user, show Login and Register buttons
            <>
              <NavLink to="/login" className="btn btn-gradient font-semibold text-lg mr-3">
                Login
              </NavLink>
              <NavLink to="/register" className="btn btn-gradient font-semibold text-lg">
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
