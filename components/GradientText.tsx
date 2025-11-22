'use client';
import { Typography, TypographyProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface GradientTextProps extends TypographyProps {
    component?: React.ElementType;
}

export default function GradientText({ sx, children, ...props }: GradientTextProps) {
    const theme = useTheme();

    return (
        <Typography
            {...props}
            sx={{
                ...sx,
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
            {children}
        </Typography>
    );
}
