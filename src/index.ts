const net = require('net');
const conn = net.createConnection(8282, 'localhost');
const { parse } = require('./MessageParser');
const schema = require('./Schema');
const { write } = require('./DbWriter');

schema.fetchSchema().then((typesSchema: any) => {
    conn.on('data', (data: Buffer) => {
        const message = parse(data.toString(), typesSchema);
        write(message).then((a: any) => {
        });
    });
});
