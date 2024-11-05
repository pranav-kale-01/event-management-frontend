import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Trash2 } from 'lucide-react';

// Define the Message type
interface Message {
  id: number;
  role: 'user' | 'bot'; // Role can only be 'user' or 'bot'
  content: string;
  timestamp: string;
}

// Define the props for ChatHistory
interface ChatHistoryProps {
  userId: string; // Expecting userId to be a string
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ userId }) => {
  const [messages, setMessages] = useState<Message[]>([]); // Initialize messages as an array of Message

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const loadHistory = () => {
      const storedHistory = localStorage.getItem(`chatHistory_${userId}`);
      if (storedHistory) {
        setMessages(JSON.parse(storedHistory));
      }
    };

    loadHistory();
  }, [userId]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`chatHistory_${userId}`, JSON.stringify(messages));
  }, [messages, userId]);

  // Clear all messages for the current user
  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem(`chatHistory_${userId}`);
  };

  // Delete a single message
  const deleteMessage = (messageId: number) => {
    setMessages(prevMessages => 
      prevMessages.filter(message => message.id !== messageId)
    );
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Chat History
        </CardTitle>
        <button
          onClick={clearHistory}
          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-colors"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No chat history yet
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex flex-col p-3 rounded-lg ${
                    message.role === 'user' 
                      ? 'bg-blue-100 ml-8' 
                      : 'bg-gray-100 mr-8'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium">
                      {message.role === 'user' ? 'You' : 'Bot'}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                      <button
                        onClick={() => deleteMessage(message.id)}
                        className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-700">{message.content}</p>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ChatHistory;
