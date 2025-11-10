import React from "react";
import { format } from "date-fns";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const IssueDetailCard = ({ issue }) => {
  if (!issue) return null;

  const {
    title,
    category,
    location,
    description,
    image,
    amount,
    status,
    reporterName,
    reporterPhoto,
    date,
  } = issue;

  const statusStyles = {
    ongoing: "badge-warning",
    ended: "badge-success",
  };

  return (
    <div className="bg-base-100 rounded-xl shadow-xl overflow-hidden">
      {/* --- Main Image --- */}
      <img
        src={image}
        alt={`Image of ${title}`}
        className="w-full h-64 sm:h-80 lg:h-96 object-cover"
      />

      <div className="p-6 sm:p-8">
        {/* --- Main Title --- */}
        <h1 className="text-3xl sm:text-4xl font-bold text-base-content leading-tight">
          {title}
        </h1>

        {/* --- Info Bar (Reporter, Date, Location, Category) --- */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 my-4 text-base-content/80">
          <div className="flex items-center gap-2">
            <img
              src={reporterPhoto || "https://i.ibb.co/wZQG7SwS/user.png"}
              alt={reporterName}
              className="w-8 h-8 rounded-full"
            />
            <span className="font-semibold">{reporterName}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt />
            <span>{format(new Date(date), "PPP")}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt />
            <span>{location}</span>
          </div>
          <div className="badge badge-secondary badge-outline">{category}</div>
        </div>

        <div className="divider my-6"></div>

        {/* --- Description --- */}
        <p className="text-base-content/90 text-lg leading-relaxed mb-8">
          {description}
        </p>

        {/* --- Status & Budget Section --- */}
        <div className="bg-base-200 p-6 rounded-lg flex flex-col sm:flex-row justify-around items-center text-center gap-6">
          <div>
            <h3 className="text-sm font-semibold text-base-content/70 uppercase tracking-wider mb-2">
              Status
            </h3>
            <span
              className={`badge text-lg font-bold capitalize p-4 ${
                statusStyles[status] || "bg-gray-500 text-gray-900"
              }`}
            >
              {status}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-base-content/70 uppercase tracking-wider mb-2">
              Suggested Budget
            </h3>
            <p className="font-black text-gradient text-3xl">${amount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetailCard;
