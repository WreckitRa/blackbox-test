import { useRouter } from "next/router";
import Centered from "./centered";
import Empty from "./empty";
import Layout1 from "./layout-1";

const Layouts = ({ children }) => {
  const router = useRouter();
  let { pathname } = { ...router };
  if (["/404", "/500"].includes(pathname)) {
    return <Centered>{children}</Centered>;
  }
  if (
    [
      "/login",
      "/create-account",
      "/email-confirmation",
      "/email-verification/[id]",
      "/logout",
      "/reset-password/[token]",
      "/forgot-password",
      "/error-page",
    ].includes(pathname)
  ) {
    return <Centered>{children}</Centered>;
  } else if (["/login"].includes(pathname)) {
    return <Empty>{children}</Empty>;
  } else {
    return <Layout1>{children}</Layout1>;
  }
};

export default Layouts;
