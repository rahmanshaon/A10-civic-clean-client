import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";
import useFetch from "../hooks/useFetch";
import Swal from "sweetalert2";
import UpdateIssueModal from "../components/UpdateIssueModal";
import { toast } from "react-toastify";
import axiosSecure from "../api/axiosSecure";
import useTitle from "../hooks/useTitle";
import { FaEdit, FaExclamationCircle, FaThList, FaTrash } from "react-icons/fa";

const MyIssues = () => {
  useTitle("My Issues");

  const { user } = useAuth();
  const endpoint = user?.email ? `/my-issues?email=${user.email}` : null;
  const {
    data: myIssues,
    loading,
    setData: setMyIssues,
    mutate,
  } = useFetch(endpoint);
  const [editingIssue, setEditingIssue] = useState(null);

  useEffect(() => {
    if (editingIssue) {
      document.getElementById("update_modal")?.showModal();
    }
  }, [editingIssue]);

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
  };

  const handleCloseModal = () => {
    setEditingIssue(null);
  };

  if (loading) {
    return <Loader message="Loading your issues..." />;
  }

  return (
    <div className="bg-base-200 p-4 py-16 md:p-10 min-h-screen">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gradient">
            My Reported Issues
          </h2>
          <p className="text-base text-base-content/70 mt-2">
            Here you can manage all the issues you've submitted.
          </p>
        </div>

        {myIssues && myIssues.length > 0 ? (
          <div className="sm:overflow-x-auto sm:bg-base-100 sm:rounded-lg sm:shadow-md">
            <table className="table w-full">
              <thead className="hidden sm:table-header-group">
                <tr>
                  <th>Issue Details</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody className="flex flex-col gap-6 sm:table-row-group">
                {myIssues.map((issue) => (
                  <tr
                    key={issue._id}
                    className="block sm:table-row bg-base-100 rounded-lg shadow-md sm:shadow-none"
                  >
                    <td className="block sm:table-cell p-4 align-middle">
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="w-16 rounded">
                            <img src={issue.image} alt={issue.title} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-base-content">
                            {issue.title}
                          </div>
                          <div className="text-sm text-base-content/70">
                            {issue.location}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="block sm:table-cell p-4 align-middle sm:w-48">
                      <div className="flex justify-between items-center sm:justify-start">
                        <div className="flex items-center gap-2 sm:hidden">
                          <FaThList className="text-base-content/60" />
                          <span className="font-semibold text-base-content/60">
                            Category
                          </span>
                        </div>
                        <span>{issue.category}</span>
                      </div>
                    </td>

                    <td className="block sm:table-cell p-4 align-middle sm:w-40">
                      <div className="flex justify-between items-center sm:justify-start">
                        <div className="flex items-center gap-2 sm:hidden">
                          <FaExclamationCircle className="text-base-content/60" />
                          <span className="font-semibold text-base-content/60">
                            Status
                          </span>
                        </div>
                        <span
                          className={`badge ${
                            issue.status === "ongoing"
                              ? "badge-warning"
                              : "badge-success"
                          } capitalize`}
                        >
                          {issue.status}
                        </span>
                      </div>
                    </td>

                    <td className="block sm:table-cell p-4 align-middle sm:w-32">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => openUpdateModal(issue)}
                          className="btn btn-outline btn-primary btn-sm grow sm:grow-0"
                          title="Update Issue"
                        >
                          <FaEdit />
                          <span className="sm:hidden ml-2">Update</span>
                        </button>
                        <button
                          onClick={() => handleDeleteIssue(issue._id)}
                          className="btn btn-outline btn-error btn-sm grow sm:grow-0"
                          title="Delete Issue"
                        >
                          <FaTrash />
                          <span className="sm:hidden ml-2">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16 bg-base-100 rounded-lg shadow-md"></div>
        )}
      </div>

      {editingIssue && (
        <UpdateIssueModal
          editingIssue={editingIssue}
          onSuccess={handleUpdateSuccess}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default MyIssues;
