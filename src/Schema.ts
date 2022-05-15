import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

async function fetchSchema() {
    const response = await axios.get('http://localhost:8181/types');
    const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' });
    return parser.parse(response.data);
}

export {
    fetchSchema
};