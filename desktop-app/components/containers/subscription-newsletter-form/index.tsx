import React from "react";
import styles from "./styles.module.scss";
const SubscriptionNewsletterForm = () => {
  return (
    <div className={styles.SubscriptionNewsLetterFormContainer}>
      <p>Entérate de nuestras últimas noticias y promociones</p>
      {/* TODO: reemplazar con componente input reutilizable */}
      <form>
        <input></input>
      </form>
    </div>
  );
};

export default SubscriptionNewsletterForm;
