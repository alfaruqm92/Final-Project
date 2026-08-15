function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#233D4D]/20 border-t-[#FE7F2D]" />

      <p className="mt-4 text-sm text-[#233D4D]/60">
        Loading equipment...
      </p>
    </div>
  );
}

export default LoadingState;