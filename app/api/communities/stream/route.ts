import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const POLL_INTERVAL = 10000; // 10s
    let interval: NodeJS.Timeout;

    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder();
            let lastData: string | null = null;

            const sendEvent = (name: string, payload: any) => {
                const data = typeof payload === 'string' ? payload : JSON.stringify(payload);
                controller.enqueue(encoder.encode(`event: ${name}\n`));
                data.split('\n').forEach(line => controller.enqueue(encoder.encode(`data: ${line}\n`)));
                controller.enqueue(encoder.encode('\n'));
            };

            const pollOnce = async () => {
                try {
                    // Construct absolute URL for the proxy
                    const url = new URL(request.url);
                    const origin = url.origin;
                    const proxyUrl = `${origin}/api/communities/proxy`;

                    const upstreamRes = await fetch(proxyUrl);
                    if (!upstreamRes.ok) throw new Error(`upstream ${upstreamRes.status}`);
                    const json = await upstreamRes.json();
                    const stringified = JSON.stringify(json);

                    if (stringified !== lastData) {
                        lastData = stringified;
                        sendEvent('communities', json);
                    }
                } catch (err) {
                    console.error('Polling error', err);
                    // Optional: send error event to client
                    // sendEvent('error', { message: 'poll failed', details: String(err) });
                }
            };

            // Initial poll
            await pollOnce();

            // Set up polling
            interval = setInterval(pollOnce, POLL_INTERVAL);

            // Keep-alive to prevent timeouts
            const keepAlive = setInterval(() => {
                try {
                    controller.enqueue(encoder.encode(': keep-alive\n\n'));
                } catch (e) {
                    clearInterval(keepAlive);
                }
            }, 15000);

            // Cleanup on close is handled by cancel()
        },
        cancel() {
            if (interval) clearInterval(interval);
        }
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache, no-transform',
            'Connection': 'keep-alive',
        },
    });
}
