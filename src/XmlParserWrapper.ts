import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' });

function parse(xml: string) {
    return parser.parse(xml);
}

export {
    parse
};