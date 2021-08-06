import { CLIENT_HIRINGS } from "constants/paths";
import { Link } from "desktop-app/components/common/routing/link";
import styles from "./styles.module.scss";
import classes from "classnames";
import { FormattedMessage } from "react-intl";

type GoToContractDetailsButtonProps = {
  className?: string;
};

function GoToContractDetailsButton({
  className,
}: GoToContractDetailsButtonProps) {
  return (
    <Link
      href={CLIENT_HIRINGS}
      className={classes(
        "btn btn-tertiary",
        styles.GoToContractDetailsButton,
        className
      )}
    >
      <FormattedMessage defaultMessage="Ver detalles del video" />
    </Link>
  );
}

export { GoToContractDetailsButton };
