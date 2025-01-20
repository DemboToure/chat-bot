import { motion } from "framer-motion";
import React from "react";
import ReactMarkdown from "react-markdown";

interface Message {
  text: string;
  isUser: boolean;
  id?: string;
}

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`
          max-w-[85%] sm:max-w-[70%] px-4 py-3 rounded-2xl
          ${
            isUser
              ? "bg-primary text-primary-foreground rounded-tr-none"
              : "bg-muted text-foreground rounded-tl-none"
          }
          shadow-sm
          transform transition-all duration-200 hover:shadow-md
        `}
      >
        <div className="text-[15px] leading-relaxed">
          <ReactMarkdown>{message}</ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
};

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center space-x-2 p-3 max-w-fit rounded-2xl bg-muted">
      <div className="flex space-x-1">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 0 }}
            animate={{ y: [-2, 2, -2] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="w-2 h-2 bg-foreground/50 rounded-full"
          />
        ))}
      </div>
    </div>
  );
};

interface ChatContainerProps {
  messages: Message[];
  isLoading?: boolean;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  isLoading = false,
}) => {
  return (
    <div className="w-full p-4 space-y-4">
      {messages.map((msg, index) => (
        <ChatMessage
          key={msg.id || index}
          message={msg.text}
          isUser={msg.isUser}
        />
      ))}
      {isLoading && <TypingIndicator />}
    </div>
  );
};

export default ChatContainer;
