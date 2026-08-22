import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";
import LoginForm from "../organisms/LoginForm";
import { useAuth } from "../../contexts/AuthContext";

function PublicLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLoginSuccess = (user) => {
    setShowLoginModal(false);

    if (user.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#EAECF0]">
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuClick={() => setIsMenuOpen((prev) => !prev)}
        onLoginClick={() => setShowLoginModal(true)}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          isMenuOpen
            ? "pointer-events-auto"
            : "pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          onClick={() => setIsMenuOpen(false)}
          className={`absolute inset-0 bg-[#233D4D]/20 transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Menu */}
        <div
          className={`absolute right-3 top-20 w-80 rounded-3xl bg-white p-5 shadow-xl transition-all duration-300 ease-out ${
            isMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-5 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-2">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-[#233D4D] hover:bg-[#EAECF0]"
            >
              Home
            </Link>

            <Link
              to="/equipment"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-[#233D4D] hover:bg-[#EAECF0]"
            >
              Equipment
            </Link>

            <div className="my-2 border-t border-[#EAECF0]" />

            {!isAuthenticated ? (
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  setShowLoginModal(true);
                }}
                className="rounded-full bg-[#233D4D] px-4 py-3 text-center text-sm font-medium text-white hover:bg-[#FE7F2D]"
              >
                Login
              </button>
            ) : (
              <>
                <Link
                  to={
                    user?.role === "admin"
                      ? "/admin/dashboard"
                      : "/dashboard"
                  }
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-full bg-[#233D4D] px-4 py-3 text-center text-sm font-medium text-white hover:bg-[#FE7F2D]"
                >
                  Dashboard
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full border border-[#EAECF0] px-4 py-3 text-sm font-medium text-[#233D4D]"
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      </div>

      <main>{children}</main>

      {/* Login Modal */}
      {showLoginModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#233D4D]/50 p-4 backdrop-blur-sm"
          onClick={() => setShowLoginModal(false)}
        >
          <div
            className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowLoginModal(false)}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-xl text-[#233D4D]/50 hover:bg-[#EAECF0]"
            >
              ×
            </button>

            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FE7F2D]">
                GearHub
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#233D4D]">
                Welcome back
              </h2>

              <p className="mt-2 text-sm text-[#233D4D]/60">
                Sign in to manage your equipment rentals.
              </p>
            </div>

            <LoginForm
              onSuccess={handleLoginSuccess}
              showRegisterLink={true}
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default PublicLayout;