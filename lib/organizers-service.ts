// Service to fetch organizers for all communities from Commudle API
import { Organizer } from '@/types';

const ORGANIZERS_URL = 'https://json.commudle.com/api/v2/community_groups/public/organizers_all_communities?community_group_id=tfug&limit=8';

/**
 * Fetches organizers from Commudle API.
 * Returns an array of Organizer objects (or empty array on failure).
 */
export async function fetchOrganizers(): Promise<Organizer[]> {
    try {
        const response = await fetch(ORGANIZERS_URL, {
            headers: {
                'User-Agent': 'Next.js Server',
                Accept: 'application/json',
                Referer: 'https://www.commudle.com/',
            },
            next: { revalidate: 0 },
        });

        if (!response.ok) {
            throw new Error(`Commudle Organizers API responded with ${response.status}`);
        }

        const data: any = await response.json();
        // The API returns an array under data.page or directly data
        const organizersList = data?.data?.page || data?.data || [];
        if (!Array.isArray(organizersList)) {
            console.warn('Invalid organizers response format');
            return [];
        }

        // Map to our Organizer type (keep raw object for now)
        const organizers: Organizer[] = organizersList.map((org: any) => ({
            id: org.id,
            name: org.name || org.full_name || 'Organizer',
            image_url: org.image_url || org.logo_image_path?.url || '/globe.svg',
            url: org.url || '#',
        }));
        console.log(`📡 Fetched ${organizers.length} organizers from Commudle API`);
        return organizers;
    } catch (error) {
        console.error('Error fetching organizers:', error);
        return [];
    }
}
