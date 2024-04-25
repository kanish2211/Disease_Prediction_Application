// LoginForm.js
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputError from "./InputError";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup
      .string()
      .matches(passwordRules, {
        message:
          "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number",
      })
      .required(),
  })
  .required();

const LoginForm = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for navigation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const sumbitForm = async (data) => {
    try {
      console.log("data: ", data);
      await axios.post(
        "http://localhost:5000/login",
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      sessionStorage.setItem("email", data.email);
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Signup failed. Please try again.");
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="h-screen">
      <div className="text-center pt-12 text-6xl text-[#14bbcb] font-extrabold">
        LOGIN
      </div>
      <div className="flex w-9/12 mx-auto justify-center py-8  ">
        <div className=" py-2 w-[48%] mr-2">
          <img
            src="assets/images/login.png"
            className="mx-auto rounded-xl"
            width={590}
          />
        </div>
        <form
          onSubmit={handleSubmit(sumbitForm)}
          className=" w-[48%] my-auto max-w-[620px] ml-2  "
        >
          <input
            type="text"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            // required
            className="input block  w-full my-6"
            {...register("email")}
          />
          <InputError>{errors.email?.message}</InputError>
          <input
            type="password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            // required
            className="input block  w-full  my-6 "
            {...register("password")}
          />
          <InputError>{errors.password?.message}</InputError>
          <button
            type="submit"
            className="btn bg-[#14bbcb] block  w-6/12  mt-9 mb-4  mx-auto font-bold"
          >
            LOGIN
          </button>
          {error && <p>{error}</p>}
          <div className="text-center text-[#14bbcb]">
            <p>or</p>
            <Link to="/signup">
              <span className="font-bold">Register for New Account</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
