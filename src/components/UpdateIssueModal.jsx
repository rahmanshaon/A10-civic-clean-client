import React from "react";
import axiosSecure from "../api/axiosSecure";
import { toast } from "react-toastify";
import {
  FaDollarSign,
  FaImage,
  FaMapMarkerAlt,
  FaSave,
  FaTh,
} from "react-icons/fa";

const UpdateIssueModal = ({ editingIssue, onSuccess, onClose }) => {
  if (!editingIssue) {
    return (
      <dialog id="update_modal" className="modal">
        <div className="modal-box flex justify-center items-center h-48">
          <span className="loading loading-spinner loading-lg"></span>
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
        <form method="dialog" onSubmit={onClose}>
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10">
            ✕
          </button>
        </form>

        <h3 className="font-bold text-2xl text-base-content">
          Update Issue Details
        </h3>
        <p className="py-2 text-sm text-base-content/70">
          Now editing:{" "}
          <span className="font-semibold text-gradient">
            {editingIssue.title}
          </span>
        </p>
        <div className="divider mt-2 mb-4"></div>

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
            <div className="relative">
              <FaTh className="absolute top-1/2 left-3 -translate-y-1/2 text-base-content/40 z-10" />
              <input
                type="text"
                name="title"
                defaultValue={editingIssue.title}
                className="input input-bordered w-full pl-10"
                required
              />
            </div>
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
            <div className="relative">
              <FaMapMarkerAlt className="absolute top-1/2 left-3 -translate-y-1/2 text-base-content/40 z-10" />
              <input
                type="text"
                name="location"
                defaultValue={editingIssue.location}
                className="input input-bordered w-full pl-10"
                required
              />
            </div>
          </div>

          {/* Image URL */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image URL</span>
            </label>
            <div className="relative">
              <FaImage className="absolute top-1/2 left-3 -translate-y-1/2 text-base-content/40 z-10" />
              <input
                type="url"
                name="image"
                defaultValue={editingIssue.image}
                className="input input-bordered w-full pl-10"
                required
              />
            </div>
          </div>

          {/* Amount */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Suggested Budget ($)</span>
            </label>
            <div className="relative">
              <FaDollarSign className="absolute top-1/2 left-3 -translate-y-1/2 text-base-content/40 z-10" />
              <input
                type="number"
                name="amount"
                min="0"
                defaultValue={editingIssue.amount}
                className="input input-bordered w-full pl-10"
                required
              />
            </div>
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
            <div className="relative">
              <textarea
                name="description"
                defaultValue={editingIssue.description}
                className="textarea textarea-bordered h-24 w-full pl-5"
                required
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-control mt-4 sm:col-span-2">
            <button className="btn btn-gradient btn-lg w-full">
              <FaSave />
              Save Changes
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop" onSubmit={onClose}>
        <button>close</button>
      </form>
    </dialog>
  );
};

export default UpdateIssueModal;
