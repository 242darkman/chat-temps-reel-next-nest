import React from 'react';

const BaseButton = ({ theme, children, icon, iconPosition, onClick }) => {
  const getButtonClasses = () => {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 p-3.5';
    if (theme === 'primary') {
      return `${baseClasses} bg-blue-500 text-white hover:bg-blue-600`;
    }
    if (theme === 'secondary') {
      return `${baseClasses} bg-gray-300 text-gray-700 hover:bg-gray-400`;
    }
    if (theme === 'tertiary') {
      return `${baseClasses} bg-transparent text-gray-500 hover:text-gray-700`;
    }
    return baseClasses;
  };

  const getIconClasses = () => {
    const baseClasses = 'w-5 h-5 mx-2.5';
    if (iconPosition === 'left') {
      return `${baseClasses} order-first`;
    }
    if (iconPosition === 'right') {
      return `${baseClasses} order-last`;
    }
    return baseClasses;
  };

  return (
    <button className={getButtonClasses()} onClick={onClick}>
      {icon && iconPosition === 'left' && <span className={getIconClasses()}> { icon } </span>}
      <span> { children } </span>
      {icon && iconPosition === 'right' && <span className={getIconClasses()}> { icon } </span>}
    </button>
  );
};

export default BaseButton;