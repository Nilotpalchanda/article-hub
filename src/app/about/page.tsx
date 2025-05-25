import { Facebook, Instagram, Linkedin } from 'lucide-react';
import React from 'react';
import { ABOUT_SCREEN_METADATA } from './metadata';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = { ...ABOUT_SCREEN_METADATA };

const AboutPage = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-2xl rounded-xl bg-white bg-opacity-80 p-6 shadow-2xl">
        <div className="flex flex-col items-center">
          <Image
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=256&q=80"
            alt="Team"
            height={80}
            width={256}
            loading="lazy"
            priority={false}
            className="mb-6 h-32 w-32 rounded-full border-4 border-pink-400 object-cover shadow-lg"
          />
          <h1 className="mb-6 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-center text-4xl font-extrabold text-transparent">
            About Us
          </h1>
        </div>
        <p className="mb-4 text-lg text-gray-700">
          Welcome to ArticleHub! We are passionate about sharing knowledge,
          stories, and inspiration with our readers.
        </p>
        <p className="mb-4 text-lg text-gray-700">
          Our team is dedicated to providing high-quality content on technology,
          lifestyle, and personal growth. We believe in the power of community
          and learning together.
        </p>
        <p className="mb-4 text-lg text-gray-700">
          Thank you for being a part of our journey. Stay tuned for more
          exciting articles and updates!
        </p>
        <p className="mb-4 text-lg text-gray-700">
          Founded in 2024, our mission is to empower individuals to grow and
          connect through meaningful content. We strive to create a welcoming
          space for everyone to learn, share, and be inspired.
        </p>
        <p className="mb-4 text-lg text-gray-700">
          Our diverse team brings together expertise from various fields,
          ensuring a rich and engaging experience for our readers. We value your
          feedback and look forward to building a vibrant community together.
        </p>
        <div className="mt-8 flex flex-col items-center space-y-4">
          <div className="flex space-x-4">
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-2xl text-blue-700 hover:text-blue-900"
            >
              <i className="h-7 w-7">
                <Linkedin />
              </i>
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-2xl text-blue-600 hover:text-blue-800"
            >
              <i className="h-7 w-7">
                <Facebook />
              </i>
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-2xl text-pink-500 hover:text-pink-700"
            >
              <i className="h-7 w-7">
                <Instagram />
              </i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
