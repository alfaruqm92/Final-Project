import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import Input from "../atoms/Input";
import Button from "../atoms/Button";

function LoginForm({ onSuccess, showRegisterLink = true }) {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        setLoading(true);
        setError("");

        const user = await login(email, password);

        // Kalau dipakai di modal
        if (onSuccess) {
            onSuccess(user);
            return;
        }

        // Kalau dipakai di halaman Login biasa
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
        <>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
            />
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
            disabled={loading}
            >
            {loading ? "Signing in..." : "Login"}
            </Button>
        </form>

        {showRegisterLink && (
            <p className="mt-6 text-center text-sm text-[#233D4D]/60">
            Don't have an account?{" "}
            <Link
                to="/register"
                className="font-medium text-[#FE7F2D] hover:underline"
            >
                Register
            </Link>
            </p>
        )}
        </>
    );
}

export default LoginForm;