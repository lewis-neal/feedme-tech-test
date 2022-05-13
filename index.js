const net = require('net');
const conn = net.createConnection(8282, 'localhost');

// todo - what happens when something goes wrong?
// todo - closing connection

conn.on('data', (data) => {
    console.log(data.toString());
});
