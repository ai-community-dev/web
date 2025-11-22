'use client';

import { useEffect, useState } from 'react';
import { Event, EventsResponse } from '@/types';
import { Box, Container, Typography, Card, CardContent, Chip, Grid, Tab, Tabs, Stack, Skeleton } from '@mui/material';
import { CalendarMonth, LocationOn, People, Schedule, Event as EventIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import GradientText from './GradientText';

interface EventsListProps {
    initialData?: EventsResponse;
}

export default function EventsList({ initialData }: EventsListProps) {
    const [events, setEvents] = useState<EventsResponse | null>(initialData || null);
    const [loading, setLoading] = useState(!initialData);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'future' | 'past'>('future');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
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

            console.log('Events API response:', result);

            if (result.success) {
                setEvents(result.data);
                console.log('✅ Events loaded:', result.data);
            } else {
                const errorMsg = result.error || 'Failed to fetch events';
                setError(errorMsg);
                console.error('❌ Events API error:', errorMsg);
            }
        } catch (err) {
            const errorMsg = 'Failed to load events';
            setError(errorMsg);
            console.error('❌ Error fetching events:', err);
        } finally {
            setLoading(false);
        }
    };

    const loadMorePastEvents = async () => {
        if (!events?.past.page_info.has_next_page) return;

        try {
            setLoadingMore(true);
            const cursor = events.past.page_info.end_cursor;
            const response = await fetch(`/api/events?cursor=${cursor}`);
            const result = await response.json();

            if (result.success) {
                setEvents(prev => {
                    if (!prev) return result.data;
                    return {
                        ...prev,
                        past: {
                            data: [...prev.past.data, ...result.data.past.data],
                            page_info: result.data.past.page_info
                        }
                    };
                });
            }
        } catch (err) {
            console.error('Failed to load more events', err);
        } finally {
            setLoadingMore(false);
        }
    };

    const displayEvents = activeTab === 'future' ? events?.future || [] : events?.past.data || [];

    if (!mounted) return null;

    return (
        <Box component="section" id="events" sx={{ py: { xs: 6, sm: 8, md: 10 }, bgcolor: 'background.default', px: { xs: 2, sm: 3 } }}>
            <Container maxWidth="lg">
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: { xs: 1, sm: 2 }, gap: 2, flexWrap: 'wrap' }}>
                    <GradientText
                        component="h2"
                        variant="h2"
                        align="center"
                        sx={{
                            fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
                            fontWeight: { xs: 700, sm: 700 },
                            px: { xs: 1, sm: 0 },
                        }}
                    >
                        Community Events
                    </GradientText>
                </Box>
                <Typography
                    variant="h6"
                    align="center"
                    color="text.secondary"
                    paragraph
                    sx={{
                        mb: { xs: 3, sm: 4 },
                        maxWidth: 600,
                        mx: 'auto',
                        fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.25rem' },
                        px: { xs: 2, sm: 0 },
                    }}
                >
                    Join us for exciting AI/ML events across India
                </Typography>

                {/* Tabs */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: { xs: 3, sm: 4 }, display: 'flex', justifyContent: 'center', overflow: 'auto' }}>
                    <Tabs
                        value={activeTab}
                        onChange={(_, newValue) => setActiveTab(newValue)}
                        variant="fullWidth"
                        sx={{
                            minWidth: { xs: '100%', sm: 'auto' },
                            '& .MuiTab-root': {
                                fontSize: { xs: '0.9rem', sm: '1rem' },
                                fontWeight: 600,
                                textTransform: 'none',
                                minWidth: { xs: 120, sm: 140 },
                                minHeight: 48,
                                transition: 'all 0.3s ease',
                                px: { xs: 2, sm: 3 },
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
                            label={`Past ${events?.past?.data?.length ? `(${events.past.data.length})` : ''}`}
                            value="past"
                            icon={<CalendarMonth />}
                            iconPosition="start"
                        />
                    </Tabs>
                </Box>

                {/* Loading State */}
                {loading && (
                    <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
                        {[1, 2, 3].map((i) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                                <Skeleton variant="rectangular" height={320} sx={{ borderRadius: 1 }} />
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
                                py: { xs: 6, sm: 8 },
                                px: { xs: 2, sm: 3 },
                                bgcolor: 'grey.50',
                                borderRadius: 2,
                                border: '1px dashed',
                                borderColor: 'grey.300'
                            }}>
                                <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                                    No {activeTab === 'future' ? 'upcoming' : 'past'} events found
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize: { xs: '0.875rem', sm: '0.9rem' } }}>
                                    Check the {activeTab === 'future' ? 'past' : 'upcoming'} events tab or visit our community pages
                                </Typography>
                            </Box>
                        ) : (
                            <>
                                <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
                                    {displayEvents.map((event, index) => (
                                        <EventCard key={`${activeTab}-${event.id}-${event.slug || index}`} event={event} index={index} />
                                    ))}
                                </Grid>

                                {/* Load More Button for Past Events */}
                                {activeTab === 'past' && events?.past.page_info.has_next_page && (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                        <Box
                                            component="button"
                                            onClick={loadMorePastEvents}
                                            disabled={loadingMore}
                                            sx={{
                                                px: 4,
                                                py: 1.5,
                                                bgcolor: 'white',
                                                border: '1px solid',
                                                borderColor: 'primary.main',
                                                borderRadius: 2,
                                                color: 'primary.main',
                                                fontSize: '0.95rem',
                                                fontWeight: 600,
                                                cursor: loadingMore ? 'not-allowed' : 'pointer',
                                                transition: 'all 0.2s',
                                                '&:hover': {
                                                    bgcolor: 'primary.50',
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                                },
                                                '&:active': {
                                                    transform: 'translateY(0)'
                                                },
                                                opacity: loadingMore ? 0.7 : 1
                                            }}
                                        >
                                            {loadingMore ? 'Loading...' : 'Load More Events'}
                                        </Box>
                                    </Box>
                                )}
                            </>
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
        event.header_image?.i640 || event.header_image?.i320 || event.header_image?.url || '/ai-community-logo.svg'
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

    const stripHtml = (html: string) => {
        if (!html) return '';
        return html.replace(/<[^>]*>?/gm, '');
    };

    const formattedDate = formatDate(event.start_time);

    return (
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ height: '100%' }}
            >
                <Card
                    onClick={() => window.open(event.url, '_blank', 'noopener,noreferrer')}
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.3s ease',
                        border: '1px solid transparent',
                        cursor: 'pointer',
                        '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                            borderColor: index % 3 === 0 ? 'secondary.main' : (index % 3 === 1 ? 'success.main' : 'info.main'),
                        },
                    }}
                >
                    <Box sx={{
                        position: 'relative',
                        height: { xs: 160, sm: 180, md: 200 },
                        bgcolor: 'grey.100',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Image
                            src={imgSrc}
                            alt={event.name || 'Event image'}
                            fill
                            style={{ objectFit: 'contain', padding: '8px' }}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            onError={() => setImgSrc('/ai-community-logo.svg')}
                            priority={index < 3}
                        />
                    </Box>
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: { xs: 2, sm: 2.5, md: 3 } }}>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="h3"
                            sx={{
                                fontWeight: 600,
                                fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
                                lineHeight: 1.3,
                                mb: { xs: 1, sm: 1.5 },
                            }}
                        >
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
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    mb: 2,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                }}
                            >
                                {stripHtml(event.description)}
                            </Typography>
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
