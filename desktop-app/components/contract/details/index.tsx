import React, { useState } from "react";
import Maybe from "desktop-app/components/common/helpers/maybe";
import styles from "./styles.module.scss";
import ContractInstructionsEdit from "../instructions/edit";
import ContractInstructionsView from "../instructions/view";
import { useUpdateHiredContract } from "lib/hooks/useUpdateHiredContract";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";

const messages = defineMessages({
  avatarAlt: {
    defaultMessage: "Avatar de Famoso",
  },
});

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
  const { formatMessage } = useIntl();
  const { update } = useUpdateHiredContract();
  const [formData, setFormData] = useState({
    deliveryTo: contract.deliveryTo,
    deliveryFrom: contract.deliveryFrom,
    instructions: contract.instructions,
  });
  const [isEditing, setIsEditing] = useState(false);
  const saveNewInstructions = (newInstructions) => {
    update(contract.reference, newInstructions).then(() => {
      setFormData(newInstructions);
    });
    setIsEditing(false);
  };

  const avatarAlt = formatMessage(messages.avatarAlt);

  return (
    <div className={styles.ContractDetails}>
      <div>
        <img
          height="75px"
          width="75px"
          className={styles.Avatar}
          alt={avatarAlt}
          src={celebrity.avatar}
        />
        <span className={styles.Title}>
          <FormattedMessage
            defaultMessage="Video Personalizado de {celebrityFullName}"
            values={{ celebrityFullName: celebrity.fullName }}
          />
        </span>
      </div>
      <Maybe it={!isEditing}>
        <ContractInstructionsView
          deliveryTo={formData.deliveryTo}
          deliveryFrom={formData.deliveryFrom}
          instructions={formData.instructions}
          onToggleEdit={() => setIsEditing((prevState) => !prevState)}
        />
      </Maybe>
      <Maybe it={isEditing}>
        <ContractInstructionsEdit
          deliveryTo={formData.deliveryTo}
          deliveryFrom={formData.deliveryFrom}
          instructions={formData.instructions}
          onSaveChanges={(newValues) => saveNewInstructions(newValues)}
        />
      </Maybe>
      <span className={styles.EditionNoticie}>
        <FormattedMessage defaultMessage="*Puedes editar las instrucciones de tu video mientras está pendiente de grabación." />
      </span>
      <br />
      <div className={styles.EmailDetails}>
        <p>
          <FormattedMessage defaultMessage="Correo electrónico de notificación" />
        </p>
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
