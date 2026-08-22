import Logo from "../atoms/Logo";
import Icon from "../atoms/Icon";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ onMenuClick, isMenuOpen, onLoginClick }) {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <header className="pointer-events-none fixed left-0 right-0 top-0 z-50 px-3 pt-3">
      <div className="pointer-events-auto mx-auto flex h-14 w-full max-w-[calc(100%-24px)] items-center justify-between rounded-full border border-[#EAECF0] bg-white/90 px-4 shadow-lg backdrop-blur-md md:h-16 md:max-w-3xl md:px-6 lg:max-w-5xl">

        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          <Link to="#" className="text-sm font-medium text-[#233D4D] transition-colors hover:text-[#FE7F2D]"
          >
            Home
          </Link>

          <Link to="/equipment" className="text-sm font-medium text-[#233D4D]/70 transition-colors hover:text-[#FE7F2D]">
            Equipment
          </Link>

          <Link
            to="#features"
            className="text-sm font-medium text-[#233D4D]/70 transition-colors hover:text-[#FE7F2D]"
          >
            Why GearHub
          </Link>

          <Link
            to="#"
            className="text-sm font-medium text-[#233D4D]/70 transition-colors hover:text-[#FE7F2D]"
          >
            Contact
          </Link>
        </nav>

        {/* Desktop Login */}
        <div className="hidden items-center gap-2 lg:flex">
          {isAuthenticated ? (
            <>
              <Link
                to={user?.role === "admin" ? "/admin/dashboard" : "/dashboard"}
                className="rounded-full px-4 py-2 text-sm font-medium text-[#233D4D] transition-colors hover:bg-[#EAECF0]"
              >
                Dashboard
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full bg-[#233D4D] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#FE7F2D]"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => onLoginClick?.()}
              className="rounded-full bg-[#233D4D] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#FE7F2D]"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile / Tablet Menu */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EAECF0] text-[#233D4D] transition duration-200 hover:border-[#FE7F2D] hover:bg-[#FE7F2D] hover:text-white lg:hidden"
        >
          <div className="relative flex h-5 w-5 items-center justify-center">
            <span
              className={`absolute transition-all duration-300 ease-in-out ${
                isMenuOpen
                  ? "rotate-90 scale-0 opacity-0"
                  : "rotate-0 scale-100 opacity-100"
              }`}
            >
              <Icon name="menu" size={20} />
            </span>

            <span
              className={`absolute transition-all duration-300 ease-in-out ${
                isMenuOpen
                  ? "rotate-0 scale-100 opacity-100"
                  : "-rotate-90 scale-0 opacity-0"
              }`}
            >
              <Icon name="close" size={20} />
            </span>
          </div>
        </button>
      </div>
    </header>
  );
}

export default Navbar;