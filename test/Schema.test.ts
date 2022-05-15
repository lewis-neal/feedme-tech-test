import { fetchSchema } from '../src/Schema';
import axios from 'axios';
import { parse } from '../src/XmlParserWrapper';
import { XMLParser } from 'fast-xml-parser';

jest.mock('axios');
jest.mock('../src/XmlParserWrapper');
beforeEach(() => {
    jest.clearAllMocks();
});
const parser = new XMLParser();

test('returns schema when get request is successful', async () => {
    (axios.get as jest.Mock).mockResolvedValue({
        data: '<a>a</a><b>b</b>'
    });
    (parse as jest.Mock).mockImplementation((val: string) => {
        return parser.parse(val);
    });
    await expect(fetchSchema()).resolves.toEqual({
        a: 'a',
        b: 'b'
    });
});

test('rejects if get request is unsuccessful', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('error'));
    (parse as jest.Mock).mockImplementation((val: string) => {
        return parser.parse(val);
    });
    await expect(fetchSchema()).rejects.toEqual(new Error('error'));
});

test('rejects if xml parser rejects', async () => {
    (axios.get as jest.Mock).mockResolvedValue({
        data: '<a>a</a><b>b</b>'
    });
    (parse as jest.Mock).mockImplementation(() => {
        return new Promise(() => {
            throw new Error('error');
        });
    });
    await expect(fetchSchema()).rejects.toEqual(new Error('error'));
});