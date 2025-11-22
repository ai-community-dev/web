'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';

export default function ContactForm() {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [mobile, setMobile] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = React.useState('');
    const [mounted, setMounted] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const theme = useTheme();

    // Get the Web App URL from environment variables
    const SCRIPT_URL = process.env.NEXT_PUBLIC_CONTACT_SCRIPT_URL || '';
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

    const validateMobile = (mobile: string): boolean => {
        // Allow optional country code and 10 digits
        const mobileRegex = /^(\+?\d{1,3}[-.\s]?)?\d{10}$/;
        return mobileRegex.test(mobile.replace(/\s/g, ''));
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

        if (mobile.trim() && !validateMobile(mobile)) {
            setErrorMessage('Please enter a valid mobile number');
            setStatus('error');
            return;
        }

        if (!message.trim()) {
            setErrorMessage('Please enter your message');
            setStatus('error');
            return;
        }

        if (!SCRIPT_URL) {
            setErrorMessage('Contact service is not configured. Please try again later.');
            setStatus('error');
            return;
        }

        setStatus('loading');
        setIsSubmitting(true);
        setErrorMessage('');

        console.log('🚀 Contact Form Submission Starting...');
        console.log('📧 Script URL:', SCRIPT_URL);
        console.log('📝 Form Data:', { name, email, mobile: mobile || '(empty)', message: message.substring(0, 50) + '...' });

        // Create abort controller for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

        try {
            const formData = `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&mobile=${encodeURIComponent(mobile)}&message=${encodeURIComponent(message)}&timestamp=${encodeURIComponent(new Date().toISOString())}`;

            console.log('📤 Sending request...');

            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData,
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            console.log('✅ Request completed (no-cors mode - assuming success)');

            // With no-cors mode, we can't read the response, so we assume success
            setStatus('success');
            setEmail('');
            setName('');
            setMobile('');
            setMessage('');

        } catch (error) {
            clearTimeout(timeoutId);
            console.error('❌ Submission error:', error);

            if (error instanceof Error && error.name === 'AbortError') {
                setErrorMessage('Request timed out. Please check your connection and try again.');
            } else {
                setErrorMessage('Unable to send message. Please try again later.');
            }
            setStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!mounted) {
        return (
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 600,
                    height: 400,
                    borderRadius: 4,
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
                            Message Sent Successfully!
                        </Typography>
                        <Typography variant="body2">
                            Thank you for contacting us. We'll get back to you soon.
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
                maxWidth: 600,
                mx: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                p: { xs: 3, sm: 4 },
                bgcolor: 'background.paper',
                borderRadius: 4,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                border: '1px solid',
                borderColor: status === 'error' ? 'error.main' : 'divider',
            }}
            noValidate
        >
            <TextField
                id="contact-name"
                label="Name"
                type="text"
                required
                fullWidth
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                    if (status === 'error') {
                        setStatus('idle');
                        setErrorMessage('');
                    }
                }}
                disabled={status === 'loading'}
                error={status === 'error' && !name.trim()}
                variant="outlined"
            />

            <TextField
                id="contact-email"
                label="Email"
                type="email"
                required
                fullWidth
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') {
                        setStatus('idle');
                        setErrorMessage('');
                    }
                }}
                disabled={status === 'loading'}
                error={status === 'error' && (!email.trim() || !validateEmail(email))}
                variant="outlined"
            />

            <TextField
                id="contact-mobile"
                label="Mobile (Optional)"
                type="tel"
                fullWidth
                value={mobile}
                onChange={(e) => {
                    setMobile(e.target.value);
                    if (status === 'error') {
                        setStatus('idle');
                        setErrorMessage('');
                    }
                }}
                disabled={status === 'loading'}
                error={status === 'error' && (mobile.trim().length > 0 && !validateMobile(mobile))}
                variant="outlined"
                placeholder="+91 1234567890"
            />

            <TextField
                id="contact-message"
                label="Message"
                required
                fullWidth
                multiline
                rows={4}
                value={message}
                onChange={(e) => {
                    setMessage(e.target.value);
                    if (status === 'error') {
                        setStatus('idle');
                        setErrorMessage('');
                    }
                }}
                disabled={status === 'loading'}
                error={status === 'error' && !message.trim()}
                variant="outlined"
            />

            {status === 'error' && errorMessage && (
                <Alert severity="error" sx={{ borderRadius: 2 }}>
                    {errorMessage}
                </Alert>
            )}

            <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={status === 'loading' || !email.trim() || !name.trim() || !message.trim()}
                sx={{
                    borderRadius: 2,
                    py: 1.5,
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
                {status === 'loading' ? 'Submitting...' : 'Send Message'}
            </Button>
        </Box>
    );
}
