import React, { useEffect, useState } from "react";

import "./History.css";
import addDict from "../../utils/addDict";

export default function History({ historyArr, notif, rep, clearHistory }) {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    window.localStorage.setItem("history", JSON.stringify(historyArr));
    (async function () {
      const hst = await JSON.parse(window.localStorage.getItem("history"));
      setHistory(hst);
    })();
  }, [historyArr]);

  
  return (
    <div>
      <div className="title">
        <h3>History</h3>
        <button className="btn" onClick={clearHistory}>
          <span>Clear</span>
          <svg
            viewBox="0 0 24 24"
            width="30px"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.07868 5.06891C8.87402 1.27893 15.0437 1.31923 18.8622 5.13778C22.6824 8.95797 22.7211 15.1313 18.9262 18.9262C15.1312 22.7211 8.95793 22.6824 5.13774 18.8622C2.87389 16.5984 1.93904 13.5099 2.34047 10.5812C2.39672 10.1708 2.775 9.88377 3.18537 9.94002C3.59575 9.99627 3.88282 10.3745 3.82658 10.7849C3.4866 13.2652 4.27782 15.881 6.1984 17.8016C9.44288 21.0461 14.6664 21.0646 17.8655 17.8655C21.0646 14.6664 21.046 9.44292 17.8015 6.19844C14.5587 2.95561 9.33889 2.93539 6.13935 6.12957L6.88705 6.13333C7.30126 6.13541 7.63535 6.47288 7.63327 6.88709C7.63119 7.3013 7.29372 7.63539 6.87951 7.63331L4.33396 7.62052C3.92269 7.61845 3.58981 7.28556 3.58774 6.8743L3.57495 4.32874C3.57286 3.91454 3.90696 3.57707 4.32117 3.57498C4.73538 3.5729 5.07285 3.907 5.07493 4.32121L5.07868 5.06891Z"
                fill="#5e6faa"
              ></path>{" "}
              <path
                d="M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V11.6893L15.0303 13.9697C15.3232 14.2626 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2626 15.3232 13.9697 15.0303L11.5429 12.6036C11.3554 12.416 11.25 12.1617 11.25 11.8964V8C11.25 7.58579 11.5858 7.25 12 7.25Z"
                fill="#fff"
              ></path>{" "}
            </g>
          </svg>
        </button>
      </div>

      {historyArr.map(({ text, translation }, i) => {
        return (
          <div key={i} className="historyBlock">
            <div>
              <p>{text}</p>
              <p>{translation}</p>
            </div>
            <div className="btns">
              <button
                type="button"
                className="btn"
                onClick={() => rep(text, translation)}
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
                type="button"
                className="btn"
                onClick={async () => {
                  await addDict({
                    word: text.toLowerCase(),
                    translatedWord: translation.toLowerCase(),
                  });
                  notif("Added to dictionary!");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#fff"
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                >
                  <path d="M18,7 L20.5,7 C20.7761424,7 21,7.22385763 21,7.5 C21,7.77614237 20.7761424,8 20.5,8 L18,8 L18,10.5 C18,10.7761424 17.7761424,11 17.5,11 C17.2238576,11 17,10.7761424 17,10.5 L17,8 L14.5,8 C14.2238576,8 14,7.77614237 14,7.5 C14,7.22385763 14.2238576,7 14.5,7 L17,7 L17,4.5 C17,4.22385763 17.2238576,4 17.5,4 C17.7761424,4 18,4.22385763 18,4.5 L18,7 Z M11.5,7 C11.7761424,7 12,7.22385763 12,7.5 C12,7.77614237 11.7761424,8 11.5,8 L3.5,8 C3.22385763,8 3,7.77614237 3,7.5 C3,7.22385763 3.22385763,7 3.5,7 L11.5,7 Z M14.5,12 C14.7761424,12 15,12.2238576 15,12.5 C15,12.7761424 14.7761424,13 14.5,13 L3.5,13 C3.22385763,13 3,12.7761424 3,12.5 C3,12.2238576 3.22385763,12 3.5,12 L14.5,12 Z M20.5,17 C20.7761424,17 21,17.2238576 21,17.5 C21,17.7761424 20.7761424,18 20.5,18 L3.5,18 C3.22385763,18 3,17.7761424 3,17.5 C3,17.2238576 3.22385763,17 3.5,17 L20.5,17 Z" />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
