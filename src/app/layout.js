'use client';

import { Inter } from 'next/font/google';
import Head from 'next/head';
import './styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <Head>
        <title>Velvron Labs - Engineering the Future</title>
        <meta name="description" content="Building tomorrow's technology today with cutting-edge solutions in AI, cloud, and automation." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#001233" />
        <link rel="icon" href="/assets/favicon.svg" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://velvronlabs.vercel.app/" />
        <meta property="og:title" content="Velvron Labs - Engineering the Future" />
        <meta property="og:description" content="Building tomorrow's technology today with cutting-edge solutions in AI, cloud, and automation." />
        <meta property="og:image" content="/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://velvronlabs.vercel.app/" />
        <meta property="twitter:title" content="Velvron Labs - Engineering the Future" />
        <meta property="twitter:description" content="Building tomorrow's technology today with cutting-edge solutions in AI, cloud, and automation." />
        <meta property="twitter:image" content="/og-image.jpg" />
      </Head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}