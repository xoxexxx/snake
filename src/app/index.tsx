import React, { useContext, useEffect, useMemo, useState } from "react";
import { SquareItem } from "../components/SquareItem";
import { CurrentContext, ISnake } from "../hook/useContext";
import { square } from "../utils/square-cords";

export const SnakeGame: React.FC = (): JSX.Element => {
  
  const [snake, stepSnake] = useContext<ISnake | {}[]>(CurrentContext);
  function eventKey(e: any) {
    if (e.key === "w") {
      if (snake?[0].d === "top" || snake?[0].d === "bottom") return;
      stepSnake((snake: ISnake) => [{c: snake[0].c, d: 'top' }, ...snake.slice(1)]);
    } else if (e.key === "d") {
      if (snake?[0].d === "right" || snake?[0].d === "left") return;
      stepSnake((snake: ISnake) => [{c: snake[0].c, d: 'right' }, ...snake.slice(1)]);
    } else if (e.key === "s") {
      if (snake?[0].d === "top" || snake?[0].d === "bottom") return;
      stepSnake((snake: ISnake) => [{c: snake[0].c, d: 'bottom' }, ...snake.slice(1)]);
    } else if (e.key === "a") {
      if (snake?[0].d === "right" || snake?[0].d === "left") return;
      stepSnake((snake: ISnake) => [{c: snake[0].c, d: 'left' }, ...snake.slice(1)]);
    }
  }
  useEffect(() => {
    window.addEventListener("keypress", eventKey);
    return () => window.removeEventListener("keypress", eventKey);
  }, [eventKey]);

  useEffect(() => {
    const step = setInterval(() => {
      if (snake[0].d === 'right') {
        stepSnake((snake) => [
          { c: [snake[0].c[0] + 1, snake[0].c[1]], d: snake[0].d },
          ...snake.slice(1),
        ]);
      } else if (snake[0].d === 'left') {
        stepSnake((snake) => [
          { c: [snake[0].c[0] - 1, snake[0].c[1]], d: snake[0].d },
          ...snake.slice(1),
        ]);
      } else if (snake[0].d === 'bottom') {
          stepSnake((snake) => [
            { c: [snake[0].c[0], snake[0].c[1] + 1], d: snake[0].d },
            ...snake.slice(1),
          ]);
      } else if (snake[0].d == 'top') {
         stepSnake((snake) => [
          { c: [snake[0].c[0], snake[0].c[1] - 1], d: snake[0].d },
          ...snake.slice(1),
        ]);
      }

      for (let i = 1; i < snake.length; i++) {

        if (snake[i].d === "right") {
          if (snake[i - 1].c[1] > snake[i].c[1]) {
            stepSnake((snake) => [
              ...snake.slice(0, i),
              { c: [snake[i].c[0], snake[i].c[1] + 1], d: "bottom" },
              ...snake.slice(i + 1),
            ]);
          } else if (snake[i - 1].c[1] < snake[i].c[1]) {
            stepSnake((snake) => [
              ...snake.slice(0, i),
              { c: [snake[i].c[0], snake[i].c[1] - 1], d: "top" },
              ...snake.slice(i + 1),
            ]);
          } else {
            stepSnake((snake) => [
              ...snake.slice(0, i),
              { c: [snake[i].c[0] + 1, snake[i].c[1]], d: snake[i].d },
              ...snake.slice(i + 1),
            ]);
          }
        } else if (snake[i].d === "left") {
          if (snake[i - 1].c[1] > snake[i].c[1]) {
            stepSnake((snake) => [
              ...snake.slice(0, i),
              { c: [snake[i].c[0], snake[i].c[1] + 1], d: "bottom" },
              ...snake.slice(i + 1),
            ]);
          } else if (snake[i - 1].c[1] < snake[i].c[1]) {
            stepSnake((snake) => [
              ...snake.slice(0, i),
              { c: [snake[i].c[0], snake[i].c[1] - 1], d: "top" },
              ...snake.slice(i + 1),
            ]);
          } else {
            stepSnake((snake) => [
              ...snake.slice(0, i),
              { c: [snake[i].c[0] - 1, snake[i].c[1]], d: snake[i].d },
              ...snake.slice(i + 1),
            ]);
          }
        } else if (snake[i].d === "top") {
          if (snake[i - 1].c[0] > snake[i].c[0]) {
            stepSnake((snake) => [
              ...snake.slice(0, i),
              { c: [snake[i].c[0] + 1, snake[i].c[1]], d: "right" },
              ...snake.slice(i + 1),
            ]);
          } else if (snake[i - 1].c[0] < snake[i].c[0]) {
            stepSnake((snake) => [
              ...snake.slice(0, i),
              { c: [snake[i].c[0] - 1, snake[i].c[1]], d: "left" },
              ...snake.slice(i + 1),
            ]);
          } else {
            stepSnake((snake) => [
              ...snake.slice(0, i),
              { c: [snake[i].c[0], snake[i].c[1] - 1], d: snake[i].d },
              ...snake.slice(i + 1),
            ]);
          }
        } else if (snake[i].d === "bottom") {
          if (snake[i - 1].c[0] > snake[i].c[0]) {
            stepSnake((snake) => [
              ...snake.slice(0, i),
              { c: [snake[i].c[0] + 1, snake[i].c[1]], d: "right" },
              ...snake.slice(i + 1),
            ]);
          } else if (snake[i - 1].c[0] < snake[i].c[0]) {
            stepSnake((snake) => [
              ...snake.slice(0, i),
              { c: [snake[i].c[0] - 1, snake[i].c[1]], d: "left" },
              ...snake.slice(i + 1),
            ]);
          } else {
            stepSnake((snake) => [
              ...snake.slice(0, i),
              { c: [snake[i].c[0], snake[i].c[1] + 1], d: snake[i].d },
              ...snake.slice(i + 1),
            ]);
          }
        }
      }
    }, 1000);

    return () => clearInterval(step);
  }, [eventKey]);

  return (
    <div className="flex m-auto mt-12 flex-wrap gap-px w-[210px]">
      {square.map((item: number[], i) => (
        <SquareItem key={i} x={item} snake={snake} />
      ))}
    </div>
  );
};
