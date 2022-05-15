import axios from 'axios';
import { parse } from './XmlParserWrapper';

async function fetchSchema() {
    const response = await axios.get('http://localhost:8181/types');
    return parse(response.data);
}

export {
    fetchSchema
};