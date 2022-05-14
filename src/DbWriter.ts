import { EventMessage, MarketMessage, OutcomeMessage, getMessageType } from "./Messages";
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');

async function write(message: EventMessage | MarketMessage | OutcomeMessage) {
    await client.connect();
    const db = client.db('feedme');
    const collection = db.collection('events');
    if (message.type === 'event' && message.operation === 'create') {
        const event = {
            eventId: (message as EventMessage).eventId,
            category: (message as EventMessage).category,
            subCategory: (message as EventMessage).subCategory,
            name: (message as EventMessage).name,
            startTime: (message as EventMessage).startTime,
            displayed: (message as EventMessage).displayed,
            suspended: (message as EventMessage).suspended
        };
        return collection.insertOne(event);
    }
}

module.exports = {
    write
}