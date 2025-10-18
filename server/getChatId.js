const TelegramBot = require('node-telegram-bot-api');

const TELEGRAM_TOKEN = '8327353602:AAElAMtTldBgL52qAsMXK4phkhK7OBMtFJQ';

console.log('🔍 Перевірка оновлень Telegram бота...\n');

const bot = new TelegramBot(TELEGRAM_TOKEN);

bot.getUpdates()
  .then(updates => {
    if (updates.length === 0) {
      console.log('⚠️  Оновлень не знайдено!');
      console.log('\n📝 Щоб отримати Chat ID:');
      console.log('1. Відправте будь-яке повідомлення вашому боту в Telegram');
      console.log('2. Запустіть цей скрипт знову: node server/getChatId.js');
    } else {
      console.log('✅ Знайдено оновлення!\n');

      updates.forEach((update, index) => {
        if (update.message) {
          const chatId = update.message.chat.id;
          const userName = update.message.from.username || update.message.from.first_name;
          const text = update.message.text;

          console.log(`Update #${index + 1}:`);
          console.log(`  👤 Від: ${userName}`);
          console.log(`  💬 Повідомлення: ${text}`);
          console.log(`  🆔 Chat ID: ${chatId}`);
          console.log('');
        }
      });

      const lastChatId = updates[updates.length - 1].message?.chat?.id;
      if (lastChatId) {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`\n📋 Ваш Chat ID: ${lastChatId}`);
        console.log('\n✏️  Додайте його в .env файл:');
        console.log(`TELEGRAM_CHAT_ID=${lastChatId}`);
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      }
    }
  })
  .catch(error => {
    console.error('❌ Помилка:', error.message);
  })
  .finally(() => {
    process.exit(0);
  });
