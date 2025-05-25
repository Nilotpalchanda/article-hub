import Link from 'next/link';

interface Prompt {
  id: string | number;
  title: string;
  description: string;
}

export default function PromptLibrary({
  promptLibrary,
}: {
  promptLibrary: Prompt[];
}) {
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">
          Article Prompt Librarys
          <div className="w-50 mx-auto h-1 rounded bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        </h2>
        <Link href="/promptlibrary" className="text-sm text-black ">
          View all
          <div className="mx-auto h-1 w-13 rounded bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {promptLibrary.map((prompt) => (
          <div
            key={prompt.id}
            className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-lg hover:bg-gray-100"
          >
            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
              {prompt.title}
            </h5>
            <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
              {prompt.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
