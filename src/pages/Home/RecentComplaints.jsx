import React from "react";
import IssueCard from "../../components/IssueCard";
import { Link } from "react-router";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/Loader";

const RecentComplaints = () => {
  const { data: issues, loading } = useFetch("/issues/recent");

  return (
    <div className="bg-base-200 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gradient">
            Recent Complaints
          </h2>
          <p className="text-base text-base-content/80 text-opacity-70 mt-2 max-w-2xl mx-auto">
            Here are some of the latest issues reported by the community.
          </p>
        </div>

        {/* Issues Card Grid */}
        {loading ? (
          <Loader message="Loading recent issues..." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {issues.map((issue) => (
              <IssueCard key={issue._id} issue={issue} />
            ))}
          </div>
        )}

        <div className="flex justify-center items-center mt-12">
          <Link to="/all-issues" className="btn btn-gradient px-12 text-lg">
            View All Issues
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecentComplaints;
