import { useState } from "react";
import Router from "next/router";
import Validation from "../forms/validation";
import Alert from "../alerts";
import { registerUser } from "../../pages/api/auth";

const CreateAccount = ({ message = null }) => {
  const [dataSuccess, setDataSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [dataError, setDataError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Server Error!");

  let items = [
    {
      label: "Username",
      error: { required: "Please enter a valid username" },
      name: "fullName",
      type: "text",
      placeholder: "Enter you username",
    },
    {
      label: "Email",
      error: { required: "Please enter a valid email" },
      name: "email",
      type: "email",
      placeholder: "Enter you email",
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
    {
      label: null,
      error: {
        required: "Please agree to our terms of service",
      },
      name: "terms",
      type: "checkbox",
      options: [{ value: true, label: "I agree to the terms of service" }],
    },
    {
      label: null,
      error: {
        required: "Please agree to our privacy policy",
      },
      name: "privacy-policy",
      type: "checkbox",
      options: [{ value: true, label: "I agree to the privacy policy" }],
    },
  ];

  const onSubmit = async (data) => {
    try {
      const create = await registerUser(data);
      console.log(create);
      setDataSuccess(true);
      const setMessage = await setSuccessMessage(
        "A User was successfully created"
      );
      setTimeout(() => {
        Router.push("/email-confirmation");
      }, 1500);
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
        setErrorMessage(error);
        setTimeout(() => {
          setDataError(false);
          setErrorMessage("");
        }, 2000);
      }
    }
  };

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

export default CreateAccount;
