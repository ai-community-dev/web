import Box from '@mui/material/Box';
import Hero from '@/components/Hero';
import EventsList from '@/components/EventsList';
import dynamic from 'next/dynamic';
import { getCommunities } from '@/lib/communities';
import { getEvents } from '@/lib/events';

import ClientMap from '@/components/ClientMap';

const CommunityList = dynamic(() => import('@/components/CommunityList'));
const Footer = dynamic(() => import('@/components/Footer'));

export default async function Home() {
  const [communities, events] = await Promise.all([
    getCommunities(),
    getEvents()
  ]);

  return (
    <Box component="main">
      <Hero />
      <EventsList initialData={events} />
      {/* Map Section - Full Width */}
      <Box sx={{ width: '100%', minHeight: { xs: '400px', sm: '500px', md: '600px' } }}>
        <ClientMap communities={communities} />
      </Box>
      <CommunityList initialData={communities} />
      <Footer />
    </Box>
  );
}

