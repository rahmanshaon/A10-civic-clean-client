import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
      <h1 className="text-9xl font-extrabold text-gradient tracking-widest">
        404
      </h1>
      <div className="bg-secondary px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <p className="mt-4 text-lg">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" className="btn btn-gradient mt-8">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
