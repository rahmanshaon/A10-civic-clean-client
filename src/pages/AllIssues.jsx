import React, { useEffect, useMemo, useState } from "react";
import Loader from "../components/Loader";
import IssueCard from "../components/IssueCard";
import useFetch from "../hooks/useFetch";
import { FaExclamationCircle, FaSearch } from "react-icons/fa";
import useTitle from "../hooks/useTitle";

const AllIssues = () => {
  useTitle("All Issues");

  const { data: issues, loading, error } = useFetch("/issues");

  // State for filters and search
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // State for currently displayed issues and filtering loading state
  const [displayedIssues, setDisplayedIssues] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

  // useEffect to handle filtering with a loading state
  useEffect(() => {
    if (!issues) return;

    setIsFiltering(true);

    const timer = setTimeout(() => {
      const lowercasedQuery = searchQuery.trim().toLowerCase();

      const filtered = issues.filter((issue) => {
        const categoryMatch =
          categoryFilter === "All" || issue.category === categoryFilter;
        const statusMatch =
          statusFilter === "All" || issue.status === statusFilter;
        const searchMatch =
          lowercasedQuery === "" ||
          issue.title.toLowerCase().includes(lowercasedQuery);
        return categoryMatch && statusMatch && searchMatch;
      });

      setDisplayedIssues(filtered);
      setIsFiltering(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [issues, categoryFilter, statusFilter, searchQuery]);

  if (loading) {
    return <Loader message="Loading all issues..." />;
  }

  if (error)
    return (
      <div className="text-center p-10 text-red-500">
        Error: Could not fetch issues. Please try again later.
      </div>
    );

  const NotFoundMessage = ({ message, query }) => (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <FaExclamationCircle className="text-6xl text-base-content/30 mb-4" />
      <h3 className="text-2xl font-bold text-base-content/80">{message}</h3>
      {query && (
        <p className="text-base-content/70 mt-2">
          We couldn't find anything for "{query}".
        </p>
      )}
    </div>
  );

  return (
    <div className="bg-base-200 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gradient">
            All Reported Issues
          </h2>
          <p className="text-base text-base-content/80 text-opacity-70 mt-2 max-w-2xl mx-auto">
            Browse, filter, and search through all issues reported by our
            community.
          </p>
        </div>

        {/* --- Filter & Search Controls --- */}
        <div className="w-full max-w-4xl mx-auto bg-base-100 p-6 rounded-lg shadow-md mb-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="form-control w-full col-span-2 md:col-span-1">
              <label className="label">
                <span className="label-text mb-2">Search by Title</span>
              </label>
              <div className="relative">
                <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-base-content/40 z-10" />
                <input
                  type="text"
                  placeholder="Search issues..."
                  className="input input-bordered w-full pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text mb-2">Filter by Category</span>
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

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text mb-2">Filter by Status</span>
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
        </div>

        <div className="relative">
          {isFiltering && (
            <div className="absolute inset-0 bg-base-200/50 backdrop-blur-sm flex justify-center items-center z-20 rounded-lg min-h-[300px]">
              <Loader message="Filtering..." />
            </div>
          )}

          {/* --- Display the filtered issues --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {displayedIssues.length > 0
              ? displayedIssues.map((issue) => (
                  <IssueCard key={issue._id} issue={issue} />
                ))
              : !loading &&
                (searchQuery ? (
                  <NotFoundMessage
                    message="No Issues Found"
                    query={searchQuery}
                  />
                ) : (
                  <NotFoundMessage message="No issues found matching your selected filters." />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllIssues;
