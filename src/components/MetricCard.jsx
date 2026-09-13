// src/components/MetricCard.jsx
export default function MetricCard({ title, value, hint }) {
  return (
    <div className="metric">
      <span className="metric__title">{title}</span>
      <span className="metric__value">{value}</span>
      {hint && <span className="metric__hint">{hint}</span>}
    </div>
  );
}