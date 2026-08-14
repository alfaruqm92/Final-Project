import Logo from "../atoms/Logo";
import Icon from "../atoms/Icon";

function Navbar({ onMenuClick }) {
  return (
    <header className="pointer-events-none fixed left-0 right-0 top-0 z-50 px-3 pt-3">
      <div className="pointer-events-auto mx-auto flex h-14 w-full max-w-[calc(100%-24px)] items-center justify-between rounded-full border border-[#EAECF0] bg-white/90 px-4 shadow-lg backdrop-blur-md md:h-16 md:max-w-3xl md:px-6 lg:max-w-5xl">

        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          <a href="#" className="text-sm font-medium text-[#233D4D] transition-colors hover:text-[#FE7F2D]"
          >
            Home
          </a>

          <a href="/equipment" className="text-sm font-medium text-[#233D4D]/70 transition-colors hover:text-[#FE7F2D]">
            Equipment
          </a>

          <a
            href="#features"
            className="text-sm font-medium text-[#233D4D]/70 transition-colors hover:text-[#FE7F2D]"
          >
            Why GearHub
          </a>

          <a
            href="#"
            className="text-sm font-medium text-[#233D4D]/70 transition-colors hover:text-[#FE7F2D]"
          >
            Contact
          </a>
        </nav>

        {/* Desktop Login */}
        <div className="hidden lg:block">
          <a
            href="/login"
            className="rounded-full bg-[#233D4D] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#FE7F2D]"
          >
            Login
          </a>
        </div>

        {/* Mobile / Tablet Menu */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EAECF0] text-[#233D4D] transition duration-200 hover:border-[#FE7F2D] hover:bg-[#FE7F2D] hover:text-white lg:hidden"
        >
          <Icon name="menu" size={20} />
        </button>
      </div>
    </header>
  );
}

export default Navbar;