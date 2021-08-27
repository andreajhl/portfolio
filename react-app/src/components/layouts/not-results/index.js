import React from "react";
import styles from "./styles.module.scss";

function NotResults({ message }) {
  return (
    <div className={styles.ContainerNotResults}>
      <h4>
        {message}
        <span role="img" aria-label="crying-face">
          😢
        </span>
      </h4>
    </div>
  );
}

export { NotResults };
