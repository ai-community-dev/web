import { NextResponse } from 'next/server';
import { getEvents } from '@/lib/events';

export async function GET() {
    try {
        const events = await getEvents();
        return NextResponse.json({
            success: true,
            data: events,
            source: 'api',
        });
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
