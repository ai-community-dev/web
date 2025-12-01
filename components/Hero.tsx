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

export default function Hero() {
    const theme = useTheme();

    return (
        <Box>
            {/* Hero Section */}
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6,
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Background Decoration */}
                <Box
                    component={motion.div}
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    sx={{
                        position: 'absolute',
                        top: -100,
                        right: -100,
                        width: 400,
                        height: 400,
                        borderRadius: '50%',
                        background: `linear-gradient(45deg, ${theme.palette.google.blue}20, ${theme.palette.google.green}20)`,
                        filter: 'blur(60px)',
                        zIndex: 0,
                        willChange: 'transform',
                    }}
                />
                <Box
                    component={motion.div}
                    animate={{
                        scale: [1, 1.1, 1],
                        x: [0, 50, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    sx={{
                        position: 'absolute',
                        bottom: -50,
                        left: -50,
                        width: 300,
                        height: 300,
                        borderRadius: '50%',
                        background: `linear-gradient(45deg, ${theme.palette.google.red}20, ${theme.palette.google.yellow}20)`,
                        filter: 'blur(60px)',
                        zIndex: 0,
                        willChange: 'transform',
                    }}
                />
                <Container maxWidth="md">
                    <AnimatedLogo />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            gutterBottom
                            sx={{
                                fontWeight: 800,
                                fontSize: { xs: '2.5rem', md: '3.5rem' },
                                background: `linear-gradient(45deg, ${theme.palette.google.blue} 0%, ${theme.palette.google.red} 33%, ${theme.palette.google.yellow} 66%, ${theme.palette.google.green} 100%)`,
                                backgroundSize: '300% 300%',
                                animation: 'gradient 8s ease infinite',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                '@keyframes gradient': {
                                    '0%': { backgroundPosition: '0% 50%' },
                                    '50%': { backgroundPosition: '100% 50%' },
                                    '100%': { backgroundPosition: '0% 50%' },
                                }
                            }}
                        >
                            Join the AI Community
                        </Typography>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Typography variant="h5" align="center" color="text.secondary" paragraph sx={{ mb: 4 }}>
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
                        <Box sx={{ mb: 4 }}>
                            <NotifyForm />
                        </Box>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                    >
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                            flexWrap="wrap"
                            gap={2}
                        >
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    href="#communities"
                                    sx={{
                                        px: 4,
                                        py: 1.5,
                                        fontSize: '1.1rem',
                                    }}
                                >
                                    Explore Communities
                                </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    href="https://www.commudle.com/orgs/tfug"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        px: 4,
                                        py: 1.5,
                                        fontSize: '1.1rem',
                                    }}
                                >
                                    Learn More
                                </Button>
                            </motion.div>
                        </Stack>
                    </motion.div>
                </Container>
            </Box>
        </Box>
    );
}
