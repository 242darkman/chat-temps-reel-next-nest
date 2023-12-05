'use client';

import { UserContext, UserProvider } from '@/stores/UserContext.js';
import { useContext, useState } from 'react';

import BaseButton from '@/components/BaseButton.jsx';
import { FaArrowRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function Home() {
  return (
    <UserProvider>
      <HomePageContent />
    </UserProvider>
  );
}

function HomePageContent() {
  const [username, setUsername] = useState('');
  const { setContextUsername } = useContext(UserContext);
  const router = useRouter();
  
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  
  const handleChatRedirect = () => {
    setContextUsername(username);
    router.push('/chat');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full py-2">
      <h1 className="text-4xl mb-1 text-blue-400 shadow-lg animate-pulse">
        Bienvenue sur ParleyPoint
      </h1>
      <p className="mt-3 text-2xl text-bright-color">
        Entrez votre nom d'utilisateur pour commencer à discuter
      </p>
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={handleUsernameChange}
        className="my-8 p-3 border rounded-md w-1/3"
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