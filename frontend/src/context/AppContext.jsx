import React, { createContext } from 'react';
import { doctors } from '../assets/assets';

export const AppContext = createContext()

const AppContextProvider = (props) => {

  const currenySymnol = '$'

  const value = {
   doctors,
   currenySymnol
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;