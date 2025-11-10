import React from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const VolunteerCTA = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleJoinClick = () => {
    if (user) {
      document.getElementById("join_drive_modal").showModal();
    } else {
      toast.info("Please log in to join a clean drive!");
      navigate("/login");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    toast.success("Thank you for your interest! We're thrilled to have you.");

    document.getElementById("join_drive_modal").close();
  };

  return (
    <>
      <div className="bg-base-200 pt-10 pb-20">
        <div className="container mx-auto px-4">
          <div
            className="relative bg-cover bg-center rounded-xl overflow-hidden px-6 py-12 sm:py-16 md:py-20"
            style={{
              backgroundImage:
                "url('https://i.ibb.co.com/q3n12sGy/civic-clean.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-neutral/70"></div>

            <div className="relative text-center text-neutral-content">
              <div className="max-w-lg mx-auto">
                <h1 className="mb-5 text-3xl sm:text-4xl font-bold">
                  Become a Community Hero
                </h1>
                <p className="mb-6 text-base sm:text-lg">
                  Ready to make a tangible difference? Join a local cleanup drive,
                  organize your own, and be the change you want to see in your
                  neighborhood.
                </p>
                <button
                  onClick={handleJoinClick}
                  className="btn btn-gradient border-none px-8"
                >
                  Join a Clean Drive
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL --- */}
      <dialog id="join_drive_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-2xl mb-4">Join the Cleanup Drive</h3>
          <p className="py-2 text-base-content/70">
            Confirm your details below. We're excited to have you on board!
          </p>

          <form onSubmit={handleFormSubmit} className="space-y-4 mt-4">
            {/* User Name */}
            <div>
              <label className="label">
                <span className="label-text">Your Name</span>
              </label>
              <input
                type="text"
                value={user?.displayName || "Not available"}
                readOnly
                className="input input-bordered w-full cursor-not-allowed"
              />
            </div>

            {/* User Email */}
            <div>
              <label className="label">
                <span className="label-text">Your Email</span>
              </label>
              <input
                type="email"
                value={user?.email || "Not available"}
                readOnly
                className="input input-bordered w-full cursor-not-allowed"
              />
            </div>

            <div className="modal-action mt-6">
              <button
                type="button"
                className="btn"
                onClick={() =>
                  document.getElementById("join_drive_modal").close()
                }
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-gradient">
                Join Now
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default VolunteerCTA;
