import { CLIENT_HIRINGS, getClientHiringPreviewPath } from "constants/paths";
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
            La entrega de tu video <br /> se programó correctamente
          </span>
          <Link href={CLIENT_HIRINGS}>
            <button type="button" className="btn btn-primary">
              Ir a Mis Solicitudes
            </button>
          </Link>
          <Link
            href={getClientHiringPreviewPath(contractReference)}
            className={styles.GoToContractDetailsLink}
          >
            Ver contrato
          </Link>
        </div>
      </div>
    </AnimatedPopup>
  );
}

export { HiringShareSuccessModal };
