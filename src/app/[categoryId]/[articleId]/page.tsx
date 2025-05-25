import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPopularArticlesData } from '@/app/viewparticles/actions';
import { getCurrentArticlesData } from '@/app/viewcarticles/actions';
import { Metadata } from 'next';

type Article = {
  id: string | number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  category: string;
  duration: string;
  rating: number;
};

interface PageProps {
  params: Promise<{ articleId: string }>;
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const resolvedParams = await params;
  const articles = await getArticles();
  const article = articles.find((a) => String(a.id) === resolvedParams.articleId);

  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'This article could not be found.',
    };
  }

  return {
    title: `${article.title} | ArticleHub`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://article-hub-kappa.vercel.app/${article.category.toLowerCase()}/${article.id}`,
      images: [
        {
          url: article.image,
          width: 800,
          height: 600,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [article.image],
    },
  };
}

async function getArticles(): Promise<Article[]> {
  const popularArticles =  await getPopularArticlesData();
  const currentArticles = await getCurrentArticlesData();
  return [...popularArticles, ...currentArticles];
}

export async function generateStaticParams(): Promise<{ articleId: string }[]> {
  const articles = await getArticles();
  return articles.map((article) => ({
    articleId: String(article.id), // Ensure IDs are strings
  }));
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params; // Await the params if it's a Promise
  const { articleId } = resolvedParams;
  const articles = await getArticles();
  const article = articles.find((a) => String(a.id) === articleId);

  if (!article) {
    notFound();
  }

  return (
    <main className="container mx-auto max-w-3xl flex-grow px-4 py-10">
      <article className="overflow-hidden rounded-2xl bg-white">
        <Image
          src={article.image}
          alt={article.title}
          width={800}
          height={400}
          loading="lazy"
          priority={false}
          className="h-64 w-full object-cover"
        />
        <div className="p-8">
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700 uppercase">
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <svg
                className="inline-block h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3"
                ></path>
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
              {article.duration} min read
            </span>
            <span className="ml-auto flex items-center gap-1 text-xs text-yellow-500">
              <svg
                className="inline-block h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
              </svg>
              {article.rating}
            </span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold text-gray-900">
            {article.title}
          </h1>
          <div
            className="prose prose-lg mb-8 text-gray-700"
            dangerouslySetInnerHTML={{ __html: article.longDescription }}
          ></div>
          <div className="mt-8 flex items-center gap-4">
            <Image
              src="/next.svg"
              alt="Author"
              width={48}
              height={48}
              priority={false}
              loading="lazy"
              className="h-12 w-12 rounded-full border-2 border-blue-200"
            />
            <div>
              <div className="font-semibold text-gray-800">John Doe</div>
              <div className="text-sm text-gray-500">
                Published on June 1, 2024
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}


// export const fetchCache = 'force-no-store'; // Prevent caching in the App Router
export const revalidate = 5; // Revalidate every 5 seconds to ensure fresh content


