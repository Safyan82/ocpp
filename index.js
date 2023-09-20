// const producer = require("./util/kafka.config");
// const server = require("./util/ocpp.config");
const { RPCServer, createRPCError } = require('ocpp-rpc');
const { Kafka } = require('kafkajs')
const { createClient } = require('redis');
const allClients = new Map();



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


const server = new RPCServer({
    protocols: ['ocpp1.6', 'ocpp2.0.1'], // server accepts ocpp1.6 subprotocol
    strictMode: false,       // enable strict validation of requests & responses
});

// server.auth((accept, reject, handshake) => {
//     // accept the incoming client
//     accept({
//         // anything passed to accept() will be attached as a 'session' property of the client.
//         sessionId: 'west-london-ev-charger-Y'
//     });
// });

const redisClient = createClient({url: 'redis://default:b6a59acda550471fb6bbfbce0af7d0c8@enough-manatee-30293.upstash.io:30293'});
redisClient.on('error', err => console.log('Redis Client Error', err));

redisClient.connect().then((res)=>console.log("redis connected"));

server.on('client', async (client) => {



    const currentClient = allClients.get(client.identity);
    if(currentClient){
        console.log("Client already exist");
    }else{
        console.log("err");
    }
    
    allClients.set(client.identity, client);
    


    // create a specific handler for handling BootNotification requests
    // client.handle('BootNotification', async({params}) => {
    //     await producer.connect();
    //     await producer.send({
    //         topic: 'charging-point-events',
    //         messages: [{

    //             value : JSON.stringify({
    //                 event: "BootNotification",
    //                 identity: client.identity,
    //                 status: "Accepted",
    //                 params,
    //                 message: "Charger identity is accepted", 
    //                 interval: 300,
    //                 currentTime: new Date().toISOString()
    //             }),
    //         }],
    //     })

    //     // respond to accept the client
    //     return {
    //         status: "Accepted",
    //         interval: 300,
    //         currentTime: new Date().toISOString()
    //     };
    // });
    
    
    // // create a specific handler for handling Heartbeat requests
    // client.handle('Heartbeat', async({params}) => {

    //     console.log(`Server got Heartbeat from ${client.identity}:`, params);
    //     await producer.send({
    //         topic: 'charging-point-events',
    //         messages: [{

    //             value : JSON.stringify({
    //                 event: "Heartbeat",
    //                 identity: client.identity,
    //                 status: "Live",
    //                 params,
    //                 message: `Server got Heartbeat from ${client.identity}:`, 
    //                 currentTime: new Date().toISOString()
    //             }),
    //         }],
    //     })

    //     // respond with the server's current time.
    //     return {
    //         currentTime: new Date().toISOString()
    //     };
    // });

    // client.handle('*', async({params}) => {

    //     console.log(`Server got Heartbeat from ${client.identity}:`, params);
    //     await producer.send({
    //         topic: 'charging-point-events',
    //         messages: [{

    //             value : JSON.stringify({
    //                 event: "Heartbeat",
    //                 identity: client.identity,
    //                 status: "Live",
    //                 params,
    //                 message: `Server got Heartbeat from ${client.identity}:`, 
    //                 currentTime: new Date().toISOString()
    //             }),
    //         }],
    //     })

    //     // respond with the server's current time.
    //     return {
    //         currentTime: new Date().toISOString()
    //     };
    // });
        
    // // create a wildcard handler to handle any RPC method
    client.handle(async({method, params}) => {
        // This handler will be called if the incoming method cannot be handled elsewhere.
        
        await redisClient.set(`${method} from ${client.identity}`, JSON.stringify({params:params}));
        console.log(`Server got ${method} from ${client.identity}:`, params);
        await producer.connect();
        await producer.send({
            topic: 'chargerEvents',
            // topic: 'charging-point-events',
            messages: [{

                value : JSON.stringify({
                    event: method,
                    identity: client.identity,
                    params,
                    currentTime: new Date().toISOString()
                }),
            }],
        });


        return {
            status: "Accepted",
            interval: 300,
            currentTime: new Date().toISOString()
        };
    });

});





server.listen(9000).then(()=>console.log("connected"));