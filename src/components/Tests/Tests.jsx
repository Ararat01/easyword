import React, { useEffect, useState } from "react";


import InputBoxes from "../InputBoxes/InputBoxes.jsx";
import "./Tests.css";
import MatchingGame from "../MatchingGame/MatchingGame.jsx";
import getDict from "../../utils/getDict.js";

export default function Tests() {
  // const translationTests = [
  //   { word: "dog", translatedWord: "собака" },
  //   { word: "cat", translatedWord: "кошка" },
  //   { word: "bird", translatedWord: "птица" },
  //   { word: "tree", translatedWord: "дерево" },
  //   { word: "flower", translatedWord: "цветок" },
  //   { word: "house", translatedWord: "дом" },
  //   { word: "car", translatedWord: "машина" },
  //   { word: "book", translatedWord: "книга" },
  //   { word: "Beautiful", translatedWord: "Прекрасный" },
  //   { word: "computer", translatedWord: "компьютер" },
  //   { word: "table", translatedWord: "стол" },
  //   { word: "chair", translatedWord: "стул" },
  //   { word: "window", translatedWord: "окно" },
  //   { word: "pen", translatedWord: "ручка" },
  //   { word: "pencil", translatedWord: "карандаш" },
  //   { word: "school", translatedWord: "школа" },
  //   { word: "university", translatedWord: "университет" },
  //   { word: "student", translatedWord: "студент" },
  //   { word: "teacher", translatedWord: "учитель" },
  //   { word: "learning", translatedWord: "обучение" },
  //   { word: "language", translatedWord: "язык" },
  //   { word: "programmer", translatedWord: "программист" },
  //   { word: "coding", translatedWord: "кодирование" },
  //   { word: "internet", translatedWord: "интернет" },
  //   { word: "keyboard", translatedWord: "клавиатура" },
  //   { word: "mouse", translatedWord: "мышь" },
  //   { word: "screen", translatedWord: "экран" },
  //   { word: "music", translatedWord: "музыка" },
  //   { word: "art", translatedWord: "искусство" },
  //   { word: "painting", translatedWord: "живопись" },
  // ].sort(() => Math.random() - 0.5);

  const [translationTests, setTranslationTests] = useState([]);
  const [words, setWordsArr] = useState([]);
  const [translatedWords, setTranslatedWordsArr] = useState([]);
  const [level, setLevel] = useState(4);
  const [rerender, setRerender] = useState(0);

  const [word, setWord] = useState("start");
  const [translatedWord, setTranslatedWord] = useState("старт");
  const [test, setTest] = useState("");

  useEffect(() => {
    (async function () {
      const data = await getDict();
      setTranslationTests(data.sort(() => Math.random() - 0.5));
      setWordsArr(data.slice(0, level).map((obj) => obj.word));
      setTranslatedWordsArr(
        data
          .slice(0, level)
          .map((obj) => obj)
          .sort(() => Math.random() - 0.5)
      );
    })();
  }, [level]);

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const changeWord = () => {
    const newWord =
      translationTests[getRandomInt(0, translationTests.length - 1)];
    setWord(newWord.word);
    setTranslatedWord(newWord.translatedWord);
  };

  const handleCheck = () => {
    setTranslationTests((arr) => arr.sort(() => Math.random() - 0.5));
    setWordsArr(translationTests.slice(0, level).map((obj) => obj.word));
    setTranslatedWordsArr(
      translationTests
        .slice(0, level)
        .map((obj) => obj)
        .sort(() => Math.random() - 0.5)
    );
    setTimeout(() => {
      setRerender((c) => c + 1);
    }, 500);
  };
  return (
    <div className="page">
      <div className="container">
        {test === "" ? (
          <div className="games">
            <button onClick={() => setTest("guess")}>Guess Game</button>
            <button onClick={() => setTest("matching")}>Matching Game</button>
          </div>
        ) : (
          <button onClick={() => setTest("")} className="btn back">
            <svg
              fill="#fff"
              version="1.1"
              baseProfile="tiny"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 42.00 42.00"
              width="30px"
              stroke="#fff"
              strokeWidth="0.5"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <polygon
                  fillRule="evenodd"
                  points="31,38.32 13.391,21 31,3.68 28.279,1 8,21.01 28.279,41 "
                ></polygon>{" "}
              </g>
            </svg>
          </button>
        )}
        {test === "guess" ? (
          <>
            <InputBoxes
              handleSolution={changeWord}
              word={word}
              translatedWord={translatedWord}
            />
          </>
        ) : test === "matching" ? (
          <MatchingGame
            words={words}
            translatedWords={translatedWords}
            check={handleCheck}
            number={level < words.length ? level : words.length}
            setLevel={(n) => setLevel(n)}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
