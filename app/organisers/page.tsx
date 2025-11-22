'use client';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { motion } from 'framer-motion';
import OrganizerCard from '@/components/OrganizerCard';
import GradientText from '@/components/GradientText';

interface Organizer {
    id: number;
    username: string;
    name: string;
    designation: string;
    followersCount: number;
    communitiesCount: number;
    speakerEventsCount: number;
    photo: string;
    location: string;
    isCommunityLeader: boolean;
    tags: string[];
    profileUrl: string;
}

export default function OrganizersPage() {
    const [organizers, setOrganizers] = useState<Organizer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        async function fetchOrganizers() {
            try {
                setLoading(true);
                const response = await fetch('/api/organizers');

                if (!response.ok) {
                    throw new Error('Failed to fetch organizers');
                }

                const data = await response.json();
                setOrganizers(data.organizers);
                setTotal(data.total);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        }

        fetchOrganizers();
    }, []);

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            {/* Hero Section */}
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: { xs: 6, sm: 8, md: 10 },
                    pb: { xs: 4, sm: 5, md: 6 },
                    borderBottom: '1px solid',
                    borderColor: 'divider'
                }}
            >
                <Container maxWidth="lg">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <GradientText
                            component="h1"
                            variant="h2"
                            align="center"
                            gutterBottom
                            sx={{
                                fontWeight: 800,
                                fontSize: { xs: '2rem', sm: '2.75rem', md: '3.5rem' },
                                mb: 2
                            }}
                        >
                            Community Organizers
                        </GradientText>
                        <Typography
                            variant="h6"
                            align="center"
                            color="text.secondary"
                            paragraph
                            sx={{
                                fontSize: { xs: '1rem', sm: '1.15rem', md: '1.25rem' },
                                maxWidth: '800px',
                                mx: 'auto',
                                mb: 3
                            }}
                        >
                            Meet the passionate leaders driving AI/ML innovation across communities
                        </Typography>
                        {total > 0 && (
                            <Typography
                                variant="body1"
                                align="center"
                                color="primary.main"
                                sx={{ fontWeight: 600 }}
                            >
                                {total} Organizers
                            </Typography>
                        )}
                    </motion.div>
                </Container>
            </Box>

            {/* Content Section */}
            <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
                {loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                        <CircularProgress size={48} />
                    </Box>
                )}

                {error && (
                    <Alert severity="error" sx={{ mb: 4 }}>
                        {error}
                    </Alert>
                )}

                {!loading && !error && organizers.length === 0 && (
                    <Alert severity="info">
                        No organizers found.
                    </Alert>
                )}

                {!loading && !error && organizers.length > 0 && (
                    <Box>
                        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
                            {organizers.map((organizer, index) => (
                                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={organizer.id}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                        style={{ height: '100%' }}
                                    >
                                        <OrganizerCard {...organizer} />
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
            </Container>
        </Box>
    );
}
