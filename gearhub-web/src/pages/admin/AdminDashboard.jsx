import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import apiClient from "../../services/api/client";
import LoadingState from "../../components/molecules/LoadingState";
import DashboardLayout from "../../components/templates/DashboardLayout";


const adminMenu = [
  {
    label: "Home",
    path: "/",
    icon: "home",
  },
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: "dashboard",
  },
  {
    label: "Equipment",
    path: "/admin/equipments",
    icon: "camera",
  },
  {
    label: "Categories",
    path: "/admin/categories",
    icon: "folder",
  },
  {
    label: "Bookings",
    path: "/admin/bookings",
    icon: "calendar",
  }
];

function AdminDashboard() {
  const { user } = useAuth();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await apiClient.get("/admin/dashboard");

        setStats(response.data.data);
      } catch (error) {
        console.error("Failed to fetch admin dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <DashboardLayout menuItems={adminMenu}>
      <div className="px-4 py-8 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-medium uppercase tracking-wider text-[#FE7F2D]">
            Admin Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#000000]">
            Welcome, {user?.name}
          </h1>

          <p className="mt-2 text-sm text-[#233D4D]/60">
            Manage GearHub equipment and rental operations.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm text-[#233D4D]/60">
                Total Equipment
              </p>

              <p className="mt-2 text-3xl font-bold text-[#233D4D]">
                {stats?.total_equipment ?? 0}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm text-[#233D4D]/60">
                Available
              </p>

              <p className="mt-2 text-3xl font-bold text-[#233D4D]">
                {stats?.available_equipment ?? 0}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm text-[#233D4D]/60">
                Booked
              </p>

              <p className="mt-2 text-3xl font-bold text-[#233D4D]">
                {stats?.booked_equipment ?? 0}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm text-[#233D4D]/60">
                Maintenance
              </p>

              <p className="mt-2 text-3xl font-bold text-[#233D4D]">
                {stats?.maintenance_equipment ?? 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;