import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import API_URL from "../../utils/config.js";
import "./Register.css";

export default function Register({ change }) {
  const navigate = useNavigate();

  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      nickname: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = (values) => {
    axios.post(`${API_URL}/reg`, values).then(({ data }) => {
      change();
    });
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <input
          autoComplete="off"
          type="text"
          placeholder="Nickname"
          {...register("nickname", { required: true })}
          name="nickname"
        />
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
        <button className="form__btn" type="submit">
          Register
        </button>
        <div className="log_reg">
          <span>Already have an account</span>
          <button className="button" onClick={change}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
