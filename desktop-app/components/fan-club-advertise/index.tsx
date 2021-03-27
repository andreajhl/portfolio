import { getCelebrityFanClubPath } from "constants/paths";
import { celebrityType } from "react-app/src/types/celebrityType";
import { Link } from "../common/routing/link";
import styles from "./styles.module.scss";

type FanClubAdvertiseProps = {
  celebrity: celebrityType;
};

function FanClubAdvertise({ celebrity }: FanClubAdvertiseProps) {
  return (
    <div className={styles.FanClubAdvertise}>
      <span>
        Accede a contenido exclusivo <br /> de {celebrity.fullName}.
      </span>
      <Link
        href={getCelebrityFanClubPath(celebrity.username)}
        className={styles.FanClubAdvertiseLink}
      >
        <button
          type="button"
          className={"btn btn-tertiary " + styles.FanClubAdvertiseButton}
        >
          Unirme al Club de Fans
        </button>
      </Link>
    </div>
  );
}

export { FanClubAdvertise };
