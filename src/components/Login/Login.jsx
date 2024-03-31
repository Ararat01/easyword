import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import API_URL from "../../utils/config.js";
import "./Login.css";

export default function Login({ change }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    try {
      await axios
        .post(`${API_URL}/log`, values)
        .then(({ data }) => {
          document.cookie = `token=${data.token}; expires=Thu, 01 Jan 2025 00:00:00 UTC; path=/;`;
          navigate("/translate");
        })
        .catch(({ response }) => {
          setErrors(response.data.message);
        });
    } catch (err) {
      console.log(1, err);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <input
          autoComplete="off"
          type="email"
          placeholder="Email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          name="email"
        />
        <input
          autoComplete="off"
          type="password"
          placeholder="Password"
          {...register("password", {
            required: true,
            minLength: 8,
          })}
          name="password"
        />
        <span className="errors">{errors}</span>
        <button className="form__btn" type="submit">
          Log In
        </button>
        <div className="log_reg">
          <span>Don't have an account?</span>
          <button className="button" onClick={change}>
            register
          </button>
        </div>
      </form>
    </div>
  );
}
