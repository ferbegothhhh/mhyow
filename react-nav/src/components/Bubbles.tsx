const bubbles = [
  { left: "8%", width: 70, height: 70, duration: 11, delay: 0 },
  { left: "22%", width: 110, height: 110, duration: 14, delay: 2 },
  { left: "40%", width: 55, height: 55, duration: 10, delay: 1 },
  { left: "58%", width: 90, height: 90, duration: 15, delay: 4 },
  { left: "72%", width: 60, height: 60, duration: 12, delay: 3 },
  { left: "88%", width: 120, height: 120, duration: 16, delay: 1.5 },
  { left: "14%", width: 45, height: 45, duration: 9, delay: 5 },
  { left: "66%", width: 35, height: 35, duration: 8, delay: 6 },
];

export default function Bubbles() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="animate-bubble"
          style={{
            left: b.left,
            width: b.width,
            height: b.height,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}