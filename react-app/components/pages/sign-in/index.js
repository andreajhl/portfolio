import React from "react";

import { Session } from "../../../state/utils/session";
import { history } from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import { PageContainer } from "../../layouts/page-container";
import * as GTM from "../../../state/utils/gtm";
import Link from "next/link";
import LoginButton from "../../containers/login-button/login-button";
import CreateContractStepsLayout from "../../containers/create-contracts-steps";

const SignInPage = () => {
  return (
    <div className="container-sign-in-page">
      <div className="container-sign-in-page__login-details">
        <div className="container-sign-in-page__instructions">
          <h1>
            Crea una cuenta ahora para conectar con los famosos y vivir
            experiencias únicas
          </h1>
        </div>

        <LoginButton className="container-sign-in-page__login-button btn-primary">
          <Link href="/api/login">
            <a>Ingresar</a>
          </Link>
        </LoginButton>
      </div>
      <div className="container-sign-in-page__create-contract-steps">
        <CreateContractStepsLayout></CreateContractStepsLayout>
      </div>
    </div>
  );
};

export { SignInPage };
