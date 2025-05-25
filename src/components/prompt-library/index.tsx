import Link from 'next/link';
import TextCard from '../card/TextCard';

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
        <Link href="/promptlibrary" className="text-sm text-black">
          View all
          <div className="w-13 mx-auto h-1 rounded bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {promptLibrary.map((prompt) => (
          <TextCard
            key={prompt.id}
            id={String(prompt.id)}
            title={prompt.title}
            description={prompt.description}
          />
        ))}
      </div>
    </>
  );
}
