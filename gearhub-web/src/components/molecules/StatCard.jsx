function StatCard({ label, value, icon }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white p-4">
      <div>
        <p className="text-sm text-[#233D4D]/60">{label}</p>

        <p className="mt-1 text-2xl font-bold text-[#000000]">
          {value}
        </p>
      </div>

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAECF0] text-[#233D4D]">
        {icon}
      </div>
    </div>
  );
}

export default StatCard;