const fetchSeoRankings = async (keywords: string, url: string) => {
    console.log("Environment Variables:", process.env)
    console.log("Process Variables:", process)
    const baseUrl = process.env.API_BASE_URL || 'https://localhost:5001';
    console.log("🚀 ~ fetchSeoRankings ~ baseUrl:", baseUrl)
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