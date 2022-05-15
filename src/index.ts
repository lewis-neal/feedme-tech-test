const net = require('net');
const conn = net.createConnection(8282, 'localhost');
const { parse } = require('./MessageParser');
const schema = require('./Schema');
const { write } = require('./DbWriter');

schema.fetchSchema().then((typesSchema: any) => {
    conn.on('data', (data: Buffer) => {
        try {
            const message = parse(data.toString(), typesSchema);
            write(message).catch((err: any) => {
                console.log(err);
            });
        } catch (err) {
            console.error(err);
        }
    });
});
