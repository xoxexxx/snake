import React, { useState, useEffect, useContext } from 'react';
import { CurrentItemContext } from '../hook/useScoreItem';
import { CurrentContext } from "../hook/useContext";

export const SquareItem = ({ x, snake }) => {

const [item, setItem] = useContext(CurrentItemContext);

   useEffect(() => {

    if (snake[0].c.toString() === item.toString()) {
      setItem([random(), random()])
    };
  }, [snake[0].c]);



  return (
    <div
      className={`w-5 h-5
        ${snake.find((s) => s.c.toString() === x.toString())
          ? "bg-white"
          : `bg-lime-900`
      } ${item.toString() === x.toString()
        ? "bg-white"
        : `bg-lime-900`
      }`}
    />
  );
};


function random() {
  const x = Math.random() * 10;
  return Math.ceil(x) - 1
}
