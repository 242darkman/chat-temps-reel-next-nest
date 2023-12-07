'use client';
import React from 'react';
import BaseButton from '../(component)/BaseButton.jsx';

const BaseButtonTestPage = () => {
  const splitButtonOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  const handleClick = (value) => {
    console.log('Button clicked with value:', value);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Test des états du BaseButton</h2>
      <div className="space-y-3 flex flex-col justify-items-stretch">
        <BaseButton theme="primary" onClick={() => handleClick('primary')}>
          Bouton Primaire
        </BaseButton>
        <BaseButton theme="secondary" onClick={() => handleClick('secondary')}>
          Bouton Secondaire
        </BaseButton>
        <BaseButton theme="tertiary" onClick={() => handleClick('tertiary')}>
          Bouton Tertiaire
        </BaseButton>
        <BaseButton
          theme="primary"
          splitMode={true}
          options={splitButtonOptions}
          onClick={handleClick}
          dropdownPosition="bottom"
        >
          SplitButton Primaire
        </BaseButton>
        <BaseButton
          theme="secondary"
          splitMode={true}
          options={splitButtonOptions}
          onClick={handleClick}
          dropdownPosition="top"
        >
          SplitButton Secondaire
        </BaseButton>
        <BaseButton
          theme="tertiary"
          splitMode={true}
          options={splitButtonOptions}
          onClick={handleClick}
        >
          SplitButton Tertiaire
        </BaseButton>
      </div>
    </div>
  );
};

export default BaseButtonTestPage;
