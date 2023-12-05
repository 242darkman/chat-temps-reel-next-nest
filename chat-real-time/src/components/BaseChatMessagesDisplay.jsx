import React, { useEffect, useRef } from 'react';

import BaseChatBubble from '@/components/BaseChatBubble.jsx';

const BaseChatMessagesDisplay = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="overflow-y-auto p-4 h-full">
      {messages.map((message, index) => (
        <BaseChatBubble
            key={index}
            user={message.user}
            message={message.message}
            timestamp={message.timestamp}
            isContinued={index > 0 && messages[index - 1].user === message.user}
          />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default BaseChatMessagesDisplay;
