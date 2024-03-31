import axios from "axios";
import { useState, useRef } from "react";
import copy from "copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { languageCode } from "../../lang.js";
import "./Translate.css";
import History from "../../ui/History/History.jsx";
import addDict from "../../utils/addDict.js";
import reportTranslation from "../../utils/reportTranslation.js";

const Translate = () => {
  const customNotify = (text, time = 1000) => {
    toast(text, {
      position: "top-center",
      autoClose: time,
      closeButton: false,
      className: "toast-background",
      bodyClassName: "toast-body",
      progressClassName: "toast-progress",
    });
  };
  const notifyRule = () =>
    toast("You can only add to Dictionary English to Russian words", {
      position: "top-center",
      autoClose: 5000,
      closeButton: true,
      className: "toast-background",
      bodyClassName: "toast-body",
      progressClassName: "toast-progress",
    });

  const [lang, setLang] = useState({
    name: "English",
    code: "en-GB",
  });
  const [transLang, setTransLang] = useState({
    name: "Russian",
    code: "ru-RU",
  });
  const [word, setWord] = useState("");
  const [transWord, setTransWord] = useState(" ");
  const localHistory = window.localStorage.getItem("history");
  const [history, setHistory] = useState(
    localHistory ? JSON.parse(localHistory) : []
  );
  const [toChangeLang, setToChangeLang] = useState("");
  const textAreaRef = useRef(null);

  // functions
  const input = ({ target }) => {
    setWord(target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      translate(word);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    translate(word);
  };

  const changeLangs = () => {
    let temp = lang;
    let temp2 = word === "" ? " " : word;
    setWord(transWord === " " ? "" : transWord);
    setTransWord(temp2);
    setLang(transLang);
    setTransLang(temp);
  };

  const setNewLanguage = (newLang) => {
    if (toChangeLang === "enter") {
      if (newLang.name === lang.name) {
        setToChangeLang("");
        return 1;
      }
      if (newLang.name === transLang.name) {
        setToChangeLang("");
        changeLangs();
        return 1;
      }
      setLang(newLang);
    } else if (toChangeLang === "translate") {
      if (newLang.name === transLang.name) {
        setToChangeLang("");
        return 1;
      }
      if (newLang.name === lang.name) {
        setToChangeLang("");
        changeLangs();
        return 1;
      }
      setTransLang(newLang);
    }
    setToChangeLang("");
    return 1;
  };

  const translate = async (word) => {
    textAreaRef.current.blur();
    if (word === "") {
      setWord("");
      setTransWord(" ");
      return 1;
    }
    setTransWord("");
    await axios
      .get(
        `https://api.mymemory.translated.net/get?q=${word}&langpair=${lang.code}|${transLang.code}`
      )
      .then((res) => {
        let resWord = res.data.responseData.translatedText;
        setTransWord(resWord);
        setHistory([
          {
            text: word,
            translation: resWord,
          },
          ...history,
        ]);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const addWordToDict = async () => {
    if (lang.name === "English" && transLang.name === "Russian") {
      if (word === "") return;
      try {
        await addDict({
          word: word.toLowerCase(),
          translatedWord: transWord.toLowerCase(),
        });
        customNotify("Added to dictionary!");
      } catch (err) {
        console.log(err);
      }
    } else {
      notifyRule();
    }
  };

  const clearHistory = () => {
    window.localStorage.setItem("history", JSON.stringify([]));
    setHistory([]);
  };

  const report = async (text, translation) => {
    if (text.length || translation.length) return;
    const isConfirmed = window.confirm(
      "Are you sure you want to report this translation as wrong?"
    );
    if (isConfirmed) {
      const correctedTranslation = window.prompt(
        "Please provide the correct translation:"
      );
      if (correctedTranslation !== null) {
        reportTranslation({
          word: text,
          translatedWord: translation,
          correctedWord: correctedTranslation,
        });
      } else {
        reportTranslation({
          word: text,
          translatedWord: translation,
          correctedWord: "",
        });
      }
      customNotify("🙏 Thanks for letting us know! We'll work on it.", 2000);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <ToastContainer />
        <form onSubmit={handleSubmit} action="">
          <div className="language">
            <button
              onClick={() => setToChangeLang("enter")}
              className="langBtn"
              type="button"
            >
              {lang.name}
            </button>
            <button onClick={changeLangs} className="changeBtn" type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="transparent"
                width="40px"
                height="40px"
                viewBox="0 0 24 24"
                className="icon flat-color"
              >
                <path
                  id="secondary"
                  d="M20,11H4a1,1,0,0,1-.92-.62,1,1,0,0,1,.21-1.09l3-3A1,1,0,0,1,7.71,7.71L6.41,9H20a1,1,0,0,1,0,2Z"
                  style={{ fill: "#fff" }}
                />
                <path
                  id="primary"
                  d="M17,18a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42L17.59,15H4a1,1,0,0,1,0-2H20a1,1,0,0,1,.92.62,1,1,0,0,1-.21,1.09l-3,3A1,1,0,0,1,17,18Z"
                  style={{ fill: "#FFFFFF" }}
                />
              </svg>
            </button>
            <button
              onClick={() => setToChangeLang("translate")}
              className="langBtn"
              type="button"
            >
              {transLang.name}
            </button>
            <div
              className={`changeLanguageDiv ${
                toChangeLang === "" ? "" : "opened"
              }`}
            >
              <div className="mainLangs">
                <button
                  onClick={() =>
                    setNewLanguage({
                      name: "Armenian",
                      code: "hy-AM",
                    })
                  }
                >
                  Armenian
                </button>
                <button
                  onClick={() =>
                    setNewLanguage({
                      name: "Russian",
                      code: "ru-RU",
                    })
                  }
                >
                  Russian
                </button>
                <button
                  onClick={() =>
                    setNewLanguage({
                      name: "English",
                      code: "en-GB",
                    })
                  }
                >
                  English
                </button>
              </div>
              {Object.entries(languageCode).map((el, i) => {
                if (["Armenian", "Russian", "English"].includes(el[1])) {
                  return <span key={i}></span>;
                }
                return (
                  <button
                    onClick={() =>
                      setNewLanguage({
                        name: el[1],
                        code: el[0],
                      })
                    }
                    key={i}
                  >
                    {el[1]}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="translateAreas">
            <textarea
              className="text"
              value={word}
              ref={textAreaRef}
              onChange={input}
              onKeyDown={handleKeyDown}
              placeholder="Enter text"
              type="text"
              name=""
              id=""
            />
            <textarea
              className="translate"
              disabled
              type="text"
              placeholder={transWord ? "" : "загрузка..."}
              value={transWord}
            />
            <button
              type="button"
              onClick={() => {
                copy(transWord);
                customNotify("Copied to clipboard!");
              }}
              className="btn copyBtn"
              style={{ display: transWord !== " " ? "block" : "none" }}
            >
              <svg
                viewBox="0 0 1024 1024"
                width="25px"
                height="25px"
                xmlns="http://www.w3.org/2000/svg"
                fill="#fff"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill="#fff"
                    d="M768 832a128 128 0 0 1-128 128H192A128 128 0 0 1 64 832V384a128 128 0 0 1 128-128v64a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64h64z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M384 128a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64H384zm0-64h448a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H384a128 128 0 0 1-128-128V192A128 128 0 0 1 384 64z"
                  ></path>
                </g>
              </svg>
            </button>
          </div>

          <div className="actions">
            <button type="button" className="btn" onClick={addWordToDict}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#fff"
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
              >
                <path d="M18,7 L20.5,7 C20.7761424,7 21,7.22385763 21,7.5 C21,7.77614237 20.7761424,8 20.5,8 L18,8 L18,10.5 C18,10.7761424 17.7761424,11 17.5,11 C17.2238576,11 17,10.7761424 17,10.5 L17,8 L14.5,8 C14.2238576,8 14,7.77614237 14,7.5 C14,7.22385763 14.2238576,7 14.5,7 L17,7 L17,4.5 C17,4.22385763 17.2238576,4 17.5,4 C17.7761424,4 18,4.22385763 18,4.5 L18,7 Z M11.5,7 C11.7761424,7 12,7.22385763 12,7.5 C12,7.77614237 11.7761424,8 11.5,8 L3.5,8 C3.22385763,8 3,7.77614237 3,7.5 C3,7.22385763 3.22385763,7 3.5,7 L11.5,7 Z M14.5,12 C14.7761424,12 15,12.2238576 15,12.5 C15,12.7761424 14.7761424,13 14.5,13 L3.5,13 C3.22385763,13 3,12.7761424 3,12.5 C3,12.2238576 3.22385763,12 3.5,12 L14.5,12 Z M20.5,17 C20.7761424,17 21,17.2238576 21,17.5 C21,17.7761424 20.7761424,18 20.5,18 L3.5,18 C3.22385763,18 3,17.7761424 3,17.5 C3,17.2238576 3.22385763,17 3.5,17 L20.5,17 Z" />
              </svg>
              <span>Add to dict</span>
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => report(word, transWord)}
            >
              <svg
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                width="30px"
                height="30px"
                strokeWidth="2"
                stroke="#fff"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <circle cx="32" cy="32" r="24"></circle>
                  <line x1="32" y1="16" x2="32" y2="36"></line>
                  <line x1="32" y1="44" x2="32" y2="48"></line>
                </g>
              </svg>
            </button>
            <button
              type="submit"
              className="btn"
              onClick={() => translate(word)}
            >
              <span>Translate</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35px"
                height="35px"
                viewBox="0 0 50 50"
                id="Layer_1"
                data-name="Layer 1"
              >
                <line
                  className="cls-1"
                  x1="12.62"
                  y1="24.31"
                  x2="17.94"
                  y2="11.42"
                />
                <line
                  className="cls-1"
                  x1="23.04"
                  y1="24.35"
                  x2="17.94"
                  y2="11.42"
                />
                <line
                  className="cls-1"
                  x1="21.34"
                  y1="20.02"
                  x2="14.39"
                  y2="20.02"
                />
                <g>
                  <line
                    className="cls-1"
                    x1="32.63"
                    y1="25.38"
                    x2="39.35"
                    y2="25.38"
                  />
                  <path
                    className="cls-1"
                    d="M35.68,25.38c0,4.34-5.29,11.51-10.59,12.61"
                  />
                  <path
                    className="cls-1"
                    d="M27.93,32.79c2.13,2.4,5.61,4.74,8.82,5.2"
                  />
                </g>
                <rect
                  className="cls-1"
                  x="5.5"
                  y="5.5"
                  width="24.67"
                  height="24.67"
                  rx="3.64"
                  ry="3.64"
                />
                <path
                  className="cls-1"
                  d="M17.83,30.17v8.69c0,2,1.64,3.64,3.64,3.64h17.38c2,0,3.64-1.64,3.64-3.64V21.47c0-2-1.64-3.64-3.64-3.64h-8.69"
                />
              </svg>
            </button>
          </div>
        </form>
        <History
          historyArr={history}
          notif={customNotify}
          rep={report}
          clearHistory={clearHistory}
        />
      </div>
    </div>
  );
};

export default Translate;
