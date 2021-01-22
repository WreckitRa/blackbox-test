import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { FiSettings, FiChevronDown, FiLink2 } from "react-icons/fi";
import Dropdown1 from "./dropdown-1";
import Dropdown3 from "./dropdown-3";
import Dropdown4 from "./dropdown-4";
import Dropdown5 from "./dropdown-5";

const Navbar = () => {
  const { config } = useSelector(
    (state) => ({
      config: state.config,
    }),
    shallowEqual
  );
  let { rightSidebar, collapsed } = { ...config };
  const dispatch = useDispatch();
  return (
    <div className="navbar navbar-1 border-b">
      <div className="navbar-inner w-full flex items-center justify-start">
        <span className="ml-3"></span>
        <p className="text-2xl font-bold">Personal Library</p>

        <span className="ml-auto"></span>
        <Dropdown1 />
        <Dropdown4 />
        <div className="flex-shrink-0  inline-flex">
          <button className="btn btn-default rounded-l btn-icon bg-blue-500 hover:bg-blue-600 text-white space-x-1">
            <FiLink2 className="stroke-current text-white" size={18} />
            <span>Copy Link</span>
          </button>
          <button className="py-2 px-2 rounded-r btn-icon bg-blue-600 hover:bg-blue-600 text-white p-0	">
            <FiChevronDown className="stroke-current text-white" size={18} />
          </button>
        </div>
        <Dropdown3 />

        <button
          className="btn-transparent flex items-center justify-center h-16 w-8 mx-4"
          onClick={() =>
            dispatch({
              type: "SET_CONFIG_KEY",
              key: "rightSidebar",
              value: !rightSidebar,
            })
          }
        >
          <FiSettings size={18} />
        </button>
        <Dropdown5 />
        <span className="ml-7"></span>
      </div>
    </div>
  );
};

export default Navbar;
