'use client';

import BaseButton from './(component)/BaseButton.jsx';
import { FaArrowRight } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useUserContext } from './(context)/UserContext.js';

export default function Home() {
  const [username, setUsername] = useState('');
  const { setContextUsername } = useUserContext();
  const router = useRouter();
  
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  
  const handleChatRedirect = () => {
    setContextUsername(username);
    router.push('/chat');
    toast.success(`Bienvenue ${username} ! Prêt pour une nouvelle discussion ?`, {autoClose: 3000});
  };

  return (
    <div className="flex flex-col flex-grow items-center justify-center py-2 w-full">
      <h1 className="text-4xl mb-1 text-blue-400 shadow-lg animate-pulse">
        Bienvenue sur ParleyPoint
      </h1>
      <p className="mt-3 text-2xl text-bright-color">
        Entrez votre nom d'utilisateur pour commencer à discuter
      </p>
      <input
        type="text"
        placeholder="Nom d'utilisateur..."
        value={username}
        onChange={handleUsernameChange}
        className="my-8 p-3 border rounded-md w-2/6 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {username && (
        <BaseButton
          onClick={handleChatRedirect}
          theme="primary"
          icon={<FaArrowRight />}
          iconPosition="right"
          className="mt-8" 
        >
          Commencer la discussion
        </BaseButton>
      )}
    </div>
  );
}