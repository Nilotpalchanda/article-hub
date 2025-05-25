import React from 'react';

interface TextCardProps {
  id: string;
  title: string;
  description: string;
}

const TextCard: React.FC<TextCardProps> = ({ id, title, description }) => (
  <div
    className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-lg hover:bg-gray-100"
    id={id}
  >
    <h2 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
      {title}
    </h2>
    <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
      {description}
    </p>
  </div>
);

export default TextCard;
