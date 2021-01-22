import React, { useState, useEffect, useRef } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BiSlider } from "react-icons/bi";
import { FiX, FiLink2, FiTag, FiTwitter, FiMail, FiCode } from "react-icons/fi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { GrCheckboxSelected } from "react-icons/gr";
import Modal1 from "../components/modals/modal-1";
import { getAllVideos } from "./api/videos";
import { isAuth } from "./api/auth";
import { getAllFeatureVideos, createFeature, deleteFeature } from "./api/users";
import copy from "copy-to-clipboard";
import Portal from "../components/portal";
const Index = () => {
  const [posts, setPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [featuredPostsId, setFeaturedPostsId] = useState([]);
  const [userid, setUserid] = useState();
  const [isOn, setIsOn] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selected, setSelected] = useState([]);
  const [dataSuccess, setDataSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [dataError, setDataError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Server Error!");
  const [showModal, setShowModal] = useState(false);
  const title = "Select All Videos";
  const body = (
    <div>
      <div className="form-element">
        <div className="label">Currently in:</div>
        <select className="form-select">
          <option>Technology</option>
          <option>Politics</option>
          <option>Option 3</option>
          <option>Option 4</option>
        </select>
      </div>
      <div>Selected videos:</div>
      <div className="w-f h-10 bg-gray-200 flex items-center">
        <span className="ml-4">
          <FiTag size={18} />
        </span>
        <span className="ml-2">Technology</span>
        <span className="ml-96"></span>
        <span className="ml-5"></span>
        <span>
          <FiX size={18} />
        </span>
      </div>
      {/* Pellentesque habitant morbi tristique senectus et netus et malesuada fames
      ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget,
      tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.
      Aenean ultricies mi vitae est. Mauris placerat eleifend leo. */}
    </div>
  );
  const { palettes } = useSelector(
    (state) => ({
      palettes: state.palettes,
    }),
    shallowEqual
  );
  let { background } = {
    ...palettes,
  };

  const modalRef = useRef(null);
  const [open, setOpen] = useState(false);
  const show = () => {
    setOpen(true);
  };
  const hide = () => {
    setOpen(false);
  };
  useEffect(async () => {
    const res = await getAllVideos();
    const tempArray = [];
    res.video.forEach((video) => {
      tempArray.push({
        id: `${video._id}`,
        src: `${video.thumbnail}`,
        description: `${video.description}`,
        link: `${video.videoPath}`,
        creator: `${video.userId.fullName}`,
      });
    });
    setPosts(tempArray);
    const userId = await isAuth();
    setUserid(userId._id);
    const res1 = await getAllFeatureVideos(userId._id);
    const tempArray1 = [];
    const tempArray2 = [];
    res1.videos.featuredVideos.forEach((video) => {
      tempArray1.push({
        id: `${video._id}`,
        src: `${video.thumbnail}`,
        description: `${video.description}`,
        link: `${video.videoPath}`,
        creator: `${video.userId.fullName}`,
      });
      tempArray2.push(`${video._id}`);
    });
    setFeaturedPosts(tempArray1);
    setFeaturedPostsId(tempArray2);
    console.log(res1);
  }, [isOn]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!modalRef || !modalRef.current) return false;
      console.log(modalRef.current.contains(event.target));
      if (!open || modalRef.current.contains(event.target)) {
        return false;
      }
      setOpen(!open);
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, modalRef]);

  const setFeatured = async (videoid) => {
    try {
      const data = {};
      data.id = userid;
      data.videoId = videoid;
      const res = await createFeature(data);
      setIsOn(true);
      setTimeout(() => {
        setIsOn(false);
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
  const removeFeatured = async (videoid) => {
    try {
      const data = {};
      data.id = userid;
      data.videoId = videoid;
      const res = await deleteFeature(data);
      setIsOn(true);
      setTimeout(() => {
        setIsOn(false);
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

  const selectImage = async (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
      setShowBar(true);
      return;
    }
    setSelected([...selected, id]);
    setShowBar(true);
  };

  const copy = () => {
    setDataSuccess(true);
    setSuccessMessage("Copied to clipboard");
    setTimeout(() => {
      setDataSuccess(false);
      setSuccessMessage("");
    }, 1500);
  };

  return (
    <div className="ml-4">
      {open && (
        <Portal selector="#portal">
          <div className="modal-backdrop fade-in"></div>
          <div
            className={`modal show ${background === "dark" ? "dark" : ""}`}
            data-background={background}
          >
            <div
              className="relative min-w-sm w-screen	mx-auto lg:max-w-xl"
              ref={modalRef}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <button
                    className="modal-close btn btn-transparent"
                    onClick={hide}
                  >
                    <FiX size={18} className="stroke-current" />
                  </button>
                </div>
                <div className="relative p-4 flex-auto">{body}</div>
                <div className="modal-footer space-x-2">
                  <button
                    className="btn btn-default"
                    type="button"
                    onClick={hide}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-default btn-rounded bg-blue-500 hover:bg-blue-600 text-white"
                    type="button"
                    onClick={hide}
                  >
                    Select Videos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
      {showBar && (
        <div class="ml-8 h-14 fixed bottom-10 right-10 w-9/12 rounded overflow-hidden flex z-20 items-center">
          <span className="text-white z-40 mr-4 ml-7">
            {selected.length} Video Selected
          </span>
          <span className="text-white z-40 ml-7" onClick={show}>
            Select All
          </span>
          <span className="ml-4 text-white z-40">
            <BiSlider size={18} />
          </span>
          <span className="ml-96"></span>
          <span className="ml-40"></span>
          <span className="text-white ml-8 z-40">
            <AiOutlineStar size={18} />
          </span>
          <span className="text-white ml-8 z-40">
            <FiTag size={18} />
          </span>
          <span className="text-white ml-8 z-40">
            <FiTwitter size={18} />
          </span>
          <span className="text-white ml-8 z-40">
            <FiMail size={18} />
          </span>
          <span className="text-white ml-8 z-40">
            <FiCode size={18} />
          </span>
          <span className="text-white ml-8 z-40">
            <FiLink2 className="ml-2.5" size={18} />
          </span>
          <span
            onClick={() => setShowBar(false)}
            className="text-white z-40  ml-12 "
          >
            Cancel
          </span>
          <div class="w-full h-full bg-black  absolute"></div>
        </div>
      )}
      <div>
        <span className="flex-shrink-0 font-bold inline-flex">
          <p>Featured Videos</p>
          <span className="ml-4"></span>
          <BiSlider size={20} />
        </span>
        <div className="grid w-5/12	 gap-2 gap-x-10 grid-cols-2 mt-2">
          {featuredPosts &&
            featuredPosts.map((post, index) => (
              <div className="w-72 h-72">
                {selected.includes(post.id) ? (
                  <GrCheckboxSelected
                    className="ml-2.5 relative left-5 top-10 z-10 bg-white"
                    size={18}
                  />
                ) : null}
                <img
                  onClick={() => selectImage(post.id)}
                  src={post.src}
                  className="w-72 h-40"
                />
                <p className="font-sans tracking-normal mt-4 w-72 h-11 leading-5 font-black	text-xl">
                  {post.description}
                </p>
                <span className="flex-shrink-0 inline-flex mt-6">
                  <p className="text-sm">{post.creator}</p>
                  <span className="ml-28"></span>
                  <HiOutlineDotsHorizontal size={20} />
                  <AiFillStar
                    onClick={() => removeFeatured(post.id)}
                    className="ml-2.5 text-yellow-200	"
                    size={20}
                  />
                  <CopyToClipboard text={post.link} onCopy={() => copy}>
                    <FiLink2 className="ml-2.5" size={20} />
                  </CopyToClipboard>
                </span>
              </div>
            ))}
        </div>
        <span className="flex-shrink-0 inline-flex mt-2 mb-2">
          <p className="font-bold">All Videos</p>
          <span className="ml-4 "></span>
          <BiSlider size={20} />
        </span>
        <div className="grid w-5/12	 gap-2 gap-x-10 grid-cols-2 mt-2">
          {posts &&
            posts.map((post, index) => (
              <div className="w-72 h-72">
                <div>
                  {selected.includes(post.id) ? (
                    <GrCheckboxSelected
                      className="ml-2.5 relative left-5 top-10 z-10 bg-white"
                      size={20}
                    />
                  ) : null}

                  <img
                    onClick={() => selectImage(post.id)}
                    className="w-72 h-40"
                    src={post.src}
                  />
                </div>
                <p className="font-sans tracking-normal mt-4 w-72 h-11 leading-5 font-black	text-xl">
                  {post.description}
                </p>
                <span className="flex-shrink-0 inline-flex mt-6">
                  <p className="text-sm">{post.creator}</p>
                  <span className="ml-28"></span>
                  <HiOutlineDotsHorizontal size={20} />
                  {featuredPostsId.includes(post.id) ? (
                    <AiFillStar
                      onClick={() => removeFeatured(post.id)}
                      className="ml-2.5 text-yellow-200	"
                      size={20}
                    />
                  ) : (
                    <AiOutlineStar
                      onClick={() => setFeatured(post.id)}
                      className="ml-2.5"
                      size={20}
                    />
                  )}
                  <CopyToClipboard
                    text={post.link}
                    onCopy={() => setCopied(true)}
                  >
                    <FiLink2 className="ml-2.5" size={20} />
                  </CopyToClipboard>
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default Index;
