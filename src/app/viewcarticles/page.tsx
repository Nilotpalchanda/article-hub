import { VerticalCard } from '@/components/card/VerticalCard';
import { getCurrentArticlesData } from './actions';
import { VIEW_CURRENT_ARTICLES_METADATA } from './metadata';
import { Metadata } from 'next';
import Image from 'next/image';

type Article = {
  id: string | number;
  title: string;
  description: string;
  image: string;
  category: string;
  duration: string;
  rating: number;
};

export const metadata: Metadata = { ...VIEW_CURRENT_ARTICLES_METADATA };

export default async function ViewCurrentarticles() {
  const currentArticlesData = await getCurrentArticlesData();

  if (!currentArticlesData) {
    return <div>Error fetching current articles</div>;
  }

  return (
    <div className="container mx-auto max-w-6xl flex-grow px-0 md:px-4">
      {/* Banner Section */}
      <div className="relative mb-10 h-48 w-full overflow-hidden sm:h-64 md:h-80">
        <Image
          src="/current-articles.webp"
          alt="Current Articles Banner"
          width={1200}
          height={800}
          loading='lazy'
          priority={false}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="text-2xl font-extrabold text-white uppercase drop-shadow-lg sm:text-4xl md:text-5xl">
            Current Articles
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-base font-medium text-white/90 sm:text-lg md:text-xl">
            Discover our most current and trending articles curated just for
            you.
          </p>
        </div>
      </div>
      {/* End Banner Section */}
      <div className="px-4 md:px-0">
        <div className="mb-10 text-left">
          <h1 className="mb-2 text-xl font-bold text-black uppercase">
            Current Articles
          </h1>
          <div className="mt-4 h-1 w-48 rounded bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        </div>
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {currentArticlesData.map((card: Article) => (
            <VerticalCard key={card.id} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}
export const dynamic = 'force-dynamic';
