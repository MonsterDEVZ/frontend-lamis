/**
 * Telegram Bot API utilities
 * Отправка сообщений в Telegram бот
 */

const TELEGRAM_BOT_TOKEN = '8209428728:AAGg0pY3oP3HOpVtwrqP9IldxWm_yhojm4U';

// ВАЖНО: Чтобы получить chat_id:
// 1. Напишите боту @lamiskgbot любое сообщение в Telegram
// 2. Откройте в браузере: https://api.telegram.org/bot8209428728:AAGg0pY3oP3HOpVtwrqP9IldxWm_yhojm4U/getUpdates
// 3. Найдите в ответе "chat":{"id":XXXXXX} и скопируйте это число
// 4. Замените TELEGRAM_CHAT_ID на это число

const TELEGRAM_CHAT_ID = ''; // Замените на ваш chat_id после получения через getUpdates

interface OrderData {
  name: string;
  phone: string;
  items: Array<{
    id: string | number;
    name: string;
    price: number;
    quantity?: number;
  }>;
}

/**
 * Форматирует данные заказа в красивое сообщение для Telegram
 */
function formatOrderMessage(data: OrderData): string {
  const { name, phone, items } = data;

  // Заголовок
  let message = '🛒 <b>НОВЫЙ ЗАКАЗ</b>\n\n';

  // Данные клиента
  message += '👤 <b>Клиент:</b>\n';
  message += `   Имя: ${name}\n`;
  message += `   Телефон: ${phone}\n\n`;

  // Товары
  message += '📦 <b>Товары:</b>\n';
  let totalPrice = 0;

  items.forEach((item, index) => {
    const quantity = item.quantity || 1;
    const itemTotal = item.price * quantity;
    totalPrice += itemTotal;

    message += `\n${index + 1}. ${item.name}\n`;
    message += `   Цена: ${item.price.toLocaleString('ru-RU')} С`;
    if (quantity > 1) {
      message += ` × ${quantity}`;
    }
    message += `\n   Сумма: ${itemTotal.toLocaleString('ru-RU')} С\n`;
  });

  // Итого
  message += `\n💰 <b>ИТОГО: ${totalPrice.toLocaleString('ru-RU')} С</b>\n`;

  // Дата и время
  const now = new Date();
  const dateStr = now.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const timeStr = now.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
  message += `\n📅 Дата: ${dateStr} ${timeStr}`;

  return message;
}

/**
 * Пытается получить chat_id из последних сообщений бота
 */
async function getChatIdFromUpdates(): Promise<string | null> {
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`;
    const response = await fetch(url);

    if (!response.ok) {
      console.error('Failed to get updates from Telegram');
      return null;
    }

    const data = await response.json();

    if (data.ok && data.result && data.result.length > 0) {
      // Получаем последнее сообщение
      const lastUpdate = data.result[data.result.length - 1];
      const chatId = lastUpdate.message?.chat?.id || lastUpdate.channel_post?.chat?.id;

      if (chatId) {
        console.log('✅ Найден chat_id:', chatId);
        return chatId.toString();
      }
    }

    console.warn('⚠️ Не найдено сообщений. Напишите боту любое сообщение в Telegram.');
    return null;
  } catch (error) {
    console.error('Ошибка при получении chat_id:', error);
    return null;
  }
}

/**
 * Отправляет заказ в Telegram бот
 */
export async function sendOrderToTelegram(data: OrderData): Promise<void> {
  const message = formatOrderMessage(data);

  // Если chat_id не указан, пытаемся получить его автоматически
  let chatId = TELEGRAM_CHAT_ID;

  if (!chatId || chatId.trim() === '') {
    console.log('🔍 TELEGRAM_CHAT_ID не указан. Пытаюсь получить автоматически...');
    const foundChatId = await getChatIdFromUpdates();

    if (foundChatId) {
      chatId = foundChatId;
      console.log(`💡 Используем найденный chat_id: ${chatId}`);
      console.log(`📝 Добавьте в telegram.ts: const TELEGRAM_CHAT_ID = '${chatId}';`);
    } else {
      throw new Error(
        'Не удалось найти chat_id автоматически.\n\n' +
        'Пожалуйста, выполните следующие шаги:\n' +
        '1. Напишите боту @lamiskgbot любое сообщение в Telegram\n' +
        '2. Откройте в браузере: https://api.telegram.org/bot8209428728:AAGg0pY3oP3HOpVtwrqP9IldxWm_yhojm4U/getUpdates\n' +
        '3. Найдите "chat":{"id":XXXXXX} и скопируйте число\n' +
        '4. Замените TELEGRAM_CHAT_ID в lib/telegram.ts на это число'
      );
    }
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML',
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('Telegram API error:', error);
    console.error('Response status:', response.status);
    console.error('Full error details:', JSON.stringify(error, null, 2));

    // Показываем более подробную ошибку для отладки
    throw new Error(
      `Ошибка отправки в Telegram (${response.status}): ${error.description || 'Unknown error'}\n` +
      `Используемый chat_id: ${chatId}\n\n` +
      `Подсказка: Убедитесь, что:\n` +
      `1. Бот добавлен в канал/группу\n` +
      `2. TELEGRAM_CHAT_ID указан правильно (должен быть числовой ID)\n` +
      `3. Напишите боту /start, чтобы он мог отправлять вам сообщения`
    );
  }

  const result = await response.json();
  console.log('✅ Заказ успешно отправлен в Telegram:', result);
}
