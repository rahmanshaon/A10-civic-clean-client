import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import axiosSecure from "../api/axiosSecure";

const ContributionModal = ({ issue, user }) => {
  const handleContributionSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const amount = form.amount.value;
    const phone = form.phone.value;
    const address = form.address.value;

    const newContribution = {
      issueId: issue._id,
      issueTitle: issue.title,
      category: issue.category,
      amount: parseFloat(amount),
      name: user.displayName,
      email: user.email,
      phone,
      address,
      date: new Date(),
    };

    axiosSecure
      .post("/contributions", newContribution)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Thank you for your contribution!");
          document.getElementById("contribution_modal").close();
          form.reset();
        }
      })
      .catch((error) => {
        console.error("Error posting contribution:", error);
        toast.error("Contribution failed. Please try again.");
      });
  };

  return (
    <dialog id="contribution_modal" className="modal modal-middle">
      <div className="modal-box max-w-lg">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <h3 className="font-bold text-xl text-gray-800">
          Contribute to: <span className="text-gradient">{issue?.title}</span>
        </h3>
        <p className="py-2 text-sm text-gray-500">
          Your support helps get this issue resolved faster.
        </p>

        <form
          onSubmit={handleContributionSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4"
        >
          {/* Name (Read-only) */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              value={user?.displayName || "N/A"}
              readOnly
              className="input input-bordered bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Email (Read-only) */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Email</span>
            </label>
            <input
              type="email"
              value={user?.email}
              readOnly
              className="input input-bordered bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Amount */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Amount ($)</span>
            </label>
            <input
              type="number"
              name="amount"
              min="1"
              placeholder="Enter amount"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Your phone number"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Address */}
          <div className="form-control sm:col-span-2">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input
              type="text"
              name="address"
              placeholder="Your full address"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="form-control mt-4 sm:col-span-2">
            <button className="btn btn-gradient btn-lg w-full">
              Submit Contribution
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ContributionModal;
