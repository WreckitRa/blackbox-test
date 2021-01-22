import React, { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";

const Dropdown = () => {
  const [hidden, setHidden] = useState(true);

  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        hidden ||
        buttonRef.current.contains(event.target) ||
        dropdownRef.current.contains(event.target)
      ) {
        return false;
      }
      setHidden(!hidden);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hidden, dropdownRef, buttonRef]);

  const handleDropdownClick = () => {
    setHidden(!hidden);
  };

  return (
    <div className="hidden lg:flex relative">
      <button
        ref={buttonRef}
        className="flex items-center justify-center h-16 w-12"
      >
        <FiSearch size={18} />
      </button>
      <div
        ref={dropdownRef}
        className={`dropdown absolute top-0 right-0 mt-16 ${
          hidden ? "" : "open"
        }`}
      ></div>
    </div>
  );
};

export default Dropdown;
