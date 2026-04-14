export default function ShimmerBlock({ lines = 3 }) {
  return (
    <div style={{ padding: '4px 0' }}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="shimmer shimmer-line" style={{ width: i === lines - 1 ? '60%' : '100%' }} />
      ))}
    </div>
  );
}
