import React from "react";
import {
  CashBackIcon,
  CheckIcon,
  LetterIcon,
  PhoneInHandIcon,
} from "desktop-app/components/common/icons";
import ContractSummaryLayout from "desktop-app/components/layouts/contract-summary";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import classes from "classnames";
import { CLIENT_HIRINGS } from "constants/paths";
import ContractDetails from "../../details";
import StatusPaymentDetails from "../../status-payment";

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

type InstructionsContractAuthorizedProps = {
  celebrity_fullName: string;
  email_client: string;
};
function HeaderContractAuthorized() {
  return (
    <div className={styles.HeaderContractAuthorized}>
      <CheckIcon />
      <p>¡Felicidades! Tu pago ha sido aprobado.</p>
    </div>
  );
}

function InstructionsContractAuthorized({
  celebrity_fullName,
  email_client,
}: InstructionsContractAuthorizedProps) {
  const router = useRouter();
  return (
    <div className={styles.InstructionsContractAuthorized}>
      <h2 className={styles.InstructionsTitle}>Siguientes pasos:</h2>
      <div className={styles.InstructionList}>
        <div className={styles.InstructionListItem}>
          <div>
            <PhoneInHandIcon
              className={classes(
                styles.InstructionListItemIcon,
                styles.PhoneInHandIconModifier
              )}
            />
          </div>
          <div>
            <span>
              {celebrity_fullName} tiene un plazo de 7 días para grabar tu video
              a partir de ahora.
            </span>
          </div>
        </div>
        <div className={styles.InstructionListItem}>
          <div>
            <LetterIcon className={styles.InstructionListItemIcon} />
          </div>
          <div>
            <span>
              Recibirás una notificación a{" "}
              <span className={styles.EmailClient}>{email_client}</span> cuando
              tu video esté listo.
            </span>
          </div>
        </div>
        <div className={styles.InstructionListItem}>
          <div>
            <CashBackIcon className={styles.InstructionListItemIcon} />
          </div>
          <div>
            <span>
              El cobro a tu cuenta se realizará una vez que {celebrity_fullName}{" "}
              grabe tu video. (por ahora solo se realizó una autorización por
              parte de tu banco).
              <a
                target="_blank"
                rel="noreferrer"
                href="https://pagos.famosos.com/autorizaciondepago"
                className={styles.InstructionSpanCTA}
              >
                ¿Qué significa esto?{" "}
              </a>
              <br />
              Si por alguna razón tu video no pudo ser grabado, tu dinero estará
              nuevamente disponible en un plazo en un plazo máximo de 21 días
              hábiles aproximadamente dependiendo de tu banco.
            </span>
          </div>
        </div>
      </div>
      <div className={styles.FooterInstructions}>
        <div className={styles.ConsultationNoticies}>
          <p>
            Si todo está bien con tu solicitud de acuerdo a nuestra políticas,
            muy pronto podrás disfrutar de tu videomensaje.
          </p>
          <p>
            En cuaquier momento puedes consultar el estado de tus solicitudes{" "}
            <span
              style={{
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => router.push(CLIENT_HIRINGS)}
            >
              aquí.
            </span>
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

function ContractSummaryAuthorized({
  contract,
  celebrity,
  lastPayment,
}: ContractWithPaymentsProps) {
  return (
    <ContractSummaryLayout
      header={<HeaderContractAuthorized />}
      contractDetails={
        <>
          <ContractDetails
            celebrity={celebrity}
            contract={contract}
            status_payment={
              <StatusPaymentDetails
                payment_date={lastPayment.createdAt}
                contractReference={contract.reference}
              />
            }
          />
        </>
      }
      instructions={
        <InstructionsContractAuthorized
          email_client={contract.deliveryContact}
          celebrity_fullName={celebrity.fullName}
        />
      }
    />
  );
}

export default ContractSummaryAuthorized;
