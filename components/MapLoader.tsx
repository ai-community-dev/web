'use client';

import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';

const CommunityMap = dynamic(() => import('./CommunityMap'), {
    ssr: false,
    loading: () => (
        <Box sx={{
            width: '100%',
            height: { xs: '400px', sm: '500px', md: '600px' },
            bgcolor: 'grey.100',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            Loading Map...
        </Box>
    )
});

export default function MapLoader() {
    return <CommunityMap />;
}
