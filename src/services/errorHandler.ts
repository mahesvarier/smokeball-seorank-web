import { INTERNAL_SERVER_ERROR, TOO_MANY_REQUESTS } from "../constants/constants";
import { ErrorResponse } from "../models/ErrorResponse";

const handleErrorResponse = (data: ErrorResponse, attempt: number, maxRetries: number, initialDelay: number, multiplier: number) => {
    if (data.errorCode === TOO_MANY_REQUESTS) {
        if (attempt < maxRetries) {
            const delay = initialDelay * Math.pow(multiplier, attempt);
            console.log(`Too many requests, retrying in ${delay}ms...`);
            return new Promise(resolve => setTimeout(resolve, delay));
        } else {
            throw new Error('Max retries reached. Please try again after some time.');
        }
    }
    else if (data.errorCode === INTERNAL_SERVER_ERROR) {
        throw new Error('Internal server error occurred');
    }
    else{
        throw new Error('Unknown error occurred');
    }
};

export default handleErrorResponse;