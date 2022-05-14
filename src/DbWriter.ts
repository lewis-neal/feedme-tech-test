import { EventMessage, MarketMessage, OutcomeMessage } from "./Messages";
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

    if (message.type === 'market') {
        const market = {
            marketId: (message as MarketMessage).marketId,
            name: (message as MarketMessage).name,
            displayed: (message as MarketMessage).displayed,
            suspended: (message as MarketMessage).suspended
        };

        if (message.operation === 'create') {
            return collection.updateOne({
                eventId: (message as MarketMessage).eventId },
                { $addToSet: { markets: market}}
            ).catch('here');
        } else if (message.operation === 'update') {
            return collection.updateOne({
                eventId: (message as MarketMessage).eventId },
                { $set: { "markets.$[marketId]": market}},
                { arrayFilters: [ {marketId: (message as MarketMessage).marketId } ] }
            ).then(console.log('successful market update')).catch((err: any) => {
                // retry needed later
            });
        }
    }
}

module.exports = {
    write
}