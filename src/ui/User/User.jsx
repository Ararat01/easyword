import "./User.css";
import Register from "../../components/Register/Register.jsx";
import Login from "../../components/Login/Login.jsx";
import { useState } from "react";

export default function User() {
  const [hasAccount, setHasAccount] = useState(true);

  return (
    <div>
      {hasAccount ? (
        <Login change={() => setHasAccount(false)} />
      ) : (
        <Register change={() => setHasAccount(true)} />
      )}
    </div>
  );
}
