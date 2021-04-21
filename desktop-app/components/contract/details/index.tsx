import { PencilIcon } from "desktop-app/components/common/icons";
import React from "react";
import styles from "./styles.module.scss";

type ContractDetailsProps = {
  celebrity_name: string;
};

function ContractDetails({ celebrity_name }: ContractDetailsProps) {
  return (
    <div
      onClick={() => console.log("me clickearon, no puede ser")}
      className={styles.ContractDetails}
    >
      <div>
        <img
          height="75px"
          width="75px"
          className={styles.Avatar}
          alt={`Avatar de Famoso`}
          src="https://dqb0851cl2gjs.cloudfront.net/celebrities/1107/avatar/famosos-videos-personalizados-andrescepeda-compressed.jpg"
        ></img>{" "}
        <span className={styles.Title}>
          Video Personalizado de {celebrity_name}
        </span>
      </div>
      <div className={styles.ContractInstructions}>
        <div>
          <span className={styles.WhoReceive}>Para: Camila</span>
          <span className={styles.WhoSend}>De: Marco</span>
        </div>
        <PencilIcon
          style={{
            position: "absolute",
            right: 0
          }}
        />
        <span className={styles.InstructionsDetails}>
          ¡Hola Andrés Cepeda! Muchas gracias por esta oportunidad. Ana cumple
          [CANTIDAD] años pronto. Quisiera que por favor le envíes una
          felicitación súper especial. Hola Andrés Cepeda, muchas gracias por
          esta oportunidad. Ana cumple años y me gustaría que le cantaras una
          canción. Muchas gracias.
        </span>
      </div>
      <span className={styles.EditionNoticie}>
        *Puedes editar las instrucciones de tu video mientras está pendiente de
        grabación.
      </span>
      <br />
      <div className={styles.EmailDetails}>
        <p>Correo electrónico de notificación</p>
        <span>correo@domiminio.com</span>
      </div>
    </div>
  );
}

export default ContractDetails;
