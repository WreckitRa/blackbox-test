import fetch from "isomorphic-fetch";
import cookie from "js-cookie";
import { isEmpty } from "lodash";

export const registerUser = async (values) => {
  const response = await fetch(`http://localhost:8080/auth/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    const errorResData = await response.json();

    let error = {
      message: errorResData.message,
    };

    throw error;
  }

  const resData = await response.json();

  return resData;
};

export const loginUser = async (values) => {
  const response = await fetch(`http://localhost:8080/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    const errorResData = await response.json();

    let error = {
      message: errorResData.message,
    };

    throw error;
  }

  const resData = await response.json();

  return resData;
};

export const authenticate = (data, next) => {
  setCookie("token", data.token);
  setLocalStorage("user", data.user);
  next();
};

export const setCookie = (key, value) => {
  if (process.browser) {
    // client side
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

export const getCookie = (key) => {
  if (process.browser) {
    return cookie.get(key);
  }
};

export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getCookie("token");
    if (!isEmpty(cookieChecked)) {
      if (!isEmpty(localStorage.getItem("user"))) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

export const logoutUser = (next) => {
  removeCookie("token");
  removeLocalStorage("user");
  next();
};

export const removeCookie = (key) => {
  if (process.browser) {
    // client side
    cookie.remove(key, {
      expires: 1,
    });
  }
};

export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

export const forgetPassword = async (values) => {
  const response = await fetch(`http://localhost:8080/auth/reset-password`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  if (!response.ok) {
    const errorResData = await response.json();

    let error = {
      message: errorResData.message,
    };

    throw error;
  }
};

export const resetPassword = async (token, values) => {
  console.log(token);
  console.log(values);
  const response = await fetch(
    `http://localhost:8080/auth/change-password/${token}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }
  );
  if (!response.ok) {
    const errorResData = await response.json();

    let error = {
      message: errorResData.message,
    };

    throw error;
  }
};

export const verifyUser = async (id) => {
  const response = await fetch(
    `http://localhost:8080/auth/verify-account/${id}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    const errorResData = await response.json();

    let error = {
      message: errorResData.message,
    };

    throw error;
  }
};
