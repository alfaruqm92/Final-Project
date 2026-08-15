import Icon from "../atoms/Icon";

function EmptyState({
  title = "No equipment found",
  description = "Try another keyword or category.",
}) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#233D4D]/10 text-[#233D4D]">
        <Icon name="searchx" size={24} />
      </div>

      <h3 className="mt-4 text-base font-semibold text-[#000000]">
        {title}
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-5 text-[#233D4D]/60">
        {description}
      </p>
    </div>
  );
}

export default EmptyState;