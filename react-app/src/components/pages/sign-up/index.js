import React, { Component } from "react";
import "./styles.scss";
import {
  SignInWithCellphoneForm,
  SignInWithEmailForm,
  SignInWithWhatsAppForm
} from "../../containers";
import { Session } from "../../../state/utils/session";
import { history } from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import { PageContainer } from "../../layouts/page-container";
import * as GTM from "../../../state/utils/gtm";
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
    <React.Fragment>
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
            <LoginButton className="container-sign-up-page__login-button btn-primary"></LoginButton>
          </div>
          <div className="container-sign-up-page__create-contract-steps">
            <CreateContractStepsLayout></CreateContractStepsLayout>
          </div>
        </div>
      </PageContainer>
    </React.Fragment>
  );
};

export { SignUpPage };
