import React, { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./InputBoxes.css";

export default function InputBoxes({
  word = "start",
  translatedWord = "старт",
  handleSolution,
}) {
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const mergeArrays = (arr1, arr2) => {
    return arr1.map((element, index) => {
      if (element !== "") {
        return element;
      }
      return arr2[index];
    });
  };

  const notify = () =>
    toast("Good Job!", {
      position: "top-center",
      autoClose: 1000,
      closeButton: false,
      className: "toast-background",
      bodyClassName: "toast-body",
      progressClassName: "toast-progress",
    });
  const [values, setValues] = useState(Array(word.length).fill(""));
  const [inputs, setInputs] = useState(Array(word.length).fill(""));
  const refs = [...Array(word.length)].map(() => React.createRef(null));
  const divRef = useRef(null);
  const btnRef = useRef(null);
  const [ind, setInd] = useState(0);

  useEffect(() => {
    setValues(Array(word.length).fill(""));
    setInputs(Array(word.length).fill(""));
  }, [word]);

  useEffect(() => {
    if (values.join("").toLocaleLowerCase() === word.toLocaleLowerCase()) {
      refs[0].current.focus();
    }
    if (values.join("").length >= word.length - 1) {
      btnRef.current.disabled = true;
    } else {
      btnRef.current.disabled = false;
    }
  }, [values, refs, word]);

  useEffect(() => {
    if (values.join("").toLocaleLowerCase() === word.toLocaleLowerCase()) {
      notify();
      btnRef.current.disabled = false;
      setTimeout(() => {
        setValues(Array(word.length).fill(""));
        setInputs(Array(word.length).fill(""));
        handleSolution();
      }, 800);
    }
  }, [values, word, handleSolution]);

  const handleChange = (e, index, value) => {
    if (e.target.value === " ") return;
    divRef.current = e;
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
    if (
      value.length === 1 &&
      index < word.length - 1 &&
      refs[index + 1]?.current
    ) {
      refs[index + 1].current.focus();
    } else if (
      (value.length === 0 && index > 0 && refs[index - 1]?.current,
      ind !== index)
    ) {
      refs[index - 1].current.focus();
    }
  };
  const handleKeyDown = (e) => {
    const value = divRef.current.target.value;
    const keyCode = e.keyCode || e.which;
    if (
      value.length === 0 &&
      ind > 0 &&
      refs[ind - 1]?.current &&
      keyCode === 8
    ) {
      refs[ind - 1].current.focus();
    } else if (
      value.length === 1 &&
      ind < word.length - 1 &&
      refs[ind + 1]?.current &&
      keyCode !== 8
    ) {
      refs[ind + 1].current.focus();
    }
  };

  const showLetter = () => {
    const index = getRandomInt(0, word.length - 1);
    if (values.join("").length === word.length - 1) {
      btnRef.current.disabled = true;
      return;
    }
    if (values[index] === "") {
      setInputs(values);
      inputs[index] = word[index];
      setValues(inputs);
    } else {
      showLetter();
    }
    setValues(mergeArrays(inputs, values));
  };

  return (
    <div className="testpage guess">
      <ToastContainer />
      <h2>Guess Game</h2>
      <div className="inputs" onKeyDown={(e) => handleKeyDown(e)}>
        {values.map((value, index) => (
          <input
            key={index}
            type="text"
            className="inputBox"
            maxLength={1}
            value={value}
            onFocus={(e) => {
              divRef.current = e;
              setInd(index);
            }}
            onChange={(e) => handleChange(e, index, e.target.value)}
            ref={refs[index]}
          />
        ))}
      </div>
      <h3>{translatedWord}</h3>
      <button className="btn" onClick={showLetter} ref={btnRef}>
        <span>Show a letter</span>
        <svg
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
          width="30px"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g id="show">
              {" "}
              <path
                fill="#fff"
                d="M4,17a1,1,0,0,1-.87-1.5C3.31,15.2,7.52,8,16,8s12.69,7.2,12.87,7.5a1,1,0,1,1-1.74,1C27.1,16.43,23.3,10,16,10S4.91,16.43,4.87,16.5A1,1,0,0,1,4,17Z"
              ></path>{" "}
              <path
                fill="#fff"
                d="M16,24C7.52,24,3.31,16.8,3.13,16.5a1,1,0,0,1,1.74-1C4.9,15.57,8.7,22,16,22s11.09-6.43,11.13-6.5a1,1,0,0,1,1.74,1C28.69,16.8,24.48,24,16,24Z"
              ></path>{" "}
              <path
                fill="#fff"
                d="M16,18a2,2,0,1,1,2-2A2,2,0,0,1,16,18Zm0-2h0Zm0,0h0Zm0,0h0Zm0,0h0Zm0,0h0Zm0,0h0Zm0,0h0Zm0,0h0Z"
              ></path>{" "}
            </g>{" "}
          </g>
        </svg>
      </button>
    </div>
  );
}
