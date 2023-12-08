import React, { useEffect, useState } from 'react';

import BaseButton from './BaseButton.jsx';
import LANGUAGES from '../(utils)/app.constants.js';
import { MdSend } from 'react-icons/md';
import find from 'lodash/find.js';
import get from 'lodash/get.js';
import isEmpty from 'lodash/isEmpty.js';

const BaseChatInput = ({ onSend, options = [], suggests = []}) => {
  const defaultLanguage = find(LANGUAGES, { value: 'French' });
  const [message, setMessage] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const loadSuggestions = () => {
      if (message === '') {
        const fetchedSuggestions = ["Suggestion 1", "Suggestion 2", "Suggestion 3"];
        setSuggestions(fetchedSuggestions);
      }
    };

    loadSuggestions();
  }, [message]);

  const handleSend = (selectedLanguage) => {
    const translationLanguage = get(selectedLanguage, 'value') ?? get(defaultLanguage, 'value');

    if (message.trim() !== '') {
      const sendedMessage = { message, translationLanguage };
      onSend(sendedMessage);
      setMessage('');
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setMessage(suggestion);
    setShowSuggestions(false);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    if (!isEmpty(e.target.value)) {
      setShowSuggestions(false);
    }
  };

  const handleFocus = () => {
    if (isEmpty(message)) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = () => {
    setShowSuggestions(false);
  };

  return (
    <div className="flex items-center mt-4 gap-2 relative">
      <div className="flex-grow relative">
      <input
        type="text"
        value={message}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="w-full p-3.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Ecrire un message..."
      />
      {showSuggestions && (
        <div className="absolute bottom-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
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