import Icon from "../atoms/Icon";

const features = [
  {
    icon: "camera",
    title: "Quality Equipment",
    description:
      "Well-maintained gear that is ready for your next project.",
  },
  {
    icon: "calendar",
    title: "Easy Booking",
    description:
      "Book your equipment quickly with a simple rental process.",
  },
  {
    icon: "payment",
    title: "Flexible Rental",
    description:
      "Choose rental dates that fit your project and schedule.",
  },
];

function FeaturesSection() {
  return (
    <section id="features" className="bg-white px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FE7F2D]">
          Why GearHub?
        </p>

        <h2 className="mt-2 text-2xl font-bold text-[#000000]">
          Why rent with us?
        </h2>

        <div className="mt-7 divide-y divide-[#EAECF0] md:grid md:grid-cols-3 md:divide-x md:divide-y-0">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex gap-4 py-5 md:flex-col md:border-0 md:px-5 md:first:pl-0 md:last:pr-0"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#233D4D] text-white">
                <Icon name={feature.icon} size={18} />
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#000000]">
                  {feature.title}
                </h3>

                <p className="mt-1 text-sm leading-5 text-[#233D4D]/60">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;