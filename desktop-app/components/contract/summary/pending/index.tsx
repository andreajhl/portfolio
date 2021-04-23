import { XIcon } from "desktop-app/components/common/icons";
import ContractSummaryLayout from "desktop-app/components/layouts/contract-summary";
import React from "react";
import ContractDetails from "../../details";
import StatusPaymentDetails from "../../status-payment";
import styles from "./styles.module.scss";
import classes from "classnames";
import { useRouter } from "next/router";

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
  payment_id: number;
  transaction_charge_id: string;
};
function HeaderContractPending() {
  return (
    <div className={styles.HeaderContractPending}>
      <XIcon />
      <p>Tu pago ha sido rechazado.</p>
    </div>
  );
}

function InstructionsContractPending({
  payment_id,
  transaction_charge_id,
  payment_date
}: InstructionsContractPendingProps) {
  const router = useRouter();
  return (
    <div className={styles.InstructionsContractPending}>
      <div className={styles.StatusPaymentsDetails}>
        <StatusPaymentDetails
          payment_id={payment_id}
          transaction_charge_id={transaction_charge_id}
          payment_date={payment_date}
        ></StatusPaymentDetails>
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
            Hacer nuevo intento de pago
          </button>
        </div>
      </div>
    </div>
  );
}

function ContractsummaryPending({
  contract,
  celebrity,
  lastPayment
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
          payment_date={lastPayment.createdAt}
          transaction_charge_id={lastPayment.transactionChargeId}
          payment_id={lastPayment.id}
        />
      }
    />
  );
}

export default ContractsummaryPending;
