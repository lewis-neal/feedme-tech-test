interface Message {
    msgId: number,
    operation: string,
    type: string,
    timestamp: number,
    name: string,
    displayed: boolean,
    suspended: boolean
};

interface EventMessage extends Message {
    eventId: string,
    category: string,
    subCategory: string,
    startTime: number
}

interface MarketMessage extends Message {
    eventId: string,
    marketId: string
}

interface OutcomeMessage extends Message {
    marketId: string,
    outcomeId: string,
    price: string
}

export {
    EventMessage,
    MarketMessage,
    OutcomeMessage
};