import { CLIENT_HIRINGS } from "constants/paths";
import { Link } from "desktop-app/components/common/routing/link";
import styles from "./styles.module.scss";

type GoToContractDetailsButtonProps = {
  className?: string;
};

function GoToContractDetailsButton({
  className,
}: GoToContractDetailsButtonProps) {
  return (
    <Link href={CLIENT_HIRINGS} className={className}>
      <button
        className={`btn btn-tertiary ${styles.GoToContractDetailsButton}`}
      >
        Ver detalles de video
      </button>
    </Link>
  );
}

export { GoToContractDetailsButton };
