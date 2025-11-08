import React from "react";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const AddIssue = () => {
  const { user } = useAuth();

  const handleAddIssue = (event) => {
    event.preventDefault();
    const form = event.target;

    const title = form.title.value;
    const category = form.category.value;
    const location = form.location.value;
    const description = form.description.value;
    const image = form.image.value;
    const amount = form.amount.value;

    // Create the new issue object
    const newIssue = {
      title,
      category,
      location,
      description,
      image,
      amount: parseFloat(amount),
      status: "ongoing",
      date: new Date(),
      email: user.email,
    };

    console.log("New Issue Data to be sent to server:", newIssue);

    toast.success("Issue reported successfully!");
    form.reset();
  };

  return (
    <div className="container mx-auto my-16 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Report a New Issue
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Help us improve the community by reporting problems.
          </p>
        </div>

        <form onSubmit={handleAddIssue} className="flex flex-col gap-6">

          {/* Form Row 1: Title and Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Issue Title</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Overflowing garbage bin"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
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

          {/* Form Row 2: Location and Image */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                type="text"
                name="location"
                placeholder="College Avenue, Barishal"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image URL</span>
              </label>
              <input
                type="url"
                name="image"
                placeholder="https://..."
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          {/* Form Row 3: Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="description"
              className="textarea textarea-bordered h-28 w-full"
              placeholder="Provide a detailed description of the issue..."
              required
            ></textarea>
          </div>

          {/* Form Row 4: Amount and Email (Read-only) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Suggested Fix Budget ($)</span>
              </label>
              <input
                type="number"
                name="amount"
                min="0" // Basic validation
                placeholder="200"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Reporter Email</span>
              </label>
              <input
                type="email"
                value={user?.email || ""}
                className="input input-bordered w-full cursor-not-allowed"
                readOnly
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-control mt-4">
            <button className="btn btn-gradient btn-lg w-full">
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIssue;
