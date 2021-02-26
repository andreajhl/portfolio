import React from "react";
import * as PATHS from "../../../routing/Paths";
import { PageContainer } from "../../layouts/page-container";
import LoginButton from "../../containers/login-button/login-button";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router-dom";
import CreateContractStepsLayout from "../../containers/create-contracts-steps";

const SignUpPage = () => {
  const { isLoading, isAuthenticated } = useAuth0();
  let RedirectTo = !isLoading ? (
    !isAuthenticated ? null : (
      <Redirect to={PATHS.HOME_PATH}></Redirect>
    )
  ) : null;
  return (
    <>
      {RedirectTo}
      <PageContainer>
        <div className="container-sign-up-page">
          <div className="container-sign-up-page__login-details">
            <div className="container-sign-up-page__instructions">
              <h1>
                Crea una cuenta ahora para conectar con los famosos y vivir
                experiencias únicas
              </h1>
            </div>
            <LoginButton className="container-sign-up-page__login-button btn-primary" />
          </div>
          <div className="container-sign-up-page__create-contract-steps">
            <CreateContractStepsLayout />
          </div>
        </div>
      </PageContainer>
    </>
  );
};

export { SignUpPage };
