import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";

function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            const user = await login(email, password);

            if (user.role === "admin") {
            navigate("/admin/dashboard");
            } else {
            navigate("/dashboard");
            }
        } catch (error) {
            setError(
            error.response?.data?.message ||
                "Login failed. Please check your email and password."
            );
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
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-[#233D4D]/60">
            Sign in to manage your equipment rentals.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-[#233D4D]"
            >
              Email
            </label>

            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-[#233D4D]"
            >
              Password
            </label>

            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

            {error && (
                <p className="text-sm text-red-500">
                    {error}
                </p>    
            )}  
          
          <Button
            type="submit"
            variant="primary"
            className="w-full"
          >
             {loading ? "Signing in..." : "Login"}
          </Button>

        </form>

        {/* Register */}
        <p className="mt-6 text-center text-sm text-[#233D4D]/60">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-[#FE7F2D] hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </main>
  );
}

export default Login;