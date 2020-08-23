const dialogflow = require('dialogflow');
const configs = require('./bot_telegram_dio.json');

const sessionClient = new dialogflow.SessionsClient({
  projectId: configs.project_id,
  credentials: {
    private_key: configs.private_key,
    client_email: configs.client_email,
  },
});

async function sendMessage(chatId, message) {
  const sessionPath = sessionClient.sessionPath(configs.project_id, chatId);
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'pt-BR',
      },
    },
  };
  const response = await sessionClient.detectIntent(request);
  const result = response[0].queryResult;
  return {
    text: result.fulfillmentText,
    intent: result.intent.displayName,
    fields: result.parameters.fields,
  };
  //console.log(JSON.stringify(result, null, 2));
}

//sendMessage('12938123', 'Bom dia');

module.exports.sendMessage = sendMessage;
