import React, { useEffect, useState } from "react";
import "./Header.css";
import Menu from "../../components/Menu/Menu";
import { checkAuth, clearCookies } from "../../utils/checkAuth.js";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [menuState, setMenuState] = useState(false);
  const navigate = useNavigate();
  const auth = checkAuth();

  const logout = () => {
    window.localStorage.removeItem("user");
    clearCookies();
    navigate("/user");
  };

  // useEffect(() => {
  //   if (!auth) {
  // navigate("/user");
  //   }
  // }, [navigate, auth]);
  return (
    <>
      <header>
        <div className="logo">EasyWord</div>
        {auth ? (
          <button className="btn" onClick={logout}>
            Logout
          </button>
        ) : (
          <></>
        )}
      </header>
      <div className="menu">
        {auth ? (
          <Menu
            handleClick={() => setMenuState(!menuState)}
            menuState={menuState}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
