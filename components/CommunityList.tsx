'use client';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import { Community } from '@/types';
import useSWR from 'swr';
import Image from 'next/image';
import { motion } from 'framer-motion';
import GradientText from './GradientText';

const fetcher = (url: string) => fetch(url).then(r => r.json());

function CommunityCard({ community, index }: { community: Community; index: number }) {
    const [imgSrc, setImgSrc] = useState(community.logo_url || '/globe.svg');

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
                    onClick={() => window.open(community.url, '_blank', 'noopener,noreferrer')}
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
                    <Box sx={{ position: 'relative', height: { xs: 120, sm: 140, md: 160 }, bgcolor: 'grey.100', p: { xs: 1.5, sm: 2 } }}>
                        <Image
                            src={imgSrc}
                            alt={community.name}
                            fill
                            style={{ objectFit: 'contain', padding: '12px' }}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            onError={() => setImgSrc('/globe.svg')}
                            priority={index < 6}
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
                            {community.name}
                        </Typography>

                        {community.location && (
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'text.secondary' }}>
                                <LocationOnIcon sx={{ fontSize: 18, mr: 0.5 }} />
                                <Typography variant="body2">
                                    {community.location}
                                </Typography>
                            </Box>
                        )}

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                mb: { xs: 1.5, sm: 2 },
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                fontSize: { xs: '0.875rem', sm: '0.9rem' },
                                lineHeight: 1.5,
                            }}
                        >
                            {community.description}
                        </Typography>

                        {community.organizers && community.organizers.length > 0 && (
                            <Box sx={{ mb: { xs: 1.5, sm: 2 } }}>
                                <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block', fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                                    Team
                                </Typography>
                                <Stack direction="row" spacing={-0.5} sx={{ alignItems: 'center' }}>
                                    {community.organizers.slice(0, 5).map((organizer, idx) => (
                                        <Box
                                            key={organizer.id}
                                            title={organizer.name}
                                            sx={{
                                                width: { xs: 28, sm: 32 },
                                                height: { xs: 28, sm: 32 },
                                                borderRadius: '50%',
                                                border: '2px solid white',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                zIndex: 5 - idx,
                                                '&:hover': {
                                                    zIndex: 10,
                                                    transform: 'scale(1.15)',
                                                    transition: 'all 0.2s ease'
                                                }
                                            }}
                                        >
                                            <Image
                                                src={organizer.image_url || '/globe.svg'}
                                                alt={organizer.name}
                                                fill
                                                sizes="(max-width: 600px) 28px, 32px"
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </Box>
                                    ))}
                                    {community.organizers.length > 5 && (
                                        <Box
                                            sx={{
                                                width: { xs: 28, sm: 32 },
                                                height: { xs: 28, sm: 32 },
                                                borderRadius: '50%',
                                                border: '2px solid white',
                                                bgcolor: 'grey.300',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: { xs: '0.65rem', sm: '0.7rem' },
                                                fontWeight: 700,
                                                color: 'text.secondary',
                                                zIndex: 0
                                            }}
                                        >
                                            +{community.organizers.length - 5}
                                        </Box>
                                    )}
                                </Stack>
                            </Box>
                        )}

                        <Stack direction="row" spacing={1} sx={{ mt: 'auto', flexWrap: 'wrap', gap: 1 }}>
                            <Chip
                                icon={<PeopleIcon />}
                                label={`${community.members_count.toLocaleString('en-US')} members`}
                                size="small"
                                sx={{
                                    bgcolor: 'primary.50',
                                    color: 'primary.main',
                                    fontWeight: 500,
                                    fontSize: '0.75rem'
                                }}
                            />
                            {community.completed_events_count > 0 && (
                                <Chip
                                    icon={<EventIcon />}
                                    label={`${community.completed_events_count} events`}
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

export default function CommunityList({ initialData }: { initialData?: Community[] }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { data: swrData, error } = useSWR<Community[]>(mounted ? '/api/communities/proxy' : null, fetcher, {
        fallbackData: initialData,
        refreshInterval: 300000,
        revalidateOnFocus: false,
    });

    const communityList = swrData || initialData || [];

    return (
        <Box id="communities" sx={{ py: { xs: 6, sm: 8, md: 10 }, bgcolor: 'grey.50', px: { xs: 2, sm: 3 } }}>
            <Container maxWidth="lg">
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
                        Our Communities
                    </GradientText>
                </Box>
                <Typography
                    variant="h6"
                    align="center"
                    color="text.secondary"
                    paragraph
                    sx={{
                        mb: { xs: 4, sm: 6, md: 8 },
                        maxWidth: 600,
                        mx: 'auto',
                        fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.25rem' },
                        px: { xs: 2, sm: 0 },
                    }}
                >
                    Connect with {communityList.length} local AI/ML communities and enthusiasts.
                </Typography>

                <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
                    {communityList.map((community, index) => (
                        <CommunityCard key={community.id} community={community} index={index} />
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
