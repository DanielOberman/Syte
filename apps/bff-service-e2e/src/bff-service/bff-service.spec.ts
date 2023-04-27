import axios from 'axios';

describe('GET /api/client', () => {
    it('should return a message', async () => {
        const res = await axios.get(`/api/client`);

        expect(res.status).toBe(200);
        expect(res.data).toEqual({ message: 'Hello API' });
    });
});
