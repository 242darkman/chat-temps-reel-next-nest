'use client';

import BaseChatInput from '@/components/BaseChatInput.jsx';
import BaseChatMessagesDisplay from '@/components/BaseChatMessagesDisplay.jsx';
import React from 'react';
import { UserProvider } from '@/stores/UserContext.js';

export default function ChatPage () {
  const messages = [
    { user: 'me', message: 'Hello!', timestamp: '05/12/2023 23:43' },
    { user: 'you', message: 'Hi there!', timestamp: '05/12/2023 23:45' },
    { user: 'me', message: 'How are you?', timestamp: '05/12/2023 23:46' },
    { user: 'you', message: 'I am good, thanks!', timestamp: '05/12/2023 23:47' },
  ];

  const handleSend = (message) => {
    // Handle sending message
    console.log('Sending message:', message);
  };

  return (
    <UserProvider>
      <div className="flex flex-col h-full">
        <div className="flex-grow overflow-y-auto p-4 scrollbar-hide">
          <BaseChatMessagesDisplay messages={messages} />
        </div>

        <div className="p-4">
          <BaseChatInput onSend={handleSend} />
        </div>
      </div>
    </UserProvider>
  );
};