import { FiBox, FiMenu, FiCircle } from "react-icons/fi";
import { CgShapeCircle } from "react-icons/cg";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Link from "next/link";

const Logo = () => {
  const dispatch = useDispatch();
  const { config, leftSidebar } = useSelector(
    (state) => ({
      config: state.config,
      leftSidebar: state.leftSidebar,
    }),
    shallowEqual
  );
  const { name, collapsed } = { ...config };
  const { showLogo } = { ...leftSidebar };
  if (showLogo) {
    return (
      <div className="logo truncate">
        <Link href="/">
          <a className="flex flex-row items-center justify-start space-x-2">
            <CgShapeCircle className="font-black" size={55} />
            <span></span>
          </a>
        </Link>
      </div>
    );
  }
  return null;
};

export default Logo;
