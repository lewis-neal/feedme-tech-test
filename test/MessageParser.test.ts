import { parse } from '../src/MessageParser';

const testSchema = {
    types: {
        event: {
            body: {
                field: [
                    { index: "4", name: "eventId", datatype: "string" },
                    { index: "5", name: "category", datatype: "string" },
                    { index: "6", name: "subCategory", datatype: "string" },
                    { index: "7", name: "name", datatype: "string" },
                    { index: "8", name: "startTime", datatype: "integer" },
                    { index: "9", name: "displayed", datatype: "boolean" },
                    { index: "10", name: "suspended", datatype: "boolean" }
                ]
            }
        },
        market: {
            body: {
                field: [
                    { index: "4", name: "eventId", datatype: "string" },
                    { index: "5", name: "marketId", datatype: "string" },
                    { index: "6", name: "name", datatype: "string" },
                    { index: "7", name: "displayed", datatype: "boolean" },
                    { index: "8", name: "suspended", datatype: "boolean" }
                ]
            }
        },
        outcome: {
            body: {
                field: [
                    { index: "4", name: "marketId", datatype: "string" },
                    { index: "5", name: "outcomeId", datatype: "string" },
                    { index: "6", name: "name", datatype: "string" },
                    { index: "7", name: "price", datatype: "string" },
                    { index: "8", name: "displayed", datatype: "boolean" },
                    { index: "9", name: "suspended", datatype: "boolean" }
                ]
            }
        }
    }
};

test('parses event message', () => {
    const result = parse("|11690|update|event|1652465467925|bede9af4-21e5-49ff-b158-aadfdef303a7|Football|Sky Bet League One|\\|Bristol Rovers\\| vs \\|Charlton\\||1652465459695|1|0|", testSchema);
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
    const result = parse("|11720|update|market|1652465467925|bede9af4-21e5-49ff-b158-aadfdef303a7|1445641a-ca23-40f1-b3d3-f148cf2a1394|Goal Handicap (+1)|1|0|", testSchema);
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
    const result = parse("|11759|update|outcome|1652465469908|0f4db2c6-037d-4479-9b58-630e3dba7989|aef4d8ac-17de-4e28-b20e-62a32d3e4191|\\|Newcastle\\||1/4|1|0|", testSchema);
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

test('throws if data is invalid', () => {
    expect(() => {
        parse("invalid", testSchema);
    }).toThrowError(new Error('Received invalid message: invalid'));
});

test('throws if schema is null', () => {
    expect(() => {
        parse("|11690|update|event|1652465467925|bede9af4-21e5-49ff-b158-aadfdef303a7|Football|Sky Bet League One|\\|Bristol Rovers\\| vs \\|Charlton\\||1652465459695|1|0|", null);
    }).toThrowError(new Error('Schema was invalid: null'));
});

test('throws if schema is empty', () => {
    expect(() => {
        parse("|11690|update|event|1652465467925|bede9af4-21e5-49ff-b158-aadfdef303a7|Football|Sky Bet League One|\\|Bristol Rovers\\| vs \\|Charlton\\||1652465459695|1|0|", {});
    }).toThrowError(new Error('Schema was empty: {}'));
});

test('throws if schema is not an object', () => {
    expect(() => {
        parse("|11690|update|event|1652465467925|bede9af4-21e5-49ff-b158-aadfdef303a7|Football|Sky Bet League One|\\|Bristol Rovers\\| vs \\|Charlton\\||1652465459695|1|0|", 1);
    }).toThrowError(new Error('Schema was invalid: 1'));
});