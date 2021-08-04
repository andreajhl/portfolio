import styles from "./styles.module.scss";
import classes from "classnames";
import { useLoginHandler } from "react-app/src/utils/useLoginHandler";
import { getClientHiringPreviewPath } from "constants/paths";
import { useAuth } from "lib/famosos-auth";
import { Session } from "react-app/src/state/utils/session";
import { FormattedMessage } from "react-intl";

type HiringPreviewOwnerBannerProps = {
  className?: string;
  contractReference: string;
};

function HiringPreviewOwnerBanner({
  className,
  contractReference,
}: HiringPreviewOwnerBannerProps) {
  const { logout } = useAuth();
  const loginHandler = useLoginHandler();

  function loginWithRedirectToClientHiring() {
    new Session().removeSession();
    logout();
    const redirectUrl = getClientHiringPreviewPath(contractReference);
    localStorage.setItem("finalRedirect", redirectUrl);
    loginHandler();
  }

  return (
    <div className={classes(styles.HiringPreviewOwnerBanner, className)}>
      <h3 className={styles.Title}>
        <FormattedMessage defaultMessage="¿Eres el dueño de este video?" />
      </h3>
      <p className={styles.Text}>
        <FormattedMessage defaultMessage="Inicia sesión para ver los detalles o personalizar la entrega." />
      </p>
      <button
        type="button"
        className={classes("btn btn-secondary", styles.Button)}
        onClick={loginWithRedirectToClientHiring}
      >
        <FormattedMessage defaultMessage="Ingresar" />
      </button>
    </div>
  );
}

export { HiringPreviewOwnerBanner };
