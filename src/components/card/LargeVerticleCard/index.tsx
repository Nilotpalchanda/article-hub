import Link from 'next/link';
import React from 'react';
import LargeVerticalImageFallback from './LargeVerticalImageFallback';

interface LargeVerticalCardProps {
  id: string | number;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
}

const LargeVerticalCard: React.FC<{ article: LargeVerticalCardProps }> = ({
  article,
}) => {
  return (
    <div
      key={article.id}
      className="overflow-hidden rounded-lg border bg-white shadow-lg"
    >
      <div className="relative h-48 w-full">
        <LargeVerticalImageFallback src={article.image} alt={article.title}/>
      </div>
      <div className="p-4">
        <div className="mb-2 text-xs text-gray-500">{article.date}</div>
        <h3 className="mb-2 text-lg font-bold">{article.title}</h3>
        <p className="mb-4 text-sm text-gray-700">{article.description}</p>
        <div className="mt-auto flex items-center gap-2">
          <Link
            href={`/${article.category}/${article.id}`}
            className="mt-1 flex items-center gap-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-xs text-transparent hover:from-blue-700 hover:to-pink-700"
            type="button"
            aria-label={`Read more about ${article.title}`}
          >
            <span className="sr-only">Read more about {article.title}</span>
            <span aria-hidden="true">Read more</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LargeVerticalCard;
