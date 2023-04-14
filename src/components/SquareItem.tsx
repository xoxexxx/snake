import React from "react";
import { Snake } from "../hook/useContext";
export const SquareItem: React.FC<{ x: number[], snake: any}> = ({ x, snake }) => {
  



  return (
    <div
      className={`w-5 h-5 ${
        //@ts-ignore
        snake.find((s: Snake) => s.c.toString() === x.toString())
          ? "bg-white"
          : `bg-black`
      }`}
    />
  );
};
