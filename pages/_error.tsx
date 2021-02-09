import { NavLink } from "react-app/components/common/routing";
import { HOME_PATH } from "react-app/routing/Paths";

const CustomError = () => {
  return (
    <div className="SignInPage">
      <div className="section">
        <div className="auth-container mx-auto text-center p-4">
          <h3 className="font-weight-light text-center">
            Ha ocurrido un error. <br />
            Estamos haciendo lo posible por resolverlo.
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

export default CustomError;
