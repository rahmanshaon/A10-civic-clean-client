import React from "react";

const Loader = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <span className="loading loading-spinner loading-lg text-blue-500"></span>
      {message && (
        <p className="text-gray-700 text-2xl font-semibold mt-4">{message}</p>
      )}
    </div>
  );
};

export default Loader;
