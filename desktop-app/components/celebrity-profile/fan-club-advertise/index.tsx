import { getCelebrityFanClubPath } from "constants/paths";
import { celebrityType } from "desktop-app/types/celebrityType";
import { FormattedMessage } from "react-intl";
import { Link } from "../../common/routing/link";
import classes from "classnames";
import styles from "./styles.module.scss";

type FanClubAdvertiseProps = {
  className?: string;
  celebrity: celebrityType;
};

function FanClubAdvertise({ className, celebrity }: FanClubAdvertiseProps) {
  return (
    <div className={classes(styles.FanClubAdvertise, className)}>
      <p className={styles.FanClubAdvertiseCopy}>
        <FormattedMessage
          defaultMessage="Accede a contenido exclusivo de {celebrityFullName}."
          values={{ celebrityFullName: celebrity.fullName }}
        />
      </p>
      <Link
        href={getCelebrityFanClubPath(celebrity.username)}
        className={classes(
          "btn btn-tertiary",
          styles.FanClubAdvertiseButton,
          styles.FanClubAdvertiseLink
        )}
      >
        <FormattedMessage defaultMessage="Unirme al Club de Fans" />
      </Link>
    </div>
  );
}

export { FanClubAdvertise };
