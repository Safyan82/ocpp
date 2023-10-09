const server = require("../util/ocpp.config");

server.on('BootNotification', (chargingStation, data) => {
    console.log('Boot Notification received from station', chargingStation.id);
    // Handle Boot Notification
});