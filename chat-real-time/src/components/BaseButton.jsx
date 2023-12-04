import React from 'react';

const BUTTON_THEMES = {
  primary: 'bg-blue-500 text-white',
  secondary: 'bg-white text-blue-500 border border-blue-500',
  tertiary: 'bg-transparent text-blue-500',
};

const BaseButton = ({ children, theme = 'primary', icon, ...props }) => {
  const themeClasses = BUTTON_THEMES[theme];

  return (
    <button className={`p-2 rounded ${themeClasses}`} {...props}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default BaseButton;