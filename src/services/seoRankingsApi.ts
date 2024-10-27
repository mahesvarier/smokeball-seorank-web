const fetchSeoRankings = async (keywords: string, url: string) => {
    const baseUrl = process.env.API_BASE_URL || 'https://localhost:5001';
    const response = await fetch(`${baseUrl}/seo-rankings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keywords, url }),
    });

    return response;
};

export default fetchSeoRankings;