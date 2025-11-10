import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const MyIssueCard = ({ issue, onEdit, onDelete }) => {
  const { _id, title, location, category, status, image } = issue;

  const statusStyles = {
    ongoing: "badge-warning",
    ended: "badge-success",
  };

  return (
    <div className="card card-compact sm:card-normal bg-base-100 shadow-lg transition-all duration-300 hover:shadow-2xl">
      <figure className="h-48">
        <img
          src={image}
          alt={`Image of ${title}`}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body">
        <div className="flex justify-between items-start gap-2">
          <span
            className={`badge ${
              statusStyles[status] || "badge-ghost"
            } capitalize`}
          >
            {status}
          </span>
          <span className="badge badge-secondary badge-outline">
            {category}
          </span>
        </div>
        <h2 className="card-title text-base-content mt-2">{title}</h2>
        <p className="text-sm text-base-content/70">{location}</p>
        <div className="card-actions justify-end mt-4">
          <button
            onClick={() => onEdit(issue)}
            className="btn btn-outline btn-primary btn-sm"
          >
            <FaEdit />
            Update
          </button>
          <button
            onClick={() => onDelete(_id)}
            className="btn btn-outline btn-error btn-sm"
          >
            <FaTrash />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyIssueCard;
