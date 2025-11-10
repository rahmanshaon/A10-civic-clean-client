import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useTitle from "../hooks/useTitle";

const Login = () => {
  useTitle("Login");

  const [showPassword, setShowPassword] = useState(false);
  const { signIn, googleSignIn } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  console.log("User will be redirected to:", from);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    console.log("Attempting to log in with:", { email });

    signIn(email, password)
      .then((result) => {
        console.log("Login successful for user:", result.user);
        toast.success("Login Successful!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Login error:", error);
        toast.error("Invalid email or password. Please try again.");
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        console.log("Google Sign-In successful:", result.user);
        toast.success(`Welcome back, ${result.user.displayName}!`);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Google Sign-In error:", error);
        toast.error("Google Sign-In failed. Please try again.");
      });
  };

  return (
    <div className="bg-base-200 py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center text-gradient mb-10">
          Login your account
        </h2>

        <div className="hero">
          <div className="card shrink-0 w-full max-w-sm shadow-lg bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text mb-2">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Password */}
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text mb-2">Password</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  className="input input-bordered w-full"
                  required
                />
                <span
                  className="absolute right-5 top-11 cursor-pointer z-50"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-gradient text-white w-full hover:scale-105 transition-transform duration-200">
                  Login
                </button>
              </div>
              <p className="text-center mt-4">
                New to CivicClean?{" "}
                <Link
                  to="/register"
                  state={location.state}
                  className="link link-primary font-semibold"
                >
                  Create an account
                </Link>
              </p>
            </form>

            <div className="divider px-8">OR</div>
            <div className="px-8 pb-8">
              <button
                onClick={handleGoogleSignIn}
                className="btn btn-outline btn-primary w-full"
              >
                <FaGoogle /> Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
