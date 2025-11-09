import React from "react";
import axiosSecure from "../api/axiosSecure";
import { toast } from "react-toastify";

const UpdateIssueModal = ({ editingIssue, onSuccess }) => {
  if (!editingIssue) {
    return (
      <dialog id="update_modal" className="modal">
        <div className="modal-box">
          <p>Loading...</p>
        </div>
      </dialog>
    );
  }

  const handleUpdateIssue = (event) => {
    event.preventDefault();
    const form = event.target;

    const updatedIssue = {
      title: form.title.value,
      category: form.category.value,
      description: form.description.value,
      amount: parseFloat(form.amount.value),
      status: form.status.value,
      location: form.location.value,
      image: form.image.value,
    };

    if (!editingIssue?._id) {
      return toast.error("Cannot update issue: ID is missing.");
    }

    axiosSecure
      .put(`/issues/${editingIssue._id}`, updatedIssue)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          if (onSuccess) {
            onSuccess();
          }
        } else {
          toast.info("No changes were made.");
        }
        document.getElementById("update_modal").close();
      })
      .catch((err) => {
        toast.error("Update failed. Please try again.");
        console.error("Update error:", err);
      });
  };

  return (
    <dialog id="update_modal" className="modal modal-middle">
      <div className="modal-box max-w-2xl">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <h3 className="font-bold text-xl">Update Issue Details</h3>
        <p className="py-2 text-sm text-gray-500 border-b mb-4">
          Now editing:{" "}
          <span className="font-semibold text-primary">
            {editingIssue.title}
          </span>
        </p>

        <form
          key={editingIssue._id}
          onSubmit={handleUpdateIssue}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              name="title"
              defaultValue={editingIssue.title}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Category */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              name="category"
              defaultValue={editingIssue.category}
              className="select select-bordered w-full"
              required
            >
              <option>Garbage</option>
              <option>Illegal Construction</option>
              <option>Broken Public Property</option>
              <option>Road Damage</option>
            </select>
          </div>

          {/* Location */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Location</span>
            </label>
            <input
              type="text"
              name="location"
              defaultValue={editingIssue.location}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Image URL */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image URL</span>
            </label>
            <input
              type="url"
              name="image"
              defaultValue={editingIssue.image}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Amount */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Suggested Budget ($)</span>
            </label>
            <input
              type="number"
              name="amount"
              min="0"
              defaultValue={editingIssue.amount}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Status */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Status</span>
            </label>
            <select
              name="status"
              defaultValue={editingIssue.status}
              className="select select-bordered w-full"
              required
            >
              <option value="ongoing">Ongoing</option>
              <option value="ended">Ended</option>
            </select>
          </div>

          {/* Description */}
          <div className="form-control sm:col-span-2">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="description"
              defaultValue={editingIssue.description}
              className="textarea textarea-bordered h-24 w-full"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="form-control mt-4 sm:col-span-2">
            <button className="btn btn-gradient btn-lg w-full">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateIssueModal;
