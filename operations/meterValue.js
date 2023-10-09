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
    const { connectorId, values } = data;
    const energyDelivered = values.find((value) => value.measurand === 'Energy.Active.Import.Register');
    if (energyDelivered) {
      energyConsumed = energyDelivered.value;
    }
});