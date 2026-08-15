import { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";
import { useAuth } from "../../contexts/AuthContext";

function PublicLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#EAECF0]">
      <Navbar isMenuOpen={isMenuOpen} onMenuClick={() => setIsMenuOpen((prev) => !prev)}/>

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
              className="rounded-xl px-4 py-3 text-sm font-medium text-[#233D4D] transition-colors duration-200 hover:bg-[#EAECF0]"
            >
              Home
            </Link>

            <Link
              to="/equipment"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-[#233D4D] transition-colors duration-200 hover:bg-[#EAECF0]"
            >
              Equipment
            </Link>

            <Link
              to="/#features"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-[#233D4D] transition-colors duration-200 hover:bg-[#EAECF0]"
            >
              Why GearHub
            </Link>

            <div className="my-2 border-t border-[#EAECF0]" />

            {!isAuthenticated ? (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-full bg-[#233D4D] px-4 py-3 text-center text-sm font-medium text-white transition-colors duration-200 hover:bg-[#FE7F2D]"
              >
                Login
              </Link>
            ) : (
              <>
                <Link
                  to={
                    user?.role === "admin"
                      ? "/admin/dashboard"
                      : "/dashboard"
                  }
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-full bg-[#233D4D] px-4 py-3 text-center text-sm font-medium text-white transition-colors duration-200 hover:bg-[#FE7F2D]"
                >
                  Dashboard
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full border border-[#EAECF0] px-4 py-3 text-sm font-medium text-[#233D4D] transition-colors duration-200 hover:border-[#FE7F2D] hover:text-[#FE7F2D]"
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      </div>

      <main>{children}</main>

      <Footer />
    </div>
  );
}

export default PublicLayout;