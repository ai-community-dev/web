'use client';

import { useEffect, useState } from 'react';
import { Event, EventsResponse } from '@/types';
import { Box, Container, Typography, Card, CardContent, Chip, Grid, Tab, Tabs, Stack, Skeleton } from '@mui/material';
import { CalendarMonth, LocationOn, People, Schedule, Event as EventIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface EventsListProps {
    initialData?: EventsResponse;
}

export default function EventsList({ initialData }: EventsListProps) {
    const [events, setEvents] = useState<EventsResponse | null>(initialData || null);
    const [loading, setLoading] = useState(!initialData);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'future' | 'past'>('future');

    useEffect(() => {
        if (!initialData) {
            fetchEvents();
        }
    }, [initialData]);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch('/api/events');
            const result = await response.json();

            if (result.success) {
                setEvents(result.data);
            } else {
                const errorMsg = result.error || 'Failed to fetch events';
                setError(errorMsg);
            }
        } catch (err) {
            const errorMsg = 'Failed to load events';
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };
    const displayEvents = activeTab === 'future' ? events?.future || [] : events?.past || [];

    return (
        <Box component="section" id="events" sx={{ py: 10, bgcolor: 'background.default' }}>
            <Container maxWidth="lg">
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1, gap: 2, flexWrap: 'wrap' }}>
                    <Typography
                        component="h2"
                        variant="h2"
                        align="center"
                        color="text.primary"
                    >
                        Community Events
                    </Typography>
                </Box>
                <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
                    Join us for exciting AI/ML events across India
                </Typography>

                {/* Tabs */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4, display: 'flex', justifyContent: 'center' }}>
                    <Tabs
                        value={activeTab}
                        onChange={(_, newValue) => setActiveTab(newValue)}
                        sx={{
                            '& .MuiTab-root': {
                                fontSize: '1rem',
                                fontWeight: 600,
                                textTransform: 'none',
                                minWidth: 140,
                                transition: 'all 0.3s ease'
                            },
                            '& .Mui-selected': {
                                color: 'primary.main'
                            },
                            '& .MuiTabs-indicator': {
                                backgroundColor: 'primary.main',
                                height: 3
                            }
                        }}
                    >
                        <Tab
                            label={`Upcoming ${events?.future?.length ? `(${events.future.length})` : ''}`}
                            value="future"
                            icon={<Schedule />}
                            iconPosition="start"
                        />
                        <Tab
                            label={`Past ${events?.past?.length ? `(${events.past.length})` : ''}`}
                            value="past"
                            icon={<CalendarMonth />}
                            iconPosition="start"
                        />
                    </Tabs>
                </Box>

                {/* Loading State */}
                {loading && (
                    <Grid container spacing={3}>
                        {[1, 2, 3].map((i) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                                <Skeleton variant="rectangular" height={350} sx={{ borderRadius: 1 }} />
                            </Grid>
                        ))}
                    </Grid>
                )}

                {/* Error State */}
                {error && !loading && (
                    <Box sx={{
                        textAlign: 'center',
                        py: 8,
                        bgcolor: 'error.50',
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'error.light'
                    }}>
                        <Typography variant="h6" color="error.main" gutterBottom>
                            {error}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Try refreshing the page or check back later
                        </Typography>
                    </Box>
                )}

                {/* Events Grid */}
                {!loading && !error && (
                    <>
                        {displayEvents.length === 0 ? (
                            <Box sx={{
                                textAlign: 'center',
                                py: 8,
                                bgcolor: 'grey.50',
                                borderRadius: 2,
                                border: '1px dashed',
                                borderColor: 'grey.300'
                            }}>
                                <Typography variant="h6" color="text.secondary" gutterBottom>
                                    No {activeTab === 'future' ? 'upcoming' : 'past'} events found
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    Check the {activeTab === 'future' ? 'past' : 'upcoming'} events tab or visit our community pages
                                </Typography>
                            </Box>
                        ) : (
                            <Grid container spacing={3}>
                                {displayEvents.map((event, index) => (
                                    <EventCard key={`${activeTab}-${event.id}-${event.slug || index}`} event={event} index={index} />
                                ))}
                            </Grid>
                        )}
                    </>
                )}
            </Container>
        </Box>
    );
}

interface EventCardProps {
    event: Event;
    index: number;
}

function EventCard({ event, index }: EventCardProps) {
    const [imgSrc, setImgSrc] = useState(
        event.header_image?.url || event.header_image?.i640 || event.header_image?.i320 || '/ai-community-logo.svg'
    );

    const formatDate = (dateString: string) => {
        if (!dateString) return null;
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return null;
            return date.toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
        } catch {
            return null;
        }
    };

    const formattedDate = formatDate(event.start_time);

    return (
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                style={{ height: '100%', willChange: 'transform' }}
            >
                <Card
                    component="a"
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                        border: '1px solid transparent',
                        textDecoration: 'none', // Remove default link underline
                        '&:hover': {
                            boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                            borderColor: index % 3 === 0 ? 'secondary.main' : (index % 3 === 1 ? 'success.main' : 'info.main'),
                        },
                    }}
                >
                    <Box sx={{
                        position: 'relative',
                        height: 180,
                        background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
                        overflow: 'hidden'
                    }}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            style={{ width: '100%', height: '100%', position: 'relative' }}
                        >
                            <Image
                                src={imgSrc}
                                alt={event.name || 'Event image'}
                                fill
                                style={{ objectFit: 'contain' }}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                onError={() => setImgSrc('/ai-community-logo.svg')}
                                priority={index < 3}
                            />
                        </motion.div>
                    </Box>
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <Typography gutterBottom variant="h5" component="h3" sx={{ fontWeight: 600 }}>
                            {event.name}
                        </Typography>

                        {formattedDate && (
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'text.secondary' }}>
                                <CalendarMonth sx={{ fontSize: 18, mr: 0.5 }} />
                                <Typography variant="body2">
                                    {formattedDate}
                                </Typography>
                            </Box>
                        )}

                        {event.location && (
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'text.secondary' }}>
                                <LocationOn sx={{ fontSize: 18, mr: 0.5 }} />
                                <Typography variant="body2">
                                    {event.location.name}
                                </Typography>
                            </Box>
                        )}

                        {event.description && (
                            <Typography
                                component="div"
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    mb: 2,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                    // Fix for HTML content breaking layout
                                    '& *': {
                                        margin: 0,
                                        padding: 0,
                                        display: 'inline',
                                    },
                                    '& br': {
                                        display: 'none',
                                    },
                                    // Ensure links inside description don't break styling but inherit color
                                    '& a': {
                                        color: 'inherit',
                                        textDecoration: 'none',
                                        pointerEvents: 'none', // Prevent clicking links in the card preview
                                    }
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: event.description.replace(/<a\b[^>]*>(.*?)<\/a>/gi, '$1')
                                }}
                            />
                        )}

                        <Stack direction="row" spacing={1} sx={{ mt: 'auto', flexWrap: 'wrap', gap: 1 }}>
                            {event.attendees_count !== undefined && event.attendees_count > 0 && (
                                <Chip
                                    icon={<People />}
                                    label={`${event.attendees_count} attendees`}
                                    size="small"
                                    sx={{
                                        bgcolor: 'primary.50',
                                        color: 'primary.main',
                                        fontWeight: 500,
                                        fontSize: '0.75rem'
                                    }}
                                />
                            )}
                            {event.event_type && (
                                <Chip
                                    icon={<EventIcon />}
                                    label={event.event_type}
                                    size="small"
                                    sx={{
                                        bgcolor: 'success.50',
                                        color: 'success.main',
                                        fontWeight: 500,
                                        fontSize: '0.75rem'
                                    }}
                                />
                            )}
                        </Stack>
                    </CardContent>
                </Card>
            </motion.div>
        </Grid>
    );
}
