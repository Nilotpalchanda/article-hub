'use server';

export const getPopularArticlesData = async () => {
  const response = await fetch(`${process.env.API_DOMAIN}/api/popular-articles`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch current-articles data');
  }
  const data = await response.json();
  return data;
};
