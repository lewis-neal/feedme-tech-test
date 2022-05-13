import { Message } from "./Messages";


function parse(data: String): Message {
    const splitData = data.split('|');
    return {
        msgId: parseInt(splitData[1]),
        operation: splitData[2],
        type: splitData[3],
        timestamp: parseInt(splitData[4])
    };
};

module.exports = {
    parse
};