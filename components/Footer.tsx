'use client';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GroupsIcon from '@mui/icons-material/Groups';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            AI Community |
            {' '}
            <span suppressHydrationWarning>
                {new Date().getFullYear()}
            </span>
            {'.'}
        </Typography>
    );
}

export default function Footer() {
    const theme = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <Box
            component="footer"
            sx={{
                bgcolor: 'background.paper',
                py: 6,
                borderTop: '1px solid',
                borderColor: 'divider'
            }}
        >
            <Box display="flex" justifyContent="center" mb={2}>
                <Image
                    src="/ai-community-logo.svg"
                    alt="AI Community Logo"
                    width={80}
                    height={80}
                />
            </Box>
            <Container maxWidth="lg">
                <Stack spacing={3} alignItems="center">
                    <Typography
                        variant="h6"
                        align="center"
                        gutterBottom
                        sx={{
                            background: `linear-gradient(90deg, ${theme.palette.google.blue}, ${theme.palette.google.green}, ${theme.palette.google.yellow}, ${theme.palette.google.red})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        AI Community
                    </Typography>

                    <Typography
                        variant="subtitle1"
                        align="center"
                        color="text.secondary"
                        component="p"
                    >
                        Empowering AI developers everywhere.
                    </Typography>

                    {/* Social Links */}
                    <Stack direction="row" spacing={2}>
                        <Link
                            href="https://www.facebook.com/TFUGIndia/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                            sx={{
                                color: 'text.secondary',
                                '&:hover': { color: 'primary.main' },
                                transition: 'color 0.2s',
                                textDecoration: 'none'
                            }}
                        >
                            <FacebookIcon />
                        </Link>
                        <Link
                            href="https://www.instagram.com/tfugindia"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            sx={{
                                color: 'text.secondary',
                                '&:hover': { color: 'primary.main' },
                                transition: 'color 0.2s',
                                textDecoration: 'none'
                            }}
                        >
                            <InstagramIcon />
                        </Link>
                        <Link
                            href="https://www.linkedin.com/company/tfugindia/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            sx={{
                                color: 'text.secondary',
                                '&:hover': { color: 'primary.main' },
                                transition: 'color 0.2s',
                                textDecoration: 'none'
                            }}
                        >
                            <LinkedInIcon />
                        </Link>
                        <Link
                            href="https://x.com/tfugindia"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="X (Twitter)"
                            sx={{
                                color: 'text.secondary',
                                '&:hover': { color: 'primary.main' },
                                transition: 'color 0.2s',
                                textDecoration: 'none'
                            }}
                        >
                            <TwitterIcon />
                        </Link>
                        <Link
                            href="https://www.youtube.com/@TFUGIndia"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="YouTube"
                            sx={{
                                color: 'text.secondary',
                                '&:hover': { color: 'primary.main' },
                                transition: 'color 0.2s',
                                textDecoration: 'none'
                            }}
                        >
                            <YouTubeIcon />
                        </Link>
                        <Link
                            href="https://www.commudle.com/orgs/tfug"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Commudle"
                            sx={{
                                color: 'text.secondary',
                                '&:hover': { color: 'primary.main' },
                                transition: 'color 0.2s',
                                textDecoration: 'none'
                            }}
                        >
                            <GroupsIcon />
                        </Link>
                    </Stack>

                    <Copyright />
                </Stack>
            </Container>
        </Box>
    );
}
