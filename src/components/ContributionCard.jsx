import React from "react";
import { FaCalendarAlt, FaDownload, FaThList } from "react-icons/fa";

const ContributionCard = ({ contribution, onDownload }) => {
  const { _id, issueTitle, category, amount, date } = contribution;
  return (
    <div className="bg-base-100 rounded-lg shadow-lg p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold text-base-content mb-2">
          {issueTitle}
        </h3>

        {/* Info */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-2 text-base-content/70 text-sm mb-4">
          <div className="flex items-center gap-2">
            <FaThList />
            <span>{category}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt />
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Amount */}
        <div className="text-center">
          <p className="text-sm text-base-content/70 mb-2">
            Amount Contributed
          </p>
          <p className="text-4xl font-bold text-blue-500">${amount}</p>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-6">
        <button
          onClick={() => onDownload(contribution)}
          className="btn btn-gradient w-full"
        >
          <FaDownload />
          Download Receipt
        </button>
      </div>
    </div>
  );
};

export default ContributionCard;
