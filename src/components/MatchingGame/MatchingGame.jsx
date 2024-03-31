import React, { useEffect, useRef, useState } from "react";

import "./MatchingGame.css";

export default function MatchingGame({
  words,
  translatedWords,
  check,
  number,
  setLevel,
}) {
  const wordRefs = Array(number)
    .fill(0)
    .map(() => React.createRef());

  const translatedWordsRefs = Array(number)
    .fill(0)
    .map(() => React.createRef());

  const [firstWord, setFirstWord] = useState({ word: "1", ref: useRef(null) });
  const [secondWord, setSecondWord] = useState({
    word: "2",
    ref: useRef(null),
  });

  const [trueCount, setTrueCount] = useState(0);

  const firstButton = (obj, ref) => {
    if (firstWord.ref != null && !firstWord.ref.disabled) {
      if (firstWord.ref.current !== null) {
        firstWord.ref.style.backgroundColor = "#1c2d6b";
      }
    }
    setFirstWord(obj);
    ref.style.backgroundColor = "#556bbe";
  };

  const secondButton = (obj, ref) => {
    if (secondWord.ref != null && !secondWord.ref.disabled) {
      if (secondWord.ref.current !== null) {
        secondWord.ref.style.backgroundColor = "#1c2d6b";
      }
    }
    setSecondWord(obj);
    ref.style.backgroundColor = "#556bbe";
  };

  const allNull = () => {
    setTrueCount(0);
    wordRefs.map(({ current }) => {
      if (current) {
        current.disabled = false;
        current.style.backgroundColor = "#1c2d6b";
        current.style.color = "#fff";
      }
      return { current };
    });
    translatedWordsRefs.map(({ current }) => {
      if (current) {
        current.disabled = false;
        current.style.backgroundColor = "#1c2d6b";
        current.style.color = "#fff";
      }
      return { current };
    });
  };

  useEffect(() => {
    if (firstWord.word === secondWord.word) {
      firstWord.ref.style.backgroundColor = "#c1ffc1";
      secondWord.ref.style.backgroundColor = "#c1ffc1";
      firstWord.ref.disabled = true;
      secondWord.ref.disabled = true;
      firstWord.ref.style.color = "#000";
      secondWord.ref.style.color = "#000";
      firstWord.word = "1";
      secondWord.word = "2";
      setTrueCount((c) => c + 1);
    } else if (firstWord.word !== "1" && secondWord.word !== "2") {
      if (firstWord.word !== secondWord.word) {
        firstWord.word = "1";
        secondWord.word = "2";
        firstWord.ref.style.backgroundColor = "red";
        secondWord.ref.style.backgroundColor = "red";
        setTimeout(() => {
          firstWord.ref.style.backgroundColor = "#1c2d6b";
          secondWord.ref.style.backgroundColor = "#1c2d6b";
        }, 600);
      }
    }
    if (trueCount >= number) {
      setTimeout(() => {
        check("win");
        allNull();
      }, 500);
    }
  }, [firstWord, secondWord, trueCount]);

  useEffect(() => {
    allNull();
  }, [number]);

  return (
    <div className="page testpage matching">
      <h2>Matching Game</h2>
      <div className="flex">
        <div className="leftside">
          {words.slice(0, number).map((word, i) => {
            return (
              <button
                onClick={() => {
                  firstButton(
                    { word, ref: wordRefs[i].current },
                    wordRefs[i].current
                  );
                }}
                className="btn"
                key={i}
                ref={wordRefs[i]}
              >
                {word.toLowerCase()}
              </button>
            );
          })}
        </div>
        <div className={`rightside`}>
          {translatedWords
            .slice(0, number)
            .map(({ word, translatedWord }, i) => {
              return (
                <button
                  onClick={() => {
                    secondButton(
                      { word, ref: translatedWordsRefs[i].current },
                      translatedWordsRefs[i].current
                    );
                  }}
                  className="btn"
                  key={i}
                  ref={translatedWordsRefs[i]}
                >
                  {translatedWord.toLowerCase()}
                </button>
              );
            })}
        </div>
      </div>
      <div className="levels">
        <button
          className={`btn ${number <= 4 ? "active" : ""}`}
          onClick={() => {
            setLevel(4);
          }}
        >
          <span></span>
          Easy
        </button>
        <button
          className={`btn ${number === 6 ? "active" : ""}`}
          onClick={() => {
            setLevel(6);
          }}
        >
          <span></span>
          Medium
        </button>
        <button
          className={`btn ${number === 8 ? "active" : ""}`}
          onClick={() => {
            setLevel(8);
          }}
        >
          <span></span>
          Hard
        </button>
      </div>
    </div>
  );
}
