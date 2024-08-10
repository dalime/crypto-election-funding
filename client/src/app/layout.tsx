import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { App } from './app';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Presidential Election Crypto Support',
  description: 'Support a Presidential Candidate with Crypto!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <App children={children} />
      </body>
    </html>
  );
}
