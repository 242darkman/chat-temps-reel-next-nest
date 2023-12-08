import BaseButton from './BaseButton.jsx';
import { FaGlobeAfrica } from "react-icons/fa";
import LANGUAGES from '../(utils)/app.constants.js';
import React from 'react';

const BaseNavBar = ({ onToggleSelectMode, selectedMessages, onTranslate, onVerify }) => {
  
  return (
    <div className="flex flex-col p-2 bg-gray-200 rounded-lg rounded-t-none">
      
      <div className="flex justify-end space-x-4 m-auto">
        <BaseButton
          onClick={onToggleSelectMode} className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Sélectionner
        </BaseButton>

        {
          selectedMessages && selectedMessages.length > 0 &&
          (
            <>
              <BaseButton
                onClick={onTranslate}
                splitMode={true}
                icon={<FaGlobeAfrica />}
                iconPosition='left'
                options={LANGUAGES}
              >
                Traduire
              </BaseButton>
              <BaseButton theme='secondary' onClick={onVerify}>Valider l'info</BaseButton>
            </>
          )
        }
      </div>
      
      {
        selectedMessages && selectedMessages.length > 0 && 
        <div className='flex justify-center py-1.5 text-xs'>
          {selectedMessages.length} messages sélectionnés
        </div>
      }
    </div>
  );
};

export default BaseNavBar;
