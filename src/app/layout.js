import { Inter } from 'next/font/google';
import './styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Velvron Labs - Engineering the Future',
  description: 'Building tomorrow\'s technology today with cutting-edge solutions in AI, cloud, and automation.',
  icons: {
    icon: '/assets/favicon.svg',
  },
  openGraph: {
    type: 'website',
    url: 'https://velvronlabs.vercel.app/',
    title: 'Velvron Labs - Engineering the Future',
    description: 'Building tomorrow\'s technology today with cutting-edge solutions in AI, cloud, and automation.',
    images: [{
      url: '/og-image.jpg',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    url: 'https://velvronlabs.vercel.app/',
    title: 'Velvron Labs - Engineering the Future',
    description: 'Building tomorrow\'s technology today with cutting-edge solutions in AI, cloud, and automation.',
    images: ['/og-image.jpg'],
  },
};

export const viewport = {
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#001233',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}