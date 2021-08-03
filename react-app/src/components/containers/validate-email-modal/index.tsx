import { sleep } from "lib/utils/sleep";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Session } from "react-app/src/state/utils/session";
import { FormattedMessage } from "react-intl";
import styles from "./styles.module.scss";

const AnimatedPopup = dynamic<{ [key: string]: any }>(
  import("../../common/widgets/animated-popup").then((mod) => mod.AnimatedPopup)
);
const ValidateEmailForm = dynamic<{ email: string; [key: string]: any }>(
  import("../validate-email-form").then((mod) => mod.ValidateEmailForm)
);

const session = new Session();

function ValidateEmailModal() {
  const [shouldRenderModal, setShouldRenderModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setShouldRenderModal(true);
    setIsOpen(true);
  }

  async function closeModal() {
    await sleep(1000);
    setIsOpen(false);
  }

  useEffect(() => {
    const emailIsValid: boolean = (session.getSession() as any)?.emailIsValid;
    if (emailIsValid) return;
    openModal();
  }, []);

  const email: string = (session.getSession() as any)?.email;

  if (!shouldRenderModal) return null;

  return (
    <AnimatedPopup
      open={isOpen}
      closeOnDocumentClick={false}
      closeOnEscape={false}
      lockScroll
      modal
    >
      <div className={styles.ValidateEmailModal}>
        <h2 className={styles.ValidateEmailModalTitle}>
          <FormattedMessage defaultMessage="Debemos confirmar tu correo antes de continuar" />
        </h2>
        <p className={styles.ValidateEmailModalCopy}>
          <FormattedMessage defaultMessage="Por tu seguridad y la nuestra, debemos verificar que tengas un correo electrónico valido." />
        </p>
        <ValidateEmailForm
          email={email}
          className={styles.ValidateEmailModalForm}
          onValidationSuccess={closeModal}
        />
      </div>
    </AnimatedPopup>
  );
}

export { ValidateEmailModal };
