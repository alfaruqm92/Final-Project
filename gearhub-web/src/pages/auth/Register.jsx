import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";
import apiClient from "../../services/api/client";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
        ...prev,
        [name]: value,
    }));

    setErrors((prev) => ({
        ...prev,
        [name]: "",
    }));

    setError("");
    };

  const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");
            setErrors({});

            await apiClient.post("/register", form);

            navigate("/login");
        } catch (error) {
            if (error.response?.status === 422) {
            setErrors(error.response.data.errors || {});
            } else {
            setError(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );
            }
        } finally {
            setLoading(false);
        }
    };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#EAECF0] px-4 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-lg md:p-8">

        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FE7F2D]">
            GearHub
          </p>

          <h1 className="mt-2 text-2xl font-bold text-[#000000]">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-[#233D4D]/60">
            Join GearHub and start renting professional equipment.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-[#233D4D]"
            >
              Name
            </label>

            <Input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />

            {errors.name && (
                <p className="mt-1 text-xs text-red-500">
                    {errors.name[0]}
                </p>
            )}

          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-[#233D4D]"
            >
              Email
            </label>

            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />

            {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                    {errors.email[0]}
                </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-[#233D4D]"
            >
              Password
            </label>

            <Input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Minimum 8 characters"
              required
            />

            {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                    {errors.password[0]}
                </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="password_confirmation"
              className="mb-2 block text-sm font-medium text-[#233D4D]"
            >
              Confirm Password
            </label>

            <Input
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              value={form.password_confirmation}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />

            {errors.password_confirmation && (
                <p className="mt-1 text-xs text-red-500">
                    {errors.password_confirmation[0]}
                </p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        {/* Login */}
        <p className="mt-6 text-center text-sm text-[#233D4D]/60">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-[#FE7F2D] hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Register;