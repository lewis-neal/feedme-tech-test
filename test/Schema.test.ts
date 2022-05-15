import { fetchSchema } from '../src/Schema';
import axios from 'axios';

jest.mock('axios');

test('returns schema when get request is successful', async () => {
    (axios.get as jest.Mock).mockResolvedValue({
        data: '<a>a</a><b>b</b>'
    });
    await expect(fetchSchema()).resolves.toEqual({
        a: 'a',
        b: 'b'
    });
});

test('rejects if get request is unsuccessful', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('error'));
    await expect(fetchSchema()).rejects.toEqual(new Error('error'));
});