import fetch from "isomorphic-fetch";
import cookie from "js-cookie";
import { isEmpty } from "lodash";
import { getCookie } from "./auth";

export const createVideo = async (values) => {
  const response = await fetch(`http://localhost:8080/videos`, {
    method: "POST",
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

export const createThumbnailForVideo = async (id, image) => {
  const formData = new FormData();
  formData.append("imageFiles", image);
  console.log(formData);
  const response = await fetch(`http://localhost:8080/videos/image/${id}`, {
    method: "POST",
    headers: {
      "auth-token": getCookie("token"),
    },
    body: formData,
  });
};

export const createVideoForVideo = async (id, video) => {
  const formData = new FormData();
  formData.append("videoFiles", video);
  console.log(formData);
  const response = await fetch(`http://localhost:8080/videos/video/${id}`, {
    method: "POST",
    body: formData,
    headers: {
      "auth-token": getCookie("token"),
    },
  });
};

export const getAllVideos = async () => {
  const response = await fetch(`http://localhost:8080/videos`, {
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

export const getVideoById = async (id) => {
  const response = await fetch(`http://localhost:8080/videos/${id}`, {
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

export const updateVideoById = async (id) => {
  const response = await fetch(`http://localhost:8080/videos/${id}`, {
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

export const deleteVideoById = async (id) => {
  const response = await fetch(`http://localhost:8080/videos/${id}`, {
    method: "DELETE",
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
