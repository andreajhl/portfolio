import classes from "classnames";
import { ShareDropdown } from "../share-dropdown";
import styles from "./styles.module.scss";

type SharingSectionProps = {};

function SharingSection(props: SharingSectionProps) {
  return (
    <section className={styles.SharingSection}>
      <h2 className={styles.Title}>Háblale a tus amigos de Famosos</h2>
      <div className={styles.Wrapper}>
        <a
          className={classes("text-with-ellipsis", styles.SharingLink)}
          href="http://www.famosos.com/micuenta"
        >
          http://www.famosos.com/micuenta
        </a>
        <ShareDropdown buttonClassName={styles.ShareButton} />
      </div>
    </section>
  );
}

export { SharingSection };
