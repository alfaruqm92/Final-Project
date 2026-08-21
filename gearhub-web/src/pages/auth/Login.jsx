import LoginForm from "../../components/organisms/LoginForm";

function Login() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#EAECF0] px-4 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-lg md:p-8">

        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FE7F2D]">
            GearHub
          </p>

          <h1 className="mt-2 text-2xl font-bold text-[#000000]">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-[#233D4D]/60">
            Sign in to manage your equipment rentals.
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}

export default Login;