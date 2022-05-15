import { EventMessage, MarketMessage, OutcomeMessage } from "./Messages";

function parse(data: String, typesSchema: any): EventMessage | MarketMessage | OutcomeMessage {
    if (typeof typesSchema !== 'object' || !typesSchema) {
        throw new Error(`Schema was invalid: ${typesSchema}`);
    }
    if  (Object.keys(typesSchema).length === 0) {
        throw new Error(`Schema was empty: ${JSON.stringify(typesSchema)}`);
    }

    try {
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

        let messageDetail: any = {};
        typesSchema.types[type].body.field.forEach((el: { name: string ; index: string; datatype: string }) => {
            if (el.datatype === 'string') {
                messageDetail[el.name] = dataArray[parseInt(el.index) + 1];
            } else if (el.datatype === 'integer') {
                messageDetail[el.name] = parseInt(dataArray[parseInt(el.index) + 1]);
            } else if (el.datatype === 'boolean') {
                messageDetail[el.name] = dataArray[parseInt(el.index) + 1] === '1';
            } 
        });

        return { ...message, ...messageDetail };
    } catch (err) {
        throw new Error(`Received invalid message: ${data}`);
    }
};

module.exports = {
    parse
};