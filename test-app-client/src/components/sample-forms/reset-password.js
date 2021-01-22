import React, { useState } from "react";
import Router from "next/router";
import Validation from "../forms/validation";
import Alert from "../alerts";
import { resetPassword } from "../../pages/api/auth";
const ResetPassword = ({ message = null, token = null }) => {
  const [dataSuccess, setDataSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [dataError, setDataError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Server Error!");
  const onSubmit = async (data) => {
    try {
      if (data.newPassword != data.confirmPassword) {
        setDataError(true);
        setErrorMessage("Passwords doesn't match");
        setTimeout(() => {
          setDataError(false);
          setErrorMessage("");
        }, 2000);
      } else {
        const response = await resetPassword(token, data);
        setDataSuccess(true);
        const setMessage = await setSuccessMessage(
          "Your password was successfully reset"
        );
        setTimeout(() => {
          Router.push("/");
        }, 2000);
      }
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
      label: "New password",
      error: {
        required: "New password is required",
        minLength: {
          value: 4,
          message: "Your password should have at least 4 characters",
        },
        maxLength: {
          value: 8,
          message: "Your password should have no more than 8 characters",
        },
      },
      name: "newPassword",
      type: "password",
      placeholder: "Enter your new password",
    },
    {
      label: "Confirm new password",
      error: {
        required: "Password confirmation is required",
        minLength: {
          value: 4,
          message: "Your password should have at least 4 characters",
        },
        maxLength: {
          value: 8,
          message: "Your password should have no more than 8 characters",
        },
      },
      name: "confirmPassword",
      type: "password",
      placeholder: "Enter your new password confirmation",
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

export default ResetPassword;
