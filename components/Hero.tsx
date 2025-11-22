'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import NotifyForm from './NotifyForm';
import AnimatedLogo from './AnimatedLogo';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import GradientText from './GradientText';

export default function Hero() {
    const theme = useTheme();

    return (
        <Box>
            {/* Hero Section */}
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: { xs: 4, sm: 6, md: 8 },
                    pb: { xs: 3, sm: 4, md: 6 },
                    px: { xs: 2, sm: 3 },
                }}
            >
                <Container maxWidth="md">
                    <AnimatedLogo />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <GradientText
                            component="h1"
                            variant="h2"
                            align="center"
                            gutterBottom
                            sx={{
                                fontWeight: 800,
                                fontSize: { xs: '2rem', sm: '2.75rem', md: '3.5rem' },
                                lineHeight: { xs: 1.2, sm: 1.3 },
                                mb: { xs: 2, sm: 3 },
                                px: { xs: 1, sm: 0 },
                            }}
                        >
                            Join the AI Community
                        </GradientText>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Typography
                            variant="h5"
                            align="center"
                            color="text.secondary"
                            paragraph
                            sx={{
                                mb: { xs: 3, sm: 4 },
                                fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                                lineHeight: { xs: 1.5, sm: 1.6 },
                                px: { xs: 2, sm: 3, md: 0 },
                            }}
                        >
                            Connect with AI/ML enthusiasts, developers, and researchers.
                            <br></br>Learn, share, and grow together.
                        </Typography>
                    </motion.div>

                    {/* Notify Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <Box sx={{ mb: { xs: 3, sm: 4 }, px: { xs: 1, sm: 0 } }}>
                            <NotifyForm />
                        </Box>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                    >
                        <Stack
                            sx={{ pt: { xs: 2, sm: 3, md: 4 } }}
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 1.5, sm: 2 }}
                            justifyContent="center"
                            alignItems="center"
                            gap={{ xs: 1.5, sm: 2 }}
                        >
                            <Button
                                variant="contained"
                                size="large"
                                href="#communities"
                                sx={{
                                    px: { xs: 3, sm: 4 },
                                    py: { xs: 1.25, sm: 1.5 },
                                    fontSize: { xs: '1rem', sm: '1.1rem' },
                                    minHeight: 48,
                                    width: { xs: '100%', sm: 'auto' },
                                    maxWidth: { xs: 320, sm: 'none' },
                                }}
                            >
                                Explore Communities
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                href="https://www.commudle.com/orgs/tfug"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    px: { xs: 3, sm: 4 },
                                    py: { xs: 1.25, sm: 1.5 },
                                    fontSize: { xs: '1rem', sm: '1.1rem' },
                                    minHeight: 48,
                                    width: { xs: '100%', sm: 'auto' },
                                    maxWidth: { xs: 320, sm: 'none' },
                                }}
                            >
                                Learn More
                            </Button>
                        </Stack>
                    </motion.div>
                </Container>
            </Box>
        </Box>
    );
}
