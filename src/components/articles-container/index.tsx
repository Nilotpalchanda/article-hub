import Image from 'next/image';
import Link from 'next/link';

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
          <div
            key={article.id}
            className="overflow-hidden rounded-lg border bg-white shadow-lg"
          >
            <div className="relative h-48 w-full">
              <Image
                src={`${article.image}?height=400&width=600`}
                alt={article.title}
                fill
                priority={false}
                loading="lazy"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <div className="mb-2 text-xs text-gray-500">{article.date}</div>
              <h3 className="mb-2 text-lg font-bold">{article.title}</h3>
              <p className="mb-4 text-sm text-gray-700">
                {article.description}
              </p>
              <div className="mt-auto flex items-center gap-2">
                <Link
                  href={`${viewAllLink}/${article.id}`}
                  className="mt-1 flex items-center gap-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-xs text-transparent hover:from-blue-700 hover:to-pink-700"
                  type="button"
                  aria-label={`Read more about ${article.title}`}
                >
                  Read more
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
