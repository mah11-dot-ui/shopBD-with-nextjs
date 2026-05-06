interface StarRatingProps {
  value: number;
  size?: "sm" | "md";
}

export default function StarRating({ value, size = "sm" }: StarRatingProps) {
  const starSize = size === "sm" ? "text-sm" : "text-base";
  return (
    <div className={`flex items-center gap-0.5 ${starSize}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= Math.round(value) ? "text-warning" : "text-base-300"}
        >
          ★
        </span>
      ))}
    </div>
  );
}
