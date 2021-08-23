let session_config = {
    connect: {
        url: 'smpp://197.210.3.229:10000',
        auto_enquire_link_period: 10000
    },
    bind: {
        system_id: 'GTEL496408Bulk',
        password: '16ah!^AH'
    }
}

let smpp = require('smpp');
console.log("Process started, attempting connection now...")
let session = smpp.connect(session_config.connect);
console.log("Session connect:", session.options, "Now attempting bind_trasmitter mode")

session.bind_transmitter(session_config.bind, (pdu) => {

    console.log(`PDU Received ${JSON.stringify(pdu)}`)
    if (pdu.command_status == 0) {
        // Successfully bound
        session.submit_sm({
            destination_addr: '+2348033897513',
            short_message: 'Hello from Deep!'
        }, (submit_sm_ack) => {
            console.log(`Response of SUBMIT: ${JSON.stringify(submit_sm_ack)}`)
            if (submit_sm_ack.command_status == 0) {
                // Message successfully sent
                console.log(`Message sent successfully, received ID:${submit_sm_ack.message_id}`);
            }

        });
    }
});

process.on('SIGINT', () => {
    console.log('SIGINT - About to exit...');

    session.destroy((s) => {
        console.log(`Session Destroyed ${JSON.stringify(s)}, BYE`);
    })
});
process.on('exit', () => {
    console.log('About to exit...');

    session.destroy((s) => {
        console.log(`Session Destroyed ${JSON.stringify(s)}, BYE`);
    })
});