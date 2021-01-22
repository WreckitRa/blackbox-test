import React, { useState } from "react";
import Router from "next/router";
import Validation from "../forms/validation";
import Alert from "../alerts";
import { loginUser, authenticate } from "../../../src/pages/api/auth";

const Login = ({ message = null }) => {
  const [data] = useState(null);
  const [dataError, setDataError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Server Error!");
  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      await authenticate(response, () => {
        Router.push("/dashboard");
      });
    } catch (error) {
      if (error.message) {
        setDataError(true);
        setErrorMessage(error.message);
        setTimeout(() => {
          setDataError(false);
          setErrorMessage("");
        }, 2000);
      } else {
        setDataError(true);
        setTimeout(() => {
          setDataError(false);
        }, 2000);
      }
    }
  };
  let items = [
    {
      label: "Email",
      error: { required: "Please enter a valid email" },
      name: "email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      label: "Password",
      error: {
        required: "Password is required",
        minLength: {
          value: 4,
          message: "Your password should have at least 4 characters",
        },
        maxLength: {
          value: 8,
          message: "Your password should have no more than 8 characters",
        },
      },
      name: "password",
      type: "password",
      placeholder: "Enter your password",
    },
  ];
  return (
    <>
      <div className="flex flex-col">
        {data && message && (
          <div className="w-full mb-4">
            <Alert
              color="bg-transparent border-green-500 text-green-500"
              borderLeft
              raised
            >
              {message}
            </Alert>
          </div>
        )}
        {dataError && errorMessage && (
          <div className="w-full mb-4">
            <Alert
              color="bg-transparent border-red-500 text-red-500"
              borderLeft
              raised
            >
              {errorMessage}
            </Alert>
          </div>
        )}
        <Validation items={items} onSubmit={onSubmit} />
      </div>
    </>
  );
};

export default Login;
