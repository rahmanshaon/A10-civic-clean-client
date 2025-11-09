import React, { useEffect, useMemo, useState } from "react";
import Loader from "../components/Loader";
import IssueCard from "../components/IssueCard";
import useFetch from "../hooks/useFetch";

const AllIssues = () => {
  const { data: issues, loading, error } = useFetch("/issues");

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredIssues = useMemo(() => {
    if (!issues) return [];
    return issues.filter((issue) => {
      const categoryMatch =
        categoryFilter === "All" || issue.category === categoryFilter;
      const statusMatch =
        statusFilter === "All" || issue.status === statusFilter;
      return categoryMatch && statusMatch;
    });
  }, [issues, categoryFilter, statusFilter]);

  if (loading) {
    return <Loader message="Loading all issues..." />;
  }

  if (error)
    return (
      <div className="text-center p-10 text-red-500">
        Error: Could not fetch issues. Please try again later.
      </div>
    );

  return (
    <div className="p-4 md:p-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">All Reported Issues</h2>
        <p className="text-base text-gray-500 mt-2">
          Browse through all the issues reported by our community members.
        </p>
      </div>

      {/* --- Filter Controls --- */}
      <div className="flex justify-center gap-4 md:gap-8 mb-10">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Filter by Category</span>
          </label>
          <select
            className="select select-bordered"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option>All</option>
            <option>Garbage</option>
            <option>Illegal Construction</option>
            <option>Broken Public Property</option>
            <option>Road Damage</option>
          </select>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Filter by Status</span>
          </label>
          <select
            className="select select-bordered"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All</option>
            <option>ongoing</option>
            <option>ended</option>
          </select>
        </div>
      </div>

      {/* Display the filtered issues */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {filteredIssues.length > 0 ? (
          filteredIssues.map((issue) => (
            <IssueCard key={issue._id} issue={issue} />
          ))
        ) : (
          <p className="col-span-3 text-center text-lg text-gray-500">
            No issues found matching your criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllIssues;
