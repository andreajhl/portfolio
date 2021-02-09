import React from "react";
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
            <a>
              <span style={{ color: "white" }}>Ingresar</span>
            </a>
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
