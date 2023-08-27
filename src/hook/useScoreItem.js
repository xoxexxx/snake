import { createContext, useState } from 'react';

export const CurrentItemContext = createContext([{}, () => {}]);



export const CurrentItemProvider = ({ children }) => {



  const [state, setState] = useState([4, 8]);

  return (
    <CurrentItemContext.Provider value={[state, setState]}>
      {children}
    </CurrentItemContext.Provider>
  );
}
