import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { createUser, updateUserProfile, googleSignIn } = useAuth();

  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;

    console.log("Registering with:", { name, photoURL, email, password });

    // --- Password Validation ---
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter.");
      return;
    }

    // --- Create User with Firebase ---
    createUser(email, password)
      .then((result) => {
        console.log("User created successfully:", result.user);
        // Now update the profile
        updateUserProfile(name, photoURL)
          .then(() => {
            console.log("Profile updated successfully.");
            toast.success(`Welcome, ${name}! Your account has been created.`);
            navigate("/");
          })
          .catch((error) => {
            console.error("Profile update error:", error);
            toast.error("Could not set profile information.");
          });
      })
      .catch((error) => {
        console.error("User creation error:", error);
        toast.error(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        console.log("Google Sign-In successful:", result.user);
        toast.success(`Welcome, ${result.user.displayName}!`);
        navigate("/");
      })
      .catch((error) => {
        console.error("Google Sign-In error:", error);
        toast.error("Google Sign-In failed. Please try again.");
      });
  };

  return (
    <div className="my-16 container mx-auto p-5">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-700 mb-10">
        Register your account
      </h1>

      <div className="hero">
        <div className="card shrink-0 w-full max-w-sm shadow-lg bg-base-100">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                name="photoURL"
                placeholder="Photo URL"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
                className="input input-bordered w-full"
                required
              />
              <span
                className="absolute right-5 top-9 cursor-pointer z-50"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-gradient text-white w-full hover:scale-105 transition-transform duration-200">
                Register
              </button>
            </div>
            <p className="text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="link text-blue-500">
                Login
              </Link>
            </p>
          </form>

          <div className="divider px-8">OR</div>
          <div className="px-8 pb-8">
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-outline btn-primary w-full"
            >
              <FaGoogle /> Sign up with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
