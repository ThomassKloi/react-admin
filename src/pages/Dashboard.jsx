// src/pages/Dashboard.jsx
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { fetchUsers, fetchPosts } from '../services/api';
import MetricCard from '../components/MetricCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';

export default function Dashboard() {
  const users = useFetch(fetchUsers);
  const posts = useFetch(fetchPosts);

  const isLoading = users.loading || posts.loading;
  const error = users.error || posts.error;

  const handleRetry = () => {
    users.reload();
    posts.reload();
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error} onRetry={handleRetry} />;

  const usersList = users.data ?? [];
  const postsList = posts.data ?? [];

  // Метрики
  const metrics = [
    { title: 'Пользователи', value: usersList.length },
    { title: 'Посты', value: postsList.length },
    {
      title: 'Среднее постов на пользователя',
      value: usersList.length
        ? Math.round(postsList.length / usersList.length)
        : 0,
    },
  ];

  return (
    <div>
      <h2>Dashboard</h2>

      <section className="metrics">
        {metrics.map((m) => (
          <MetricCard key={m.title} title={m.title} value={m.value} />
        ))}
      </section>

      <section className="list-section">
        <h3>Пользователи</h3>

        {usersList.length === 0 ? (
          <EmptyState message="Пользователи не найдены" />
        ) : (
          <ul className="list">
            {usersList.map((user) => (
              <li key={user.id} className="list__item">
                <Link to={`/details/${user.id}`}>
                  <strong>{user.name}</strong>
                </Link>
                <span className="list__meta">
                  {user.email} · {user.company?.name}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}