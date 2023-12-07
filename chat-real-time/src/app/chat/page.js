'use client';

import React, { useEffect, useState } from 'react';

import BaseChatInput from '../(component)/BaseChatInput.jsx';
import BaseChatMessagesDisplay from '../(component)/BaseChatMessagesDisplay.jsx';
import BaseNavBar from '../(component)/BaseNavBar.jsx';
import LANGUAGES from '../(utils)/app.constants.js';
import { ToastContainer } from 'react-toastify';
import get from 'lodash/get.js';
import io from 'socket.io-client';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useUserContext } from '../(context)/UserContext.js';

export default function ChatPage() {
  const socket = io('http://localhost:8001');
  const router = useRouter();
  const { contextUsername } = useUserContext();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    /**
     * Vérifie si le nom d'utilisateur existe
     */
    if (!contextUsername) {
      toast.error("Le nom d'utilisateur est vide. Vous allez être redirigé vers la page d'accueil...", {
        position: "top-right",
        autoClose: 3000,
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

    /**
     * on écoute les messages entrants
     */
    socket.on('message', (newMessage) => {
      console.log("🚀 ~ file: page.js:43 ~ socket.on ~ newMessage:", newMessage)
      setMessages(prevMessages => [...prevMessages, newMessage]);
    });

    /**
     * Nettoie en se déconnectant du socket lors du démontage du composant
     */
    return () => socket.disconnect();
  }, [contextUsername, router]);

  /**
   * fonction gérant la diffusion de messages dans le socket
   */
  const handleSend = (message) => {
    const msg = get(message, 'message');
    const translationLanguage = get(message, 'translationLanguage');
    socket.emit('send_message', {
      username: contextUsername,
      message: msg,
      translationLanguage
    });
  };

  return (
    <div className="flex flex-col h-full w-8/12 m-auto bg-gray-400">
        <BaseNavBar 
          selectedMessages={[]} 
          //onTranslate={handleTranslate} 
          //onValidate={handleValidate} 
        />
      
        <div className="flex-grow overflow-y-auto p-4 scrollbar-hide">
          <BaseChatMessagesDisplay messages={messages} />
        </div>

        <div className="p-4">
        <BaseChatInput
          onSend={handleSend}
          options={LANGUAGES}
        />
        </div>
      
        <ToastContainer />
      </div>
  );
};