const server = require("../util/ocpp.config");

server.on('TransactionEvent', (chargingStation, data) => {
    if (data.status === 'Completed') {
      processNextChargingRequest();
    }
});