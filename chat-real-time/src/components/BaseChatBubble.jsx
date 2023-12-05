import React from 'react';

const BaseChatBubble = ({ user, message, timestamp, isContinued }) => {
  return (
    <div className={`flex ${user === 'me' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex flex-col max-w-2/3`}>
        {!isContinued && <p className="text-xs text-gray-500 mb-1">{user === 'me' ? 'Moi' : user}</p>}
        <div className={`rounded-xl p-4 shadow-md ${user === 'me' ? 'bg-blue-200' : 'bg-gray-200'} relative`}>
          {user === 'me' && <div className="absolute -left-2 top-3 w-0 h-0 border-t-[15px] border-t-transparent border-r-[15px] border-r-blue-200 border-b-[15px] border-b-transparent"></div>}
          {user !== 'me' && <div className="absolute -right-2 top-3 w-0 h-0 border-t-[15px] border-t-transparent border-l-[15px] border-l-gray-200 border-b-[15px] border-b-transparent"></div>}
          <p className="break-words">{message}</p>
          <p className="text-xs text-gray-500 mt-2">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

export default BaseChatBubble;
