// src/components/ErrorMessage.jsx
export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="state state--error">
      <p>⚠️ {message}</p>
      {onRetry && <button onClick={onRetry}>Повторить</button>}
    </div>
  );
}