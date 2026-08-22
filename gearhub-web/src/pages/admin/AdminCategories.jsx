import { useEffect, useState } from "react";
import apiClient from "../../services/api/client";
import LoadingState from "../../components/molecules/LoadingState";
import DashboardLayout from "../../components/templates/DashboardLayout";
import Toast from "../../components/molecules/Toast";

const adminMenu = [
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
    icon: "category",
  },
  {
    label: "Bookings",
    path: "/admin/bookings",
    icon: "calendar",
  },
];

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const [toast, setToast] = useState({
    type: "success",
    message: "",
  });

  const showToast = (type, message) => {
    setToast({
      type,
      message,
    });

    setTimeout(() => {
      setToast({
        type: "success",
        message: "",
      });
    }, 3000);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get("/categories");

        setCategories(response.data.data);
      } catch (error) {
        console.error(
          "Failed to fetch categories:",
          error.response?.data || error
        );

        showToast(
          "error",
          error.response?.data?.message ||
            "Failed to load categories."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      setFormLoading(true);

      if (selectedCategory) {
        // UPDATE
        const response = await apiClient.put(
          `/categories/${selectedCategory.id}`,
          {
            name: name.trim(),
          }
        );

        setCategories((prev) =>
          prev.map((category) =>
            category.id === selectedCategory.id
              ? response.data.data
              : category
          )
        );

        showToast(
          "success",
          "Category updated successfully."
        );
      } else {
        // CREATE
        const response = await apiClient.post(
          "/categories",
          {
            name: name.trim(),
          }
        );

        setCategories((prev) => [
          ...prev,
          response.data.data,
        ]);

        showToast(
          "success",
          "Category created successfully."
        );
      }

      setName("");
      setSelectedCategory(null);
      setShowForm(false);

    } catch (error) {
      console.error(
        "Failed to save category:",
        error.response?.data || error
      );

      showToast(
        "error",
        error.response?.data?.message ||
          "Failed to save category."
      );
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setName(category.name);
    setShowForm(true);
  };

  const handleDelete = async (category) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${category.name}"?`
    );

    if (!confirmed) return;

    try {
      await apiClient.delete(
        `/categories/${category.id}`
      );

      setCategories((prev) =>
        prev.filter(
          (item) => item.id !== category.id
        )
      );

      showToast(
        "success",
        "Category deleted successfully."
      );

    } catch (error) {
      console.error(
        "Failed to delete category:",
        error.response?.data || error
      );

      showToast(
        "error",
        "This category cannot be deleted because it is still being used by equipment."
      );
    }
  };

  if (loading) {
    return (
      <DashboardLayout menuItems={adminMenu}>
        <LoadingState />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout menuItems={adminMenu}>
      <Toast
        type={toast.type}
        message={toast.message}
        onClose={() =>
          setToast({
            type: "success",
            message: "",
          })
        }
      />

      <div className="px-4 py-8 md:px-8">
        <div className="mx-auto max-w-5xl">

          {/* Header */}
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-[#FE7F2D]">
                Management
              </p>

              <h1 className="mt-2 text-3xl font-bold text-[#000000]">
                Categories
              </h1>

              <p className="mt-2 text-sm text-[#233D4D]/60">
                Manage equipment categories.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedCategory(null);
                setName("");
                setShowForm(true);
              }}
              className="rounded-full bg-[#FE7F2D] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#233D4D]"
            >
              + Add Category
            </button>
          </div>

          {/* Create Form */}
          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="mt-6 rounded-2xl bg-white p-6 shadow-sm"
            >
              <label
                htmlFor="category-name"
                className="mb-2 block text-sm font-medium text-[#233D4D]"
              >
                Category Name
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="category-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tripod"
                  required
                  className="flex-1 rounded-xl border border-[#EAECF0] px-4 py-3 text-sm outline-none transition focus:border-[#FE7F2D] focus:ring-2 focus:ring-[#FE7F2D]/10"
                />

                <button
                  type="submit"
                  disabled={formLoading}
                  className="inline-flex min-w-[140px] items-center justify-center gap-2 rounded-xl bg-[#233D4D] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#FE7F2D] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {formLoading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Saving...
                    </>
                  ) : (
                    selectedCategory
                      ? "Update"
                      : "Create"
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Category Table */}
          <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">
            <table className="w-full text-left">
              <thead className="border-b border-[#EAECF0] bg-[#F8F9FA]">
                <tr>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#233D4D]/60">
                    ID
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#233D4D]/60">
                    Category Name
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#233D4D]/60">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {categories.map((category) => (
                  <tr
                    key={category.id}
                    className="border-b border-[#EAECF0] last:border-b-0"
                  >
                    <td className="px-5 py-4 text-sm text-[#233D4D]/60">
                      #{category.id}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-[#233D4D]">
                      {category.name}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(category)}
                          className="rounded-lg border border-[#EAECF0] px-3 py-1.5 text-xs font-medium text-[#233D4D] transition-colors hover:border-[#FE7F2D] hover:text-[#FE7F2D]"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(category)}
                          className="rounded-lg border border-red-100 px-3 py-1.5 text-xs font-medium text-red-500 transition-colors hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}

export default AdminCategories;