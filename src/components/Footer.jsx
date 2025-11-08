import React from "react";

const Footer = () => {
  return (
    <div className="bg-neutral text-neutral-content text-center p-10">
      <p className="text-xl font-bold">Footer</p>
      {/* Divider */}
      <div className="border-t border-gray-700 my-6"></div>

      {/* Copyright Section */}
      <div className="text-center">
        <p className="text-sm">
          Copyright &copy; {new Date().getFullYear()} - All right reserved by
          CivicClean Ltd.
        </p>
      </div>
    </div>
  );
};

export default Footer;
