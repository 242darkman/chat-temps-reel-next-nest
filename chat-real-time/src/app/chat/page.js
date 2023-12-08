'use client';

import React, { useEffect, useState } from 'react';

import BaseChatInput from '../(component)/BaseChatInput.jsx';
import BaseChatMessagesDisplay from '../(component)/BaseChatMessagesDisplay.jsx';
import BaseNavBar from '../(component)/BaseNavBar.jsx';
import LANGUAGES from '../(utils)/app.constants.js';
import { ToastContainer } from 'react-toastify';
import filter from 'lodash/filter.js';
import find from 'lodash/find.js';
import get from 'lodash/get.js';
import io from 'socket.io-client';
import map from 'lodash/map.js';
import some from 'lodash/some.js';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useUserContext } from '../(context)/UserContext.js';

export default function ChatPage() {
  const router = useRouter();
  const { contextUsername, setContextMessages } = useUserContext();
  const [socket, setSocket] = useState(null);
  const chatMock = [
    {
      messageId: 1,
      username: "Alice",
      message: "Hi there! How are you doing?",
      timestamp: "07/12/2023 à 18:55"
    },
    {
      messageId: 2,
      username: "Bob",
      message: "Hey Alice! I'm doing well, thanks. How about you?",
      timestamp: "07/12/2023 à 18:56"
    },
    {
      messageId: 3,
      username: "Alice",
      message: "I'm good too. Did you finish the project we discussed?",
      timestamp: "07/12/2023 à 18:57"
    },
    {
      messageId: 4,
      username: "Bob",
      message: "Yes, I did. I'll send you the details later today.",
      timestamp: "07/12/2023 à 18:58"
    },
    {
      messageId: 5,
      username: "Alice",
      message: "Great! Looking forward to it.",
      timestamp: "07/12/2023 à 18:59"
    },
    {
      messageId: 2,
      username: "Bob",
      message: "Saviez-vous que la Tour Eiffel a été construite en 1889 pour l'Exposition universelle à Paris ?",
      timestamp: "07/12/2023 à 19:10"
    },
    {
      messageId: 3,
      username: "Clara",
      message: "Je pense que la lune est faite de fromage vert. C'est étrange, non ?",
      timestamp: "07/12/2023 à 19:15"
    }
  ];
  const [messages, setMessages] = useState(chatMock);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);


  useEffect(() => {
    const newSocket = io('http://localhost:8001');
    setSocket(newSocket);

    setContextMessages(chatMock);
    
    /**
     * Vérifie si le nom d'utilisateur existe
     */
    if (!contextUsername) {
      toast.error("Le nom d'utilisateur est vide. Vous allez être redirigé vers la page d'accueil...", {
        position: "top-right",
        autoClose: 3000
      });
      router.push('/');
      return;
    }

    newSocket.on('connect', () => console.log('youuhhoooouuuuu'));

    /**
     * on écoute les messages entrants
     */
    newSocket.on('message', (newMessage) => {
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages, newMessage];
        setContextMessages(updatedMessages);
        return updatedMessages;
      });
    });

    /**
     * on met à jour les valeurs des messages traduits
     */
    newSocket.on('update_messages', (updatedMessages) => {
      setMessages(prevMessages => {
        const updatedPrevMessages = map(prevMessages, (msg) => {
          const msgId = get(msg, 'messageId');
          const updatedMessage = find(updatedMessages, (updatedMsg) => {
            const updatedMsgId = get(updatedMsg, 'messageId');
            return updatedMsgId === msgId;
          });
          return updatedMessage ? updatedMessage : msg;
        });
        setContextMessages(updatedPrevMessages);
        
        return updatedPrevMessages;
      });
    });

    newSocket.on('verification_result', (verifyResponse) => {
      setMessages(prevMessages => {
        const verifiedMessages = [...prevMessages, verifyResponse];
        setContextMessages(verifiedMessages);

        return verifiedMessages;
      }
      );
    });

    /**
     * Nettoie en se déconnectant du socket lors du démontage du composant
     */
    return () => {
      newSocket.disconnect();
      //socket.off('update_message');
      //socket.off('verification_result');
    }
  }, [contextUsername, router]);

  /**
   * fonction gérant la diffusion de messages dans le socket
   */
  const handleSend = (message) => {
    const msg = get(message, 'message');
    const translationLanguage = get(message, 'translationLanguage');
    
    if (socket) {
      socket.emit('send_message', {
        messageId: messages.length + 1,
        username: contextUsername,
        message: msg,
        translationLanguage
      });
    }
  };

  /**
   * fonction permettant de toggle le mode de sélection de message
   */
  const toggleSelectMode = () => setIsSelectMode(!isSelectMode);

  /**
   * fonction permettant de sélectionné/déselectionné un message
   * @param {*} messageId : identifiant du message
   */
  const handleSelectMessage = (message) => {
    setSelectedMessages(prevSelected => {
      const isMessageAlreadySelected = some(prevSelected, message);
      if (isMessageAlreadySelected) {
        const messageId = get(message, 'messageId');
        const filteredMessages = filter(prevSelected, (messageSelected) => {
          const selectedMessageId = get(messageSelected, 'messageId');
          return selectedMessageId !== messageId;
        });
        
        return filteredMessages;
      }

      return [...prevSelected, message];
    });
  };

  /**
   * Logique pour envoyer les messages sélectionnés pour traitement
   * @param {*} action 
   */
  const handleProcessSelectedMessages = (action, translationLanguage) => {
    if (socket) {
      socket.emit('process_selected_messages', {
        action,
        translationLanguage,
        messages: selectedMessages
      });
    }
  };

  /**
   * Gestionnaire pour la traduction
   */
  const handleTranslateSelectedMessages = (translatedLanguage) => {
    const language = get(translatedLanguage, 'value');
    handleProcessSelectedMessages('translate', language);
  };

  /**
   * Gestionnaire pour la vérification d'une information
   */
  const handleVerifySelectedMessages = () => {
    handleProcessSelectedMessages('verify');
  };


  return (
    <div className="flex flex-col h-full w-8/12 m-auto bg-gray-400">
      <BaseNavBar
        onToggleSelectMode={toggleSelectMode}
        selectedMessages={selectedMessages}
        onTranslate={handleTranslateSelectedMessages}
        onVerify={handleVerifySelectedMessages}
      />
      
        <div className="flex-grow overflow-y-auto p-4 scrollbar-hide">
        <BaseChatMessagesDisplay
          messages={messages}
          isSelectMode={isSelectMode}
          onSelectMessage={handleSelectMessage}
        />
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