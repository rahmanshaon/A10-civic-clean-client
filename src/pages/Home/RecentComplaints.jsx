import React, { useEffect, useState } from "react";
import IssueCard from "../../components/IssueCard";

const RecentComplaints = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetch("/issues.json")
      .then((res) => res.json())
      .then((data) => {
        setIssues(data);
      });
  }, []);

  return (
    <div className="container mx-auto my-12 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Recent Complaints</h2>
        <p className="text-base text-gray-500 mt-2">
          Here are some of the latest issues reported by the community.
        </p>
      </div>

      {/* Issues Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {issues.map((issue) => (
          <IssueCard key={issue._id} issue={issue} />
        ))}
      </div>
    </div>
  );
};

export default RecentComplaints;
