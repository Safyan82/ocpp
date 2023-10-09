const server = require("../util/ocpp.config");


server.on('Authorize', (chargingStation, data) => {
    console.log('Authorize request received from station', chargingStation.id);
    // Check authorization and respond accordingly
    const { idTag } = data;
    if (idTag === '12345') {
      chargingStation.authorize({ idTagInfo: { status: 'Accepted' } });
    } else {
      chargingStation.authorize({ idTagInfo: { status: 'Invalid' } });
    }
});

server.on('MeterValues', (chargingStation, data) => {
    console.log('Meter Values received from station', chargingStation.id);
    // Handle Meter Values
    const { connectorId, values } = data;
    console.log(`Meter values for Connector ${connectorId}:`, values);
    // You can process and store meter values here.
});