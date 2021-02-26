import { useMemo } from "react";
import { useRouter } from "next/router";

const withRouter = (Component) => (props) => {
  const router = useRouter();
  const location = useMemo(
    () => ({
      pathname: router.asPath,
      search: router.asPath.replace(router.pathname, "")
    }),
    [router.asPath, router.pathname]
  );

  return <Component {...{ ...props, history: router, location, router }} />;
};

export { withRouter };
