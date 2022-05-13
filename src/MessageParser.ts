import { Message } from "./Messages";


function parse(data: String): Message {
    let tempData = data.replace(/\\\|/g, '@@@');
    const dataArray = tempData.split('|').map(str => {
        return str.replace(/@@@/g, '|');
    });
    const type = dataArray[3];
    let message = {
        msgId: parseInt(dataArray[1]),
        operation: dataArray[2],
        type: type,
        timestamp: parseInt(dataArray[4])
    };

    let messageDetail = {};

    if (type === "event") {
        messageDetail = {
            eventId: dataArray[5],
            category: dataArray[6],
            subCategory: dataArray[7],
            name: dataArray[8],
            startTime: parseInt(dataArray[9]),
            displayed: dataArray[10] === '1',
            suspended: dataArray[11] === '1'
        };
    } else if (type === "market") {
        messageDetail = {
            eventId: dataArray[5],
            marketId: dataArray[6],
            name: dataArray[7],
            displayed: dataArray[8] === '1',
            suspended: dataArray[9] === '1'
        };
    } else if (type === "outcome") {
        messageDetail = {
            marketId: dataArray[5],
            outcomeId: dataArray[6],
            name: dataArray[7],
            price: dataArray[8],
            displayed: dataArray[9] === '1',
            suspended: dataArray[10] === '1'
        };
    }

    return { ...message, ...messageDetail };
};

module.exports = {
    parse
};