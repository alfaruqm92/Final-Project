import { useEffect, useState } from "react";

const initialForm = {
  category_id: "",
  brand: "",
  model: "",
  unit_number: "",
  year: "",
  price_per_day: "",
  status: "available",
  image: null,
  description: ""
};

const statuses = [
  {
    value: "available",
    label: "Available",
  },
  {
    value: "booked",
    label: "Booked",
  },
  {
    value: "maintenance",
    label: "Maintenance",
  }
];

function EquipmentForm({
  equipment = null,
  categories = [],
  onSubmit,
  onCancel,
  loading = false
}) {
  const [form, setForm] = useState(initialForm);
  const [preview, setPreview] = useState(null);
 

  useEffect(() => {
    if (equipment) {
      setForm({
        category_id: equipment.category_id ?? "",
        brand: equipment.brand ?? "",
        model: equipment.model ?? "",
        unit_number: equipment.unit_number ?? "",
        year: equipment.year ?? "",
        price_per_day: equipment.price_per_day ?? "",
        status: equipment.status ?? "available",
        image: null,
        description: equipment.description ?? "",
      });

      setPreview(equipment.image ?? null);
    } else {
      setForm(initialForm);
      setPreview(null);
    }
  }, [equipment]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setForm((prev) => ({
      ...prev,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Equipment form:", form);
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Basic Information */}
      <div>
        <h2 className="text-lg font-semibold text-[#233D4D]">
          Equipment Information
        </h2>

        <div className="mt-4 grid gap-4 md:grid-cols-2">

          {/* Brand */}
          <div>
            <label htmlFor="brand" className="mb-2 block text-sm font-medium text-[#233D4D]">
              Brand
            </label>

            <input
              id="brand"
              name="brand"
              type="text"
              value={form.brand}
              onChange={handleChange}
              placeholder="e.g. Sony"
              required
              className="w-full rounded-xl border border-[#EAECF0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#FE7F2D] focus:ring-2 focus:ring-[#FE7F2D]/10"
            />
          </div>

          {/* Model */}
          <div>
            <label htmlFor="model" className="mb-2 block text-sm font-medium text-[#233D4D]">
              Model
            </label>

            <input
              id="model"
              name="model"
              type="text"
              value={form.model}
              onChange={handleChange}
              placeholder="e.g. A7 IV"
              required
              className="w-full rounded-xl border border-[#EAECF0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#FE7F2D] focus:ring-2 focus:ring-[#FE7F2D]/10"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category_id" className="mb-2 block text-sm font-medium text-[#233D4D]">
              Category
            </label>

            <select
              id="category_id"
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-[#EAECF0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#FE7F2D] focus:ring-2 focus:ring-[#FE7F2D]/10"
            >
              <option value="">Select category</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Unit Number */}
          <div>
            <label htmlFor="unit_number" className="mb-2 block text-sm font-medium text-[#233D4D]">
              Unit Number
            </label>

            <input
              id="unit_number"
              name="unit_number"
              type="text"
              value={form.unit_number}
              onChange={handleChange}
              placeholder="e.g. CAM-001"
              required
              className="w-full rounded-xl border border-[#EAECF0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#FE7F2D] focus:ring-2 focus:ring-[#FE7F2D]/10"
            />
          </div>

          {/* Year */}
          <div>
            <label htmlFor="year" className="mb-2 block text-sm font-medium text-[#233D4D]">
              Year
            </label>

            <input
              id="year"
              name="year"
              type="number"
              value={form.year}
              onChange={handleChange}
              min="1900"
              max={new Date().getFullYear()}
              placeholder="2024"
              required
              className="w-full rounded-xl border border-[#EAECF0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#FE7F2D] focus:ring-2 focus:ring-[#FE7F2D]/10"
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price_per_day" className="mb-2 block text-sm font-medium text-[#233D4D]">
              Price / Day
            </label>

            <input
              id="price_per_day"
              name="price_per_day"
              type="number"
              value={form.price_per_day}
              onChange={handleChange}
              min="0"
              placeholder="250000"
              required
              className="w-full rounded-xl border border-[#EAECF0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#FE7F2D] focus:ring-2 focus:ring-[#FE7F2D]/10"
            />
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="mb-2 block text-sm font-medium text-[#233D4D]">
              Status
            </label>

            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-[#EAECF0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#FE7F2D] focus:ring-2 focus:ring-[#FE7F2D]/10"
            >
              {statuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          {/* Image */}
          <div>
            <label htmlFor="image" className="mb-2 block text-sm font-medium text-[#233D4D]">
              Equipment Image
            </label>

            <input
              id="image"
              name="image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              className="w-full rounded-xl border border-[#EAECF0] bg-white px-4 py-3 text-sm text-[#233D4D]"
            />
          </div>
        </div>
      </div>

      {/* Image Preview */}
      {preview && (
        <div>
          <p className="mb-2 text-sm font-medium text-[#233D4D]">
            Image Preview
          </p>

          <div className="h-48 w-full overflow-hidden rounded-2xl bg-[#EAECF0] md:w-72">
            <img
              src={preview}
              alt="Equipment preview"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Description */}
      <div>
        <label htmlFor="description" className="mb-2 block text-sm font-medium text-[#233D4D]">
          Description
        </label>

        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="4"
          placeholder="Describe this equipment..."
          className="w-full resize-none rounded-xl border border-[#EAECF0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#FE7F2D] focus:ring-2 focus:ring-[#FE7F2D]/10"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 border-t border-[#EAECF0] pt-5">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded-full border border-[#EAECF0] px-5 py-2.5 text-sm font-medium text-[#233D4D] transition-all hover:border-[#233D4D] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-[#233D4D] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#FE7F2D] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              <span>Saving...</span>
            </>
          ) : (
            <span>
              {equipment ? "Update Equipment" : "Create Equipment"}
            </span>
          )}
        </button>
      </div>
    </form>
  );
}

export default EquipmentForm;