import Box from '@mui/material/Box';
import Hero from '@/components/Hero';
import EventsList from '@/components/EventsList';
import CommunityList from '@/components/CommunityList';
import Footer from '@/components/Footer';
import MapLoader from '@/components/MapLoader';

import { getEvents } from '@/lib/events';

export default function Home() {
  // Server-side data fetching temporarily disabled for deployment
  // const eventsData = await getEvents();

  return (
    <Box component="main">
      <Hero />
      <EventsList initialData={undefined} />
      {/* Map Section - Full Width */}
      <Box sx={{ width: '100%', minHeight: { xs: '400px', sm: '500px', md: '600px' } }}>
        <MapLoader />
      </Box>
      <CommunityList />
      <Footer />
    </Box>
  );
}

