import {
  CashBackIcon,
  CheckIcon,
  LetterIcon,
  PhoneInHandIcon
} from "desktop-app/components/common/icons";
import ContractSummaryLayout from "desktop-app/components/layouts/contract-summary";
import React from "react";
import ContractDetails from "../../details";
import styles from "./styles.module.scss";
import classes from "classnames";
import moment from "moment";
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

type InstructionsContractApprovedProps = {
  celebrity_fullName: string;
};

type StatusPaymentDetailsProps = {
  payment_date: string;
  transaction_charge_id: string;
  payment_id: number;
};

function InstructionsContractApproved({
  celebrity_fullName
}: InstructionsContractApprovedProps) {
  const router = useRouter();
  return (
    <div className={styles.InstructionsContractApproved}>
      <div className={styles.InstructionList}>
        <div className={styles.InstructionListItem}>
          <PhoneInHandIcon
            className={classes(
              styles.InstructionListItemIcon,
              styles.PhoneInHandIconModifier
            )}
          />
          <span>
            {celebrity_fullName} tiene un plazo de 7 días para grabar tu video a
            partir de ahora.
          </span>
        </div>
        <div className={styles.InstructionListItem}>
          <LetterIcon className={styles.InstructionListItemIcon} />
          <span>
            Recibirás una notificación a correocliente@dominio.com cuando tu
            video esté listo.
          </span>
        </div>
        <div className={styles.InstructionListItem}>
          <CashBackIcon className={styles.InstructionListItemIcon} />
          <span>
            Si por alguna razón tu video no pudo ser grabado, te contactaremos.
          </span>
        </div>
      </div>
      <div className={styles.FooterInstructions}>
        <div className={styles.ConsultationNoticies}>
          <p>
            Si todo está bien con tu solicitud de acuerdo a nuestra políticas,
            muy pronto podrás disfrutar de tu videomensaje.
          </p>
          <p>
            En cualquier momento puedes consultar el estado de tus solicitudes
            aquí.
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

function StatusPaymentDetails({
  payment_date,
  transaction_charge_id,
  payment_id
}: StatusPaymentDetailsProps) {
  return (
    <div className={styles.StatusPaymentDetails}>
      <p>ESTADO DEL PAGO: APROBADO</p>
      <p>FECHA DE PAGO: {moment(payment_date).format("L")}</p>
      <p>ID DE TRANSACCION: {transaction_charge_id}</p>
      <p>ID DE SEGUIMIENTO: {payment_id}</p>
    </div>
  );
}

function HeaderContractApproved() {
  return (
    <div className={styles.HeaderContractApproved}>
      <CheckIcon />
      <p>¡Felicidades! Tu pago ha sido aprobado.</p>
    </div>
  );
}

function ContractSummaryApproved({
  contract,
  celebrity,
  lastPayment
}: ContractWithPaymentsProps) {
  return (
    <ContractSummaryLayout
      header={<HeaderContractApproved />}
      instructions={
        <InstructionsContractApproved celebrity_fullName={celebrity.fullName} />
      }
      contractDetails={
        <>
          <ContractDetails
            celebrity={celebrity}
            contract={contract}
            status_payment={
              <StatusPaymentDetails
                payment_date={lastPayment.createdAt}
                transaction_charge_id={lastPayment.transactionChargeId}
                payment_id={lastPayment.id}
              />
            }
          />
        </>
      }
    />
  );
}

export default ContractSummaryApproved;
