import { XIcon } from "desktop-app/components/common/icons";
import ContractSummaryLayout from "desktop-app/components/layouts/contract-summary";
import React from "react";
import ContractDetails from "../../details";
import StatusPaymentDetails from "../../status-payment";
import styles from "./styles.module.scss";
import classes from "classnames";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";

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

type InstructionsContractRejectedProps = {
  payment_date: string;
  contractReference: string;
  status: number;
};

function HeaderContractRejected() {
  return (
    <div className={styles.HeaderContractRejected}>
      <XIcon />
      <p>
        <FormattedMessage defaultMessage="Tu pago ha sido rechazado." />
      </p>
    </div>
  );
}

function InstructionsContractRejected({
  payment_date,
  contractReference,
  status,
}: InstructionsContractRejectedProps) {
  const router = useRouter();
  return (
    <div className={styles.InstructionsContractRejected}>
      <div className={styles.StatusPaymentsDetails}>
        <StatusPaymentDetails
          payment_date={payment_date}
          contractReference={contractReference}
          status={status}
        />
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
            <FormattedMessage defaultMessage="Hacer nuevo intento de pago" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ContractSummaryRejected({
  contract,
  celebrity,
  lastPayment,
}: ContractWithPaymentsProps) {
  return (
    <ContractSummaryLayout
      header={<HeaderContractRejected />}
      contractDetails={
        <>
          <ContractDetails celebrity={celebrity} contract={contract} />
        </>
      }
      instructions={
        <InstructionsContractRejected
          status={lastPayment.status}
          payment_date={lastPayment.createdAt}
          contractReference={contract.reference}
        />
      }
    />
  );
}

export default ContractSummaryRejected;
