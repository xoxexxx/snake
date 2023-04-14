import React, { createContext, useState } from "react";

export interface Snake {
  c: number[];
  d: string; 
}


export interface ISnake extends Array<Snake>{} 

export const CurrentContext = createContext<ISnake | {}[]>([{}, () => {}]);

export const CurrentProvider = ({ children }: any) => {
  const [state, setState] = useState<ISnake>([
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
