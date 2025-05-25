'use client';

import { Search, Sparkles, ArrowUp } from 'lucide-react';
import {
  useState,
  useRef,
  type KeyboardEvent,
  useEffect,
} from 'react';
import { motion } from 'framer-motion';
import { getAIChatResponse, getHomeScreenData } from '@/app/actions';
import Link from 'next/link';
import { useChatState } from '../chat-state-provider';

type Message = {
  role: 'user' | 'ai';
  content: string;
  timestamp: string;
  source?: {
    id: string;
    category: string;
    title: string;
    description: string;
  };
  suggestions?: string[];
};

export default function SearchChatInterface() {
  const { isChat, setIsChat } = useChatState();
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [followUpInput, setFollowUpInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (chatEndRef.current && chatEndRef.current.parentElement) {
        const container = chatEndRef.current.parentElement;
        container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, [messages]);

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    return `${hours}:${minutes} ${ampm}`;
  };

  const simulateAITyping = async (userMessage: string) => {
    setIsTyping(true);
    const thinkingTime = Math.floor(Math.random() * 1000) + 1000;
    const aiResponseData = await getAIChatResponse(userMessage);
    setTimeout(() => {
      const timestamp = getCurrentTime();
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          content:
            aiResponseData.aiResponse || 'Sorry, I could not find an answer.',
          timestamp,
          source: aiResponseData.source,
          suggestions: aiResponseData.suggestions,
        },
      ]);
      setIsTyping(false);
    }, thinkingTime);
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    setSearchQuery(query);
    setIsChat(true);
    const timestamp = getCurrentTime();
    setMessages([{ role: 'user', content: query, timestamp }]);
    simulateAITyping(query);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      handleSearch(searchQuery);
    }
  };

  const handleFollowUpSubmit = () => {
    if (!followUpInput.trim()) return;
    const timestamp = getCurrentTime();
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: followUpInput, timestamp },
    ]);
    simulateAITyping(followUpInput);
    setFollowUpInput('');
  };

  const handleBadgeClick = (query: string) => {
    setSearchQuery(query);
    handleSearch(query);
  };

  const handleSuggestedQuestionClick = (question: string) => {
    const timestamp = getCurrentTime();
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: question, timestamp },
    ]);
    simulateAITyping(question);
  };

  const startNewChat = () => {
    setIsChat(false);
    setSearchQuery('');
    setMessages([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <>
      {/* Search Bar */}
      <div
        className={`relative mx-auto mb-8 max-w-2xl ${isChat ? '' : 'pt-12'}`}
      >
        {!isChat && (
          <div className="flex items-center rounded-full bg-white px-4 py-2 shadow-lg">
            <Search className="mr-2 h-5 w-5 text-gray-500" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Enter questions or keywords"
              className="flex-1 border-none bg-transparent focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isChat}
            />
            <button
              className="p-1 rounded-full bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 hover:brightness-110 transition"
              aria-label="Suggest a question"
              title="Suggest a question"
            >
              <Sparkles className="h-5 w-5 text-white" />
            </button>
          </div>
        )}
      </div>

      {/* Example Questions */}
      {!isChat && <TryAsk handleBadgeClick={handleBadgeClick} />}

      {/* Chat Interface */}
      {isChat && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="mx-auto flex h-[800px] max-w-6xl flex-col rounded-lg bg-gradient-to-tr to-neutral-200 p-4 shadow-lg sm:p-6"
        >
          <div className="flex h-full flex-col overflow-hidden">
            <div className="mb-2 text-sm text-gray-500">Today</div>

            <div className="chat-container scrollbar-thin flex-grow overflow-y-auto px-4 md:px-12">
              {messages.map((message, index) => (
                <div key={index}>
                  {message.role === 'user' ? (
                    <div className="flex justify-end">
                      <div className="mb-6 flex items-center gap-3 rounded-3xl bg-white p-4 shadow-xl">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-teal-700 to-teal-500 font-medium text-white">
                          NC
                        </div>
                        <div>
                          <div className="mb-1 text-xs text-black">
                            {message.timestamp}
                          </div>
                          <div className="text-sm">{message.content}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-6">
                      <div className="mb-2 text-sm text-gray-500">
                        ARTICLE EXPERT AI OVERVIEW | {message.timestamp}
                      </div>
                      <div className="mb-6 flex items-center gap-3 space-y-4 rounded-3xl bg-white p-4 shadow-xl">
                        {message.content.split('\n\n').map((paragraph, idx) => (
                          <p
                            className="text-sm"
                            key={idx}
                            dangerouslySetInnerHTML={{ __html: paragraph }}
                          />
                        ))}
                      </div>

                      {message.source?.title && (
                        <div className="mt-4">
                          <p className="mb-2 text-sm uppercase text-gray-500">
                            Sources
                          </p>
                          <div className="mb-6 flex w-full flex-col gap-3 text-sm text-neutral-800 sm:flex-row">
                            <div className="w-fit max-w-xs rounded-xl bg-white p-4 shadow-lg sm:max-w-sm">
                              <Link className="mb-2 text-base font-bold hover:underline" href={`/${message.source.category}/${message.source.id}`} target="_blank" rel="noopener noreferrer">
                                {message.source.title}
                              </Link>
                              <p className="text-sm text-gray-700">
                                {message.source.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="mb-6">
                  <div className="mb-2 text-sm text-gray-500">
                    ARTICLE EXPERT AI is typing...
                  </div>
                  <div className="flex space-x-2 p-3">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                      style={{ animationDelay: '300ms' }}
                    ></div>
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                      style={{ animationDelay: '600ms' }}
                    ></div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Follow-up Suggestions */}
            <div className="px-4 pt-4">
              {messages.length > 0 &&
                messages[messages.length - 1].role === 'ai' &&
                (messages[messages.length - 1].suggestions?.length ?? 0) >
                  0 && (
                  <div>
                    <div className="mb-2 text-sm uppercase text-gray-500">
                      You might also want to ask:
                    </div>
                    <div className="mt-2 flex flex-wrap gap-3">
                      {messages[messages.length - 1].suggestions!.map(
                        (question, index) => (
                          <button
                            key={index}
                            className="rounded-full border bg-white px-4 py-2 text-xs hover:bg-gray-50"
                            onClick={() =>
                              handleSuggestedQuestionClick(question)
                            }
                          >
                            {question}
                          </button>
                        ),
                      )}
                    </div>
                  </div>
                )}
            </div>

            {/* Follow-up Input */}
            <div className="sticky bottom-0 w-full bg-transparent p-4 shadow-md">
              <div className="relative rounded-2xl border border-neutral-200 bg-white shadow-md">
                <div className="flex">
                  <textarea
                    className="m-4 min-h-16 grow resize-none text-sm outline-none sm:text-base"
                    placeholder="Type your question here ..."
                    value={followUpInput}
                    onChange={(e) => setFollowUpInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === 'Enter' && handleFollowUpSubmit()
                    }
                    disabled={isTyping}
                  />
                </div>
                <div className="absolute bottom-2 right-2 flex items-center gap-2">
                  <div className="text-xs">0/4000</div>
                  <button
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-teal-200 via-cyan-200 to-blue-200 p-2 text-teal-700 shadow-md transition hover:brightness-110"
                    onClick={handleFollowUpSubmit}
                    disabled={isTyping}
                  >
                    <ArrowUp />
                  </button>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-500">Need to start over?</div>
                <button
                  onClick={startNewChat}
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 via-cyan-100 to-teal-100 px-4 py-2 text-teal-700 shadow-md transition hover:brightness-110"
                >
                  Start a new chat
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}

type TryAskProps = {
  handleBadgeClick: (query: string) => void;
};

const TryAsk = ({ handleBadgeClick }: TryAskProps) => {
  const [lastUsedPrompts, setLastUsedPrompts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getHomeScreenData().then((data) => {
      if (isMounted) {
        setLastUsedPrompts(data.lastUsedPrompts || []);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
        <span className="text-sm text-black">Try asking:</span>
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-full bg-white px-4 py-1.5 text-xs shadow-lg"
          >
            <div className="h-3 w-60 rounded bg-gray-300"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
      <span className="text-sm text-black">Try asking:</span>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {lastUsedPrompts.map((prompt, index) => (
          <button
            key={index}
            className="rounded-full bg-white px-4 py-1.5 text-xs shadow-lg hover:bg-gradient-to-r hover:from-blue-100 hover:via-cyan-100 hover:to-teal-100"
            onClick={() => handleBadgeClick(prompt)}
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};
