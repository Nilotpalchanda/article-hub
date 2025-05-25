'use server';

export const getAllPromptData = async () => {
  const response = await fetch(`${process.env.API_DOMAIN}/api/all-prompts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch all-prompts data');
  }
  const data = await response.json();
  return data;
};
