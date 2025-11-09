import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router";

const DataNotFound = ({ message, link, linkText }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4">
      <FaExclamationTriangle className="text-7xl text-amber-400 mb-6" />
      <h2 className="text-3xl font-bold mb-2">Resource Not Found</h2>
      <p className="text-lg text-gray-500 max-w-md">
        We couldn't find the item you're looking for.
      </p>
      <Link to={"/all-issues"} className="btn btn-gradient mt-8">
        Return to All Issues
      </Link>
    </div>
  );
};

export default DataNotFound;
