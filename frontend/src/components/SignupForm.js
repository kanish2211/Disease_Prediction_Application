import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputError from "./InputError";

const signupPassRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const phoneNumberPattern = /^[6-9]\d{9}$/;

const signupValidationSchema = yup
  .object({
    name: yup
      .string()
      .min(4, "Name should have minimum 4 characters")
      .required("Please enter your name"),
    email: yup.string().email().required("Please enter your email"),
    password: yup
      .string()
      .matches(signupPassRegex, {
        message:
          "Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number",
      })
      .required("Please enter your password"),
    confirmPassword: yup
      .string()
      .matches(signupPassRegex, {
        message:
          "Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number",
      })
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Please enter your password again to confirm"),
    gender: yup.string().required("Please select your gender"),
    phoneNumber: yup
      .string()
      .matches(phoneNumberPattern, "Please enter a valid mobile number")
      .required(),
    dateOfBirth: yup.date().required("Please select your DOB"),
  })
  .required();

const SignupForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupValidationSchema),
  });
  const [error, setError] = useState("");

  const submitForm = async (data) => {
    try {
      console.log("data", data);
      await axios.post(
        "http://localhost:5000/signup",
        {
          name: data.name,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
          gender: data.gender,
          dateOfBirth: data.dateOfBirth,
          phnumber: data.phoneNumber,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      sessionStorage.setItem("email", data.email);
      navigate("/health-details");
    } catch (error) {
      console.error("Signup failed:", error);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="h-screen">
      <div className="text-center pt-12 text-6xl text-[#14bbcb] font-extrabold">
        SIGN UP
      </div>
      <div className="flex w-9/12 mx-auto justify-center py-8">
        <div className="py-2 w-[48%] mr-2">
          <img
            src="assets/images/login.png"
            className="mx-auto rounded-xl"
            width={590}
            alt="Signup"
          />
        </div>

        <form
          onSubmit={handleSubmit(submitForm)}
          className="w-[48%] my-auto max-w-[620px] ml-2"
        >
          <input
            type="text"
            {...register("name")}
            placeholder="Name"
            className="input block w-full my-6"
          />
          <InputError message={errors.name?.message} />
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className="input block w-full my-6"
          />
          <InputError message={errors.email?.message} />
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="input block w-full my-6"
          />
          <InputError message={errors.password?.message} />
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm Password"
            className="input block w-full my-6"
          />
          <InputError message={errors.confirmPassword?.message} />
          <div className="flex justify-between w-full my-6">
            <select
              name="gender"
              {...register("gender")}
              className="input block w-[48%]"
            >
              <option value="">Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Others">Others</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
            <input
              type="date"
              {...register("dateOfBirth")}
              placeholder="Date of Birth"
              className="input block  w-[48%] "
            />
          </div>
          <InputError message={errors.gender?.message} />
          <InputError message={errors.dateOfBirth?.message} />
          <input
            type="tel"
            {...register("phoneNumber")}
            placeholder="Phone Number"
            className="input block w-full my-6"
          />
          <InputError message={errors.phoneNumber?.message} />
          <button
            type="submit"
            className="btn bg-[#14bbcb] block w-6/12 mt-9 mb-4 mx-auto font-bold"
          >
            REGISTER
          </button>
          {error && <InputError message={error} />}
          <div className="text-center text-[#14bbcb]">
            <p>or</p>
            <Link to="/login">
              <span className="font-bold">
                Login If you already have an Account
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
