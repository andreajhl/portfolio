import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { LoaderLayout } from "../../layouts/loader";

const TWENTY_SECONDS_IN_MILLISECONDS = 20000;
const AuthSuccess = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { push } = useRouter();
  useEffect(() => {
    const redirectInLocalStorage = localStorage.getItem("finalRedirect");
    if (isAuthenticated && !isLoading) {
      if (redirectInLocalStorage) push(redirectInLocalStorage);
    }
  }, [isAuthenticated, isLoading]);

  useEffect(() => {
    const IDClear = setTimeout(() => {
      const redirectInLocalStorage = localStorage.getItem("finalRedirect");
      if (redirectInLocalStorage) {
        push(redirectInLocalStorage);
      } else {
        push("/");
      }
    }, TWENTY_SECONDS_IN_MILLISECONDS);
    return () => {
      clearTimeout(IDClear);
    };
  }, []);

  return (
    <React.Fragment>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <LoaderLayout></LoaderLayout>
      </div>
    </React.Fragment>
  );
};

export { AuthSuccess };
