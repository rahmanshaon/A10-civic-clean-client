import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";
import useFetch from "../hooks/useFetch";
import Swal from "sweetalert2";
import UpdateIssueModal from "../components/UpdateIssueModal";
import { toast } from "react-toastify";
import axiosSecure from "../api/axiosSecure";
import MyIssueCard from "../components/MyIssueCard";
import useTitle from "../hooks/useTitle";

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
      const modal = document.getElementById("update_modal");
      if (modal) {
        modal.showModal();
      }
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
          <h2 className="text-3xl mb:text-4xl font-black text-gradient">
            My Reported Issues
          </h2>
          <p className="text-base text-base-content/70 mt-2">
            Here you can manage all the issues you've submitted.
          </p>
        </div>

        {myIssues && myIssues.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {myIssues.map((issue) => (
              <MyIssueCard
                key={issue._id}
                issue={issue}
                onEdit={openUpdateModal}
                onDelete={handleDeleteIssue}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-base-100 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-base-content">
              No Issues Reported Yet
            </h3>
            <p className="text-base-content/70 mt-2">
              It looks like you haven't reported any issues. Help us improve the
              community by submitting one!
            </p>
          </div>
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
