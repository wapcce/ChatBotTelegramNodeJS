const TelegramBot = require('node-telegram-bot-api');
const token = require('./tokens/Key.json');
const bot = new TelegramBot(token.telegram, { polling: true });
const dialogFlow = require('./dialogflow');
const youtube = require('./youtube');

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  //console.log(msg);
  const dfResponse = await dialogFlow.sendMessage(chatId.toString(), msg.text);

  let responseText = dfResponse.text;
  if (dfResponse.intent === 'Treino especifico') {
    responseText = await youtube.searchVideoURL(
      'Exercicio em casa para ',
      responseText,
      dfResponse.fields.corpo.stringValue
    );

    //console.log(`Este é o responseText ${responseText} e esse é o dfResponse.fields.corpo.stringValue ${dfResponse.fields.corpo.stringValue}`);
  } else if (dfResponse.intent === 'Mercado financeiro') {
    responseText = await youtube.searchVideoURL(
      'Vídeo sobre',
      responseText,
      dfResponse.fields.financeiro.stringValue
    );
  }

  bot.sendMessage(chatId, responseText);
});
