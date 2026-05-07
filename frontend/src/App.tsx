import { useState } from 'react';

type TabKey = 'home' | 'trips' | 'analytics' | 'settings';

const TAB_LABELS: Record<TabKey, string> = {
  home: 'Главная',
  trips: 'Поездки',
  analytics: 'Аналитика',
  settings: 'Настройки',
};

export function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');

  return (
    <div className="app-shell">
      <main className="content">
        <section className="screen">
          <div className="panel compact">
            <h2>CRM Truck</h2>
            <div className="muted">Безопасный режим восстановления</div>
            <div className="setting-row"><span>Текущий экран</span><strong>{TAB_LABELS[activeTab]}</strong></div>
          </div>

          {activeTab === 'home' && (
            <div className="panel compact">
              <h3>Главная</h3>
              <div className="empty-state">Главный экран восстановлен. Следом верну рабочую загрузку данных.</div>
            </div>
          )}

          {activeTab === 'trips' && (
            <div className="panel compact">
              <h3>Поездки</h3>
              <div className="empty-state">Экран поездок подключён в безопасном режиме.</div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="panel compact">
              <h3>Аналитика</h3>
              <div className="empty-state">Экран аналитики будет возвращён следующим шагом.</div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="panel compact">
              <h3>Настройки</h3>
              <div className="empty-state">Экран настроек подключён как безопасная заглушка.</div>
            </div>
          )}
        </section>
      </main>

      <nav className="bottom-nav">
        <button className={activeTab === 'home' ? 'active' : ''} onClick={() => setActiveTab('home')}>Главная</button>
        <button className={activeTab === 'trips' ? 'active' : ''} onClick={() => setActiveTab('trips')}>Поездки</button>
        <button className={activeTab === 'analytics' ? 'active' : ''} onClick={() => setActiveTab('analytics')}>Аналитика</button>
        <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>Настройки</button>
      </nav>
    </div>
  );
}
