import axios from "axios";
import API_URL from "./config";

const addDict = (data) => {
  let token = false;
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));
  if (tokenCookie) {
    const tokenValue = tokenCookie.split("=")[1];
    token = tokenValue;
  } else {
    return;
  }
  if (token) {
    axios
      .post(`${API_URL}/addTranslation`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(({ data }) => {
        console.log(data.message);
      })
      .catch((err) => {
        console.log(2123);
        console.log(err);
      });
  } else {
    console.log("Can't get user data");
  }
};

export default addDict;
