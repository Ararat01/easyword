import React, { useEffect, useState } from "react";
import "./Profile.css";
import { Link, useNavigate } from "react-router-dom";
import { checkAuth, clearCookies } from "../../utils/checkAuth";

export default function Profile() {
  const navigate = useNavigate();
  const [userInfoCheck, refreshInfo] = useState(1);

  const [user, setUser] = useState({
    nickname: "...",
    email: "...",
    pic: "...",
    dictionary: [],
  });
  useEffect(() => {
    setTimeout(() => {
      if (window.localStorage.getItem("user")) {
        setUser(JSON.parse(window.localStorage.getItem("user")));
      } else {
        if (userInfoCheck >= 15) {
          if (!checkAuth()) {
            window.location.pathname = "/user";
          }
        }
        refreshInfo((i) => i + 1);
      }
    }, 300);
  }, [userInfoCheck]);

  const logout = () => {
    window.localStorage.removeItem("user");
    clearCookies();
    navigate("/user");
  };

  return (
    <div className="page">
      <div className="container">
        <div className="user">
          <img
            src="https://media1.popsugar-assets.com/files/thumbor/buWdnDGXIwq2W0GPi4GphC0BYHo/1053x0:4798x3745/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/07/09/676/n/1922283/5f4fe68a5d24af5c764be1.10464443_/i/Who-Plays-Alexei-Stranger-Things-Season-3.jpg"
            alt=""
            className="userImage"
          />
          <div className="userInfo">
            <h4>{user.nickname}</h4>
            <h5>{user.email}</h5>
          </div>
          <svg
            viewBox="0 0 24 24"
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
                d="M20.1498 7.93997L8.27978 19.81C7.21978 20.88 4.04977 21.3699 3.32977 20.6599C2.60977 19.9499 3.11978 16.78 4.17978 15.71L16.0498 3.84C16.5979 3.31801 17.3283 3.03097 18.0851 3.04019C18.842 3.04942 19.5652 3.35418 20.1004 3.88938C20.6356 4.42457 20.9403 5.14781 20.9496 5.90463C20.9588 6.66146 20.6718 7.39189 20.1498 7.93997V7.93997Z"
                stroke="#f2f2f2"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
        </div>
        <div className="options">
          <Link to="/dictionary" className="option">
            <h5>Words in</h5>
            <svg
              viewBox="0 0 24 24"
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
                  d="M12 6.90909C10.8999 5.50893 9.20406 4.10877 5.00119 4.00602C4.72513 3.99928 4.5 4.22351 4.5 4.49965C4.5 6.54813 4.5 14.3034 4.5 16.597C4.5 16.8731 4.72515 17.09 5.00114 17.099C9.20405 17.2364 10.8999 19.0998 12 20.5M12 6.90909C13.1001 5.50893 14.7959 4.10877 18.9988 4.00602C19.2749 3.99928 19.5 4.21847 19.5 4.49461C19.5 6.78447 19.5 14.3064 19.5 16.5963C19.5 16.8724 19.2749 17.09 18.9989 17.099C14.796 17.2364 13.1001 19.0998 12 20.5M12 6.90909L12 20.5"
                  stroke="#fff"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M19.2353 6H21.5C21.7761 6 22 6.22386 22 6.5V19.539C22 19.9436 21.5233 20.2124 21.1535 20.0481C20.3584 19.6948 19.0315 19.2632 17.2941 19.2632C14.3529 19.2632 12 21 12 21C12 21 9.64706 19.2632 6.70588 19.2632C4.96845 19.2632 3.64156 19.6948 2.84647 20.0481C2.47668 20.2124 2 19.9436 2 19.539V6.5C2 6.22386 2.22386 6 2.5 6H4.76471"
                  stroke="#fff"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
            <h5>{user.dictionary.length}</h5>
          </Link>

          <button onClick={logout} className="option">
            <h5>Log out</h5>
            <svg
              fill="#fff"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#fff"
              strokeWidth="0.2"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path d="M4.70710678,12 L7.85355339,15.1464466 C8.04881554,15.3417088 8.04881554,15.6582912 7.85355339,15.8535534 C7.65829124,16.0488155 7.34170876,16.0488155 7.14644661,15.8535534 L3.14644661,11.8535534 C2.95118446,11.6582912 2.95118446,11.3417088 3.14644661,11.1464466 L7.14644661,7.14644661 C7.34170876,6.95118446 7.65829124,6.95118446 7.85355339,7.14644661 C8.04881554,7.34170876 8.04881554,7.65829124 7.85355339,7.85355339 L4.70710678,11 L15.5,11 C15.7761424,11 16,11.2238576 16,11.5 C16,11.7761424 15.7761424,12 15.5,12 L4.70710678,12 Z M10.5,4 C10.2238576,4 10,3.77614237 10,3.5 C10,3.22385763 10.2238576,3 10.5,3 L18.5,3 C19.8807119,3 21,4.11928813 21,5.5 L21,18.5 C21,19.8807119 19.8807119,21 18.5,21 L10.5,21 C10.2238576,21 10,20.7761424 10,20.5 C10,20.2238576 10.2238576,20 10.5,20 L18.5,20 C19.3284271,20 20,19.3284271 20,18.5 L20,5.5 C20,4.67157288 19.3284271,4 18.5,4 L10.5,4 Z"></path>{" "}
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
