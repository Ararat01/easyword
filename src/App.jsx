import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import Translate from "./components/Translate/Translate.jsx";
import Header from "./ui/Header/Header.jsx";
import Profile from "./components/Profile/Profile.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import Dictionary from "./components/Dictionary/Dictionary.jsx";
import Tests from "./components/Tests/Tests.jsx";
import Login from "./components/Login/Login.jsx";
import { checkAuth } from "./utils/checkAuth.js";
import { useNavigate } from "react-router-dom";
import Register from "./components/Register/Register.jsx";
import User from "./ui/User/User.jsx";

function App() {
  const auth = checkAuth();
  if (auth && window.location.pathname.startsWith("/user")) {
    window.location.pathname = "/translate";
  }
  useEffect(() => {
    window.localStorage.setItem("history", JSON.stringify([]));
    checkAuth();
    if (/Mobile|Tablet/i.test(navigator.userAgent)) {
      console.log("User is using a mobile device.");
    } else {
      alert(
        "Hey there! Our app is designed to work best on mobile devices. You can enjoy a better experience by accessing it on your smartphone. We appreciate your understanding!"
      );
    }
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="translate/" />} />
          {/* <Route path="profile/" element={<Profile />} /> */}
          <Route path="translate/" element={<Translate />} />
          <Route path="dictionary/" element={<Dictionary />} />
          <Route path="tests/" element={<Tests />} />
          <Route path="user/" element={<User />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
