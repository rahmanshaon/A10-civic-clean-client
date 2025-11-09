import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";
import { FaEdit, FaTrash } from "react-icons/fa";
import useFetch from "../hooks/useFetch";
import Swal from "sweetalert2";
import UpdateIssueModal from "../components/UpdateIssueModal";
import { toast } from "react-toastify";
import axiosSecure from "../api/axiosSecure";

const MyIssues = () => {
  const { user } = useAuth();
  const endpoint = user?.email ? `/my-issues?email=${user.email}` : null;
  const {
    data: myIssues,
    loading,
    setData: setMyIssues,
    mutate,
  } = useFetch(endpoint);
  const [editingIssue, setEditingIssue] = useState(null);

  const handleUpdateSuccess = () => {
    toast.success("Issue updated successfully!");
    mutate();
  };

  const handleDeleteIssue = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/issues/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire(
                "Deleted!",
                "Your issue has been successfully deleted.",
                "success"
              );
              // Optimistically update the UI
              setMyIssues(myIssues.filter((issue) => issue._id !== id));
            }
          })
          .catch((err) => {
            Swal.fire(
              "Error!",
              "Could not delete the issue. Please try again.",
              "error"
            );
          });
      }
    });
  };

  const openUpdateModal = (issue) => {
    setEditingIssue(issue);
    document.getElementById("update_modal").showModal();
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-base-200 p-4 md:p-10 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-8">
          My Reported Issues
        </h2>

        {myIssues && myIssues.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Title & Location</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {myIssues.map((issue) => (
                  <tr key={issue._id}>
                    <td>
                      <div className="font-bold">{issue.title}</div>
                      <div className="text-sm opacity-50">{issue.location}</div>
                    </td>
                    <td>{issue.category}</td>
                    <td>
                      <span
                        className={`badge ${
                          issue.status === "ongoing"
                            ? "badge-warning"
                            : "badge-success"
                        }`}
                      >
                        {issue.status}
                      </span>
                    </td>
                    <th className="flex gap-2">
                      <button
                        onClick={() => openUpdateModal(issue)}
                        className="btn btn-ghost btn-xs"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteIssue(issue._id)}
                        className="btn btn-ghost btn-xs text-red-500"
                      >
                        <FaTrash size={16} />
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-gray-500">
              You have not reported any issues yet.
            </p>
          </div>
        )}
      </div>

      {/* Render the modal component, passing the necessary props */}
      <UpdateIssueModal
        editingIssue={editingIssue}
        onSuccess={handleUpdateSuccess}
      />
    </div>
  );
};

export default MyIssues;
