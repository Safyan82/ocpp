// ocpp-handler.js

function handleBootNotification(ws, message, sendMessage) {
    // Simulate registration by generating a random charging station ID
    const chargingStationId = Math.floor(Math.random() * 1000);
  
    // Construct and send the response message
    const response = {
      action: 'BootNotification',
      chargingStationId: chargingStationId.toString(),
      status: 'Accepted',
    };
  
    sendMessage(ws, response);
  }
  
  function handleAuthorize(ws, message) {
    // Simulate authorization by generating a random authorization status
    const authorizationStatus = Math.random() < 0.5 ? 'Accepted' : 'Rejected';
  
    // Construct and send the response message
    const response = {
      action: 'Authorize',
      idTagInfo: {
        status: authorizationStatus,
      },
    };
  
    sendMessage(ws, response);
  }
  
  function handleStartTransaction(ws, message) {
    // Simulate starting a charging session by generating a random transaction ID
    const transactionId = Math.floor(Math.random() * 100000);
  
    // Construct and send the response message
    const response = {
      action: 'StartTransaction',
      transactionId: transactionId.toString(),
      idTagInfo: {
        status: 'Accepted',
      },
    };
  
    sendMessage(ws, response);
  }
  
  // Add more handler functions for other OCPP messages as needed
  
  module.exports = {
    handleBootNotification,
    handleAuthorize,
    handleStartTransaction,
    // Add more exported functions for other OCPP messages
  };
  