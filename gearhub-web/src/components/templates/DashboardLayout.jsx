import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Icon from "../atoms/Icon";

function DashboardLayout({ children, menuItems = [] }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#EAECF0]">
      {/* Mobile Header */}
      <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-[#EAECF0] bg-white px-4 shadow-sm lg:hidden">
        <Link
          to="/"
          className="text-xl font-bold text-[#233D4D]"
        >
          Gear<span className="text-[#FE7F2D]">Hub</span>
        </Link>

        <button
          type="button"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EAECF0] text-[#233D4D] transition hover:border-[#FE7F2D] hover:bg-[#FE7F2D] hover:text-white"
        >
          <Icon
            name={isSidebarOpen ? "close" : "menu"}
            size={20}
          />
        </button>
      </header>

      {/* Overlay Mobile */}
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={`fixed inset-0 z-40 bg-[#233D4D]/30 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isSidebarOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed bottom-0 left-0 top-0 z-50 w-64 bg-[#233D4D] p-5 text-white transition-transform duration-300 ease-out lg:translate-x-0 ${
          isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={() => setIsSidebarOpen(false)}
          className="block px-3 py-4 text-2xl font-bold"
        >
          Gear<span className="text-[#FE7F2D]">Hub</span>
        </Link>

        {/* User */}
        <div className="mt-4 rounded-2xl bg-white/10 p-4">
          <p className="text-xs text-white/60">
            Signed in as
          </p>

          <p className="mt-1 truncate text-sm font-semibold">
            {user?.name}
          </p>

          <p className="mt-1 truncate text-xs text-white/60">
            {user?.email}
          </p>
        </div>

        {/* Navigation */}
        <nav className="mt-8 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white"
            >
              {item.icon && (
                <Icon name={item.icon} size={18} />
              )}

              {item.label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-5 left-5 right-5">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/75 transition-colors hover:bg-[#FE7F2D] hover:text-white"
          >
            <Icon name="logout" size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="min-h-screen pt-16 lg:ml-64 lg:pt-0">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;