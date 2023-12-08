'use client';

import { createContext, useContext, useState } from 'react';

/**
 * Création d'un nouveau contexte
 */
export const UserContext = createContext({});

export const useUserContext = () => {
  return useContext(UserContext);
}

/**
 * Création d'un composant UserProvider qui enveloppera ses enfants avec un UserContext.Provide,
 * rendant le contexte disponible à tous les composants enfants
 *
 * @param {object} children - Les enfants du composant UserProvider.
 * @return {JSX.Element} Les enfants enveloppés avec le UserContext.Provider.
 */
export const UserProvider = ({ children }) => {
  const [contextUsername, setContextUsername] = useState('');
  const [contextMessages, setContextMessages] = useState([]);

  return (
    <UserContext.Provider value={{ 
      contextUsername,
      setContextUsername,
      contextMessages,
      setContextMessages
    }}>
      {children}
    </UserContext.Provider>
  );
};