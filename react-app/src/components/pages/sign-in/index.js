import React from "react";
import LoginButton from "../../containers/login-button/login-button";
import CreateContractStepsLayout from "../../containers/create-contracts-steps";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { HOME_PATH } from "../../../routing/Paths";
import { PageContainer } from "../../layouts/page-container";
import { FormattedMessage } from "react-intl";

const SignInPage = () => {
  const router = useRouter();

  const { isLoading, isAuthenticated } = useAuth0();
  if (!isLoading & isAuthenticated) {
    router.replace(HOME_PATH);
  }

  return (
    <React.Fragment>
      <PageContainer>
        <div className="container-sign-in-page">
          <div className="container-sign-in-page__login-details">
            <div className="container-sign-in-page__instructions">
              <h1>
                <FormattedMessage
                  defaultMessage=" Ingresa a tu cuenta ahora para conectar con los famosos y vivir
                experiencias únicas"
                />
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
