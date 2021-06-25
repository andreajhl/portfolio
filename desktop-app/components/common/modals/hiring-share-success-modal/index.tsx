import { CLIENT_HIRINGS, getClientHiringPreviewPath } from "constants/paths";
import { FormattedMessage } from "react-intl";
import { AnimatedPopup } from "../../animated-popup";
import { CheckedCircleIcon } from "../../icons";
import { Link } from "../../routing/link";
import styles from "./styles.module.scss";

type HiringShareSuccessModalProps = {
  isOpen?: boolean;
  contractReference: string;
};

function HiringShareSuccessModal({
  isOpen = false,
  contractReference,
}: HiringShareSuccessModalProps) {
  return (
    <AnimatedPopup
      open={isOpen}
      modal
      closeOnDocumentClick={false}
      closeOnEscape={false}
    >
      <div className={styles.HiringShareSuccessModal}>
        <div className={styles.SuccessMessage}>
          <CheckedCircleIcon />
          <span>
            <FormattedMessage defaultMessage="La entrega de tu video se programó correctamente" />
          </span>
          <Link
            href={CLIENT_HIRINGS}
            className={`btn btn-primary ${styles.GoToHiringsLink}`}
          >
            <FormattedMessage defaultMessage="Ir a Mis Solicitudes" />
          </Link>
          <Link
            href={getClientHiringPreviewPath(contractReference)}
            className={styles.GoToContractDetailsLink}
          >
            <FormattedMessage defaultMessage="Ver video" />
          </Link>
        </div>
      </div>
    </AnimatedPopup>
  );
}

export { HiringShareSuccessModal };
