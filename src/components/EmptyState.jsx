// src/components/EmptyState.jsx
export default function EmptyState({ message = 'Данных нет' }) {
  return (
    <div className="state state--empty">
      <p>📭 {message}</p>
    </div>
  );
}