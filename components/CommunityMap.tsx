'use client';

import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import { Community } from '@/types';

const CITY_COORDINATES: Record<string, { lat: number; lng: number }> = {
    'Delhi': { lat: 28.6139, lng: 77.2090 },
    'Nagpur': { lat: 21.1458, lng: 79.0882 },
    'Ghaziabad': { lat: 28.6692, lng: 77.4538 },
    'Pune': { lat: 18.5204, lng: 73.8567 },
    'Hajipur': { lat: 25.6858, lng: 85.2146 },
    'Nashik': { lat: 19.9975, lng: 73.7898 },
    'Surat': { lat: 21.1702, lng: 72.8311 },
    'Durg': { lat: 21.1904, lng: 81.2849 },
    'Jalandhar': { lat: 31.3260, lng: 75.5762 },
    'Kozhikode': { lat: 11.2588, lng: 75.7804 },
    'Jaipur': { lat: 26.9124, lng: 75.7873 },
    'Hyderabad': { lat: 17.3850, lng: 78.4867 },
    'Tumkur': { lat: 13.3392, lng: 77.1017 },
    'Mumbai': { lat: 19.0760, lng: 72.8777 },
    'Chandigarh': { lat: 30.7333, lng: 76.7794 },
    'Lucknow': { lat: 26.8467, lng: 80.9462 },
    'Chennai': { lat: 13.0827, lng: 80.2707 },
    'Bhopal': { lat: 23.2599, lng: 77.4126 },
    'Indore': { lat: 22.7196, lng: 75.8577 },
};

// Helper to extract city from location string
const getCoordinates = (location: string | null) => {
    if (!location) return null;
    // Simple check for city names in the location string
    for (const [city, coords] of Object.entries(CITY_COORDINATES)) {
        if (location.includes(city)) {
            return coords;
        }
    }
    return null;
};

interface CommunityMapProps {
    communities?: Community[];
}

export default function CommunityMap({ communities: initialCommunities }: CommunityMapProps) {
    const [hoveredCommunity, setHoveredCommunity] = useState<number | null>(null);
    const [mapError, setMapError] = useState<string | null>(null);
    const [communities, setCommunities] = useState<Community[]>(initialCommunities || []);
    const [loading, setLoading] = useState(!initialCommunities);

    useEffect(() => {
        if (initialCommunities) {
            setCommunities(initialCommunities);
            setLoading(false);
            return;
        }

        // Fetch communities from API
        fetch('/api/communities/proxy')
            .then(res => res.json())
            .then(data => {
                setCommunities(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching communities:', err);
                setLoading(false);
            });

        // Global handler for Google Maps auth failures
        (window as any).gm_authFailure = () => {
            setMapError("Google Maps API error: API not activated or invalid key. Please check your Google Cloud Console.");
            console.error("Google Maps Authentication Failure");
        };

        return () => {
            (window as any).gm_authFailure = undefined;
        };
    }, []);

    const defaultCenter = { lat: 21.7679, lng: 78.8718 }; // Center of India
    const defaultZoom = 4.8;

    if (loading) {
        return (
            <Box sx={{ width: '100%', height: { xs: '400px', sm: '500px', md: '600px' }, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography>Loading map...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%', position: 'relative' }}>
            {mapError && (
                <Alert severity="error" sx={{ mb: 2, mx: 2 }}>
                    {mapError}
                </Alert>
            )}

            <Box
                sx={{
                    width: '100%',
                    height: { xs: '400px', sm: '500px', md: '600px' },
                    position: 'relative',
                    borderRadius: 0,
                    overflow: 'hidden',
                    boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
                }}
            >
                <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
                    <Map
                        defaultCenter={defaultCenter}
                        defaultZoom={defaultZoom}
                        mapId="DEMO_MAP_ID"
                        disableDefaultUI={true}
                        zoomControl={true}
                        streetViewControl={false}
                        mapTypeControl={false}
                        fullscreenControl={false}
                    >
                        {communities.map((community) => {
                            const coords = getCoordinates(community.location);
                            if (!coords) return null;

                            return (
                                <AdvancedMarker
                                    key={community.id}
                                    position={coords}
                                    onClick={() => window.open(community.url, '_blank')}
                                    onMouseEnter={() => setHoveredCommunity(community.id)}
                                    onMouseLeave={() => setHoveredCommunity(null)}
                                >
                                    <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
                                    <Paper
                                        elevation={3}
                                        sx={{
                                            position: 'absolute',
                                            bottom: 40,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            p: 1,
                                            minWidth: 150,
                                            textAlign: 'center',
                                            zIndex: 10,
                                            pointerEvents: 'none',
                                            display: hoveredCommunity === community.id ? 'block' : 'none',
                                        }}
                                    >
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            {community.name}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {community.location}
                                        </Typography>
                                    </Paper>
                                </AdvancedMarker>
                            );
                        })}
                    </Map>
                </APIProvider>
            </Box>
        </Box>
    );
}
