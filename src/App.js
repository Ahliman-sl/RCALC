import React, { useState, useEffect, useCallback } from "react";
import * as math from "mathjs";

//******************************/

// Created by Ahliman Suleymanli //

//******************************/
export default function App() {
  return (
    <div className="w-full h-screen bg-sky-950 flex justify-center items-center font-robotic">
      <Calculator />
    </div>
  );
}

function Calculator() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const addToText = useCallback(
    (val) => {
      // Prevent multiple decimal points and allow consecutive decimal points in expressions like "35.2 + 43.2"
      if (val === "." && (text === "" || text[text.length - 1] === ".")) return;

      setText((prevText) => prevText + val);
    },
    [text]
  );

  const delNumber = useCallback(() => {
    setText((prevText) => {
      if (prevText === "") return prevText;
      return prevText.slice(0, -1);
    });
  }, []);

  const calculateResult = useCallback(() => {
    try {
      const input = text;

      if (!/\d$/.test(input)) {
        throw new Error("Invalid input! Last character must be a number.");
      }

      setResult(math.evaluate(input));
    } catch (error) {
      alert(error.message);
    }
  }, [text]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const keyPressed = event.key;
      if (/[0-9+*/-=%.\r]/.test(keyPressed)) {
        addToText(keyPressed);
      } else if (keyPressed === "Delete" || keyPressed === "Backspace") {
        delNumber();
      } else if (keyPressed === "Enter" || keyPressed === "=") {
        calculateResult();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [text, addToText, calculateResult, delNumber]); //Only when text state change useEffect will work

  // Pow
  function powNumber() {
    const input = text;
    setResult(Math.pow(input, 2));
  }

  // Sqr
  function sqrNumber() {
    const input = text;
    setResult(Math.sqrt(input));
  }

  // Reciprocal
  function reciProcal() {
    const input = text;
    setResult(1 / input);
  }

  function reset() {
    setText("");
    setResult("");
  }

  return (
    <div className="w-[25rem] h-[30rem] bg-sky-800 shadow-sm shadow-black rounded-sm mx-2 flex flex-col">
      <Title />
      <Display
        text={text}
        result={result}
        handleClick={addToText}
        reset={reset}
        calculateResult={calculateResult}
        delEvent={delNumber}
        powNumber={powNumber}
        sqrNumber={sqrNumber}
        reciProcal={reciProcal}
      />
    </div>
  );
}

function Title() {
  return (
    <div className="w-full h-max">
      <p className="text-lg sm:text-xl lg:text-2xl text-start p-2 text-stone-200">
        Rollin Calc
      </p>
    </div>
  );
}

function Display({
  result,
  text,
  handleClick,
  reset,
  calculateResult,
  delEvent,
  sqrNumber,
  powNumber,
  reciProcal,
}) {
  return (
    <>
      <div className="w-full h-40 flex flex-col items-center bg-sky-200 mt-5 overflow-hidden">
        <h1 className="text-xl text-end w-full pr-5 ">{result}</h1>
        <p className="text-2xl text-end pt-5 pr-5 w-full h-max animate-pulse duration-200 font-bold text-sky-900">
          {text}
        </p>
      </div>
      <div className="w-full h-full mt-2 bg-sky-500 flex flex-row flex-wrap gap-2 justify-center items-center py-2">
        <Buttons value="%" onHandleClick={handleClick}>
          %
        </Buttons>
        <Buttons value="CE" onHandleClick={reset}>
          CE
        </Buttons>
        <Buttons value="C" onHandleClick={reset}>
          C
        </Buttons>
        <Buttons value="Del" onHandleClick={delEvent}>
          Del
        </Buttons>
        <Buttons value="1/X" onHandleClick={reciProcal}>
          1/𝑥
        </Buttons>
        <Buttons value="x2" onHandleClick={powNumber}>
          𝑥²
        </Buttons>
        <Buttons value="0" onHandleClick={sqrNumber}>
          √x
        </Buttons>
        <Buttons value="/" onHandleClick={handleClick}>
          ÷
        </Buttons>
        <Buttons value="7" onHandleClick={handleClick}>
          7
        </Buttons>
        <Buttons value="8" onHandleClick={handleClick}>
          8
        </Buttons>
        <Buttons value="9" onHandleClick={handleClick}>
          9
        </Buttons>
        <Buttons value="*" onHandleClick={handleClick}>
          X
        </Buttons>
        <Buttons value="4" onHandleClick={handleClick}>
          4
        </Buttons>
        <Buttons value="5" onHandleClick={handleClick}>
          5
        </Buttons>
        <Buttons value="6" onHandleClick={handleClick}>
          6
        </Buttons>
        <Buttons value="-" onHandleClick={handleClick}>
          -
        </Buttons>
        <Buttons value="1" onHandleClick={handleClick}>
          1
        </Buttons>
        <Buttons value="2" onHandleClick={handleClick}>
          2
        </Buttons>
        <Buttons value="3" onHandleClick={handleClick}>
          3
        </Buttons>
        <Buttons value="+" onHandleClick={handleClick}>
          +
        </Buttons>
        <Buttons value="+-">±</Buttons>
        <Buttons value="0" onHandleClick={handleClick}>
          0
        </Buttons>
        <Buttons value="." onHandleClick={handleClick}>
          .
        </Buttons>
        <Buttons value="=" onHandleClick={calculateResult}>
          =
        </Buttons>
      </div>
    </>
  );
}

function Buttons({ children, onHandleClick, value }) {
  return (
    <button
      value={value}
      onClick={() => onHandleClick(value)}
      className=" w-1/5 h-max focus:outline-none transition duration-300 ease-in-out bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-gray-400 hover:to-sky-700 text-white font-semibold py-2 px-4 rounded-sm shadow-lg transform hover:scale-105"
    >
      {children}
    </button>
  );
}
