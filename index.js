const WebSocket = require('ws');
const { handleBootNotification, handleAuthorize, handleStartTransaction } = require('./handler/ocpp-handler');

const wss = new WebSocket.Server({ port: 9000 });

function sendMessage(ws, message) {
  ws.send(JSON.stringify(message));
}

wss.on('connection', (ws) => {
  console.log('Charging station connected.');

  ws.on('message', (message) => {
    console.log('Received message:', message);

    try {
      const parsedMessage = JSON.parse(message);

      // Handle OCPP messages based on their message type
      switch (parsedMessage.action) {
        case 'BootNotification':
          handleBootNotification(ws, parsedMessage, sendMessage);
          break;
        case 'Authorize':
          handleAuthorize(ws, parsedMessage);
          break;
        case 'StartTransaction':
          handleStartTransaction(ws, parsedMessage);
          break;
        // Add more cases for other OCPP messages as needed
        default:
          console.log('Unsupported message type:', parsedMessage.action);
          break;
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });

  ws.on('close', () => {
    console.log('Charging station disconnected.');
  });
});
