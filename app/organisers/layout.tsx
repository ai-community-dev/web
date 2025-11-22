import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Community Organizers | AI Community',
    description: 'Meet the passionate leaders and organizers driving AI/ML innovation across communities. Connect with community leaders, speakers, and tech enthusiasts.',
    keywords: ['AI organizers', 'community leaders', 'TFUG organizers', 'AI community', 'tech leaders', 'ML experts'],
    openGraph: {
        title: 'Community Organizers | AI Community',
        description: 'Meet the passionate leaders and organizers driving AI/ML innovation across communities.',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Community Organizers | AI Community',
        description: 'Meet the passionate leaders and organizers driving AI/ML innovation across communities.',
    }
};

export default function OrganizersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
