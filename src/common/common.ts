import config from '../config.json';

const fetchConfig = () => {
    const { maxRetries, initialDelay, multiplier } = config;
    return { maxRetries, initialDelay, multiplier };
};

export const getConfig = fetchConfig;