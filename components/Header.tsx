'use client';
import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import GradientText from './GradientText';

const pages = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Communities', path: '/communities' },
    { name: 'Organisers', path: '/organisers' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
];

export default function Header() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const theme = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar
            position="fixed"
            elevation={scrolled ? 4 : 0}
            sx={{
                bgcolor: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
                backdropFilter: scrolled ? 'blur(8px)' : 'none',
                borderBottom: scrolled ? 1 : 0,
                borderColor: 'divider',
                transition: 'all 0.3s ease',
                color: 'text.primary',
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ height: { xs: 64, md: 80 } }}>
                    {/* Desktop Logo */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, alignItems: 'center' }}>
                        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                            <Image
                                src="/ai-community-logo.svg"
                                alt="AI Community Logo"
                                width={40}
                                height={40}
                                priority
                                style={{ marginRight: '12px' }}
                            />
                            <GradientText
                                variant="h6"
                                noWrap
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontWeight: 700,
                                    letterSpacing: '.1rem',
                                    textDecoration: 'none',
                                }}
                            >
                                AI COMMUNITY
                            </GradientText>
                        </Link>
                    </Box>

                    {/* Mobile Menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                    <Link href={page.path} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                                        <Typography textAlign="center">{page.name}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* Mobile Logo */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1, alignItems: 'center' }}>
                        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                            <Image
                                src="/ai-community-logo.svg"
                                alt="AI Community Logo"
                                width={32}
                                height={32}
                                style={{ marginRight: '8px' }}
                            />
                            <GradientText
                                variant="h6"
                                noWrap
                                sx={{
                                    mr: 2,
                                    display: { xs: 'flex', md: 'none' },
                                    flexGrow: 1,
                                    fontWeight: 700,
                                    letterSpacing: '.1rem',
                                    textDecoration: 'none',
                                    fontSize: '1rem',
                                }}
                            >
                                AI COMMUNITY
                            </GradientText>
                        </Link>
                    </Box>

                    {/* Desktop Menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', gap: 1 }}>
                        {pages.map((page) => {
                            const isActive = pathname === page.path;
                            return (
                                <Button
                                    key={page.name}
                                    component={Link}
                                    href={page.path}
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: isActive ? 'primary.main' : 'text.primary',
                                        display: 'block',
                                        fontWeight: isActive ? 700 : 500,
                                        position: 'relative',
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            width: isActive ? '100%' : '0%',
                                            height: '2px',
                                            bottom: 0,
                                            left: 0,
                                            backgroundColor: theme.palette.primary.main,
                                            transition: 'width 0.3s ease',
                                        },
                                        '&:hover': {
                                            color: 'primary.main',
                                            backgroundColor: 'transparent',
                                            '&::after': {
                                                width: '100%',
                                            }
                                        }
                                    }}
                                >
                                    {page.name}
                                </Button>
                            );
                        })}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
