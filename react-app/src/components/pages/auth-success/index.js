import React, { useEffect } from "react";
import { LoaderLayout } from "../../layouts/loader";
import { Redirect } from "react-router-dom";
import { HOME_PATH } from "../../../routing/Paths";

const AuthSuccess = () => {
  let RedirectTo = null;

  // RedirectTo = <Redirect to={HOME_PATH} />;
  return (
    <React.Fragment>
      {RedirectTo}
      <div
        className='container d-flex justify-content-center align-items-center'
        style={{ minHeight: "90vh" }}
      >
        <LoaderLayout></LoaderLayout>
      </div>
    </React.Fragment>
  );
};

export { AuthSuccess };
