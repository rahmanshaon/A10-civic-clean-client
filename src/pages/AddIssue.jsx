import React from "react";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import axiosSecure from "../api/axiosSecure";
import {
  FaDollarSign,
  FaImage,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaTh,
} from "react-icons/fa";
import useTitle from "../hooks/useTitle";

const AddIssue = () => {
  useTitle("Add Issues");

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddIssue = (event) => {
    event.preventDefault();
    const form = event.target;

    const title = form.title.value;
    const category = form.category.value;
    const location = form.location.value;
    const description = form.description.value;
    const image = form.image.value;
    const amount = form.amount.value;

    // Send data to the server
    const newIssue = {
      title,
      category,
      location,
      description,
      image,
      amount: parseFloat(amount),
      status: "ongoing",
      email: user.email,
      reporterName: user.displayName,
      reporterPhoto: user.photoURL,
    };

    axiosSecure
      .post("/issues", newIssue)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Issue reported successfully!");
          form.reset();
          navigate("/all-issues");
        }
      })
      .catch(() => {
        toast.error("Failed to report issue. Please try again.");
      });
  };

  return (
    <div className="bg-base-200 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-base-100 p-6 sm:p-8 rounded-xl shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl mb:text-4xl font-black text-gradient">
              Report a New Issue
            </h2>
            <p className="text-base-content/70 mt-2">
              Help us improve the community by reporting problems.
            </p>
          </div>

          <form onSubmit={handleAddIssue} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Issue Title */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text mb-2">Issue Title</span>
                </label>
                <div className="relative">
                  <FaTh className="absolute top-1/2 left-3 -translate-y-1/2 text-base-content/40 z-10" />
                  <input
                    type="text"
                    name="title"
                    placeholder="Overflowing garbage bin"
                    className="input input-bordered w-full pl-10"
                    required
                  />
                </div>
              </div>

              {/* Category */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text mb-2">Category</span>
                </label>
                <select
                  name="category"
                  className="select select-bordered w-full"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option>Garbage</option>
                  <option>Illegal Construction</option>
                  <option>Broken Public Property</option>
                  <option>Road Damage</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Location */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text mb-2">Location</span>
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute top-1/2 left-3 -translate-y-1/2 text-base-content/40 z-10" />
                  <input
                    type="text"
                    name="location"
                    placeholder="College Avenue, Barishal"
                    className="input input-bordered w-full pl-10"
                    required
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text mb-2">Image URL</span>
                </label>
                <div className="relative">
                  <FaImage className="absolute top-1/2 left-3 -translate-y-1/2 text-base-content/40 z-10" />
                  <input
                    type="url"
                    name="image"
                    placeholder="https://..."
                    className="input input-bordered w-full pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text mb-2">Description</span>
              </label>
              <div className="relative">
                <textarea
                  name="description"
                  className="textarea textarea-bordered h-28 w-full pl-5"
                  placeholder="Provide a detailed description of the issue..."
                  required
                ></textarea>
              </div>
            </div>

            {/* Suggested Fix Budget */}
            <div className="form-control">
              <label className="label">
                <span className="label-text mb-2">
                  Suggested Fix Budget ($)
                </span>
              </label>
              <div className="relative">
                <FaDollarSign className="absolute top-1/2 left-3 -translate-y-1/2 text-base-content/40 z-10" />
                <input
                  type="number"
                  name="amount"
                  min="0"
                  placeholder="200"
                  className="input input-bordered w-full pl-10"
                  required
                />
              </div>
            </div>

            {/* Reporter Info */}
            <div className="bg-base-200 p-4 rounded-lg">
              <label className="label">
                <span className="label-text mb-2">You are reporting as:</span>
              </label>
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img
                      src={
                        user?.photoURL ||
                        "https://i.ibb.co.com/wZQG7SwS/user.png"
                      }
                      alt="User avatar"
                    />
                  </div>
                </div>
                <div>
                  <p className="font-bold text-base-content">
                    {user?.displayName}
                  </p>
                  <p className="text-sm text-base-content/70">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-4">
              <button className="btn btn-gradient btn-lg w-full">
                <FaPaperPlane />
                Submit Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddIssue;
