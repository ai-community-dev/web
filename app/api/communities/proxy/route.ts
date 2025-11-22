import { NextResponse } from 'next/server';
import { getCommunities } from '@/lib/communities';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const communities = await getCommunities();
        return NextResponse.json(communities, {
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
                'CDN-Cache-Control': 'public, s-maxage=3600',
                'Vercel-CDN-Cache-Control': 'public, s-maxage=3600',
                'X-Data-Source': 'commudle-api'
            }
        });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json([], { status: 500 });
    }
}
