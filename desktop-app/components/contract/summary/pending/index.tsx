import { LetterIcon, ClockIcon } from "desktop-app/components/common/icons";
import ContractSummaryLayout from "desktop-app/components/layouts/contract-summary";
import React from "react";
import ContractDetails from "../../details";
import StatusPaymentDetails from "../../status-payment";
import styles from "./styles.module.scss";
import classes from "classnames";
import { useRouter } from "next/router";
import { CLIENT_HIRINGS } from "constants/paths";
import { FormattedMessage } from "react-intl";

const emailSpan = (chunk: string) => (
  <span className={styles.EmailClient}>{chunk}</span>
);

type ContractWithPaymentsProps = {
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
  lastPayment: {
    id: number;
    createdAt: string;
    price: number;
    status: number;
    transactionChargeId: string;
    paymentMethodLogo: string;
  };
};

type InstructionsContractPendingProps = {
  payment_date: string;
  email_client: string;
  contractReference: string;
  status: number;
};
function HeaderContractPending() {
  return (
    <div className={styles.HeaderContractPending}>
      <ClockIcon />
      <p>
        <FormattedMessage defaultMessage="Tu pago está pendiente de aprobación." />
      </p>
    </div>
  );
}

function InstructionsContractPending({
  email_client,
  contractReference,
  payment_date,
  status,
}: InstructionsContractPendingProps) {
  const router = useRouter();
  return (
    <div className={styles.InstructionsContractPending}>
      <div className={styles.StatusPaymentsDetails}>
        <StatusPaymentDetails
          status={status}
          payment_date={payment_date}
          contractReference={contractReference}
        />
      </div>
      <div className={styles.InstructionList}>
        <div className={styles.InstructionListItem}>
          <div>
            <ClockIcon className={styles.InstructionListItemIcon} />
          </div>
          <div>
            <span>
              <FormattedMessage defaultMessage="El proceso de aprobación de pago puede tardar alrededor de 24 hrs." />
            </span>
          </div>
        </div>
        <div className={styles.InstructionListItem}>
          <div>
            <LetterIcon className={styles.InstructionListItemIcon} />
          </div>
          <div>
            <span>
              <FormattedMessage
                defaultMessage="Te notificaremos a <emailSpan>{email_client}</emailSpan> cuando tu
              pago haya sido aprobado."
                values={{ email_client, emailSpan }}
              />
            </span>
          </div>
        </div>
      </div>
      <div className={styles.FooterInstructions}>
        <div className={styles.ConsultationNoticies}>
          <p>
            <FormattedMessage defaultMessage="Si quieres saber más sobre el estado de tu transacción puedes contactar a nuestro equipo de soporte." />
          </p>
        </div>
        <div className={styles.FooterInstructionsCTA}>
          <button
            onClick={() => router.push("/")}
            className={classes(
              "btn btn-secondary",
              styles.FooterInstructionsCTAButton
            )}
          >
            <FormattedMessage defaultMessage="Seguir Comprando" />
          </button>
          <span onClick={() => router.push(CLIENT_HIRINGS)}>
            <FormattedMessage defaultMessage="Ir a mis solicitudes" />
          </span>
        </div>
      </div>
    </div>
  );
}

function ContractSummaryPending({
  contract,
  celebrity,
  lastPayment,
}: ContractWithPaymentsProps) {
  return (
    <ContractSummaryLayout
      header={<HeaderContractPending />}
      contractDetails={
        <>
          <ContractDetails celebrity={celebrity} contract={contract} />
        </>
      }
      instructions={
        <InstructionsContractPending
          email_client={contract.deliveryContact}
          payment_date={lastPayment.createdAt}
          contractReference={contract.reference}
          status={lastPayment.status}
        />
      }
    />
  );
}

export default ContractSummaryPending;
