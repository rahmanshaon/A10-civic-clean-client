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

const IssueDetails = () => {
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
    } catch (err) {
      console.error("Could not fetch contributors", err);
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

  const { title, category, location, description, image, amount } = issue;

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 rounded-xl shadow-2xl">
        <img
          src={image}
          alt={`Image of ${title}`}
          className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg mb-6"
        />

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-4">
          <div className="grow">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {title}
            </h1>
            <p className="text-gray-500 mt-1">{location}</p>
          </div>

          <div className="badge badge-secondary badge-md sm:badge-lg p-3 sm:p-4 self-start sm:self-auto">
            {category}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-6 leading-relaxed">{description}</p>

        <div className="divider dark:before:bg-gray-600"></div>

        {/* Details Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 text-lg text-gray-800">
          <p>
            <strong>Suggested Fix Budget:</strong> ${amount}
          </p>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-10">
          <button
            onClick={() =>
              document.getElementById("contribution_modal").showModal()
            }
            className="btn btn-gradient w-full"
          >
            Pay Clean-Up Contribution
          </button>
        </div>
      </div>

      {/* --- Contributors Section --- */}
      {isContributorsLoading ? (
        <div className="flex flex-col justify-center items-center h-[15vh]">
          <span className="loading loading-bars loading-sm text-blue-500"></span>
        </div>
      ) : (
        <ContributorsSection contributors={contributors} />
      )}

      {/* ===== CONTRIBUTION MODAL ===== */}
      <ContributionModal
        issue={issue}
        user={user}
        onSuccess={handleSuccessfulContribution}
      />
    </div>
  );
};

export default IssueDetails;
