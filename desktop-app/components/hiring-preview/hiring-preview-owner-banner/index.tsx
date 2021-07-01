import styles from "./styles.module.scss";
import classes from "classnames";
import { useLoginHandler } from "react-app/src/utils/useLoginHandler";
import { getClientHiringPreviewPath } from "constants/paths";
import { useAuth0 } from "@auth0/auth0-react";
import { Session } from "react-app/src/state/utils/session";

type HiringPreviewOwnerBannerProps = {
  className?: string;
  contractReference: string;
};

function HiringPreviewOwnerBanner({
  className,
  contractReference,
}: HiringPreviewOwnerBannerProps) {
  const { logout } = useAuth0();
  const loginHandler = useLoginHandler();

  function loginWithRedirectToClientHiring() {
    new Session().removeSession();
    logout({ localOnly: true });
    const redirectUrl = getClientHiringPreviewPath(contractReference);
    localStorage.setItem("finalRedirect", redirectUrl);
    loginHandler();
  }

  return (
    <div className={classes(styles.HiringPreviewOwnerBanner, className)}>
      <h3 className={styles.Title}>¿Eres el dueño de este video?</h3>
      <p className={styles.Text}>
        Inicia sesión para ver los detalles o personalizar la entrega.
      </p>
      <button
        type="button"
        className={classes("btn btn-secondary", styles.Button)}
        onClick={loginWithRedirectToClientHiring}
      >
        Ingresar
      </button>
    </div>
  );
}

export { HiringPreviewOwnerBanner };
