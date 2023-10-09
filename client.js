const { RPCClient } = require('ocpp-rpc');

const cli = new RPCClient({
    endpoint: 'ws://3.17.180.226:9000', // the OCPP endpoint URL
    identity: '1234 example',             // the OCPP identity
    protocols: ['ocpp1.6'],          // client understands ocpp1.6 subprotocol
    strictMode: true,                // enable strict validation of requests & responses
});

const test = async()=>{

    // connect to the OCPP server
    cli.connect().then((res)=>console.log(res, "connected"));
    
    // send a BootNotification request and await the response
    const bootResponse = await cli.call('BootNotification', {
        chargePointVendor: "ocpp-rpc",
        chargePointModel: "ocpp-rpc",
    });

    // check that the server accepted the client
    if (bootResponse.status === 'Accepted') {
        
        // send a Heartbeat request and await the response
        const heartbeatResponse = await cli.call('Heartbeat', {
            heartbeat: "from"
        });
        // read the current server time from the response
        console.log(
            '\nServer time is', heartbeatResponse.currentTime, 
            "\n\nboot response", bootResponse
        );
        
        // send a StatusNotification request for the controller
        // const statusResponse = await cli.call('StatusNotification', {
        //     connectorId: 0,
        //     errorCode: "NoError",
        //     status: "Available",
        // });
        // console.log(statusResponse, "statusResponse");
    }

}

test();