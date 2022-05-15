import net from 'net';
import { parse } from './MessageParser';
import { fetchSchema } from './Schema';
import { write } from './DbWriter';
const conn = net.createConnection(8282, 'localhost');

fetchSchema().then((typesSchema: any) => {
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
