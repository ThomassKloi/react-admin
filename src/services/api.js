// src/services/api.js
const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Универсальная обёртка над fetch
async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

// Получить список пользователей (для Dashboard)
export async function fetchUsers() {
  return request('/users');
}

// Получить одного пользователя (для Details)
export async function fetchUserById(id) {
  return request(`/users/${id}`);
}

// Получить список постов (для метрик)
export async function fetchPosts() {
  return request('/posts');
}

// Получить настройки (мок)
export async function fetchSettings() {
  // имитация задержки, чтобы увидеть loading
  await new Promise((r) => setTimeout(r, 500));
  return {
    theme: 'light',
    language: 'ru',
    notifications: true,
  };
}

// Обновить настройки (мок)
export async function saveSettings(settings) {
  await new Promise((r) => setTimeout(r, 500));
  console.log('Сохранено:', settings);
  return settings;
}