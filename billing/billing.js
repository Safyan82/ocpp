const server = require("../util/ocpp.config");

// Define the pricing structure (example: $0.10 per kWh)
const chargingRatePerKWh = 0.10;

// Variables to keep track of transaction details
let transactionId = 1;
let startTime = null;
let endTime = null;
let energyConsumed = 0;

// Function to start a charging session
function startChargingSession(chargingStation, connectorId, idTag) {
  transactionId++;
  startTime = new Date();
  chargingStation.startTransaction({
    transactionId,
    idTag,
    connectorId,
  });
}


function endChargingSession(chargingStation, transactionId, energyDelivered) {
    endTime = new Date();
    energyConsumed = energyDelivered;
    
    // Calculate the duration in hours
    const durationHours = (endTime - startTime) / 3600000;
  
    // Calculate the total cost
    const totalCost = energyConsumed * chargingRatePerKWh;
  
    // Log the billing details
    console.log(`Transaction ID: ${transactionId}`);
    console.log(`Start Time: ${startTime}`);
    console.log(`End Time: ${endTime}`);
    console.log(`Energy Consumed: ${energyConsumed} kWh`);
    console.log(`Duration: ${durationHours.toFixed(2)} hours`);
    console.log(`Total Cost: $${totalCost.toFixed(2)}`);
  
    // Send a StopTransaction message to end the session
    chargingStation.stopTransaction({
      transactionId,
      meterStop: energyConsumed,
      timestamp: endTime.toISOString(),
    });
  }
  
  // Handle incoming StartTransaction messages
  server.on('StartTransaction', (chargingStation, data) => {
    const { connectorId, idTag } = data;
    startChargingSession(chargingStation, connectorId, idTag);
  });
  
  // Handle incoming MeterValues messages to track energy consumed
  server.on('MeterValues', (chargingStation, data) => {
    // Assuming you receive energy consumption data in this format
    const { connectorId, values } = data;
    const energyDelivered = values.find((value) => value.measurand === 'Energy.Active.Import.Register');
    if (energyDelivered) {
      energyConsumed = energyDelivered.value;
    }
  });
  
  // Handle incoming StopTransaction messages to end the session
  server.on('StopTransaction', (chargingStation, data) => {
    const { transactionId, meterStop } = data;
    if (transactionId === transactionId) {
      endChargingSession(chargingStation, transactionId, meterStop);
    }
  });