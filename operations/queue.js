function handleChargingRequest(chargingStation, data) {
    console.log('Charging request received from station', chargingStation.id);
    const { connectorId, idTag } = data;
    
    if (isStationAvailable()) {
      // Start the charging session
      startChargingSession(chargingStation, connectorId, idTag);
    } else {
      // Queue the charging request
      queueChargingRequest(chargingStation, connectorId, idTag);
    }
}

function isStationAvailable() {
    // Return true if available, false otherwise
    return chargingQueue.length === 0;
}
  
function queueChargingRequest(chargingStation, connectorId, idTag) {
    console.log('Queueing charging request from station', chargingStation.id);
    chargingQueue.push({ chargingStation, connectorId, idTag });
}
  
// Function to process the next charging request in the queue
function processNextChargingRequest() {
    if (chargingQueue.length > 0) {
        const { chargingStation, connectorId, idTag } = chargingQueue.shift();
        startChargingSession(chargingStation, connectorId, idTag);
    }
}

