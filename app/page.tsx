import Box from '@mui/material/Box';
import Hero from '@/components/Hero';
import EventsList from '@/components/EventsList';
import CommunityList from '@/components/CommunityList';
import Footer from '@/components/Footer';
import MapLoader from '@/components/MapLoader';

import { getEvents } from '@/lib/events';
import { getCommunities } from '@/lib/communities';

export default async function Home() {
  // Server-side data fetching
  const [eventsData, communitiesData] = await Promise.all([
    getEvents(),
    getCommunities()
  ]);

  return (
    <Box component="main">
      <Hero />
      <EventsList initialData={eventsData} />
      {/* Map Section - Full Width */}
      <Box sx={{ width: '100%', minHeight: { xs: '400px', sm: '500px', md: '600px' } }}>
        <MapLoader />
      </Box>
      <CommunityList initialData={communitiesData} />
      <Footer />
    </Box>
  );
}

