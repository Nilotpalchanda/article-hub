import { Metadata } from 'next';
import Image from 'next/image';
import { getAllPromptData } from './action';
import TextCard from '@/components/card/TextCard';
import { PROMPT_LIBRARY_METADATA } from './metadata';
import { Suspense } from 'react';
import Loading from './Loader';

type PromptsType = {
  id: string;
  title: string;
  description: string;
};

export const metadata: Metadata = { ...PROMPT_LIBRARY_METADATA };

export default async function PromptLibrary() {
  return (
    <div className="container mx-auto max-w-6xl flex-grow px-0 md:px-4 mb-8">
      {/* Banner Section */}
      <div className="relative mb-10 h-48 w-full overflow-hidden sm:h-64 md:h-80">
        <Image
          src="/prompt.webp"
          alt="Prompt Library Banner"
          width={1200}
          height={800}
          loading="lazy"
          priority={false}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="text-2xl font-extrabold uppercase text-white drop-shadow-lg sm:text-4xl md:text-5xl">
            Prompt Library
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-base font-medium text-white/90 sm:text-lg md:text-xl">
            Discover our most current and trending promts curated just for you.
          </p>
        </div>
      </div>
      {/* End Banner Section */}
      <div className="px-4 md:px-0">
        <div className="mb-10 text-left">
          <h1 className="mb-2 text-xl font-bold uppercase text-black">
            Prompt Library
          </h1>
          <div className="mt-4 h-1 w-48 rounded bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        </div>
        <Suspense fallback={<Loading />}>
          <PromptLibraryHandler />
        </Suspense>
      </div>
    </div>
  );
}

const PromptLibraryHandler = async () => {
  const promptData = await getAllPromptData();

  if (!promptData) {
    return <div>Error fetching Prompt Library</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {promptData.map((prompt: PromptsType) => (
        <TextCard
          key={prompt.id}
          id={prompt.id}
          title={prompt.title}
          description={prompt.description}
        />
      ))}
    </div>
  );
};
export const dynamic = 'force-dynamic';
