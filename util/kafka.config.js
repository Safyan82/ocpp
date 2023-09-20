const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    brokers: ['proud-polliwog-14909-eu1-kafka.upstash.io:9092'],
    // brokers: ['logical-macaw-6883-eu1-kafka.upstash.io:9092'],
    sasl: {
      mechanism: 'scram-sha-256',
      username: 'cHJvdWQtcG9sbGl3b2ctMTQ5MDkk-S_8xClKhcoxZWs8UacxqbMGNonjCif3_3o',
      password: 'YmFhM2NkODQtODRiNC00YzRiLTgyMzYtYWI0YTAzMDYwNWYx',
    },
    ssl: true,
});


const producer = kafka.producer();


module.exports = producer