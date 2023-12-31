import React, { useEffect, useRef } from 'react';

import BaseChatBubble from './BaseChatBubble.jsx';

const BaseChatMessagesDisplay = ({ messages, isSelectMode, onSelectMessage }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="overflow-y-auto p-4">
      {messages.map((message, index) => (
        <BaseChatBubble
            key={index}
            user={message.username}
            message={message.message}
            timestamp={message.timestamp}
            isContinued={index > 0 && messages[index - 1].username === message.username}
            isSelectMode={isSelectMode}
            onSelect={() => onSelectMessage(message)}
            verificationStatus={message.status}
          />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default BaseChatMessagesDisplay;
