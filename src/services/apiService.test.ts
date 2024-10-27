import { searchKeywords } from './apiService';
import fetchSeoRankings from './seoRankingsApi';
import { getConfig } from '../common/common';
import handleErrorResponse from './errorHandler';

// src/services/apiService.test.ts

jest.mock('./seoRankingsApi');
jest.mock('../common/common');
jest.mock('./errorHandler');

describe('searchKeywords', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return data on successful fetch', async () => {
        const mockResponse = { ok: true, text: jest.fn().mockResolvedValue('mock data') };
        (fetchSeoRankings as jest.Mock).mockResolvedValue(mockResponse);
        (getConfig as jest.Mock).mockReturnValue({ maxRetries: 3, initialDelay: 1000, multiplier: 2 });

        const result = await searchKeywords('conveyancing software', 'https://smokeball.com');

        expect(result).toBe('mock data');
        expect(fetchSeoRankings).toHaveBeenCalledWith('conveyancing software', 'https://smokeball.com');
    });

    it('should retry on 429 status and eventually succeed', async () => {
        const mockResponse429 = { ok: false, status: 429, json: jest.fn().mockResolvedValue({}) };
        const mockResponse200 = { ok: true, text: jest.fn().mockResolvedValue('mock data') };
        (fetchSeoRankings as jest.Mock)
            .mockResolvedValueOnce(mockResponse429)
            .mockResolvedValueOnce(mockResponse200);
        (getConfig as jest.Mock).mockReturnValue({ maxRetries: 3, initialDelay: 1000, multiplier: 2 });

        const result = await searchKeywords('conveyancing software', 'https://smokeball.com');

        expect(result).toBe('mock data');
        expect(fetchSeoRankings).toHaveBeenCalledTimes(2);
    });

    it('should handle non-429 errors', async () => {
        const mockResponse = { ok: false, status: 500, json: jest.fn().mockResolvedValue({ message: 'error' }) };
        (fetchSeoRankings as jest.Mock).mockResolvedValue(mockResponse);
        (getConfig as jest.Mock).mockReturnValue({ maxRetries: 3, initialDelay: 1000, multiplier: 2 });

        const result = await searchKeywords('conveyancing software', 'https://smokeball.com');

        expect(result).toBeUndefined();
        expect(handleErrorResponse).toHaveBeenCalled();
    });

    it('should return error message on fetch failure', async () => {
        (fetchSeoRankings as jest.Mock).mockRejectedValue(new Error('Network error'));
        (getConfig as jest.Mock).mockReturnValue({ maxRetries: 3, initialDelay: 1000, multiplier: 2 });

        const result = await searchKeywords('conveyancing software', 'http://smokeball.com');

        expect(result).toBe('Failed to fetch results. Please retry after sometime.');
    });
});