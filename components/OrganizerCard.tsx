'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { motion } from 'framer-motion';

interface OrganizerCardProps {
    id: number;
    name: string;
    username: string;
    designation: string;
    photo: string;
    location: string;
    followersCount: number;
    communitiesCount: number;
    speakerEventsCount: number;
    tags: string[];
    profileUrl: string;
    isCommunityLeader: boolean;
}

export default function OrganizerCard({
    name,
    designation,
    photo,
    location,
    followersCount,
    communitiesCount,
    speakerEventsCount,
    tags,
    profileUrl,
    isCommunityLeader
}: OrganizerCardProps) {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            style={{ height: '100%' }}
        >
            <Card
                sx={{
                    height: '100%',
                    minHeight: 480,
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    }
                }}
            >
                {/* Header with Photo */}
                <Box sx={{ position: 'relative', flexShrink: 0 }}>
                    <CardMedia
                        component="img"
                        height="180"
                        image={photo}
                        alt={name}
                        sx={{
                            objectFit: 'cover',
                            backgroundColor: 'grey.200'
                        }}
                    />
                    {isCommunityLeader && (
                        <Chip
                            label="Community Leader"
                            size="small"
                            sx={{
                                position: 'absolute',
                                top: 12,
                                right: 12,
                                backgroundColor: 'primary.main',
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '0.75rem'
                            }}
                        />
                    )}
                </Box>

                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: { xs: 2, sm: 2.5 } }}>
                    {/* Name and Designation */}
                    <Box sx={{ mb: 2 }}>
                        <Typography
                            variant="h6"
                            component="h3"
                            gutterBottom
                            sx={{
                                fontWeight: 700,
                                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                                lineHeight: 1.3,
                                mb: 0.5
                            }}
                        >
                            {name}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                fontSize: { xs: '0.85rem', sm: '0.9rem' },
                                lineHeight: 1.4,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                height: '2.8em'
                            }}
                        >
                            {designation}
                        </Typography>
                    </Box>

                    {/* Location */}
                    {location && (
                        <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mb: 2 }}>
                            <LocationOnIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                                {location}
                            </Typography>
                        </Stack>
                    )}

                    {/* Stats */}
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            mb: 2,
                            pb: 2,
                            borderBottom: '1px solid',
                            borderColor: 'divider'
                        }}
                    >
                        <Stack direction="row" spacing={0.5} alignItems="center">
                            <PeopleIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                            <Typography variant="body2" sx={{ fontSize: '0.85rem', fontWeight: 600 }}>
                                {followersCount}
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                            <EventIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                            <Typography variant="body2" sx={{ fontSize: '0.85rem', fontWeight: 600 }}>
                                {speakerEventsCount}
                            </Typography>
                        </Stack>
                    </Stack>

                    {/* Tags */}
                    <Box sx={{ mb: 2, minHeight: 56 }}>
                        <Stack
                            direction="row"
                            spacing={0.5}
                            flexWrap="wrap"
                            sx={{ gap: 0.5 }}
                        >
                            {tags.slice(0, 3).map((tag, index) => (
                                <Chip
                                    key={index}
                                    label={tag}
                                    size="small"
                                    sx={{
                                        fontSize: '0.7rem',
                                        height: 24,
                                        backgroundColor: 'grey.100',
                                        '&:hover': {
                                            backgroundColor: 'grey.200'
                                        }
                                    }}
                                />
                            ))}
                            {tags.length > 3 && (
                                <Chip
                                    label={`+${tags.length - 3}`}
                                    size="small"
                                    sx={{
                                        fontSize: '0.7rem',
                                        height: 24,
                                        backgroundColor: 'primary.light',
                                        color: 'primary.dark'
                                    }}
                                />
                            )}
                        </Stack>
                    </Box>

                    {/* View Profile Button */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton
                            href={profileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            size="small"
                            sx={{
                                color: 'primary.main',
                                '&:hover': {
                                    backgroundColor: 'primary.light',
                                    color: 'primary.dark'
                                }
                            }}
                        >
                            <OpenInNewIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </CardContent>
            </Card>
        </motion.div>
    );
}
