import { NavLink } from "react-app/src/components/common/routing";
import { PageContainer } from "react-app/src/components/layouts/page-container";
import { ROOT_PATH } from "react-app/src/routing/Paths";

const CustomError = () => {
  return (
    <PageContainer applyFetchCelebrities={false} showFooter={false}>
      <div className="SignInPage">
        <div className="section">
          <div className="auth-container mx-auto text-center p-4">
            <h3 className="font-weight-light text-center">
              Ha ocurrido un error.
            </h3>
            <p className="h6">Estamos haciendo lo posible por resolverlo.</p>
            <br />
            <img
              width="200px"
              style={{ opacity: "0.2" }}
              src="/assets/img/sad-face-in-rounded-square.svg"
              alt="sad-face"
            />
            <br />
            <br />
            <NavLink to={ROOT_PATH}>
              <button className="btn btn-primary">Volver a inicio</button>
            </NavLink>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default CustomError;
