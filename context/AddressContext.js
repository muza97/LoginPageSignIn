import React, { createContext, useContext, useState } from 'react';

const AddressContext = createContext();

export const useAddress = () => useContext(AddressContext);

export const AddressProvider = ({ children }) => {
  const [homeAddress, setHomeAddress] = useState('');

  // Any other logic or state

  return (
    <AddressContext.Provider value={{ homeAddress, setHomeAddress }}>
      {children}
    </AddressContext.Provider>
  );
};