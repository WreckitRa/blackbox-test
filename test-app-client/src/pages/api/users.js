import fetch from "isomorphic-fetch";
import cookie from "js-cookie";
import { isEmpty } from "lodash";
import { getCookie } from "./auth";

export const createFeature = async (values) => {
  const response = await fetch(`http://localhost:8080/users/add`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "auth-token": getCookie("token"),
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

export const getAllFeatureVideos = async (id) => {
  const response = await fetch(`http://localhost:8080/users/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "auth-token": getCookie("token"),
    },
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

export const deleteFeature = async (values) => {
  const response = await fetch(`http://localhost:8080/users/delete`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "auth-token": getCookie("token"),
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
