import axios from "axios";
import API_URL from "./config.js";

export const clearCookies = () => {
  const cookies = document.cookie.split("; ");

  cookies.forEach((cookie) => {
    const [name] = cookie.split("=");
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
};

export const checkAuth = () => {
  let token = false;
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));
  if (tokenCookie) {
    const tokenValue = tokenCookie.split("=")[1];
    token = tokenValue;
  } else {
    return false;
  }
  if (token) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_URL}/user/me`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          if (res.data) {
            resolve(true);
            window.localStorage.setItem("user", JSON.stringify(res.data));
          } else {
            clearCookies();
            window.localStorage.removeItem("user");
            resolve(false);
          }
        })
        .catch((err) => {
          clearCookies();
          window.localStorage.removeItem("user");
          resolve(false);
          console.log(1, err);
        });
    });
  } else {
    return false;
  }
};
