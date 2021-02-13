import React from "react";
import LoginButton from "../../containers/login-button/login-button";
import CreateContractStepsLayout from "../../containers/create-contracts-steps";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { HOME_PATH } from "../../../routing/Paths";
import { PageContainer } from "../../layouts/page-container";

const SignInPage = () => {
  const router = useRouter();

  const { isLoading, isAuthenticated } = useAuth0();
  if (!isLoading & isAuthenticated) {
    router.replace(HOME_PATH);
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>Famosos.com - Iniciar Sesión</title>
        <meta
          name="description"
          content="Inicia sesión en Famosos.com. Reserva tu video y disfruta de experiencias únicas."
        />
      </MetaTags>
      <PageContainer>
        <div className="container-sign-in-page">
          <div className="container-sign-in-page__login-details">
            <div className="container-sign-in-page__instructions">
              <h1>
                Ingresa a tu cuenta ahora para conectar con los famosos y vivir
                experiencias únicas
              </h1>
            </div>
            <LoginButton className="container-sign-in-page__login-button btn-primary"></LoginButton>
          </div>
          <div className="container-sign-in-page__create-contract-steps">
            <CreateContractStepsLayout></CreateContractStepsLayout>
          </div>
        </div>
      </PageContainer>
    </React.Fragment>
  );
};

export { SignInPage };
