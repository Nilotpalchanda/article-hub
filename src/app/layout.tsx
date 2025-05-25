import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ArticleHub - Your Source for Trending Articles',
  description: 'Discover the latest and most popular articles across various categories. Stay informed with ArticleHub.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex min-h-screen flex-col bg-gradient-to-br from-blue-200 via-purple-100 to-pink-200`}
      >
        <Header />
        <main className="flex flex-grow flex-col">
          <div className="flex flex-grow justify-center">{children}</div>
        </main>
        <Footer/>
      </body>
    </html>
  );
}
