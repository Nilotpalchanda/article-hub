"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define the context type
type ChatStateContextType = {
  isChat: boolean
  setIsChat: (value: boolean) => void
}

// Create the context with default values
const ChatStateContext = createContext<ChatStateContextType>({
  isChat: false,
  setIsChat: () => {},
})

// Hook to use the chat state
export const useChatState = () => useContext(ChatStateContext)

// Provider component
export function ChatStateProvider({ children }: { children: ReactNode }) {
  const [isChat, setIsChat] = useState(false)

  // Effect to hide/show knowledge picks based on chat state
  useEffect(() => {
    const knowledgePicksContainers = document.querySelectorAll("#articles-container")
    knowledgePicksContainers.forEach((container) => {
      if (isChat) {
        (container as HTMLElement).style.display = "none"
      } else {
        (container as HTMLElement).style.display = "block"
      }
    })
  }, [isChat])

  return <ChatStateContext.Provider value={{ isChat, setIsChat }}>{children}</ChatStateContext.Provider>
}
