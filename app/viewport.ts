import type { Viewport } from 'next';

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#4285F4' },
        { media: '(prefers-color-scheme: dark)', color: '#1a73e8' }
    ],
};
