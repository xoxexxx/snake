import { Fragment, useContext, useEffect, useState } from "react";
import { GameOver } from "../components/GameOver";
import { SquareItem } from "../components/SquareItem";
import { CurrentContext } from "../hook/useContext";
import { square } from "../utils/square-cords";

export const SnakeGame = () => {
  const [snake, stepSnake] = useContext(CurrentContext);
  const [game, over] = useState(false);

  function eventKey(e) {
    if (e.key === "w") {
      if (snake[0].d === "top" || snake[0].d === "bottom") return;
      setTimeout(() => {
        stepSnake((snake) => [{ c: snake[0].c, d: "top" }, ...snake.slice(1)]);
      }, 150)
    } else if (e.key === "d") {
      if (snake[0].d === "right" || snake[0].d === "left") return;
      setTimeout(() => {
        stepSnake((snake) => [{ c: snake[0].c, d: "right" }, ...snake.slice(1)]);
      }, 150)
    } else if (e.key === "s") {
      if (snake[0].d === "top" || snake[0].d === "bottom") return;
      setTimeout(() => {
          stepSnake((snake) => [{ c: snake[0].c, d: "bottom" }, ...snake.slice(1)]);
      }, 150)
    } else if (e.key === "a") {
      if (snake[0].d === "right" || snake[0].d === "left") return;
      setTimeout(() => {
          stepSnake((snake) => [{ c: snake[0].c, d: "left" }, ...snake.slice(1)]);
      }, 150)
    }
  }

  useEffect(() => {
    window.addEventListener("keypress", eventKey);
    return () => window.removeEventListener("keypress", eventKey);
  }, [eventKey]);

  useEffect(() => {

    const step = setInterval(() => {
      if (snake[0].d === "right") {
        stepSnake((snake) => [
          { c: [snake[0].c[0] + 1, snake[0].c[1]], d: snake[0].d },
          ...snake.slice(1),
        ]);
      } else if (snake[0].d === "left") {
        stepSnake((snake) => [
          { c: [snake[0].c[0] - 1, snake[0].c[1]], d: snake[0].d },
          ...snake.slice(1),
        ]);
      } else if (snake[0].d === "bottom") {
        stepSnake((snake) => [
          { c: [snake[0].c[0], snake[0].c[1] + 1], d: snake[0].d },
          ...snake.slice(1),
        ]);
      } else if (snake[0].d == "top") {
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
    }, 500);
    return () => clearInterval(step);
  }, [eventKey]);

  useEffect(() => {
    if (snake[0].c[0] > 9) {
      over(true)
    } else if (snake[0].c[0] < 0) {
      over(true)
    } else if (snake[0].c[1] > 9) {
      over(true)
    } else if (snake[0].c[1] < 0) {
      over(true)
    }
  }, [snake]);


  return (
    <Fragment>
      {!game ? (
        <div className="flex m-auto mt-12 flex-wrap gap-px w-[210px]">
          {square.map((item, i) => (
            <SquareItem key={i} x={item} snake={snake} />
          ))}
        </div>
      ) : (
        <GameOver />
      )}
    </Fragment>
  );
};
