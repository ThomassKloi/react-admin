// src/components/Loader.jsx
export default function Loader() {
  return (
    <div className="state state--loading">
      <div className="spinner" />
      <p>Загрузка...</p>
    </div>
  );
}