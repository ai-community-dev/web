'use client';
import { createTheme } from '@mui/material/styles';
import localFont from 'next/font/local';

const googleSans = localFont({
    src: [
        {
            path: '../../app/fonts/GoogleSans-Regular-v1.27.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../app/fonts/GoogleSans-Medium-v1.27.ttf',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../../app/fonts/GoogleSans-Bold-v1.27.ttf',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../../app/fonts/GoogleSans-Italic-v1.27.ttf',
            weight: '400',
            style: 'italic',
        },
        {
            path: '../../app/fonts/GoogleSans-MediumItalic-v1.27.ttf',
            weight: '500',
            style: 'italic',
        },
        {
            path: '../../app/fonts/GoogleSans-BoldItalic-v1.27.ttf',
            weight: '700',
            style: 'italic',
        },
    ],
    display: 'swap',
});

const googleSansDisplay = localFont({
    src: [
        {
            path: '../../app/fonts/GoogleSansDisplay-Regular-v1.27.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../app/fonts/GoogleSansDisplay-Medium-v1.27.ttf',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../../app/fonts/GoogleSansDisplay-Bold-v1.27.ttf',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../../app/fonts/GoogleSansDisplay-Italic-v1.27.ttf',
            weight: '400',
            style: 'italic',
        },
        {
            path: '../../app/fonts/GoogleSansDisplay-MediumItalic-v1.27.ttf',
            weight: '500',
            style: 'italic',
        },
        {
            path: '../../app/fonts/GoogleSansDisplay-BoldItalic-v1.27.ttf',
            weight: '700',
            style: 'italic',
        },
    ],
    display: 'swap',
});

declare module '@mui/material/styles' {
    interface Palette {
        google: {
            blue: string;
            red: string;
            yellow: string;
            green: string;
        };
    }
    interface PaletteOptions {
        google?: {
            blue: string;
            red: string;
            yellow: string;
            green: string;
        };
    }
}

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1a73e8', // Primary Blue
        },
        secondary: {
            main: '#FF9933', // Saffron
        },
        google: {
            blue: '#4285F4',
            red: '#EA4335',
            yellow: '#FBBC04',
            green: '#34A853',
        },
        background: {
            default: '#ffffff',
            paper: '#ffffff',
        },
        text: {
            primary: '#202124', // Dark Gray
            secondary: '#5f6368',
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    typography: {
        fontFamily: googleSans.style.fontFamily,
        // Responsive base font size
        fontSize: 14,
        htmlFontSize: 16,
        h1: {
            fontFamily: googleSansDisplay.style.fontFamily,
            fontWeight: 800,
            fontSize: '2rem',
            '@media (min-width:600px)': {
                fontSize: '2.5rem',
            },
            '@media (min-width:900px)': {
                fontSize: '3rem',
            },
        },
        h2: {
            fontFamily: googleSansDisplay.style.fontFamily,
            fontWeight: 700,
            fontSize: '1.75rem',
            '@media (min-width:600px)': {
                fontSize: '2.25rem',
            },
            '@media (min-width:900px)': {
                fontSize: '2.75rem',
            },
        },
        h3: {
            fontFamily: googleSansDisplay.style.fontFamily,
            fontWeight: 700,
            fontSize: '1.5rem',
            '@media (min-width:600px)': {
                fontSize: '1.875rem',
            },
            '@media (min-width:900px)': {
                fontSize: '2.25rem',
            },
        },
        h4: {
            fontFamily: googleSansDisplay.style.fontFamily,
            fontWeight: 600,
            fontSize: '1.25rem',
            '@media (min-width:600px)': {
                fontSize: '1.5rem',
            },
        },
        h5: {
            fontFamily: googleSansDisplay.style.fontFamily,
            fontWeight: 500,
            fontSize: '1.125rem',
            '@media (min-width:600px)': {
                fontSize: '1.25rem',
            },
        },
        h6: {
            fontFamily: googleSansDisplay.style.fontFamily,
            fontWeight: 500,
            fontSize: '1rem',
            '@media (min-width:600px)': {
                fontSize: '1.125rem',
            },
        },
        body1: {
            fontSize: '0.95rem',
            lineHeight: 1.6,
            '@media (min-width:600px)': {
                fontSize: '1rem',
            },
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
            '@media (min-width:600px)': {
                fontSize: '0.9rem',
            },
        },
        button: {
            fontFamily: googleSans.style.fontFamily,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.95rem',
            '@media (min-width:600px)': {
                fontSize: '1rem',
            },
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    boxShadow: 'none',
                    minHeight: 44, // Better touch target
                    padding: '10px 20px',
                    '&:hover': {
                        boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)',
                    },
                },
                sizeLarge: {
                    minHeight: 48,
                    padding: '12px 24px',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)',
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    minWidth: 44,
                    minHeight: 44,
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    height: 'auto',
                    minHeight: 28,
                },
            },
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    paddingLeft: 16,
                    paddingRight: 16,
                    '@media (min-width:600px)': {
                        paddingLeft: 24,
                        paddingRight: 24,
                    },
                },
            },
        },
    },
});

export default theme;
