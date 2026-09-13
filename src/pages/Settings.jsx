// src/pages/Settings.jsx
import { useEffect, useState } from 'react';
import { fetchSettings, saveSettings } from '../services/api';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

export default function Settings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchSettings();
        if (!cancelled) setSettings(data);
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveSettings(settings);
      setSaved(true);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!settings) return null;

  return (
    <div>
      <h2>Settings</h2>

      <form className="settings-form" onSubmit={handleSubmit}>
        <label>
          Тема
          <select
            value={settings.theme}
            onChange={(e) => handleChange('theme', e.target.value)}
          >
            <option value="light">Светлая</option>
            <option value="dark">Тёмная</option>
          </select>
        </label>

        <label>
          Язык
          <select
            value={settings.language}
            onChange={(e) => handleChange('language', e.target.value)}
          >
            <option value="ru">Русский</option>
            <option value="en">English</option>
          </select>
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={(e) =>
              handleChange('notifications', e.target.checked)
            }
          />
          Уведомления
        </label>

        <button type="submit" disabled={saving}>
          {saving ? 'Сохранение...' : 'Сохранить'}
        </button>

        {saved && <span className="saved">✓ Сохранено</span>}
      </form>
    </div>
  );
}