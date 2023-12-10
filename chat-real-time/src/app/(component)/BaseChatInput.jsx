import { MdMic, MdSend } from 'react-icons/md';
import React, { useEffect, useRef, useState } from 'react';

import BaseButton from './BaseButton.jsx';
import LANGUAGES from '../(utils)/app.constants.js';
import find from 'lodash/find.js';
import get from 'lodash/get.js';
import isEmpty from 'lodash/isEmpty.js';
import size from 'lodash/size.js';
import { useUserContext } from '../(context)/UserContext.js';

const BaseChatInput = ({ onSend, options = [], socket}) => {
  const defaultLanguage = find(LANGUAGES, { value: 'French' });
  const [message, setMessage] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { contextMessages } = useUserContext();
  const recognitionRef = useRef(null);

  const requestSuggestions = () => {
    if (socket && size(contextMessages) > 0) {
      socket.emit('request_suggestions', { messages: contextMessages });
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on('suggestions_response', (suggestions) => {
        setSuggestions(suggestions);
      });
    }

    if (isEmpty(message)) {
      requestSuggestions();
    }
  }, [socket]);

  const handleSend = (selectedLanguage) => {
    const translationLanguage = get(selectedLanguage, 'value') ?? get(defaultLanguage, 'value');

    if (message.trim() !== '') {
      const sendedMessage = { message, translationLanguage };
      onSend(sendedMessage);
      setMessage('');
    }
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
    setTimeout(() => {
      setShowSuggestions(false);
    }, 100);
  };

  const handleSuggestionClick = (e, suggestion) => {
    e.stopPropagation();
    setMessage(suggestion);
    setShowSuggestions(false);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Votre navigateur ne supporte pas la reconnaissance vocale");
      return;
    }

    const recognition = recognitionRef.current || new window.webkitSpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'fr-FR';
    recognition.onresult = (event) => {
      setMessage(event.results[0][0].transcript);
    };

    recognitionRef.current = recognition;

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      return;
    }

    recognitionRef.current.start();
    setIsRecording(true);
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
                key={`${suggestion}-${index}`}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={(e) => handleSuggestionClick(e, suggestion)}
              >
                {suggestion}
              </div>
            ))}
        </div>
      )}
      </div>
      <BaseButton 
        onClick={handleVoiceInput}
        icon={isRecording ? <MdMic color="red" /> : <MdMic style={{ width: '20px', height: '20px' }} />} 
        iconPosition='right'
        className="absolute right-0 mr-4"
        style='w-8'
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