import React, { useState } from 'react';

import BaseButton from './BaseButton.jsx';
import LANGUAGES from '../(utils)/app.constants.js';
import { MdSend } from 'react-icons/md';
import find from 'lodash/find.js';
import get from 'lodash/get.js';
import isEmpty from 'lodash/isEmpty.js';

const BaseChatInput = ({ onSend, options = [], }) => {
  const defaultLanguage = find(LANGUAGES, { value: 'French' });
  const [message, setMessage] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);

  const handleSend = (value) => {
    if (!isEmpty(value)) {
      setSelectedLanguage(value);
    }

    if (message.trim() !== '') {
      const translationLanguage = get(selectedLanguage, 'value');
      const sendedMessage = { message, translationLanguage };
      onSend(sendedMessage);
      setMessage('');
    }
  };

  return (
    <div className="flex items-center mt-4 gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-grow p-3.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" 
        placeholder="Saisissez un message..."
      />
      <BaseButton 
        onClick={handleSend}
        icon={<MdSend />} 
        splitMode={true}
        theme="primary" 
        className="rounded-r-lg"
        dropdownPosition="top"
        options={options}
      >
        Envoyer
      </BaseButton>
    </div>
  );
};

export default BaseChatInput;