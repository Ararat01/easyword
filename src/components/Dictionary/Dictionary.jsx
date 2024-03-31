import React, { useEffect, useState } from "react";

import "./Dictionary.css";
import LoadingBox from "../../ui/Loading/LoadingBox.jsx";
import getDict from "../../utils/getDict.js";

export default function Dictionary() {
  const [dictionary, setDictionary] = useState([]);
  useEffect(() => {
    (async function () {
      const dict = await getDict();
      setDictionary(dict.sort((a, b) => a.word.localeCompare(b.word)));
    })();
  }, []);

  return (
    <div className="page">
      <div className="container">
        <h2>Dictionary</h2>
        {dictionary.length ? (
          dictionary.map(({ word, translatedWord }, i) => {
            const prevWord =
              i !== 0 ? dictionary[i - 1].word[0].toUpperCase() : "";
            const currWord = dictionary[i].word[0].toUpperCase();
            return (
              <div key={i}>
                <span className="letter">
                  {prevWord !== currWord ? currWord : ""}
                </span>
                <div className="translation">
                  <h3>{word}</h3>
                  <h4>{translatedWord}</h4>
                </div>
              </div>
            );
          })
        ) : (
          <LoadingBox />
        )}
      </div>
    </div>
  );
}
