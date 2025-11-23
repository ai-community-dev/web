'use client';
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

    return (
        <Box
            component="footer"
            sx={{
                bgcolor: 'background.paper',
                py: { xs: 4, sm: 5, md: 6 },
                px: { xs: 2, sm: 3 },
                borderTop: '1px solid',
                borderColor: 'divider'
            }}
        >
            <Box display="flex" justifyContent="center" mb={{ xs: 1.5, sm: 2 }}>
                <Image
                    src="/ai-community-logo.svg"
                    alt="AI Community Logo"
                    width={60}
                    height={60}
                    style={{ width: 'auto', height: 'auto', maxWidth: '60px', maxHeight: '60px' }}
                />
            </Box>
            <Container maxWidth="lg">
                <Stack spacing={{ xs: 2, sm: 2.5, md: 3 }} alignItems="center">
                    <Typography
                        variant="h6"
                        align="center"
                        gutterBottom
                        sx={{
                            fontSize: { xs: '1.1rem', sm: '1.25rem' },
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
                        sx={{
                            fontSize: { xs: '0.9rem', sm: '1rem' },
                            px: { xs: 2, sm: 0 },
                        }}
                    >
                        Empowering AI developers everywhere.
                    </Typography>

                    {/* Social Links */}
                    <Stack
                        direction="row"
                        spacing={{ xs: 1.5, sm: 2 }}
                        flexWrap="wrap"
                        justifyContent="center"
                        sx={{ gap: { xs: 1, sm: 1.5 } }}
                    >
                        <Link
                            href="https://www.facebook.com/TFUGIndia/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                            suppressHydrationWarning
                            sx={{
                                color: 'text.secondary',
                                '&:hover': { color: 'primary.main' },
                                transition: 'color 0.2s',
                                textDecoration: 'none',
                                p: 1,
                                minWidth: 44,
                                minHeight: 44,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <FacebookIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
                        </Link>
                        <Link
                            href="https://www.instagram.com/tfugindia"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            suppressHydrationWarning
                            sx={{
                                color: 'text.secondary',
                                '&:hover': { color: 'primary.main' },
                                transition: 'color 0.2s',
                                textDecoration: 'none',
                                p: 1,
                                minWidth: 44,
                                minHeight: 44,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <InstagramIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
                        </Link>
                        <Link
                            href="https://www.linkedin.com/company/tfugindia/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            suppressHydrationWarning
                            sx={{
                                color: 'text.secondary',
                                '&:hover': { color: 'primary.main' },
                                transition: 'color 0.2s',
                                textDecoration: 'none',
                                p: 1,
                                minWidth: 44,
                                minHeight: 44,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <LinkedInIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
                        </Link>
                        <Link
                            href="https://x.com/tfugindia"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="X (Twitter)"
                            suppressHydrationWarning
                            sx={{
                                color: 'text.secondary',
                                '&:hover': { color: 'primary.main' },
                                transition: 'color 0.2s',
                                textDecoration: 'none',
                                p: 1,
                                minWidth: 44,
                                minHeight: 44,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <TwitterIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
                        </Link>
                        <Link
                            href="https://www.youtube.com/@TFUGIndia"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="YouTube"
                            suppressHydrationWarning
                            sx={{
                                color: 'text.secondary',
                                '&:hover': { color: 'primary.main' },
                                transition: 'color 0.2s',
                                textDecoration: 'none',
                                p: 1,
                                minWidth: 44,
                                minHeight: 44,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <YouTubeIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
                        </Link>
                        <Link
                            href="https://www.commudle.com/orgs/tfug"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Commudle"
                            suppressHydrationWarning
                            sx={{
                                color: 'text.secondary',
                                '&:hover': { color: 'primary.main' },
                                transition: 'color 0.2s',
                                textDecoration: 'none',
                                p: 1,
                                minWidth: 44,
                                minHeight: 44,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <GroupsIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
                        </Link>
                    </Stack>

                    <Copyright />
                </Stack>
            </Container>
        </Box>
    );
}
