import { useRouter } from "next/router";
import React from "react";
import { NavLink } from "react-app/src/components/common/routing";
import { PageContainer } from "react-app/src/components/layouts/page-container";
import { HOME_PATH } from "react-app/src/routing/Paths";
import { FormattedMessage } from "react-intl";

const ServerErrorPage = () => {
  const { asPath } = useRouter();
  return (
    <PageContainer applyFetchCelebrities={false} showFooter={false}>
      <div className="container mx-auto d-flex flex-column align-items-center text-center p-4">
        <h3 className="font-weight-light text-center mb-5">
          <FormattedMessage defaultMessage="Ha ocurrido un error." />
        </h3>
        <img
          width="200px"
          style={{ opacity: "0.2" }}
          src="/assets/img/sad-face-in-rounded-square.svg"
          alt="sad-face"
        />
        <div className="mt-5">
          <h3>Nos disculpamos, estamos arreglando el problema.</h3>
          <h5 className="mt-3">{asPath}</h5>
        </div>
        <br />
        <NavLink to={HOME_PATH}>
          <button className="btn btn-primary mt-2">
            <FormattedMessage defaultMessage="Volver a inicio" />
          </button>
        </NavLink>
      </div>
    </PageContainer>
  );
};

export default ServerErrorPage;
