'use client';
import Link from 'next/link';
import React, { useState, useCallback } from 'react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/viewcarticles', label: 'Current Blogs' },
  { href: '/viewparticles', label: 'Popular Blogs' },
  { href: '/promptlibrary', label: 'Prompt Library' },
  { href: '/faq', label: 'FAQ' },
  { href: '/about', label: 'About' },
];

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);

  return (
    <nav className="w-full bg-white shadow-md z-50 sticky top-0">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3 md:px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-black tracking-tight">
            ArticleHub
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            menuOpen ? 'block' : 'hidden'
          } absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-md md:static md:block md:w-auto md:border-0 md:shadow-none`}
        >
          <ul className="flex flex-col space-y-2 px-4 py-4 md:flex-row md:space-y-0 md:space-x-6 md:p-0">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href} className="bg-transparent">
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block bg-transparent px-3 py-2 text-base font-medium text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-black transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
