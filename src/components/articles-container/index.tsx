import Link from 'next/link';
import LargeVerticalCard from '../card/LargeVerticleCard';

interface Article {
  id: string | number;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
}

export default function ArticlesContainer({
  articlesData,
  headerText,
  viewAllLink,
}: {
  articlesData: Article[];
  headerText?: string;
  viewAllLink: string;
}) {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {headerText}
          <div className="mx-auto h-1 w-40 rounded bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        </h2>
        <Link href={viewAllLink} className="text-sm text-black">
          View all
          <div className="w-13 mx-auto h-1 rounded bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {articlesData.map((article) => (
          <LargeVerticalCard 
            key={article.id}
            article={article}
          />
        ))}
      </div>
    </>
  );
}
