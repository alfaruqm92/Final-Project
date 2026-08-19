import { useAuth } from "../../contexts/AuthContext";
import DashboardLayout from "../../components/templates/DashboardLayout";

const customerMenu = [
  {
    label: "Home",
    path: "/",
    icon: "home",
  },
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: "dashboard",
  },
  {
    label: "Equipment",
    path: "/equipment",
    icon: "camera",
  },
  {
    label: "My Bookings",
    path: "/my-bookings",
    icon: "calendar",
  },
];

function Dashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout menuItems={customerMenu}>
      <div className="px-4 py-8 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-medium uppercase tracking-wider text-[#FE7F2D]">
            Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#000000]">
            Welcome, {user?.name}
          </h1>

          <p className="mt-2 text-sm text-[#233D4D]/60">
            Manage your equipment rentals and bookings.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm text-[#233D4D]/60">
                Active Bookings
              </p>

              <p className="mt-2 text-2xl font-bold">
                0
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm text-[#233D4D]/60">
                Total Bookings
              </p>

              <p className="mt-2 text-2xl font-bold">
                0
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm text-[#233D4D]/60">
                Account
              </p>

              <p className="mt-2 text-sm font-semibold text-[#233D4D]">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;