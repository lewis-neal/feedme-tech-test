const messageParser = require('../src/MessageParser');

test('parses event message', () => {
    const result = messageParser.parse("|11690|update|event|1652465467925|bede9af4-21e5-49ff-b158-aadfdef303a7|Football|Sky Bet League One|\\|Bristol Rovers\\| vs \\|Charlton\\||1652465459695|1|0|");
    expect(result).toMatchObject({
        msgId: 11690,
        operation: "update",
        type: "event",
        timestamp: 1652465467925,
        eventId: "bede9af4-21e5-49ff-b158-aadfdef303a7",
        category: "Football",
        subCategory: "Sky Bet League One",
        name: "|Bristol Rovers| vs |Charlton|",
        startTime: 1652465459695,
        displayed: true,
        suspended: false
    });
});

test('parses market message', () => {
    const result = messageParser.parse("|11720|update|market|1652465467925|bede9af4-21e5-49ff-b158-aadfdef303a7|1445641a-ca23-40f1-b3d3-f148cf2a1394|Goal Handicap (+1)|1|0|");
    expect(result).toMatchObject({
        msgId: 11720,
        operation: "update",
        type: "market",
        timestamp: 1652465467925,
        eventId: "bede9af4-21e5-49ff-b158-aadfdef303a7",
        marketId: "1445641a-ca23-40f1-b3d3-f148cf2a1394",
        name: "Goal Handicap (+1)",
        displayed: true,
        suspended: false
    });
});

test('parses outcome message', () => {
    const result = messageParser.parse("|11759|update|outcome|1652465469908|0f4db2c6-037d-4479-9b58-630e3dba7989|aef4d8ac-17de-4e28-b20e-62a32d3e4191|\\|Newcastle\\||1/4|1|0|");
    expect(result).toMatchObject({
        msgId: 11759,
        operation: "update",
        type: "outcome",
        timestamp: 1652465469908,
        marketId: "0f4db2c6-037d-4479-9b58-630e3dba7989",
        outcomeId: "aef4d8ac-17de-4e28-b20e-62a32d3e4191",
        name: "|Newcastle|",
        price: "1/4",
        displayed: true,
        suspended: false
    });
});