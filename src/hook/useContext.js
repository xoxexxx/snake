import { createContext, useState } from "react";

export const CurrentContext = createContext([{}, () => {}]);

export const CurrentProvider = ({ children }) => {
  const [state, setState] = useState([
    { c: [2, 4], d: "left" },
    { c: [3, 4], d: "left" },
    { c: [4, 4], d: "left" },
    { c: [5, 4], d: "left" },
  ]);

  return (
    <CurrentContext.Provider value={[state, setState]}>
      {children}
    </CurrentContext.Provider>
  );
};
