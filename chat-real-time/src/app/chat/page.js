'use client';

import BaseChatInput from '../(component)/BaseChatInput.jsx';
import BaseChatMessagesDisplay from '../(component)/BaseChatMessagesDisplay.jsx';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserContext } from '../(context)/UserContext.js';

export default function ChatPage() {
  const messages = [
    { user: '242darkman', message: 'Hello!', timestamp: '05/12/2023 23:43' },
    { user: 'Siboy', message: 'Hi there!', timestamp: '05/12/2023 23:45' },
    { user: '242darkman', message: 'How are you?', timestamp: '05/12/2023 23:46' },
    { user: 'Siboy', message: 'I am good, thanks!', timestamp: '05/12/2023 23:47' },
  ];
  const { contextUsername } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!contextUsername) {
      toast.error("Le nom d'utilisateur est vide. Vous allez être rediriger vers la page d'accueil...", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
    });
      router.push('/');
    }
  }, [contextUsername, router]);

  const handleSend = (message) => {
    // !important Implement this function
    console.log('Sending message:', message);
  };

  return (
      <div className="flex flex-col h-full">
        <div className="flex-grow overflow-y-auto p-4 scrollbar-hide">
          <BaseChatMessagesDisplay messages={messages} />
        </div>

        <div className="p-4">
          <BaseChatInput onSend={handleSend} />
        </div>
      
        <ToastContainer />
      </div>
  );
};