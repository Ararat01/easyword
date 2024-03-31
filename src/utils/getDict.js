import axios from "axios";
import API_URL from "./config";

const getDict = () => {
  let token = false;
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));
  if (tokenCookie) {
    const tokenValue = tokenCookie.split("=")[1];
    token = tokenValue;
  } else {
    return [];
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
          if (res.data.dictionary) {
            resolve(res.data.dictionary);
          } else {
            console.log("Can't get user data dict");
            resolve([]);
          }
        })
        .catch((err) => {
          console.log(err);
          resolve([]);
        });
    });
  } else {
    console.log("Can't get user data");
    return [];
  }
};

export default getDict;
