export const searchKeywords = async (keywords: string, url: string): Promise<string> => {
    try {
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

        const data = await response.json();
        console.log("🚀 ~ searchKeywords ~ data:", data)
        return data;
    } catch (error) {
        console.error('Failed to fetch:', error);
        return 'Failed to fetch results';
    }
};