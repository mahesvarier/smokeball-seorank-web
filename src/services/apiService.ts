import { ErrorResponse } from "../models/ErrorResponse";
import { getConfig } from "../common/common";
import handleErrorResponse from "./errorHandler";
import fetchSeoRankings from "./seoRankingsApi";

export const searchKeywords = async (keywords: string, url: string): Promise<string | undefined> => {
    const { maxRetries, initialDelay, multiplier } = getConfig();

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            const data: string | ErrorResponse = await fetchSeoRankings(keywords, url);

            if (typeof data !== 'string') {
                const retry = await handleErrorResponse(data, attempt, maxRetries, initialDelay, multiplier);
                if (retry) continue;
            }

            return data as string;
        } catch (error) {
            console.error('Failed to fetch:', error);
            if (attempt >= maxRetries) {
                return 'Failed to fetch results. Please retry after sometime.';
            }
        }
    }
};