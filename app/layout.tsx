import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://promptgridai.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'PromptGrid AI — Production-Ready AI Prompts, Free Tools & Error Fixes',
    template: '%s | PromptGrid AI',
  },
  description: 'Discover vetted AI system prompts, benchmarked free alternatives to ChatGPT, and instant solutions for LLM API errors.',
  keywords: [
    'AI Prompts',
    'Prompt Engineering',
    'Free ChatGPT Alternatives',
    'Midjourney Prompts',
    'OpenAI 429 Error Fix',
    'AI Tools Directory',
    'Programmatic SEO',
  ],
  authors: [{ name: 'PromptGrid AI Editorial Team' }],
  creator: 'PromptGrid AI',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'PromptGrid AI',
    title: 'PromptGrid AI — Production-Ready AI Prompts, Free Tools & Error Fixes',
    description: 'Discover vetted AI system prompts, benchmarked free alternatives to ChatGPT, and instant solutions for LLM API errors.',
    images: [
      {
        url: '/images/card-1-brain.jpg',
        width: 1200,
        height: 630,
        alt: 'PromptGrid AI Hub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PromptGrid AI — Production-Ready AI Prompts, Free Tools & Error Fixes',
    description: 'Discover vetted AI system prompts, benchmarked free alternatives to ChatGPT, and instant solutions for LLM API errors.',
    images: ['/images/card-1-brain.jpg'],
    creator: '@PromptGridAI',
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { ThemeProvider } from '@/components/ThemeProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[#FAF9FD] dark:bg-[#070A12] text-gray-900 dark:text-gray-100 antialiased selection:bg-purple-100 selection:text-purple-900 dark:selection:bg-purple-900/50 dark:selection:text-purple-200">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
