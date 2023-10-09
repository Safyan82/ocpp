const server = require("../util/ocpp.config");

server.on('StartTransaction', (chargingStation, data) => {
    console.log('Start Transaction request received from station', chargingStation.id);
    const { connectorId, idTag } = data;
    const transactionId = 1; // Assign a unique transaction ID
    chargingStation.startTransaction({
      transactionId,
      idTag,
      connectorId,
    });
});

server.on('StopTransaction', (chargingStation, data) => {
    console.log('Stop Transaction request received from station', chargingStation.id);
    const { transactionId, meterStop, timestamp } = data;
    // Handle Stop Transaction and respond accordingly
    chargingStation.stopTransaction({
      transactionId,
      idTagInfo: { status: 'Accepted' },
      meterStop,
      timestamp,
    });
});