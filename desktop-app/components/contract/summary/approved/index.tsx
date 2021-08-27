import {
  CashBackIcon,
  CheckIcon,
  LetterIcon,
  PhoneInHandIcon,
} from "desktop-app/components/common/icons";
import ContractSummaryLayout from "desktop-app/components/layouts/contract-summary";
import React from "react";
import ContractDetails from "../../details";
import styles from "./styles.module.scss";
import classes from "classnames";
import { useRouter } from "next/router";
import { CLIENT_HIRINGS } from "constants/paths";
import StatusPaymentDetails from "../../status-payment";
import { Link } from "desktop-app/components/common/routing/link";
import { FormattedMessage } from "react-intl";

const emailSpan = (chunk: string) => (
  <span className={styles.EmailClient}>{chunk}</span>
);

const myHiringsLink = (chunk: string) => (
  <Link className={styles.MyHiringsLink} href={CLIENT_HIRINGS}>
    {chunk}
  </Link>
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

type InstructionsContractApprovedProps = {
  celebrity_fullName: string;
  email_client: string;
};

function InstructionsContractApproved({
  celebrity_fullName,
  email_client,
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
            <FormattedMessage
              defaultMessage="{celebrity_fullName} tiene un plazo de 7 días para grabar tu video a partir de ahora."
              values={{ celebrity_fullName }}
            />
          </span>
        </div>
        <div className={styles.InstructionListItem}>
          <LetterIcon className={styles.InstructionListItemIcon} />
          <span>
            <FormattedMessage
              defaultMessage="Recibirás una notificación a <emailSpan>{email_client}</emailSpan> cuando tu video esté listo."
              values={{ emailSpan, email_client }}
            />
          </span>
        </div>
        <div className={styles.InstructionListItem}>
          <CashBackIcon className={styles.InstructionListItemIcon} />
          <span>
            <FormattedMessage defaultMessage="Si por alguna razón tu video no pudo ser grabado, te contactaremos." />
          </span>
        </div>
      </div>
      <div className={styles.FooterInstructions}>
        <div className={styles.ConsultationNoticies}>
          <p>
            <FormattedMessage defaultMessage="Si todo está bien con tu solicitud de acuerdo a nuestra políticas, muy pronto podrás disfrutar de tu videomensaje." />
          </p>
          <p>
            <FormattedMessage
              defaultMessage="En cualquier momento puedes consultar el estado de tus solicitudes <myHiringsLink>aquí.</myHiringsLink>"
              values={{ myHiringsLink }}
            />
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

function HeaderContractApproved() {
  return (
    <div className={styles.HeaderContractApproved}>
      <CheckIcon />
      <p>
        <FormattedMessage defaultMessage="¡Felicidades! Tu pago ha sido aprobado." />
      </p>
    </div>
  );
}

function ContractSummaryApproved({
  contract,
  celebrity,
  lastPayment,
}: ContractWithPaymentsProps) {
  console.log(contract);
  return (
    <ContractSummaryLayout
      header={<HeaderContractApproved />}
      instructions={
        <InstructionsContractApproved
          email_client={contract.deliveryContact}
          celebrity_fullName={celebrity.fullName}
        />
      }
      contractDetails={
        <>
          <ContractDetails
            celebrity={celebrity}
            contract={contract}
            status_payment={
              <StatusPaymentDetails
                status={lastPayment.status}
                payment_date={lastPayment.createdAt}
                contractReference={contract.reference}
              />
            }
          />
        </>
      }
    />
  );
}

export default ContractSummaryApproved;
