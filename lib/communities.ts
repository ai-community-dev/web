import { Community, Organizer } from '@/types';

const COMMUNITIES_API_URL = 'https://json.commudle.com/api/v2/community_groups/public/communities?community_group_id=tfug&limit=6';

const ML_BHOPAL_API_URL = 'https://json.commudle.com/api/v2/communities?community_id=ml-bhopal';

async function fetchCommunityOrganizers(communityId: number): Promise<Organizer[]> {
    try {
        const response = await fetch(`https://json.commudle.com/api/v2/user_roles_users/public_get_community_leaders_by_role?community_id=${communityId}&user_role_name=organizer`, {
            headers: {
                'User-Agent': 'Next.js Server',
                Accept: 'application/json',
            },
            next: { revalidate: 3600 }
        });

        if (!response.ok) return [];

        const data = await response.json();
        return (data.data?.users || []).map((user: any) => ({
            id: user.id,
            name: user.name,
            image_url: user.photo?.url || user.avatar || '/globe.svg',
            url: user.username ? `https://www.commudle.com/users/${user.username}` : undefined
        }));
    } catch (error) {
        console.error(`Error fetching organizers for community ${communityId}:`, error);
        return [];
    }
}

async function fetchSingleCommunity(url: string): Promise<Community | null> {
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Next.js Server',
                Accept: 'application/json',
            },
            next: { revalidate: 3600 }
        });

        if (!response.ok) return null;

        const data = await response.json();
        const comm = data.data;

        if (!comm) return null;

        const organizers = await fetchCommunityOrganizers(comm.id);

        return {
            id: comm.id,
            name: comm.name,
            slug: comm.slug,
            description: comm.mini_description,
            location: comm.location,
            members_count: comm.members_count,
            url: `https://www.commudle.com/communities/${comm.slug}`,
            logo_url: comm.logo_image_path?.url || comm.logo_path || '/globe.svg',
            completed_events_count: comm.completed_events_count || 0,
            has_upcoming_events: comm.upcoming_events_count > 0,
            tags: comm.tags,
            banner_image: comm.banner_image,
            organizers,
        };
    } catch (error) {
        console.error('Error fetching single community:', error);
        return null;
    }
}

export async function getCommunities(): Promise<Community[]> {
    try {
        let allCommunities: Community[] = [];
        let nextCursor: string | null = null;
        let hasNextPage = true;

        // Fetch TFUG communities
        while (hasNextPage) {
            const url: string = nextCursor
                ? `${COMMUNITIES_API_URL}&after=${nextCursor}`
                : COMMUNITIES_API_URL;

            const response: Response = await fetch(url, {
                headers: {
                    'User-Agent': 'Next.js Server',
                    Accept: 'application/json',
                },
                next: { revalidate: 3600 }
            });

            if (!response.ok) {
                console.error(`Commudle API error: ${response.status}`);
                break;
            }

            const data: any = await response.json();
            const pageData = data.data?.page || [];
            const pageInfo = data.data?.page_info;

            const mappedCommunities: Community[] = await Promise.all(pageData.map(async (item: any) => {
                const comm = item.data;
                const organizers = await fetchCommunityOrganizers(comm.id);
                return {
                    id: comm.id,
                    name: comm.name,
                    slug: comm.slug,
                    description: comm.mini_description,
                    location: comm.location,
                    members_count: comm.members_count,
                    url: `https://www.commudle.com/communities/${comm.slug}`,
                    logo_url: comm.logo_image_path?.url || comm.logo_path || '/globe.svg',
                    completed_events_count: comm.completed_events_count,
                    has_upcoming_events: comm.has_upcoming_events,
                    tags: comm.tags,
                    banner_image: comm.banner_image,
                    organizers,
                };
            }));

            allCommunities = [...allCommunities, ...mappedCommunities];

            if (pageInfo?.has_next_page) {
                nextCursor = pageInfo.end_cursor;
            } else {
                hasNextPage = false;
            }
        }

        // Fetch ML Bhopal
        const mlBhopal = await fetchSingleCommunity(ML_BHOPAL_API_URL);
        if (mlBhopal) {
            // Check if already exists to avoid duplicates
            if (!allCommunities.some(c => c.id === mlBhopal.id)) {
                allCommunities.push(mlBhopal);
            }
        }

        // Sort by members count descending
        return allCommunities.sort((a, b) => b.members_count - a.members_count);

    } catch (error) {
        console.error('Error fetching communities:', error);
        return [];
    }
}
