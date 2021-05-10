import classes from "classnames";
import styles from "./styles.module.scss";

type PoweredByFamososBannerProps = {
  className?: string;
};

function PoweredByFamososBanner({
  className = ""
}: PoweredByFamososBannerProps) {
  return (
    <div className={classes(styles.PoweredByFamososBanner, className)}>
      Powered by Famosos{" "}
      <img
        className={styles.PoweredByFamososBannerIcon}
        src="/assets/img/favicon.svg"
        alt="Icono de Famosos Inc."
      />
    </div>
  );
}

export { PoweredByFamososBanner };
