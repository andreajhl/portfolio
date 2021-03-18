import { FamososLogo } from "desktop-app/components/common/logo";
import styles from "./styles.module.scss";
import { description, version } from "../../../../package.json";

const WebPageMeta = () => {
  return (
    <div className={styles.WebPageMeta}>
      <div className={styles.FamososLogo}>
        <FamososLogo />
      </div>
      <span className={styles.MetaDescription}>
        {description} {version}
      </span>
    </div>
  );
};

export default WebPageMeta;
