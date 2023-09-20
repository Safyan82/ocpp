const { RPCServer, createRPCError } = require('ocpp-rpc');

const server = new RPCServer({
    protocols: ['ocpp1.6', 'ocpp2.0.1'], // server accepts ocpp1.6 subprotocol
    strictMode: false,       // enable strict validation of requests & responses
});

module.exports = server

