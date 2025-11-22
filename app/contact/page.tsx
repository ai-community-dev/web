import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Footer from '@/components/Footer';
import GradientText from '@/components/GradientText';
import ContactForm from '@/components/ContactForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | AI Community',
    description: 'Get in touch with the AI Community team. We would love to hear from you regarding partnerships, events, or general inquiries.',
};

export default function ContactPage() {
    return (
        <Box component="main">
            <Box sx={{ pt: { xs: 12, sm: 14, md: 16 }, pb: { xs: 6, sm: 8 } }}>
                <Container maxWidth="md">
                    <GradientText
                        component="h1"
                        variant="h2"
                        align="center"
                        gutterBottom
                        sx={{
                            fontWeight: 800,
                            fontSize: { xs: '2rem', sm: '2.75rem', md: '3.5rem' },
                            mb: 4
                        }}
                    >
                        Contact Us
                    </GradientText>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
                        Have questions or want to collaborate? We'd love to hear from you.
                    </Typography>

                    <ContactForm />
                </Container>
            </Box>
            <Footer />
        </Box>
    );
}
