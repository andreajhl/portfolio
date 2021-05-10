import classes from "classnames";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { useState } from "react";
import styles from "./styles.module.scss";

type HelpCardProps = {
  deliveryTo: string;
};

function HelpCard({ deliveryTo }: HelpCardProps) {
  const [isHidden, setIsHidden] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  function removeElement({ propertyName }) {
    if (propertyName === "opacity") {
      setIsRemoved(true);
    }
  }

  return (
    <Maybe it={!isRemoved}>
      <section
        className={classes(styles.HelpCard, isHidden && styles.Hidden)}
        onTransitionEnd={removeElement}
      >
        <h2 className={styles.Title}>
          ¡Personaliza esta página para {deliveryTo}!
        </h2>
        <p className={styles.HelpText}>
          Puedes agregar un fondo y escribir un mensaje para hacer más especial
          la entrega de tu video.
        </p>
        <button
          type="button"
          className={"btn " + styles.AcceptButton}
          onClick={() => setIsHidden(true)}
        >
          Entendido
        </button>
      </section>
    </Maybe>
  );
}

export { HelpCard };
