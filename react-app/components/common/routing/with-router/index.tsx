import React from "react";
import { useRouter } from "next/router";

const withRouter = (Component) => (props) => {
  const router = useRouter();
  const location = { pathname: router.asPath };

  return <Component {...{ ...props, history: router, location }} />;
};

export { withRouter };
