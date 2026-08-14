import Logo from "../atoms/Logo";

import instagramIcon from "../../assets/icons/instagram.png";
import facebookIcon from "../../assets/icons/facebook.png";

function Footer() {
  return (
    <footer className="bg-[#233D4D] px-4 pb-8 pt-10 text-white md:px-8 md:pt-14">
      <div className="mx-auto max-w-7xl">

        {/* Main Footer */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">

          {/* Brand */}
          <div>
            <Logo dark/>

            <p className="mt-3 max-w-sm text-sm leading-6 text-white/65">
              Your trusted partner for professional camera and photography
              equipment rental.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold">
              Explore
            </h3>

            <nav className="mt-3 flex flex-col gap-2.5">
              <a
                href="#equipment"
                className="w-fit text-sm text-white/65 transition-colors hover:text-[#FE7F2D]"
              >
                Equipment
              </a>

              <a
                href="#features"
                className="w-fit text-sm text-white/65 transition-colors hover:text-[#FE7F2D]"
              >
                Why GearHub
              </a>

              <a
                href="#"
                className="w-fit text-sm text-white/65 transition-colors hover:text-[#FE7F2D]"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold">
              Follow us
            </h3>

            <div className="mt-3 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:border-[#FE7F2D] hover:bg-[#FE7F2D]"
              >
                <img
                  src={instagramIcon}
                  alt=""
                  className="h-5 w-5"
                />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:border-[#FE7F2D] hover:bg-[#FE7F2D]"
              >
                <img
                  src={facebookIcon}
                  alt=""
                  className="h-5 w-5"
                />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-5 md:flex-row md:items-center md:justify-between md:pt-6">
          <p className="text-xs text-white/45">
            © 2026 GearHub. All rights reserved.
          </p>

          <p className="text-xs text-white/45">
            Professional gear. Simple rental.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;