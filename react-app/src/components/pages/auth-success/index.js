import React, { useEffect } from "react";
import { LoaderLayout } from "../../layouts/loader";
import { Session } from "../../../state/utils/session";

const TWENTY_SECONDS_IN_MILLISECONDS = 20000;
const AuthSuccess = () => {

  useEffect(() => {
    setTimeout(() => {
      const session = new Session();
      session.initSession()
    }, 500);
  });

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
