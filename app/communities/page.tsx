import Box from '@mui/material/Box';
import CommunityList from '@/components/CommunityList';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Communities | AI Community',
    description: 'Connect with local AI/ML communities, developers, and researchers across India. Join a community near you to learn, share, and grow.',
};

export default function CommunitiesPage() {
    return (
        <Box component="main">
            <Box sx={{ pt: { xs: 8, sm: 10 } }}>
                <CommunityList />
            </Box>
            <Footer />
        </Box>
    );
}
