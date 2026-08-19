function Toast({ type = "success", message, onClose }) {
  if (!message) return null;

  const isSuccess = type === "success";

  return (
    <div className="fixed right-4 top-4 z-[100] w-[calc(100%-2rem)] max-w-sm">
      <div
        className={`flex items-start gap-3 rounded-2xl border bg-white p-4 shadow-xl ${
          isSuccess
            ? "border-green-100"
            : "border-red-100"
        }`}
      >
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
            isSuccess
              ? "bg-green-50 text-green-600"
              : "bg-red-50 text-red-600"
          }`}
        >
          {isSuccess ? "✓" : "!"}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-[#233D4D]">
            {isSuccess ? "Success" : "Error"}
          </p>

          <p className="mt-1 text-sm text-[#233D4D]/60">
            {message}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-lg leading-none text-[#233D4D]/40 transition hover:text-[#233D4D]"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default Toast;