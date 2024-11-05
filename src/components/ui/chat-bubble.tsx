// ChatBubble.tsx
import React from 'react';

interface ChatBubbleProps {
  fromBot: boolean;
  children: React.ReactNode;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ fromBot, children }) => {
  return (
    <div className={`p-2 rounded-lg ${fromBot ? 'bg-gray-200' : 'bg-blue-500 text-white self-end'}`}>
      {children}
    </div>
  );
};

export default ChatBubble;