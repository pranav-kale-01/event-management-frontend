import React, { useState, useEffect, useRef } from "react";
import { getClient } from "@botpress/webchat";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import ChatBubble from "./ui/chat-bubble";
import { API_URL, CLIENT_ID } from "../constants";

var userMessages: any[] = [];

const Chatbot: React.FC = () => {
  const clientId = CLIENT_ID;
  const token = localStorage.getItem("token");
  const [client] = useState(getClient({ clientId }));
  const [_, setChatUI] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messageListenerInitialized = useRef(false); // Ref to track listener initialization

  useEffect(() => {
    initializeChatbot();

    // Cleanup function to disconnect client when component unmounts
    return () => {
      client.disconnect();
      console.log("Client disconnected");
    };
  }, [client]); // Pass client as a dependency

  const initializeChatbot = async () => {
    userMessages = [];
    setChatUI([]);

    try {
      await client.connect();
      console.log("Connected to bot");

      // Check if the listener is already initialized
      if (!messageListenerInitialized.current) {
        client.on("message", (message: any) => {
          console.log("5", userMessages);
          userMessages.push({
            text: message.payload.block.text,
            fromBot: true,
          });
          console.log("6", userMessages);
          setChatUI([]);

          updateMessageHistory();
        });
        messageListenerInitialized.current = true; // Mark as initialized
      }

      // Load message history from the backend
      await loadMessageHistory();
    } catch (error) {
      console.error("Error connecting to bot:", error);
    }
  };

  const loadMessageHistory = async () => {
    try {
      const user = await JSON.parse(
        localStorage.getItem("user") || JSON.stringify({})
      );
      console.log("User ID:", user);

      const response = await fetch(`${API_URL}/api/chats/getChat/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data || "Could not fetch chats");
      }
      if (data.length > 0) {
        console.log("3", userMessages);
        console.log(data);
        userMessages = data;
        console.log("4", userMessages);
      }
      setChatUI([]);
    } catch (error) {
      console.error("Error fetching chats:", error);
      return [];
    }
  };

  const updateMessageHistory = async () => {
    try {
      if (userMessages.length === 0) {
        console.log("empty aray");
        console.log(userMessages);
        return;
      }

      const user = await JSON.parse(
        localStorage.getItem("user") || JSON.stringify({})
      );
      console.log("User ID:", user);

      const response = await fetch(`${API_URL}/api/chats/updateChats/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userMessages),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not update chat");
      }
    } catch (error) {
      console.error("Error updating chat:", error);
      return null;
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    // Add user message to chat
    console.log("1", userMessages);
    const userPrompt = { text: inputValue, fromBot: false };
    userMessages.push(userPrompt);
    console.log("user prompt", userPrompt);
    console.log("2", userMessages);

    const inp = inputValue;
    setInputValue("");

    await client.sendMessage({
      type: "text",
      text: inp,
    });
  };

  return (
    <div className="flex flex-col h-full p-4 ">
      <div className="flex-1 overflow-y-scroll pr-2 mb-4">
        {userMessages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 w-fit max-w-[80%] ${msg.fromBot ? "mr-auto" : "ml-auto"}`}
          >
            <ChatBubble fromBot={msg.fromBot}>{msg.text}</ChatBubble>
          </div>
        ))}
      </div>
      <div className="flex">
        <Input
          value={inputValue}
          onChange={(e: any) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button onClick={handleSendMessage} className="ml-2">
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chatbot;
