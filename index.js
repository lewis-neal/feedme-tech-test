const net = require('net');
const conn = net.createConnection(8282, 'localhost');

conn.on('data', (data) => {
    console.log(data.toString());
});
