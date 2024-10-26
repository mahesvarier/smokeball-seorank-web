import { ErrorResponse } from "../models/ErrorResponse";
import { getConfig } from "../common/common";
import handleErrorResponse from "./errorHandler";
import fetchSeoRankings from "./seoRankingsApi";

export const searchKeywords = async (keywords: string, url: string): Promise<string | undefined> => {
    const { maxRetries, initialDelay, multiplier } = getConfig();

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const fetchWithRetry = async (attempt: number): Promise<string | undefined> => {
        try {
            const response = await fetchSeoRankings(keywords, url);
            if (response.ok) {
                const data: string = await response.text();
                return data as string;
            } else {
                console.log("🚀 ~ searchKeywords ~ response:", response);
                const errorData: ErrorResponse = await response.json();
                if (response.status === 429 && attempt < maxRetries) {
                    const retryDelay = initialDelay * Math.pow(multiplier, attempt);
                    console.log(`Retrying in ${retryDelay}ms...`);
                    await delay(retryDelay);
                    return fetchWithRetry(attempt + 1);
                } else {
                    await handleErrorResponse(errorData, attempt, maxRetries, initialDelay, multiplier);
                }
            }
        } catch (error) {
            console.error('Failed to fetch:', error);
            return 'Failed to fetch results. Please retry after sometime.';
        }
    };

    return fetchWithRetry(0);
};