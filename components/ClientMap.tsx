'use client';

import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import { Community } from '@/types';

const CommunityMap = dynamic(() => import('./CommunityMap'), {
    ssr: false,
    loading: () => (
        <Box sx={{ width: '100%', height: { xs: '400px', sm: '500px', md: '600px' }, bgcolor: 'grey.100' }} />
    ),
});

export default function ClientMap({ communities }: { communities: Community[] }) {
    return <CommunityMap communities={communities} />;
}
