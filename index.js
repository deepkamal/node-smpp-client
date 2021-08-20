let session_config = {
    connect:{
        url: 'smpp://197.210.3.229 :10000',
        auto_enquire_link_period: 10000
    },
    bind:{
        system_id: 'GTEL496408Bulk',
        password: '16ah!^AH'
    }
}

let smpp = require('smpp');
let session = smpp.connect(session_config.connect);
session.bind_transmitter(session_config.bind, function(pdu) {
    if (pdu.command_status == 0) {
        // Successfully bound
        session.submit_sm({
            destination_addr: '+2348033897513',
            short_message: 'Hello from DKS!'
        }, function(pdu) {
            if (pdu.command_status == 0) {
                // Message successfully sent
                console.log(pdu.message_id);
            }
        });
    }
});
