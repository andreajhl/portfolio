import classes from "classnames";
import { FormattedMessage } from "react-intl";
import { ShareDropdown } from "../share-dropdown";
import styles from "./styles.module.scss";

type SharingSectionProps = {};

function SharingSection(props: SharingSectionProps) {
  const link = "https://famosos.com";
  return (
    <section className={styles.SharingSection}>
      <h2 className={styles.Title}>
        <FormattedMessage defaultMessage="Invita a tus amigos a que conozcan Famosos" />
      </h2>
      <div className={styles.Wrapper}>
        <span className={classes("text-with-ellipsis", styles.SharingLink)}>
          {link}
        </span>
        <ShareDropdown link={link} buttonClassName={styles.ShareButton} />
      </div>
    </section>
  );
}

export { SharingSection };
