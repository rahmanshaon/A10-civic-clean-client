import React from "react";

const IssueCard = ({ issue }) => {
  const { title, description, category, location, image } = issue;
  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <figure className="h-56">
        <img
          src={image}
          alt={`Image of ${title}`}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <h2 className="card-title">{title}</h2>
          <div className="badge badge-secondary h-auto whitespace-normal">
            {category}
          </div>
        </div>
        <p className="text-sm text-gray-500">{location}</p>
        <p>
          {
            // Truncate the description if it's too long
            description.length > 80
              ? description.substring(0, 80) + "..."
              : description
          }
        </p>
        <div className="card-actions mt-3">
          <button className="btn btn-gradient w-full">See Details</button>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
