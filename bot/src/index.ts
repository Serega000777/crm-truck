import TelegramBot from 'node-telegram-bot-api';
import { api } from './api.js';
import { parseTripText } from './parser.js';

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  throw new Error('TELEGRAM_BOT_TOKEN is required');
}

const bot = new TelegramBot(token, { polling: true });

bot.onText(/^\/start$/, async (msg) => {
  await bot.sendMessage(
    msg.chat.id,
    [
      'CRM Logistics bot запущен.',
      'Команды:',
      '/vehicles , список машин',
      '/addvehicle Название | Номер',
      '/summary , сводка',
      'Или пиши: добавь ходку сегодня в Урожайное за 8000 машина КамАЗ 162',
    ].join('\n'),
  );
});

bot.onText(/^\/vehicles$/, async (msg) => {
  const result = await api.getVehicles();

  if (!result.items.length) {
    await bot.sendMessage(msg.chat.id, 'Машин пока нет. Добавь через /addvehicle Название | Номер');
    return;
  }

  const lines = result.items.map((item, index) => `${index + 1}. ${item.name}${item.plate ? ` (${item.plate})` : ''}`);
  await bot.sendMessage(msg.chat.id, lines.join('\n'));
});

bot.onText(/^\/addvehicle\s+(.+)$/i, async (msg, match) => {
  const raw = match?.[1]?.trim();
  if (!raw) {
    await bot.sendMessage(msg.chat.id, 'Формат: /addvehicle КамАЗ 162 | А123АА');
    return;
  }

  const [namePart, platePart] = raw.split('|').map((part) => part.trim());
  const result = await api.createVehicle({
    name: namePart,
    plate: platePart || undefined,
  });

  await bot.sendMessage(msg.chat.id, `Машина добавлена: ${result.item.name}`);
});

bot.onText(/^\/summary$/i, async (msg) => {
  const result = await api.getSummary();
  const item = result.item;

  await bot.sendMessage(
    msg.chat.id,
    [
      'Сводка:',
      `Машин: ${item.vehicles}`,
      `Ходок: ${item.trips}`,
      `Выручка: ${item.revenue}`,
      `Отдано: ${item.paid}`,
      `Не отдано: ${item.unpaid}`,
      `Расходы: ${item.expenses}`,
      `Чистая прибыль: ${item.netProfit}`,
    ].join('\n'),
  );
});

bot.on('message', async (msg) => {
  const text = msg.text?.trim();
  if (!text || text.startsWith('/')) {
    return;
  }

  const parsedTrip = parseTripText(text);
  if (!parsedTrip) {
    return;
  }

  const vehicles = await api.getVehicles();
  const vehicle = vehicles.items.find((item) => item.name.toLowerCase() === parsedTrip.vehicleName.toLowerCase());

  if (!vehicle) {
    await bot.sendMessage(msg.chat.id, `Не нашёл машину: ${parsedTrip.vehicleName}. Сначала добавь её через /addvehicle`);
    return;
  }

  await api.createTrip({
    vehicleId: vehicle.id,
    tripDate: parsedTrip.tripDate,
    destination: parsedTrip.destination,
    amount: parsedTrip.amount,
    moneyStatus: parsedTrip.moneyStatus,
  });

  await bot.sendMessage(
    msg.chat.id,
    `Ходка добавлена: ${parsedTrip.tripDate}, ${parsedTrip.destination}, ${parsedTrip.amount}, машина ${vehicle.name}`,
  );
});

console.log('crm-logistics bot polling started');
