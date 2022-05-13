const axios = require('axios');
const { XMLParser } = require('fast-xml-parser');

async function fetchSchema() {
    const response = await axios.get('http://localhost:8181/types');
    const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' });
    return parser.parse(response.data);
}

module.exports = {
    fetchSchema
};