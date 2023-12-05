import React, { useState } from 'react';

import BaseButton from '@/components/BaseButton.jsx';
import { MdSend } from 'react-icons/md';

const BaseChatInput = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() !== '') {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <div className="flex items-center mt-4 gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-grow p-3.5 rounded-l-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" 
        placeholder="Saisissez un message..."
      />
      <BaseButton 
        onClick={handleSend}
        icon={<MdSend />} 
        theme="primary" 
        className="rounded-r-lg"
      >
        Envoyer
      </BaseButton>
    </div>
  );
};

export default BaseChatInput;