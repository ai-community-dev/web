import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

interface OrganizerPhoto {
    url: string;
    i160: string;
    i320: string;
}

interface OrganizerTag {
    id: number;
    name: string;
}

interface OrganizerData {
    id: number;
    username: string;
    name: string;
    designation: string;
    followers_count: number;
    communities_count: number;
    speaker_events_count: number;
    photo: OrganizerPhoto;
    location: string;
    is_community_leader: boolean;
    tags: OrganizerTag[];
}

interface OrganizerResponse {
    cursor: string;
    data: OrganizerData;
}

interface ApiResponse {
    data: {
        total: number;
        page: OrganizerResponse[];
    };
    message: string;
    status: number;
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = searchParams.get('limit') || '60';

        const response = await fetch(
            `https://json.commudle.com/api/v2/community_groups/public/organizers_all_communities?community_group_id=tfug&limit=${limit}`,
            {
                next: { revalidate: 3600 } // Cache for 1 hour
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch organizers');
        }

        const data: ApiResponse = await response.json();

        // Transform the data to a cleaner format
        const organizers = data.data.page.map((item) => ({
            id: item.data.id,
            username: item.data.username,
            name: item.data.name,
            designation: item.data.designation,
            followersCount: item.data.followers_count,
            communitiesCount: item.data.communities_count,
            speakerEventsCount: item.data.speaker_events_count,
            photo: item.data.photo.i160 || item.data.photo.url,
            location: item.data.location,
            isCommunityLeader: item.data.is_community_leader,
            tags: item.data.tags.map(tag => tag.name),
            profileUrl: `https://www.commudle.com/users/${item.data.username}`
        }));

        return NextResponse.json({
            organizers,
            total: data.data.total,
            count: organizers.length
        });

    } catch (error) {
        console.error('Error fetching organizers:', error);
        return NextResponse.json(
            { error: 'Failed to fetch organizers' },
            { status: 500 }
        );
    }
}
