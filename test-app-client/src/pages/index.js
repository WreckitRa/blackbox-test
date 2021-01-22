import React, { useEffect } from "react";

import Router from "next/router";

const Index = () => {
  useEffect(() => {
    Router.push("/login");
  });
  return <div />;
};
export default Index;
