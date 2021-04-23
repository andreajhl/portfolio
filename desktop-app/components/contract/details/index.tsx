import Maybe from "desktop-app/components/common/helpers/maybe";
import { PencilIcon } from "desktop-app/components/common/icons";
import React from "react";
import styles from "./styles.module.scss";

type ContractDetailsProps = {
  contract: {
    isPublic: boolean;
    instructions: string;
    deliveryContact: string;
    deliveryContactCellphone: string;
    deliveryTo: string;
    deliveryFrom?: string;
    reference: string;
    status: number;
    authorizationDate: string;
  };
  celebrity: {
    username: string;
    avatar: string;
    fullName: string;
  };
  status_payment: React.ReactNode;
};

function ContractDetails({
  contract,
  celebrity,
  status_payment = null
}: ContractDetailsProps) {
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
          src={celebrity.avatar}
        ></img>
        <span className={styles.Title}>
          Video Personalizado de {celebrity.fullName}
        </span>
      </div>
      <div className={styles.ContractInstructions}>
        <div>
          <span className={styles.WhoReceive}>Para: {contract.deliveryTo}</span>
          <Maybe it={typeof contract.deliveryFrom === "string"}>
            <span className={styles.WhoSend}>De: {contract.deliveryFrom}</span>
          </Maybe>
        </div>
        <PencilIcon
          style={{
            position: "absolute",
            right: 0
          }}
        />
        <span className={styles.InstructionsDetails}>
          {contract.instructions}
        </span>
      </div>
      <span className={styles.EditionNoticie}>
        *Puedes editar las instrucciones de tu video mientras está pendiente de
        grabación.
      </span>
      <br />
      <div className={styles.EmailDetails}>
        <p>Correo electrónico de notificación</p>
        <span>{contract.deliveryContact}</span>
      </div>
      <Maybe it={React.isValidElement(status_payment)}>
        <div className={styles.StatusPayment}>
          <hr
            style={{
              width: "233px",
              marginRight: "100%"
            }}
          />
          {status_payment}
        </div>
      </Maybe>
    </div>
  );
}

export default ContractDetails;
