import React from "react";
import { Link } from "react-router";
import CustomNavLink from "./CustomNavLink";
import logo from "../assets/logo.png";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/all-issues", label: "All Issues" },
    { path: "/add-issue", label: "Add Issues" },
    { path: "/my-issues", label: "My Issues" },
    { path: "/my-contribution", label: "My Contribution" },
  ];

  const legalLinks = [
    { path: "/terms-of-service", label: "Terms of Service" },
    { path: "/privacy-policy", label: "Privacy Policy" },
  ];

  return (
    <footer className="bg-gray-800 text-gray-300 border-t border-gray-700 ">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 lg:grid-cols-4">
          {/* 1. Brand Section */}
          <div className="text-center md:col-span-12 lg:col-span-1 lg:text-left">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xl font-bold"
            >
              <img src={logo} alt="Logo" className="w-16" />
              <span className="text-gradient text-3xl font-black">
                CivicClean
              </span>
            </Link>
            <p className="mt-4">
              Dedicated to cleaning up our communities, one issue at a time.
            </p>
          </div>

          {/* 2. Quick Links Section */}
          <div className="text-center md:col-span-4 lg:col-span-1 lg:text-left">
            <p className="font-bold text-white">Quick Links</p>
            <ul className="mt-4 space-y-2">
              <CustomNavLink links={navLinks} variant="white" />
            </ul>
          </div>

          {/* 3. Legal Section */}
          <div className="text-center md:col-span-4 lg:col-span-1 lg:text-left">
            <p className="font-bold text-white">Legal</p>
            <ul className="mt-4 space-y-2">
              <CustomNavLink links={legalLinks} variant="white" />
            </ul>
          </div>

          {/* 4. Social Section */}
          <div className="text-center md:col-span-4 lg:col-span-1 lg:text-left">
            <p className="font-bold text-white">Follow Us</p>
            <div className="mt-4 flex justify-center gap-6 lg:justify-start">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <FaXTwitter size={24} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube size={24} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center">
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            CivicClean Industries Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
