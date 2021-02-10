import React from "react";
import { NavLink } from "react-app/src/components/common/routing";
import { HOME_PATH } from "react-app/src/routing/Paths";

const FourZeroFour = () => {
  return (
    <div className="SignInPage">
      <div className="section">
        <div className="auth-container mx-auto text-center p-4">
          <h3 className="font-weight-light text-center">
            Lo sentimos, esta página no fue encontrada
          </h3>
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
            <button className="btn btn-primary">Volver a inicio</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
/* <PageContainer
        applyFetchCelebrities={false}
        showFooter={false}
      ></PageContainer> */

export { FourZeroFour };
