'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import FormHelperText from '@mui/material/FormHelperText';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';

export default function NotifyForm() {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = React.useState('');
    const [mounted, setMounted] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const theme = useTheme();

    // Get the Web App URL from environment variables
    const SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || '';
    const TIMEOUT_MS = 10000; // 10 second timeout

    React.useEffect(() => {
        setMounted(true);
    }, []);

    // Auto-reset success message after 5 seconds
    React.useEffect(() => {
        if (status === 'success') {
            const timer = setTimeout(() => {
                setStatus('idle');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Prevent duplicate submissions
        if (isSubmitting) {
            return;
        }

        if (!name.trim()) {
            setErrorMessage('Please enter your name');
            setStatus('error');
            return;
        }

        if (!email.trim()) {
            setErrorMessage('Please enter your email address');
            setStatus('error');
            return;
        }

        if (!validateEmail(email)) {
            setErrorMessage('Please enter a valid email address');
            setStatus('error');
            return;
        }

        if (!SCRIPT_URL) {
            setErrorMessage('Subscription service is not configured. Please try again later.');
            setStatus('error');
            return;
        }

        setStatus('loading');
        setIsSubmitting(true);
        setErrorMessage('');

        // Create abort controller for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

        try {
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&timestamp=${encodeURIComponent(new Date().toISOString())}`,
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            // With no-cors mode, we can't read the response, so we assume success
            setStatus('success');
            setEmail('');
            setName('');

        } catch (error) {
            clearTimeout(timeoutId);
            console.error('Submission error:', error);

            if (error instanceof Error && error.name === 'AbortError') {
                setErrorMessage('Request timed out. Please check your connection and try again.');
            } else {
                setErrorMessage('Unable to subscribe. Please try again later.');
            }
            setStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!mounted) {
        // Return a placeholder with the same dimensions to prevent layout shift and hydration errors
        return (
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 600,
                    height: 56, // Approximate height of the form
                    borderRadius: '50px',
                    bgcolor: 'transparent'
                }}
            />
        );
    }

    if (status === 'success') {
        return (
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 600,
                    mx: 'auto',
                    textAlign: 'center'
                }}
            >
                <Alert
                    severity="success"
                    icon={<CheckCircleIcon sx={{ fontSize: 28 }} />}
                    sx={{
                        borderRadius: 4,
                        boxShadow: '0 4px 20px rgba(52,168,83,0.2)',
                        fontSize: '1rem',
                        py: 2,
                        animation: 'fadeIn 0.3s ease-in',
                        '@keyframes fadeIn': {
                            from: { opacity: 0, transform: 'scale(0.95)' },
                            to: { opacity: 1, transform: 'scale(1)' }
                        }
                    }}
                >
                    <Box>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                            Successfully Subscribed!
                        </Typography>
                        <Typography variant="body2">
                            Check your inbox for a welcome email. We'll keep you updated on our launch.
                        </Typography>
                    </Box>
                </Alert>
            </Box>
        );
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1
            }}
            noValidate
        >
            <Paper
                elevation={3}
                sx={{
                    p: { xs: 3, sm: '4px 4px 4px 20px' },
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: { xs: '100%', sm: 600 },
                    borderRadius: { xs: 4, sm: '50px' },
                    border: '1px solid',
                    borderColor: status === 'error' ? 'error.main' : '#e0e0e0',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 2, sm: 0 },
                    '&:hover': {
                        boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                        borderColor: status === 'error' ? 'error.main' : theme.palette.primary.main,
                    },
                    '&:focus-within': {
                        borderColor: status === 'error' ? 'error.main' : theme.palette.primary.main,
                        boxShadow: `0 0 0 3px ${status === 'error' ? 'rgba(211,47,47,0.1)' : 'rgba(66,133,244,0.1)'}`,
                    }
                }}
            >
                <InputBase
                    id="name-input"
                    type="text"
                    required
                    sx={{
                        ml: { xs: 0, sm: 1 },
                        flex: 1,
                        fontSize: '1.1rem',
                        width: '100%',
                        textAlign: { xs: 'center', sm: 'left' },
                        '& input': { textAlign: { xs: 'center', sm: 'left' } }
                    }}
                    placeholder="Your Name"
                    inputProps={{
                        'aria-label': 'Your Name',
                        suppressHydrationWarning: true
                    }}
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        if (status === 'error') {
                            setStatus('idle');
                            setErrorMessage('');
                        }
                    }}
                    disabled={status === 'loading'}
                />

                <Divider orientation="vertical" flexItem sx={{ mx: 1, display: { xs: 'none', sm: 'block' } }} />
                <Divider orientation="horizontal" flexItem sx={{ width: '100%', display: { xs: 'block', sm: 'none' }, opacity: 0.5 }} />

                <InputBase
                    id="email-input"
                    type="email"
                    required
                    sx={{
                        ml: { xs: 0, sm: 1 },
                        flex: 1.5,
                        fontSize: '1.1rem',
                        width: '100%',
                        textAlign: { xs: 'center', sm: 'left' },
                        '& input': { textAlign: { xs: 'center', sm: 'left' } }
                    }}
                    placeholder="Email Address"
                    inputProps={{
                        'aria-label': 'Email address',
                        'aria-describedby': status === 'error' ? 'email-error' : undefined,
                        'aria-invalid': status === 'error',
                        suppressHydrationWarning: true
                    }}
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === 'error') {
                            setStatus('idle');
                            setErrorMessage('');
                        }
                    }}
                    disabled={status === 'loading'}
                />
                <Button
                    type="submit"
                    variant="contained"
                    disabled={status === 'loading' || !email.trim() || !name.trim()}
                    aria-label="Subscribe to notifications"
                    sx={{
                        borderRadius: '50px',
                        px: 4,
                        py: 1.5,
                        minWidth: 140,
                        width: { xs: '100%', sm: 'auto' },
                        fontSize: '1rem',
                        fontWeight: 700,
                        textTransform: 'none',
                        boxShadow: 'none',
                        color: '#fff !important',
                        textShadow: '0 0 8px #fff, 0 0 2px #4285F4',
                        background: `linear-gradient(45deg, ${theme.palette.google?.blue || '#4285F4'} 30%, ${theme.palette.google?.green || '#34A853'} 90%)`,
                        '&:hover': {
                            boxShadow: '0 4px 12px rgba(66,133,244,0.3)',
                        },
                        '&:disabled': {
                            opacity: 0.6,
                            color: '#fff !important',
                            textShadow: '0 0 8px #fff, 0 0 2px #4285F4'
                        }
                    }}
                    endIcon={status === 'loading' ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                >
                    {status === 'loading' ? 'Sending...' : 'Notify Me'}
                </Button>
            </Paper>

            {status === 'error' && errorMessage && (
                <FormHelperText
                    id="email-error"
                    error
                    sx={{
                        fontSize: '0.9rem',
                        textAlign: 'center'
                    }}
                >
                    {errorMessage}
                </FormHelperText>
            )}
        </Box>
    );
}
