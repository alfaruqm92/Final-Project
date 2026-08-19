import Button from "../atoms/Button";
import {useNavigate} from "react-router-dom";

function HeroSection({ image }) {

  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#233D4D] px-4 pb-10 pt-28 text-white md:px-8 md:pb-10 md:pt-28">
      {/* Decorative Circle */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#FE7F2D]/10" />

      <div className="relative mx-auto max-w-7xl md:grid md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-10">
        {/* Content */}
        <div className="max-w-xl md:max-w-lg">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#FE7F2D]">
            Camera Rental
          </p>

          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
            Capture the moment.
            <span className="mt-1 block text-[#FE7F2D]">
              Rent the gear.
            </span>
          </h1>

          <p className="mt-5 max-w-md text-sm leading-6 text-white/70">
            Professional cameras and photography equipment for your next
            project, event, or adventure.
          </p>

          <div className="mt-7">
            <Button variant="primary" onClick={() => navigate("/equipment")}>
              Browse Equipment
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative mt-8 md:mt-0">
          <div className="absolute inset-x-8 bottom-0 h-8 rounded-full bg-black/20 blur-xl" />

          <div className="relative mx-auto aspect-[4/3] max-w-md overflow-hidden rounded-[2rem] bg-[#EAECF0] shadow-2xl md:max-w-lg">
            {image ? (
              <img
                src={image}
                alt="Camera equipment"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-[#233D4D]/40">
                Camera Image
              </div>
            )}
          </div>

          {/* Floating label */}
          <div className="absolute bottom-4 left-4 rounded-xl bg-white px-4 py-3 shadow-lg">
            <p className="text-[10px] font-medium uppercase tracking-wide text-[#233D4D]/60">
              Starting from
            </p>

            <p className="mt-0.5 text-sm font-bold text-[#233D4D]">
              Rp 150.000 / day
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;