import React from "react";
import { LoaderLayout } from "../../layouts/loader";

const AuthSuccess = () => {
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
