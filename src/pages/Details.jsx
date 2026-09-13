// src/pages/Details.jsx
import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { fetchUserById } from '../services/api';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

export default function Details() {
  const { id } = useParams();

  const { data: user, loading, error, reload } = useFetch(
    () => fetchUserById(id),
    [id]
  );

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;
  if (!user) return <ErrorMessage message="Пользователь не найден" />;

  return (
    <div>
      <Link to="/" className="back-link">
        ← Назад к Dashboard
      </Link>

      <h2>{user.name}</h2>
      <p className="muted">@{user.username}</p>

      <div className="details">
        <div>
          <span className="label">Email</span>
          <span>{user.email}</span>
        </div>
        <div>
          <span className="label">Телефон</span>
          <span>{user.phone}</span>
        </div>
        <div>
          <span className="label">Сайт</span>
          <span>{user.website}</span>
        </div>
        <div>
          <span className="label">Компания</span>
          <span>{user.company?.name}</span>
        </div>
        <div>
          <span className="label">Город</span>
          <span>{user.address?.city}</span>
        </div>
      </div>
    </div>
  );
}