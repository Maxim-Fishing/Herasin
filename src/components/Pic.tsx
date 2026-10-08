/* eslint-disable @next/next/no-img-element */
export default function Pic({
  src,
  alt,
  emoji = "💜",
  className = "",
  eager = false,
}: {
  src?: string;
  alt: string;
  emoji?: string;
  className?: string;
  eager?: boolean;
}) {
  if (src) {
    return <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} className={`object-cover ${className}`} />;
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={`flex items-center justify-center bg-gradient-to-br from-lila-100 via-lila-200 to-lila-300 text-5xl ${className}`}
    >
      {emoji}
    </div>
  );
}
