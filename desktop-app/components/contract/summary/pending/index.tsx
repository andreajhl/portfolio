import { LetterIcon, ClockIcon } from "desktop-app/components/common/icons";
import ContractSummaryLayout from "desktop-app/components/layouts/contract-summary";
import React from "react";
import ContractDetails from "../../details";
import StatusPaymentDetails from "../../status-payment";
import styles from "./styles.module.scss";
import classes from "classnames";
import { useRouter } from "next/router";
import { CLIENT_HIRINGS } from "constants/paths";

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
};
function HeaderContractPending() {
  return (
    <div className={styles.HeaderContractPending}>
      <ClockIcon />
      <p>Tu pago está pendiente de aprobación.</p>
    </div>
  );
}

function InstructionsContractPending({
  email_client,
  contractReference,
  payment_date,
}: InstructionsContractPendingProps) {
  const router = useRouter();
  return (
    <div className={styles.InstructionsContractPending}>
      <div className={styles.StatusPaymentsDetails}>
        <StatusPaymentDetails
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
              El proceso de aprobación de pago puede tardar alrededor de 24 hrs.
            </span>
          </div>
        </div>
        <div className={styles.InstructionListItem}>
          <div>
            <LetterIcon className={styles.InstructionListItemIcon} />
          </div>
          <div>
            <span>
              Te notificaremos a{" "}
              <span className={styles.EmailClient}>{email_client}</span> cuando
              tu pago haya sido aprobado.
            </span>
          </div>
        </div>
      </div>
      <div className={styles.FooterInstructions}>
        <div className={styles.ConsultationNoticies}>
          <p>
            Si quieres saber más sobre el estado de tu transacción puedes
            contactar a nuestro equipo de soporte.
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
            Seguir Comprando
          </button>
          <span onClick={() => router.push(CLIENT_HIRINGS)}>
            Ir a mis solicitudes
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
        />
      }
    />
  );
}

export default ContractSummaryPending;
