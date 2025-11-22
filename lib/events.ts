import { Event, EventsResponse } from '@/types';

const PAST_URL = 'https://json.commudle.com/api/v2/community_groups/public/events?community_group_id=tfug&limit=6&when=past';
const FUTURE_URL = 'https://json.commudle.com/api/v2/community_groups/public/events?community_group_id=tfug&limit=6&when=future';

async function fetchEventsFromUrl(url: string): Promise<{ data: Event[], page_info: any }> {
    const headers: HeadersInit = {
        'User-Agent': 'Next.js Server',
        Accept: 'application/json',
        Referer: 'https://www.commudle.com/',
    };

    try {
        const response = await fetch(url, {
            headers,
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (!response.ok) {
            console.error(`Commudle API error: ${response.status} ${response.statusText}`);
            return { data: [], page_info: {} };
        }

        const data: any = await response.json();
        const rawEvents = data?.data?.page || [];
        const pageInfo = data?.data?.page_info || {};

        const events = rawEvents.map((item: any) => {
            const event = item.data;
            return {
                id: event.id,
                name: event.name,
                description: event.description,
                start_time: event.start_time,
                end_time: event.end_time,
                timezone: event.timezone,
                event_type: event.event_type,
                event_status: event.event_status?.name || 'upcoming',
                location: event.event_locations?.[0] ? {
                    name: event.event_locations[0].name,
                    address: event.event_locations[0].address
                } : null,
                header_image: event.header_image,
                community: {
                    id: event.kommunity?.id,
                    name: event.kommunity?.name,
                    slug: event.kommunity_slug,
                    logo_url: event.kommunity?.logo_image_path?.url
                },
                tags: event.tags,
                slug: event.slug,
                url: `https://www.commudle.com/communities/${event.kommunity_slug}/events/${event.slug}`,
                attendees_count: event.interested_members_count
            };
        });

        return { data: events, page_info: pageInfo };
    } catch (error) {
        console.error('Error fetching events:', error);
        return { data: [], page_info: {} };
    }
}

export async function getEvents(pastCursor?: string): Promise<EventsResponse> {
    const pastUrl = pastCursor ? `${PAST_URL}&after=${pastCursor}` : PAST_URL;

    const promises: Promise<any>[] = [fetchEventsFromUrl(pastUrl)];
    if (!pastCursor) {
        promises.push(fetchEventsFromUrl(FUTURE_URL));
    }

    const results = await Promise.all(promises);
    const pastResult = results[0];
    const futureResult = pastCursor ? { data: [] } : results[1];

    return {
        past: {
            data: pastResult.data,
            page_info: pastResult.page_info
        },
        future: futureResult.data,
        lastUpdated: new Date().toISOString()
    };
}
