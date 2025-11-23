import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import Header from '@/components/Header';
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: 'AI Community | Connect with AI Communities',
  description: 'Uniting AI organizers and practitioners across the globe. Join local TensorFlow User Groups (TFUGs) and AI communities to learn, share, and innovate together.',
  keywords: ['AI community', 'TensorFlow', 'TFUG', 'machine learning', 'artificial intelligence', 'developer community'],
  authors: [{ name: 'AI Community' }],
  creator: 'AI Community',
  publisher: 'AI Community',

  metadataBase: new URL('https://aicommunity.dev'),

  manifest: '/manifest.json',

  icons: {
    icon: '/ai-community-logo.svg',
    apple: '/ai-community-logo.svg',
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aicommunity.dev',
    title: 'AI Community',
    description: 'Uniting AI organizers and practitioners across the globe.',
    siteName: 'AI Community',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Community',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'AI Community',
    description: 'Uniting AI organizers and practitioners across the globe.',
    images: ['/og-image.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AI Community',
    url: 'https://aicommunity.dev',
    logo: 'https://aicommunity.dev/ai-community-logo.svg',
    sameAs: [
      'https://www.facebook.com/TFUGIndia/',
      'https://www.instagram.com/tfugindia',
      'https://www.linkedin.com/company/tfugindia/',
      'https://x.com/tfugindia',
      'https://www.youtube.com/@TFUGIndia',
      'https://www.commudle.com/orgs/tfug'
    ],
    description: 'Uniting AI organizers and practitioners across the globe.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'community support',
      email: 'contact@aicommunity.dev'
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeRegistry>
          <Header />
          {children}
          <SpeedInsights />
        </ThemeRegistry>
      </body>
      <GoogleAnalytics gaId="G-JNMYC69DG2" />
    </html>
  );
}
