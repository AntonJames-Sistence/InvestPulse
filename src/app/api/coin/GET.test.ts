import { NextRequest } from 'next/server';
import { GET } from './route.ts'; // Path to GET endpoint
import fetchMock from 'jest-fetch-mock';
import postgres from 'postgres';

// Mock postgres module
jest.mock('postgres');

const mockPostgres = postgres as jest.MockedFunction<typeof postgres>;

describe('GET endpoint', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('returns 400 if coinId is not provided', async () => {
        const req = new Request('http://localhost/api?');
        const res = await GET(req);

        expect(res.status).toBe(400);
        expect(res.statusText).toBe('Coin name not provided in query parameters');
    });

    it('returns 400 if DATABASE_URL is not defined', async () => {
        const req = new Request('http://localhost/api?id=bitcoin');
        delete process.env.DATABASE_URL; // Ensure DATABASE_URL is not defined
        const res = await GET(req);

        expect(res.status).toBe(400);
        expect(res.statusText).toBe('DATABASE_URL environment variable is not defined');
    });

    it('fetches coin data from Coingecko API and updates the database', async () => {
        process.env.DATABASE_URL = 'postgresql://user:pass@localhost:5432/dbname'; // Mock database URL

        const mockSQL = {
            sql: jest.fn().mockResolvedValueOnce([]).mockResolvedValueOnce([{ id: 'bitcoin', last_updated: new Date() }])
        };
        mockPostgres.mockReturnValue(mockSQL as any);

        const req = new Request('http://localhost/api?id=bitcoin');

        const mockResponseData = {
            id: 'bitcoin',
            symbol: 'btc',
            name: 'Bitcoin',
            description: { en: 'Bitcoin description' },
            links: { homepage: ['https://bitcoin.org'] },
            image: { large: 'https://bitcoin.org/image.png' },
            market_cap_rank: 1,
            market_data: {
                current_price: { usd: 50000 },
                ath: { usd: 60000 },
                ath_change_percentage: { usd: -10 },
                ath_date: { usd: '2021-04-14' },
                atl: { usd: 3000 },
                atl_change_percentage: { usd: 1500 },
                atl_date: { usd: '2015-01-14' },
                market_cap: { usd: 1000000000 },
                total_volume: { usd: 50000000 },
                high_24h: { usd: 51000 },
                low_24h: { usd: 49000 },
                price_change_24h: 1000,
                price_change_percentage_24h: 2,
                price_change_percentage_7d: 5,
                price_change_percentage_1y: 300,
            },
            last_updated: new Date().toISOString()
        };

        fetchMock.mockResponseOnce(JSON.stringify(mockResponseData));

        const res = await GET(req);
        const jsonData = await res.json();

        expect(res.status).toBe(200);
        expect(jsonData.id).toBe('bitcoin');
        expect(mockSQL.sql).toHaveBeenCalledWith(expect.stringContaining('SELECT * FROM coins WHERE id = $1'), ['bitcoin']);
        expect(mockSQL.sql).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO coins'), expect.anything());
    });

    it('returns coin data from the database if it was updated within 24 hours', async () => {
        process.env.DATABASE_URL = 'postgresql://user:pass@localhost:5432/dbname'; // Mock database URL

        const recentDate = new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(); // 2 hours ago

        const mockSQL = {
            sql: jest.fn().mockResolvedValueOnce([{ id: 'bitcoin', last_updated: recentDate, name: 'Bitcoin', symbol: 'btc' }])
        };
        mockPostgres.mockReturnValue(mockSQL as any);

        const req = new Request('http://localhost/api?id=bitcoin');
        const res = await GET(req);
        const jsonData = await res.json();

        expect(res.status).toBe(200);
        expect(jsonData.id).toBe('bitcoin');
        expect(jsonData.name).toBe('Bitcoin');
        expect(mockSQL.sql).toHaveBeenCalledWith(expect.stringContaining('SELECT * FROM coins WHERE id = $1'), ['bitcoin']);
    });
});
