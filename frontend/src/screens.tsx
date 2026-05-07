import type { HomeScreenProps, TripsScreenProps, AnalyticsScreenProps, SettingsScreenProps, PeriodKey, ThemeMode, UiScale } from './types';
import type { VehicleDto } from './api';

export function HomeScreen(props: HomeScreenProps) {
  const {
    vehicleForm,
    setVehicleForm,
    vehicleCards,
    selectedVehicleId,
    selectedVehicle,
    selectedVehicleTripsCount,
    selectedVehicleExpensesTotal,
    selectedVehicleLastTripDate,
    editingVehicleId,
    totalRevenue,
    revenuePeriod,
    totalTrips,
    showVehicleForm,
    showTripsModal,
    showVehicleInfoModal,
    showVehicleStatusBadge,
    selectedVehicleTrips,
    selectedVehicleExpenseItems,
    selectedVehicleDistanceKm,
    onToggleVehicleForm,
    onChangeRevenuePeriod,
    onToggleRevenueMenu,
    showRevenueMenu,
    onSelectVehicle,
    onOpenTrips,
    onOpenTripsModal,
    onCloseTripsModal,
    onOpenVehicleInfoModal,
    onCloseVehicleInfoModal,
    onSubmitVehicle,
    onEditVehicle,
    onToggleVehicleActive,
    onToggleTripMoneyStatus,
  } = props;

  return (
    <section className="screen home-screen-modern">
      <div className="home-hero">
        <div className="home-hero__brand">
          <h2><span className="home-hero__crm">CRM</span> <span className="home-hero__truck">TRUCK</span></h2>
        </div>
      </div>

      <section className="home-kpis">
        <div className="home-kpi-card home-kpi-card--selectable">
          <div className="home-kpi-card__topline">
            <span className="home-kpi-card__label">Выручка</span>
            <button className="home-kpi-card__menu" onClick={onToggleRevenueMenu}>⋮</button>
          </div>
          <strong className="home-kpi-card__value home-kpi-card__value--green">₽ {totalRevenue.toLocaleString('ru-RU')}</strong>
          <span className="home-kpi-card__period">
            {revenuePeriod === 'day' ? 'За день' : revenuePeriod === 'month' ? 'За месяц' : 'За всё время'}
          </span>
          {showRevenueMenu && (
            <div className="home-kpi-card__dropdown">
              <button onClick={() => onChangeRevenuePeriod('day')}>За день</button>
              <button onClick={() => onChangeRevenuePeriod('month')}>За месяц</button>
              <button onClick={() => onChangeRevenuePeriod('all')}>За всё время</button>
            </div>
          )}
        </div>
        <button className="home-kpi-card home-kpi-card--button" onClick={onOpenTripsModal}>
          <span className="home-kpi-card__label">Поездки</span>
          <strong className="home-kpi-card__value home-kpi-card__value--blue">{totalTrips}</strong>
          <span className="home-kpi-card__meta" />
        </button>
      </section>

      {showVehicleForm && (
        <div className="home-add-panel">
          <div className="home-add-panel__head">
            <h3>{editingVehicleId ? 'Редактирование машины' : 'Добавить машину'}</h3>
            <span>{editingVehicleId ? 'Обновление данных' : 'Быстрое создание'}</span>
          </div>
          <div className="home-add-panel__fields">
            <label>
              Название
              <input
                placeholder="КамАЗ 162"
                value={vehicleForm.name}
                onChange={(e) => setVehicleForm((prev) => ({ ...prev, name: e.target.value }))}
              />
            </label>
            <label>
              Номер
              <input
                placeholder="А123АА"
                value={vehicleForm.plate}
                onChange={(e) => setVehicleForm((prev) => ({ ...prev, plate: e.target.value }))}
              />
            </label>
          </div>
          <button className="primary home-add-panel__submit" onClick={onSubmitVehicle}>
            {editingVehicleId ? 'Сохранить машину' : 'Добавить машину'}
          </button>
        </div>
      )}

      <section className="home-fleet-section">
        <div className="home-section-title">
          <h3>Автопарк</h3>
          <div className="home-section-title__right">
            <button className="home-add-ts-button" onClick={onToggleVehicleForm}>Добавить ТС</button>
          </div>
        </div>

        <div className="home-fleet-list">
          {vehicleCards.length === 0 && (
            <div className="home-empty-state">
              <strong>Пока нет машин</strong>
              <span>Добавь первую машину через форму выше, и она появится в автопарке.</span>
            </div>
          )}

          {vehicleCards.map((vehicle, index) => {
            const isSelected = vehicle.id === selectedVehicleId;
            const statusText = vehicle.isActive === false ? 'НА БАЗЕ' : 'В ПУТИ';
            const statusClass = vehicle.isActive === false ? 'is-idle' : 'is-active';
            const imageClass = `truck-visual truck-visual--${index % 3}`;

            return (
              <button
                key={vehicle.id}
                className={`fleet-card ${isSelected ? 'selected' : ''}`}
                onClick={() => {
                  onSelectVehicle(vehicle.id);
                  onOpenVehicleInfoModal();
                }}
              >
                <div className={imageClass}>
                  <div className="truck-visual__overlay" />
                  {showVehicleStatusBadge && <div className={`fleet-card__status ${statusClass}`}>{statusText}</div>}
                </div>

                <div className="fleet-card__body">
                  <div className="fleet-card__top">
                    <div>
                      <h4>{vehicle.name}</h4>
                      <span className="fleet-card__plate">{vehicle.plate ?? 'Номер не указан'}</span>
                    </div>
                    <div className="fleet-card__money">
                      <strong>₽ {vehicle.revenueMonth.toLocaleString('ru-RU')}</strong>
                      <span>За месяц</span>
                    </div>
                  </div>

                  <div className="fleet-card__bottom fleet-card__bottom--single">
                    <button className="fleet-card__trip-link" onClick={(event) => { event.stopPropagation(); onOpenTripsModal(); }}>
                      🚚 {vehicle.tripsMonth} поездок
                    </button>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {showVehicleInfoModal && selectedVehicle && (
        <div className="home-modal-backdrop" onClick={onCloseVehicleInfoModal}>
          <div className="home-trips-modal home-trips-modal--centered" onClick={(event) => event.stopPropagation()}>
            <div className="home-trips-modal__head">
              <h3>{selectedVehicle.name}</h3>
              <button className="home-trips-modal__close" onClick={onCloseVehicleInfoModal}>Закрыть</button>
            </div>

            <div className="vehicle-info-modal">
              <div className="vehicle-info-modal__image">
                {selectedVehicle.imageUrl ? (
                  <img src={selectedVehicle.imageUrl} alt={selectedVehicle.name} />
                ) : (
                  <div className="vehicle-info-modal__placeholder">Фото ТС</div>
                )}
              </div>
              <div className="vehicle-info-modal__stats">
                <div className="setting-row"><span>Номер</span><strong>{selectedVehicle.plate ?? 'Не указан'}</strong></div>
                <div className="setting-row"><span>Поездок</span><strong>{selectedVehicleTrips.length}</strong></div>
                <div className="setting-row"><span>Пробег</span><strong>{selectedVehicleDistanceKm} км</strong></div>
                <div className="setting-row"><span>Доходы</span><strong>₽ {selectedVehicle.revenueMonth.toLocaleString('ru-RU')}</strong></div>
                <div className="setting-row"><span>Расходы</span><strong>₽ {selectedVehicleExpensesTotal.toLocaleString('ru-RU')}</strong></div>
              </div>
              <div className="panel compact vehicle-info-modal__expenses">
                <h3>Статьи расходов</h3>
                {selectedVehicleExpenseItems.length === 0 && <div className="empty-state">Расходов пока нет.</div>}
                {selectedVehicleExpenseItems.map((expense) => (
                  <div key={expense.id} className="list-row">
                    <div>
                      <strong>{expense.category}</strong>
                      <div className="muted small">{expense.expenseDate}</div>
                    </div>
                    <div className="list-meta">
                      <strong>₽ {expense.amount}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showTripsModal && (
        <div className="home-modal-backdrop home-modal-backdrop--sheet" onClick={onCloseTripsModal}>
          <div className="home-trips-modal home-trips-modal--sheet" onClick={(event) => event.stopPropagation()}>
            <div className="home-trips-modal__handle" />
            <div className="home-trips-modal__topbar">
              <button className="home-trips-modal__icon" onClick={onCloseTripsModal} aria-label="Назад">←</button>
              <h3>Детали поездок</h3>
              <button className="home-trips-modal__icon" aria-label="Меню">⋮</button>
            </div>

            <div className="home-trips-modal__sheet-list">
              {selectedVehicleTrips.length === 0 && (
                <div className="home-empty-state">
                  <strong>Поездок пока нет</strong>
                  <span>Добавь поездки, и они появятся в этом списке.</span>
                </div>
              )}

              {selectedVehicleTrips.map((trip) => (
                <div key={trip.id} className="trip-sheet-card">
                  <div className="trip-sheet-card__main">
                    <div className="trip-sheet-card__meta">
                      <span>{trip.tripDate}</span>
                      <i />
                      <span>{trip.vehicle?.name ?? 'Без авто'}</span>
                    </div>
                    <div className="trip-sheet-card__route">
                      <span>↝</span>
                      <strong>{trip.destination}</strong>
                    </div>
                    <div className="trip-sheet-card__amount">{trip.amount.toLocaleString('ru-RU')} ₽</div>
                  </div>
                  <div className="trip-sheet-card__side">
                    <span>Оплачено</span>
                    <button
                      type="button"
                      className={`trip-money-toggle__switch ${trip.moneyStatus === 'PAID' ? 'is-on' : ''}`}
                      onClick={() => onToggleTripMoneyStatus(trip)}
                      aria-label={trip.moneyStatus === 'PAID' ? 'Оплачено' : 'Не оплачено'}
                    >
                      <span className="trip-money-toggle__thumb" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export function TripsScreen(props: TripsScreenProps) {
  const {
    vehicles,
    selectedVehicleId,
    errorMessage,
    selectedDate,
    tripForm,
    expenseForm,
    defaultExpenseCategories,
    filteredTrips,
    filteredExpenses,
    editingTripId,
    editingExpenseId,
    setSelectedVehicleId,
    setSelectedDate,
    setTripForm,
    setExpenseForm,
    onSubmitTrip,
    onEditTrip,
    onToggleTripMoneyStatus,
    onSubmitExpense,
    onEditExpense,
  } = props;

  return (
    <section className="screen">
      <h2>Поездки</h2>
      {errorMessage && <div className="panel compact form-error-note">{errorMessage}</div>}

      <div className="panel compact">
        <label>
          Машина
          <select value={selectedVehicleId} onChange={(e) => setSelectedVehicleId(e.target.value)}>
            <option value="">Выбери машину</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>{vehicle.name}</option>
            ))}
          </select>
        </label>
        <label>
          Дата
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
        </label>
        <label>
          Куда
          <input value={tripForm.destination} onChange={(e) => setTripForm((prev) => ({ ...prev, destination: e.target.value }))} />
        </label>
        <label>
          Сумма
          <input type="number" value={tripForm.amount} onChange={(e) => setTripForm((prev) => ({ ...prev, amount: e.target.value }))} />
        </label>
        <label>
          Пробег (км)
          <input type="number" value={tripForm.distanceKm} onChange={(e) => setTripForm((prev) => ({ ...prev, distanceKm: e.target.value }))} />
        </label>
        <label>
          Комментарий
          <textarea value={tripForm.comment} onChange={(e) => setTripForm((prev) => ({ ...prev, comment: e.target.value }))} />
        </label>
        <button className="primary wide" onClick={onSubmitTrip}>{editingTripId ? 'Сохранить ходку' : 'Добавить ходку'}</button>
      </div>

      <div className="panel compact">
        <h3>Ходки за выбранную дату</h3>
        {filteredTrips.length === 0 && <div className="empty-state">Ходок на эту дату пока нет.</div>}
        {filteredTrips.map((trip) => (
          <div key={trip.id} className="list-row">
            <div>
              <strong>{trip.destination}</strong>
              <div className="muted small">{trip.tripDate} • {trip.vehicle?.name ?? 'Без машины'}</div>
              {trip.distanceKm != null && <div className="muted small">Пробег: {trip.distanceKm} км</div>}
            </div>
            <div className="list-meta">
              <strong>{trip.amount}</strong>
              <div className="inline-actions">
                <button className="secondary small-btn" onClick={() => onEditTrip(trip)}>Изменить</button>
                <button className="secondary small-btn" onClick={() => onToggleTripMoneyStatus(trip)}>{trip.moneyStatus === 'PAID' ? 'Отданы' : 'Не отданы'}</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="panel compact">
        <h3>Расходы за выбранную дату</h3>
        <div className="default-expense-grid">
          {defaultExpenseCategories.map((category) => (
            <label key={category} className="default-expense-card">
              <span>{category}</span>
              <input type="number" value={expenseForm.defaultAmounts[category] ?? ''} onChange={(e) => setExpenseForm((prev) => ({ ...prev, defaultAmounts: { ...prev.defaultAmounts, [category]: e.target.value } }))} />
            </label>
          ))}
        </div>
        <label>
          Своя статья
          <input value={expenseForm.category} onChange={(e) => setExpenseForm((prev) => ({ ...prev, category: e.target.value }))} />
        </label>
        <label>
          Сумма
          <input type="number" value={expenseForm.amount} onChange={(e) => setExpenseForm((prev) => ({ ...prev, amount: e.target.value }))} />
        </label>
        <button className="primary wide" onClick={onSubmitExpense}>{editingExpenseId ? 'Сохранить расход' : 'Добавить расход'}</button>
        {filteredExpenses.map((expense) => (
          <div key={expense.id} className="list-row">
            <div>
              <strong>{expense.category}</strong>
              <div className="muted small">{expense.expenseDate}</div>
            </div>
            <div className="list-meta">
              <strong>{expense.amount}</strong>
              <button className="secondary small-btn" onClick={() => onEditExpense(expense)}>Изменить</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AnalyticsScreen(props: AnalyticsScreenProps) {
  const {
    vehicles,
    selectedVehicleId,
    analyticsPeriod,
    analyticsFrom,
    analyticsTo,
    planAmount,
    analytics,
    setSelectedVehicleId,
    setAnalyticsPeriod,
    setAnalyticsFrom,
    setAnalyticsTo,
    setPlanAmount,
    onSavePlan,
  } = props;

  return (
    <section className="screen">
      <h2>Аналитика</h2>
      <div className="panel compact">
        <label>
          Машина
          <select value={selectedVehicleId} onChange={(e) => setSelectedVehicleId(e.target.value)}>
            <option value="">Все авто</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>{vehicle.name}</option>
            ))}
          </select>
        </label>
        <label>
          Период
          <select value={analyticsPeriod} onChange={(e) => setAnalyticsPeriod(e.target.value as PeriodKey)}>
            <option value="day">День</option>
            <option value="week">Неделя</option>
            <option value="month">Месяц</option>
            <option value="halfyear">Полгода</option>
            <option value="year">Год</option>
            <option value="custom">Свой период</option>
          </select>
        </label>

        {analyticsPeriod === 'custom' && (
          <>
            <label>
              С
              <input type="date" value={analyticsFrom} onChange={(e) => setAnalyticsFrom(e.target.value)} />
            </label>
            <label>
              По
              <input type="date" value={analyticsTo} onChange={(e) => setAnalyticsTo(e.target.value)} />
            </label>
          </>
        )}
      </div>

      <div className="panel compact">
        <label>
          План на период
          <input
            type="number"
            value={planAmount}
            onChange={(e) => setPlanAmount(e.target.value)}
          />
        </label>
        <button className="primary" onClick={onSavePlan}>Сохранить план</button>
      </div>

      <div className="grid-2">
        <div className="metric"><span>Выручка</span><strong>{analytics.revenue}</strong></div>
        <div className="metric"><span>Чистая прибыль</span><strong>{analytics.netProfit}</strong></div>
        <div className="metric"><span>Расходы</span><strong>{analytics.expenses}</strong></div>
        <div className="metric"><span>Не отдано</span><strong>{analytics.unpaid}</strong></div>
        <div className="metric"><span>Отдано</span><strong>{analytics.paid}</strong></div>
        <div className="metric"><span>Баланс</span><strong>{analytics.balance}</strong></div>
        <div className="metric"><span>План на период</span><strong>{analytics.plan}</strong></div>
      </div>

      <div className="panel compact">
        <h3>Период</h3>
        <div className="setting-row"><span>С</span><strong>{analytics.from || '-'}</strong></div>
        <div className="setting-row"><span>По</span><strong>{analytics.to || '-'}</strong></div>
        <div className="setting-row"><span>Ходок</span><strong>{analytics.trips}</strong></div>
      </div>

      <div className="panel compact">
        <h3>Детализация расходов</h3>
        {analytics.expenseItems.length === 0 && <div className="empty-state">Расходов за период нет.</div>}
        {analytics.expenseItems.map((expense, index) => (
          <div key={`${expense.date}-${expense.category}-${index}`} className="list-row">
            <div>
              <strong>{expense.category}</strong>
              <div className="muted small">{expense.date} • {expense.vehicle ?? 'Без машины'}</div>
            </div>
            <div className="list-meta">
              <strong>{expense.amount}</strong>
            </div>
          </div>
        ))}
      </div>

            <a
        className="primary wide link-button"
        href={`/api/report/pdf?period=${analyticsPeriod}${selectedVehicleId ? `&vehicleId=${selectedVehicleId}` : ''}${analyticsPeriod === 'custom' ? `&from=${analyticsFrom}&to=${analyticsTo}` : ''}`}
        target="_blank"
        rel="noreferrer"
      >
        Сформировать PDF
      </a>

    </section>
  );
}

export function FleetScreen(props: {
  vehicles: VehicleDto[];
  onBack: () => void;
  onEditVehicle: (vehicleId: string) => void;
  onToggleVehicleActive: (vehicleId: string) => void;
  onUploadVehiclePhoto: (vehicleId: string, file: File) => void;
}) {
  const { vehicles, onBack, onEditVehicle, onToggleVehicleActive, onUploadVehiclePhoto } = props;

  return (
    <section className="screen">
      <div className="panel compact">
        <div className="home-section-title">
          <h3>Автопарк</h3>
          <button className="secondary small-btn" onClick={onBack}>Назад</button>
        </div>
        {vehicles.length === 0 && <div className="empty-state">Машин пока нет.</div>}
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="list-row vehicle-manager-row">
            <div>
              <strong>{vehicle.name}</strong>
              <div className="muted small">{vehicle.plate ?? 'Номер не указан'}</div>
              <div className="muted small">{vehicle.imageUrl ? 'Фото загружено' : 'Фото пока системное'}</div>
            </div>
            <div className="inline-actions vehicle-manager-actions">
              <label className="secondary small-btn vehicle-upload-btn">
                Фото
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) onUploadVehiclePhoto(vehicle.id, file);
                    event.currentTarget.value = '';
                  }}
                />
              </label>
              <button className="secondary small-btn" onClick={() => onEditVehicle(vehicle.id)}>Изменить</button>
              <button className="secondary small-btn" onClick={() => onToggleVehicleActive(vehicle.id)}>
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SettingsScreen(props: SettingsScreenProps) {
  const {
    telegramUserLabel,
    currentRole,
    themeMode,
    uiScale,
    selectedVehicleName,
    showVehicleStatusBadge,
    vehicles,
    deletedVehicles,
    setCurrentRole,
    setThemeMode,
    setUiScale,
    onToggleVehicleStatusBadge,
    onOpenFleet,
    onRestoreVehicle,
    onDeleteVehicleForever,
    onSaveRole,
    onExitApp,
  } = props;

  return (
    <section className="screen">
      <h2>Настройки</h2>
      <div className="panel compact">
        <div className="setting-row"><span>Имя</span><strong>{telegramUserLabel || 'Telegram user'}</strong></div>
        <div className="setting-row"><span>Машина выбрана</span><strong>{selectedVehicleName ?? 'Нет'}</strong></div>
        <div className="setting-row"><span>Всего машин</span><strong>{vehicles.length}</strong></div>
      </div>
      <div className="panel compact">
        <label>Роль<select value={currentRole} onChange={(e) => setCurrentRole(e.target.value as 'DRIVER' | 'MANAGER' | 'CEO')}><option value="DRIVER">DRIVER</option><option value="MANAGER">MANAGER</option><option value="CEO">CEO</option></select></label>
        <label>Тема<select value={themeMode} onChange={(e) => setThemeMode(e.target.value as ThemeMode)}><option value="dark">Тёмная</option><option value="light">Светлая</option></select></label>
        <label>Масштаб<select value={uiScale} onChange={(e) => setUiScale(e.target.value as UiScale)}><option value="compact">Компактный</option><option value="normal">Обычный</option><option value="large">Крупный</option></select></label>
        <div className="setting-row"><span>Статус машины</span><button className="secondary small-btn" onClick={onToggleVehicleStatusBadge}>{showVehicleStatusBadge ? 'Включено' : 'Выключено'}</button></div>
        <button className="primary wide" onClick={onSaveRole}>Сохранить роль</button>
        <button className="secondary" onClick={onOpenFleet}>Открыть автопарк</button>
        <button className="secondary" onClick={() => window.open('https://t.me/savasava777', '_blank', 'noopener,noreferrer')}>Написать разработчику</button>
        <button className="secondary" onClick={() => window.open('https://t.me/savasava777', '_blank', 'noopener,noreferrer')}>Донат разработчику</button>
      </div>
      <div className="panel compact">
        <h3>Удаленные ТС</h3>
        {deletedVehicles.length === 0 && <div className="empty-state">Удаленных машин пока нет.</div>}
        {deletedVehicles.map((vehicle) => (
          <div key={vehicle.id} className="list-row">
            <div>
              <strong>{vehicle.name}</strong>
              <div className="muted small">{vehicle.plate ?? 'Номер не указан'}</div>
            </div>
            <div className="inline-actions">
              <button className="secondary small-btn" onClick={() => onRestoreVehicle(vehicle.id)}>Восстановить</button>
              <button className="secondary small-btn" onClick={() => onDeleteVehicleForever(vehicle.id)}>Удалить навсегда</button>
            </div>
          </div>
        ))}
      </div>
      <button className="secondary" onClick={onExitApp}>Выйти</button>
    </section>
  );
}
