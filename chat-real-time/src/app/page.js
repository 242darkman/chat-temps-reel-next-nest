import BaseButton from '@/components/BaseButton.jsx';
import { FaArrowRight } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleChatRedirect = () => {
    router.push('/chat');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Bienvenue sur ParleyPoint</h1>
      <p className="mt-3 text-2xl">Entrez votre nom d'utilisateur pour commencer à discuter</p>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange}
        className="mt-5 p-2 border rounded"
      />
      {username && (
        <BaseButton onClick={handleChatRedirect} theme="primary">
          Commencer la discussion <FaArrowRight />
        </BaseButton>
      )}
    </div>
  );
}
