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
import MetaTags from "react-meta-tags";
import LoginButton from "../../containers/login-button/login-button";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router-dom";

const SignInPage = () => {
  const { isLoading, isAuthenticated } = useAuth0();
  let RedirectTo = !isLoading ? (
    !isAuthenticated ? null : (
      <Redirect to={PATHS.HOME_PATH}></Redirect>
    )
  ) : null;
  return (
    <React.Fragment>
      {RedirectTo}
      <MetaTags>
        <title>Famosos.com - Iniciar Sesión</title>
        <meta
          name='description'
          content='Inicia sesión en Famosos.com. Reserva tu video y disfruta de experiencias únicas.'
        />
      </MetaTags>
      <PageContainer>
        <div className='container-sign-in-page'>
          <div className='container-sign-in-page__login-details'>
            <div className='container-sign-in-page__instructions'>
              <h1>
                Crea una cuenta ahora para conectar con los famosos y vivir
                experiencias únicas
              </h1>
            </div>
          </div>
          <LoginButton
            className='container-sign-in-page__login-button btn-primary'
            redirectUrl={localStorage.getItem("finalRedirect")}
          ></LoginButton>
        </div>
      </PageContainer>
    </React.Fragment>
  );
};

export { SignInPage };
