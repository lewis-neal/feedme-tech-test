const net = require('net');
const conn = net.createConnection(8282, 'localhost');
const { parse } = require('./MessageParser');
const schema = require('./Schema');

schema.fetchSchema().then((typesSchema: any) => {
    conn.on('data', (data: Buffer) => {
        //console.log(data.toString());
        console.log(parse(data.toString(), typesSchema));
    });
});
