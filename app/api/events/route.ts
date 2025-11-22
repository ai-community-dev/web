import { NextRequest, NextResponse } from 'next/server';
import { getEvents } from '@/lib/events';

export const dynamic = 'force-dynamic'; // Prevent static generation during build

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const cursor = searchParams.get('cursor') || undefined;

        const data = await getEvents(cursor);

        return NextResponse.json(
            {
                success: true,
                data,
                source: 'api',
            },
            {
                headers: {
                    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
                    'CDN-Cache-Control': 'public, s-maxage=3600',
                    'Vercel-CDN-Cache-Control': 'public, s-maxage=3600',
                },
            }
        );
    } catch (error) {
        console.error('❌ Events API error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}

// Enable CORS for client-side fetching
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
