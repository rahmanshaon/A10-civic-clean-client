import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router";

const IssueCard = ({ issue }) => {
  const { _id, title, description, category, location, image, status, amount } =
    issue;

  const statusStyles = {
    ongoing: "badge-warning",
    ended: "badge-success",
  };

  return (
    <div className="card card-compact bg-base-100 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      <figure className="h-56 relative">
        <img
          src={image}
          alt={`Image of ${title}`}
          className="w-full h-full object-cover"
        />
        <div
          className={`badge ${
            statusStyles[status] || "badge-ghost"
          } absolute top-4 right-4 p-3 font-semibold text-sm capitalize`}
        >
          {status}
        </div>
      </figure>

      <div className="card-body">
        <div className="flex flex-wrap justify-between items-center gap-y-2 mb-2">
          <div className="badge badge-secondary badge-outline h-auto whitespace-normal text-left">
            {category}
          </div>
          <div className="flex items-center gap-1 text-sm text-base-content/70">
            <FaMapMarkerAlt />
            <span>{location}</span>
          </div>
        </div>

        <h2 className="card-title text-lg font-bold">{title}</h2>

        <p className="text-base-content/80 text-sm">
          {description.length > 80
            ? description.substring(0, 80) + "..."
            : description}
        </p>

        <div className="mt-1">
          <p className="text-xl font-bold text-gradient">${amount}</p>
        </div>

        <div className="card-actions mt-4">
          <Link to={`/issue/${_id}`} className="btn btn-gradient w-full">
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
