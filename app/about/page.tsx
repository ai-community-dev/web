import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Footer from '@/components/Footer';
import GradientText from '@/components/GradientText';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us | AI Community',
    description: 'Learn about the AI Community, our mission to unite AI organizers and practitioners, and how we foster innovation and collaboration.',
};

export default function AboutPage() {
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
                        About Us
                    </GradientText>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
                        Uniting AI organizers and practitioners across the globe to learn, share, and innovate together.
                    </Typography>

                    <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 3 }}>
                        TensorFlow User Group (TFUG) is a non-profit research community for Data Science, Artificial Intelligence and Machine Learning professionals, academics and practitioners.
                    </Typography>

                    <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 3 }}>
                        TensorFlow is an end-to-end open-source platform for machine learning. It has a comprehensive, flexible ecosystem of tools, libraries and community resources that lets researchers push the state-of-the-art in ML and developers easily build and deploy ML-powered applications.
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mt: 6, fontStyle: 'italic' }}>
                        Disclaimer: This page is not managed by Google or any of its entities. The content published here is solely of the individuals managing it and part of the communities.
                    </Typography>
                </Container>
            </Box>
            <Footer />
        </Box>
    );
}
