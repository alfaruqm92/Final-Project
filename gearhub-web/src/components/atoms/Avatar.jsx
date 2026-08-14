function Avatar({
  src,
  alt = "User avatar",
  size = "md",
}) {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  return (
    <img
      src={src}
      alt={alt}
      className={`${sizes[size]} rounded-full object-cover`}
    />
  );
}

export default Avatar;