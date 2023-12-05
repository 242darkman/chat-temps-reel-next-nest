import React, { useState } from 'react';

/**
 * Création d'un nouveau contexte
 */
export const UserContext = React.createContext();

/**
 * Création d'un composant UserProvider qui enveloppera ses enfants avec un UserContext.Provide,
 * rendant le contexte disponible à tous les composants enfants
 *
 * @param {object} children - The children of the UserProvider component.
 * @return {JSX.Element} The wrapped children with the UserContext.Provider.
 */
export const UserProvider = ({ children }) => {
  const [contextUsername, setContextUsername] = useState('');

  return (
    <UserContext.Provider value={{ contextUsername, setContextUsername }}>
      {children}
    </UserContext.Provider>
  );
};