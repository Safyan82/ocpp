server.on('Authorize', (chargingStation, data) => {
    console.log('Authorize request received from station', chargingStation.id);
    // Check if the transaction starts with an RFID card
    const { idTag } = data;
  
    if (idTag) {
      console.log(`Transaction started with RFID card: ${idTag}`);
    } else {
      console.log('Transaction started without an RFID card');
      // Handle the case where no RFID card is presented.
    }
});