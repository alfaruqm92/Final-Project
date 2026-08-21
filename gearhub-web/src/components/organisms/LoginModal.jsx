import LoginForm from "./LoginForm";
import Icon from "../atoms/Icon";

function LoginModal({ onClose, onSuccess }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl md:p-8">

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-[#233D4D] transition hover:bg-[#EAECF0]"
          aria-label="Close login"
        >
          <Icon name="close" size={20} />
        </button>

        {/* Header */}
        <div className="pr-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FE7F2D]">
            Welcome Back
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#233D4D]">
            Login to continue booking
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#233D4D]/60">
            Please login first to book this equipment.
          </p>
        </div>

        <LoginForm
          onSuccess={onSuccess}
          showRegisterLink={true}
        />
      </div>
    </div>
  );
}

export default LoginModal;