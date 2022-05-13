const messageParser = require('../src/MessageParser');

test('returns message', () => {
    const result = messageParser.parse("|4214|create|outcome|1652452034138");
    expect(result).toMatchObject({
        msgId: 4214,
        operation: "create",
        type: "outcome",
        timestamp: 1652452034138
    });
});