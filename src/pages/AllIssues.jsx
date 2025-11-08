import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import IssueCard from "../components/IssueCard";

const AllIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/issues.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched all issues data:", data);
        setIssues(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching issues:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader message="Loading all issues..." />;
  }

  return (
    <div className="p-4 md:p-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">All Reported Issues</h2>
        <p className="text-base text-gray-500 mt-2">
          Browse through all the issues reported by our community members.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {issues.map((issue) => (
          <IssueCard key={issue._id} issue={issue} />
        ))}
      </div>
    </div>
  );
};

export default AllIssues;
