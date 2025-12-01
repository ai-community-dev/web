'use client';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';

export default function AnimatedLogo() {
    const theme = useTheme();
    const googleColors = [
        theme.palette.google.blue,
        theme.palette.google.green,
        theme.palette.google.yellow,
        theme.palette.google.red,
    ];

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mb: 4,
                position: 'relative',
                height: { xs: 100, md: 120 },
            }}
        >
            {/* Glowing background effect */}
            <motion.div
                style={{
                    position: 'absolute',
                    width: '140px',
                    height: '140px',
                    borderRadius: '50%',
                    background: `conic-gradient(from 0deg, ${googleColors.join(', ')}, ${googleColors[0]})`,
                    filter: 'blur(40px)',
                    opacity: 0.8,
                    zIndex: 0,
                    willChange: 'transform',
                }}
                animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    rotate: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                    },
                    scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
            />

            {/* Secondary Glow for depth */}
            <motion.div
                style={{
                    position: 'absolute',
                    width: '160px',
                    height: '160px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${theme.palette.google.blue} 0%, transparent 70%)`,
                    filter: 'blur(60px)',
                    opacity: 0.4,
                    zIndex: -1,
                    willChange: 'transform',
                }}
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 0.2, 0.4],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Main Logo Container - Using next/image for optimization */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ position: 'relative', zIndex: 1 }}
            >
                <Image
                    src="/ai-community-logo.svg"
                    alt="AI Community Logo"
                    width={100}
                    height={100}
                    priority
                    style={{
                        display: 'block',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                    }}
                />
            </motion.div>
        </Box>
    );
}
