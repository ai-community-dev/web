const PAST_URL = 'https://json.commudle.com/api/v2/community_groups/public/events?community_group_id=tfug&limit=6&when=past';
const FUTURE_URL = 'https://json.commudle.com/api/v2/community_groups/public/events?community_group_id=tfug&limit=6&when=future';

export async function fetchEventsFromCommudle(url: string) {
    const bearer = process.env.COMMUDLE_BEARER || '';
    const headers: HeadersInit = {
        'User-Agent': 'Next.js Server',
        Accept: 'application/json',
        Referer: 'https://www.commudle.com/',
    };

    // Only add Authorization header if bearer token exists
    if (bearer) {
        headers['Authorization'] = `Bearer ${bearer}`;
    }

    const response = await fetch(url, {
        headers,
        next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
        console.error(`Commudle API error: ${response.status} ${response.statusText}`);
        throw new Error(`Commudle API ${response.status}`);
    }

    const data: any = await response.json();
    const page = data?.data?.page || [];
    return page.map((item: any) => item.data);
}

export async function getEvents() {
    try {
        const [past, future] = await Promise.all([
            fetchEventsFromCommudle(PAST_URL),
            fetchEventsFromCommudle(FUTURE_URL)
        ]);

        return {
            past,
            future,
            lastUpdated: new Date().toISOString()
        };
    } catch (error) {
        console.error('❌ Error fetching events:', error);
        return {
            past: [],
            future: [],
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
}
