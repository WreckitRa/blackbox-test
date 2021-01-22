import React, { useState } from "react";
import Router from "next/router";
import Alert from "../../components/alerts";
import SectionTitle from "../../components/section-title";
import Widget from "../../components/widget";
import ImageUploading from "react-images-uploading";
import Validation from "../../components/forms/validation";
import {
  createVideo,
  createVideoForVideo,
  createThumbnailForVideo,
} from "../api/videos";
import { isAuth } from "../api/auth";
import { useDropzone } from "react-dropzone";
import { GrUpdate } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";

const Index = () => {
  const [dataError, setDataError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Server Error!");
  const [dataSuccess, setDataSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState();
  const [dbImage, setDbImage] = useState();
  const [dbVideo, setDbVideo] = useState();
  const maxNumber = 69;
  const onChangeImage = async (image) => {
    if (image[0]) {
      setDbImage(image[0].file);
      setImage(image);
      console.log(dbImage);
    } else {
      setImage(null);
    }
  };
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "video/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );

      setDbVideo(acceptedFiles[0]);
      console.log(dbVideo);
    },
  });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const authCheck = await isAuth();
      data.userId = authCheck._id;
      const response = await createVideo(data);
      console.log(response);
      console.log(dbImage);
      const videos = await createThumbnailForVideo(
        response.videoRes._id,
        dbImage
      );
      console.log(dbVideo);
      const video = await createVideoForVideo(response.videoRes._id, dbVideo);
      setDataSuccess(true);
      const setMessage = await setSuccessMessage(
        "A Video was successfully created"
      );
      setTimeout(() => {
        Router.push("/dashboard");
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
        setTimeout(() => {
          setDataError(false);
        }, 2000);
      }
    }
  };

  let items = [
    {
      label: "Title",
      error: { required: "Please enter a valid title" },
      name: "title",
      type: "text",
      placeholder: "Enter a title",
    },
    {
      label: "Description",
      error: { required: "Please enter a valid text" },
      name: "description",
      type: "textarea",
      placeholder: "Enter a description",
    },
    {
      label: null,
      name: "Active",
      type: "checkbox",
      options: [{ value: true, label: "Active" }],
    },
  ];
  return (
    <>
      <SectionTitle title="Video pages" subtitle="Video page" />
      <Widget title="Video" description={<span>Add Video</span>}>
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
        <div className="from-element">
          <div className="form-label">Video</div>
          <div
            className="form-element border-2 border-dashed upload__image-wrapper"
            {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
          >
            <input {...getInputProps()} />
            {!dbVideo && (
              <p className="btn text-center">Click or Drop video here</p>
            )}

            <aside>
              <p className="font-bold text-green-600">Accepted files</p>
              <ol>{acceptedFileItems}</ol>
            </aside>
          </div>
        </div>
        <div className="form-element">
          <div className="form-label">Video Thumbnail</div>
          <ImageUploading
            value={image}
            onChange={onChangeImage}
            maxNumber={maxNumber}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              <div className="form-element border-2 border-dashed">
                {!image && (
                  <button
                    className="btn"
                    style={isDragging ? { color: "red" } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Click or Drop Thumbnail here
                  </button>
                )}
                &nbsp;
                {imageList.map((image, index) => (
                  <div key={index} className="inline-block">
                    <img src={image["data_url"]} alt="" width="150" />
                    <div className="image-item__btn-wrapper ml-4">
                      <button
                        className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-5 rounded-l"
                        onClick={() => onImageUpdate(index)}
                      >
                        <GrUpdate size={19} />
                      </button>
                      <button
                        className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-5 rounded-r"
                        onClick={() => onImageRemove(index)}
                      >
                        <AiOutlineDelete size={19} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
        </div>

        <Validation items={items} onSubmit={onSubmit} />
      </Widget>
    </>
  );
};

export default Index;
