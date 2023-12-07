'use client';

import React, { useEffect, useState } from 'react';

import BaseChatInput from '../(component)/BaseChatInput.jsx';
import BaseChatMessagesDisplay from '../(component)/BaseChatMessagesDisplay.jsx';
import { ToastContainer } from 'react-toastify';
import io from 'socket.io-client';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useUserContext } from '../(context)/UserContext.js';
import LANGUAGES from '../(utils)/app.constants.js';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const { contextUsername } = useUserContext();
  const router = useRouter();
  const socket = io('http://localhost:8001'); // Connexion socket.io et écoute des messages

  useEffect(() => {
    // Vérifie si le nom d'utilisateur existe
    if (!contextUsername) {
      toast.error("Le nom d'utilisateur est vide. Vous allez être redirigé vers la page d'accueil...", {
        position: "top-right",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.push('/');
      return;
    }

    socket.on('connect', () => console.log('youuhhoooouuuuu'));

    socket.on('message', (newMessage) => {
      console.log("🚀 ~ file: page.js:43 ~ socket.on ~ newMessage:", newMessage)
      setMessages(prevMessages => [...prevMessages, newMessage]);
    });

    // Nettoie en se déconnectant du socket lors du démontage du composant
    return () => socket.disconnect();
  }, [contextUsername, router]);

  const handleSend = (message) => {
    socket.emit('send_message', { username: contextUsername, message });
  };

  return (
      <div className="flex flex-col h-full">
        <div className="flex-grow overflow-y-auto p-4 scrollbar-hide">
          <BaseChatMessagesDisplay messages={messages} />
        </div>

        <div className="p-4">
          <BaseChatInput onSend={handleSend} options={LANGUAGES}/>
        </div>
      
        <ToastContainer />
      </div>
  );
};