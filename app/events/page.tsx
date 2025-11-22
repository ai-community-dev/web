import Box from '@mui/material/Box';
import EventsList from '@/components/EventsList';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Events | AI Community',
    description: 'Join our upcoming AI/ML events, workshops, and hackathons. Explore past events and stay updated with the latest in the AI community.',
};

export default function EventsPage() {
    return (
        <Box component="main">
            <Box sx={{ pt: { xs: 8, sm: 10 } }}>
                <EventsList initialData={undefined} />
            </Box>
            <Footer />
        </Box>
    );
}
