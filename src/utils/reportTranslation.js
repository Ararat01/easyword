import axios from "axios";
import API_URL from "./config";

const reportTranslation = (data) => {
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
      .post(`${API_URL}/report`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(({ data }) => {
        console.log(data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("Can't get user data");
  }
};

export default reportTranslation;
