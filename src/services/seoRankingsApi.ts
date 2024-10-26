const fetchSeoRankings = async (keywords: string, url: string) => {
    const response = await fetch('https://localhost:5001/seo-rankings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keywords, url }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};

export default fetchSeoRankings;