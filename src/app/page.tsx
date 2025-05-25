import { Suspense } from 'react';
import SearchChatInterface from '@/components/chat-interface';
import { ChatStateProvider } from '@/components/chat-state-provider';
import PromptLibrary from '@/components/prompt-library';
import { getHomeScreenData } from './actions';
import ArticlesContainer from '@/components/articles-container';
import { Metadata } from 'next';
import { HOME_SCREEN_METADATA } from './metadata';

export const metadata : Metadata = {...HOME_SCREEN_METADATA};

export default function HomePage() {
  return (
    <div className="max-w-6xl px-4 mb-20">
      <ChatStateProvider>
        {/*Load this part immediately */}
        <SearchChatInterface />

        {/*Lazy-load server-side components */}
        <Suspense fallback={<ArticleSkeleton />}>
          <ServerSideContent />
        </Suspense>
      </ChatStateProvider>
    </div>
  );
}

async function ServerSideContent() {
  const { currentArticles, popularArticles, promptLibrary } = await getHomeScreenData();

  return (
    <>
      <div id="articles-container" style={{ display: 'block' }}>
        <ArticlesContainer articlesData={currentArticles || []} headerText='Current Articles' viewAllLink={'/viewcarticles'}/>
      </div>
      <div id="articles-container" className='mt-8' style={{ display: 'block' }}>
        <ArticlesContainer articlesData={popularArticles || []} headerText='Popular Articles' viewAllLink={'/viewparticles'}/>
      </div>
      <div className="mt-8">
        <PromptLibrary promptLibrary={promptLibrary} />
      </div>
    </>
  );
}

function ArticleSkeleton() {
  return (
    <>
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Top Articles</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex h-full flex-col overflow-hidden rounded-lg border bg-white shadow-lg"
            >
              {/* Image Skeleton */}
              <div
                className="relative animate-pulse bg-gray-300 object-cover"
                style={{ height: 192, width: 355 }}
              ></div>

              {/* Content Skeleton */}
              <div className="flex flex-1 flex-col p-4">
                <div className="mb-2 h-4 w-24 animate-pulse bg-gray-300"></div>
                <div className="mb-2 h-6 w-2/3 animate-pulse bg-gray-300"></div>
                <div className="mb-4 h-4 w-full animate-pulse bg-gray-300"></div>
                <div className="h-4 w-16 animate-pulse bg-gray-300"></div>
              </div>
            </div>
          ))}
        </div>
        {/* popular articles */}
        <div className="mt-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold">Popular Articles</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex h-full flex-col overflow-hidden rounded-lg border bg-white shadow-lg"
              >
                {/* Image Skeleton */}
                <div
                  className="relative animate-pulse bg-gray-300 object-cover"
                  style={{ height: 192, width: 355 }}
                ></div>

                {/* Content Skeleton */}
                <div className="flex flex-1 flex-col p-4">
                  <div className="mb-2 h-4 w-24 animate-pulse bg-gray-300"></div>
                  <div className="mb-2 h-6 w-2/3 animate-pulse bg-gray-300"></div>
                  <div className="mb-4 h-4 w-full animate-pulse bg-gray-300"></div>
                  <div className="h-4 w-16 animate-pulse bg-gray-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Article Prompt Librarys */}
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">Article Prompt Librarys</h2>
            
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="block max-w-sm animate-pulse rounded-lg border border-gray-200 bg-white p-6 shadow-lg"
              >
                <div className="mb-2 h-4 w-24 animate-pulse bg-gray-300"></div>
                <div className="h-4 w-full animate-pulse bg-gray-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export const dynamic = 'force-dynamic'; // Ensure this page is always server-rendered
