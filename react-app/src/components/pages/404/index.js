import { useRouter } from "next/router";
import React from "react";
import { NavLink } from "react-app/src/components/common/routing";
import { HOME_PATH } from "react-app/src/routing/Paths";
import { FormattedMessage } from "react-intl";
import { PageContainer } from "../../layouts/page-container";

function FourZeroFour() {
  const { asPath } = useRouter();

  return (
    <PageContainer
      applyFetchCelebrities={false}
      showFooter={false}
      showBotMakerFrame
    >
      <div className="SignInPage">
        <div className="section">
          <div className="auth-container mx-auto text-center p-4">
            <h3 className="font-weight-light text-center">
              <FormattedMessage defaultMessage="Lo sentimos, esta página no fue encontrada" />
            </h3>
            <p>
              <FormattedMessage defaultMessage="Ruta:" /> {asPath}
            </p>
            <br />
            <img
              width="200px"
              style={{ opacity: "0.2" }}
              src="/assets/img/sad-face-in-rounded-square.svg"
              alt="sad-face"
            />
            <br />
            <br />
            <NavLink to={HOME_PATH}>
              <button className="btn btn-primary">
                <FormattedMessage defaultMessage="Volver a inicio" />
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export { FourZeroFour };
