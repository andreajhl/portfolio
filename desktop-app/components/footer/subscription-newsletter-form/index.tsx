import InputWithSubmitHandler from "desktop-app/components/common/form/InputWithSubmitHandler";
import React from "react";
import styles from "./styles.module.scss";
const SubscriptionNewsletterForm = () => {
  return (
    <div className={styles.SubscriptionNewsletterForm}>
      <p>Entérate de nuestras últimas noticias y promociones</p>
      <div className={styles.SubscriptionNewsLetterFormInputElement}>
        <InputWithSubmitHandler
          placeHolderInput={"E-mail"}
          placeHolderButton={"Suscribirme"}
          className={styles.SubscriptionNewsLetterFormInputElementModifier}
          btnType={"btn-secondary"}
        />
      </div>
    </div>
  );
};

export default SubscriptionNewsletterForm;
