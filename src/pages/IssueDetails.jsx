import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";
import ContributionModal from "../components/ContributionModal";
import useFetch from "../hooks/useFetch";
import DataNotFound from "../components/DataNotFound";
import axiosSecure from "../api/axiosSecure";
import ContributorsSection from "../components/ContributorsSection";
import { toast } from "react-toastify";
import IssueDetailCard from "../components/IssueDetailCard";
import useTitle from "../hooks/useTitle";

const IssueDetails = () => {
  useTitle("Issue Details");

  const { issueId } = useParams();
  const { user } = useAuth();
  const { data: issue, loading, error } = useFetch(`/issues/${issueId}`);

  const [contributors, setContributors] = useState([]);
  const [isContributorsLoading, setIsContributorsLoading] = useState(true);

  const fetchContributors = useCallback(async () => {
    if (!issueId) return;
    setIsContributorsLoading(true);
    try {
      const res = await axiosSecure.get(`/contributions/${issueId}`);
      setContributors(res.data);
    } finally {
      setIsContributorsLoading(false);
    }
  }, [issueId]);

  useEffect(() => {
    fetchContributors();
  }, [fetchContributors]);

  const handleSuccessfulContribution = () => {
    toast.success("Thank you for your contribution!");
    fetchContributors();
  };

  if (loading) {
    return <Loader message="Loading issue details..." />;
  }

  if (error || !issue) {
    return <DataNotFound />;
  }

  return (
    <div className="bg-base-200 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <IssueDetailCard issue={issue} />

        {/* --- CTA Section --- */}
        <div className="text-center mt-10">
          <button
            onClick={() =>
              document.getElementById("contribution_modal").showModal()
            }
            className="btn btn-gradient btn-lg w-full sm:w-auto sm:px-20"
          >
            Contribute to Help Resolve This
          </button>
        </div>

        {/* --- Contributors Section --- */}
        <ContributorsSection
          contributors={contributors}
          isLoading={isContributorsLoading}
        />
      </div>

      {/* --- Contribution Modal --- */}
      <ContributionModal
        issue={issue}
        user={user}
        onSuccess={handleSuccessfulContribution}
      />
    </div>
  );
};

export default IssueDetails;
