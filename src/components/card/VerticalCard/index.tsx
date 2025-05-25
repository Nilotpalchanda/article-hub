import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import VerticalImageFallback from './VerticalImageFallback';

interface VerticalCardProps {
  id: string | number;
  image: string;
  title: string;
  description: string;
  category: string;
  className?: string;
  rating?: number;
  group?: string;
}

export function VerticalCard({
  image,
  title,
  description,
  category,
  id,
  className,
  rating = 0,
}: VerticalCardProps) {
  const maxStars = 5;
  const stars = Array.from({ length: maxStars }, (_, i) => (
    <Star
      key={i}
      className={cn(
        'h-3 w-3',
        i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300',
      )}
      aria-label={i < rating ? 'Filled star' : 'Empty star'}
    />
  ));

  return (
    <div
      className={cn(
        'flex flex-col rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl',
        className,
      )}
    >
      <div className="relative h-32 w-full overflow-hidden rounded-t-lg">
        <VerticalImageFallback src={image} alt={title} />
      </div>
      <div className="p-4">
        <div className="mb-1 flex items-center justify-between text-xs text-gray-500">
          <span>{category}</span>
          <div className="ml-2 flex">{stars}</div>
        </div>
        <h2 className="mb-1 line-clamp-2 text-sm font-medium">{title}</h2>
        <p className="mb-1 line-clamp-2 text-xs text-gray-500">{description}</p>
        <div className="mt-auto flex items-center gap-2">
          <Link
            href={`/${encodeURIComponent(category)}/${id}`}
            className="mt-1 flex items-center gap-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-xs text-transparent hover:from-blue-700 hover:to-pink-700"
            type="button"
            aria-label={`Read more about ${title}`}
          >
            <span className="sr-only">{`Read more about ${title}`}</span>
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
}
