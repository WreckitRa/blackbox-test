import Router from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { FiUpload } from "react-icons/fi";

const Dropdown = () => {
  const handleClick = () => {
    Router.push("/videos/add");
  };

  return (
    <div className="hidden lg:flex relative">
      <button
        onClick={handleClick}
        className="flex items-center justify-center h-16 w-12 relative"
      >
        <FiUpload size={18} />
      </button>
    </div>
  );
};

export default Dropdown;
