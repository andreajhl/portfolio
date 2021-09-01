import { getCelebrityFanClubPath } from "constants/paths";
import { celebrityType } from "desktop-app/types/celebrityType";
import { FormattedMessage } from "react-intl";
import { Link } from "../../common/routing/link";
import styles from "./styles.module.scss";

type FanClubAdvertiseProps = {
  celebrity: celebrityType;
};

function FanClubAdvertise({ celebrity }: FanClubAdvertiseProps) {
  return (
    <div className={styles.FanClubAdvertise}>
      <span>
        <FormattedMessage
          defaultMessage="Accede a contenido exclusivo {br} de {celebrityFullName}."
          values={{ celebrityFullName: celebrity.fullName, br: <br /> }}
        />
      </span>
      <Link
        href={getCelebrityFanClubPath(celebrity.username)}
        className={styles.FanClubAdvertiseLink}
      >
        <button
          type="button"
          className={"btn btn-tertiary " + styles.FanClubAdvertiseButton}
        >
          <FormattedMessage defaultMessage="Unirme al Backstage" />
        </button>
      </Link>
    </div>
  );
}

export { FanClubAdvertise };
