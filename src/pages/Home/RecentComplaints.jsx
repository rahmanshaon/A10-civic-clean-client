import React from "react";
import IssueCard from "../../components/IssueCard";
import { Link } from "react-router";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/Loader";

const RecentComplaints = () => {
  const { data: issues, loading } = useFetch("/issues/recent");

  return (
    <div className="container mx-auto my-12 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Recent Complaints</h2>
        <p className="text-base text-gray-500 mt-2">
          Here are some of the latest issues reported by the community.
        </p>
      </div>

      {/* Issues Card Grid */}
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {issues.map((issue) => (
            <IssueCard key={issue._id} issue={issue} />
          ))}
        </div>
      )}

      <div className="flex justify-center items-center mt-12 mb-16">
        <Link to="/all-issues" className="btn btn-gradient px-20 py-5 text-lg">
          View All Issues
        </Link>
      </div>
    </div>
  );
};

export default RecentComplaints;
