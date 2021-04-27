import React, { useState } from "react";
import Maybe from "desktop-app/components/common/helpers/maybe";
import styles from "./styles.module.scss";
import ContractInstructionsEdit from "../instructions/edit";
import ContractInstructionsView from "../instructions/view";

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
  status_payment?: React.ReactNode;
};

function ContractDetails({
  contract,
  celebrity,
  status_payment = null,
}: ContractDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const saveNewInstructions = (newInstructions) => {
    console.log("TODO CONECTAR CON BACKEND");
    setIsEditing(false);
  };
  return (
    <div className={styles.ContractDetails}>
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
      <Maybe it={!isEditing}>
        <ContractInstructionsView
          deliveryTo={contract.deliveryTo}
          deliveryFrom={contract.deliveryFrom}
          instructions={contract.instructions}
          onToggleEdit={() => setIsEditing((prevState) => !prevState)}
        />
      </Maybe>
      <Maybe it={isEditing}>
        <ContractInstructionsEdit
          deliveryTo={contract.deliveryTo}
          deliveryFrom={contract.deliveryFrom}
          instructions={contract.instructions}
          onSaveChanges={(newValues) => saveNewInstructions(newValues)}
        />
      </Maybe>
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
              marginRight: "100%",
            }}
          />
          {status_payment}
        </div>
      </Maybe>
    </div>
  );
}

export default ContractDetails;
