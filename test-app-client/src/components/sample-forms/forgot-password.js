import React, { useState } from "react";
import Router from "next/router";
import Validation from "../forms/validation";
import Alert from "../alerts";
import { forgetPassword } from "../../../src/pages/api/auth";

const ForgotPassword = ({ message = null }) => {
  const [dataError, setDataError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Server Error!");
  const [dataSuccess, setDataSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const onSubmit = async (data) => {
    try {
      const response = await forgetPassword(data);
      setDataSuccess(true);
      const setMessage = await setSuccessMessage(
        `A reset password link was sent to ${data.email}`
      );
      setTimeout(() => {
        Router.push("/");
      }, 2000);
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
      placeholder: "Enter you email",
    },
  ];
  return (
    <>
      <div className="flex flex-col">
        {dataSuccess && successMessage && (
          <div className="w-full mb-4">
            <Alert
              color="bg-transparent border-green-500 text-green-500"
              borderLeft
              raised
            >
              {successMessage}
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

export default ForgotPassword;
