'use server';

interface article {
  id: string | number;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
}

type AIResponse = {
  aiResponse?: string;
  source: {
    id: string;
    title: string;
    description: string;
    category: string;
  };
  suggestions: string[];
  lastUsedPrompts?: string[];
};

export async function getHomeScreenData(): Promise<{ currentArticles: article[]; popularArticles: article[]; promptLibrary: article[], lastUsedPrompts: string[] }> {
  // Fetch data from the home screen API
  try {
    const res = await fetch(`${process.env.API_DOMAIN}/api/home-screen`);
    const data = await res.json();
    return {
      currentArticles: data.currentArticles || [],
      popularArticles: data.popularArticles || [],
      promptLibrary: data.promptLibrary || [],
      lastUsedPrompts: data.lastUsedPrompts || []
    };
  } catch (err) {
    console.error('Error in home screen api call:::', err);
    return { currentArticles: [], popularArticles: [], promptLibrary: [] , lastUsedPrompts: []  };
  }
};



export async function getAIChatResponse(query: string): Promise<AIResponse> {
  // Fetch data from the article API
  try {
    const res = await fetch(`${process.env.API_DOMAIN}/api/chat?q=${encodeURIComponent(query)}`, {
      cache: 'no-store',
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error in AI api call:::', err);
    return {
      aiResponse: '',
      source: {
        id: '',
        title: '',
        description: '',
        category: ''
      },
      suggestions: []
    };
  }
}