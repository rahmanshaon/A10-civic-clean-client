import React from "react";
import { NavLink } from "react-router";

const CustomNavLink = ({ links, variant = "gradient" }) => {
  // Gradient active link style
  const gradientActiveStyle = {
    background:
      "linear-gradient(125deg, #0052D4 0%, #4364F7 40%, #6FB1FC 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    borderImage:
      "linear-gradient(125deg, #0052D4 0%, #4364F7 40%, #6FB1FC 100%) 1",
    borderBottom: "2px solid",
    paddingBottom: "4px",
    fontWeight: 600,
  };

  // White active link style
  const whiteActiveStyle = {
    color: "#ffffff",
    borderBottom: "2px solid #ffffff",
    paddingBottom: "4px",
    borderRadius: 0,
    fontWeight: 600,
  };

  // Choose the active style based on the variant prop
  const activeLinkStyle =
    variant === "white" ? whiteActiveStyle : gradientActiveStyle;

  return (
    <>
      {links.map((link) => (
        <li className="font-medium" key={link.path}>
          <NavLink
            to={link.path}
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
          >
            {link.label}
          </NavLink>
        </li>
      ))}
    </>
  );
};

export default CustomNavLink;
