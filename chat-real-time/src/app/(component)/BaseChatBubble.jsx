import React from 'react';
import get from 'lodash/get.js';
import { useUserContext } from '../(context)/UserContext.js';

const BaseChatBubble = ({ 
  user, 
  message, 
  timestamp, 
  isContinued, 
  isSelectMode, 
  onSelect,
  verificationStatus }) => {
  const { contextUsername } = useUserContext();

  const getBackgroundColor = () => {
    if (user === 'Cerebrix' && verificationStatus === 'incorrect') {
      return 'bg-red-500 text-white';
    }

    if (user === 'Cerebrix' && verificationStatus === 'correct') {
      return 'bg-green-500';
    }

    if (user === contextUsername) {
      return 'bg-blue-200';
    }

    return 'bg-gray-200';
  };


  return (
    <div
      className={`flex ${user === `${contextUsername}` ? 'justify-end' : 'justify-start'} items-center mb-4`}
    >
      {isSelectMode && user !== `${contextUsername}` && (
        <input type="checkbox" onClick={onSelect} className="rounded-full mr-2" />
      )}
      
      <div className={`flex flex-col max-w-2/3`}>
        {!isContinued && <p className="text-xs text-gray-500 mb-1">{user === `${contextUsername}` ? 'Moi' : user}</p>}
        <div className={`rounded-xl p-4 shadow-md ${getBackgroundColor()} relative`}>
          {user === `${contextUsername}` && <div className="absolute -left-2 top-3 w-0 h-0 border-t-[15px] border-t-transparent border-r-[15px] border-r-blue-200 border-b-[15px] border-b-transparent"></div>}
          {user !== `${contextUsername}` && <div className="absolute -right-2 top-3 w-0 h-0 border-t-[15px] border-t-transparent border-l-[15px] border-l-gray-200 border-b-[15px] border-b-transparent"></div>}
          {user === 'Cerebrix' && verificationStatus === 'correct' && <div className="absolute -right-2 top-3 w-0 h-0 border-t-[15px] border-t-transparent border-l-[15px] border-l-green-500 border-b-[15px] border-b-transparent"></div>}
          {user === 'Cerebrix' && verificationStatus === 'incorrect' && <div className="absolute -right-2 top-3 w-0 h-0 border-t-[15px] border-t-transparent border-l-[15px] border-l-red-500 border-b-[15px] border-b-transparent"></div>}
          <p className="break-words">{message}</p>
          <p className="text-xs text-gray-500 mt-2">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

export default BaseChatBubble;
