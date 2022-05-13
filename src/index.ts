const net = require('net');
const conn = net.createConnection(8282, 'localhost');
const { parse } = require('./MessageParser');

// todo - what happens when something goes wrong?
// todo - closing connection

conn.on('data', (data: Buffer) => {
    console.log(parse(data.toString()));
});
