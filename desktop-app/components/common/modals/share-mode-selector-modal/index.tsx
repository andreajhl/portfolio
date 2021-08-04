import { forwardRef, Ref } from "react";
import { AnimatedPopup } from "../../animated-popup";
import classes from "classnames";
import styles from "./styles.module.scss";
import { Link } from "../../routing/link";
import Maybe from "../../helpers/maybe";
import { PopupActions } from "reactjs-popup/dist/types";
import { CloseModalButton } from "../../button/close-modal-button";
import { FormattedMessage } from "react-intl";

type ModalTypeType = "whatsapp" | "mail";

type ShareModeSelectorModalProps = {
  trigger?: JSX.Element | ((isOpen: boolean) => JSX.Element);
  type?: ModalTypeType;
  shareInstantlyLink?: string;
  scheduleShareLink?: string;
};

function getShareButtonClass(type: ModalTypeType) {
  if (type === "whatsapp") return styles.WhatsappButton;
  if (type === "mail") return "btn-secondary";
  return "";
}

function canAddMessage(type: ModalTypeType) {
  if (type === "mail") return true;
  return false;
}

function ShareModeSelectorModal(
  {
    trigger,
    type = "whatsapp",
    shareInstantlyLink,
    scheduleShareLink = "/",
  }: ShareModeSelectorModalProps,
  ref: Ref<PopupActions>
) {
  const itCanAddMessage = canAddMessage(type);
  const isWhatsappType = type === "whatsapp";

  return (
    <AnimatedPopup trigger={trigger} modal ref={ref}>
      {(closeModal: () => void) => (
        <section className={styles.ShareModeSelectorModal}>
          <CloseModalButton
            variant="light"
            className={styles.CloseButton}
            onClick={closeModal}
          />
          <h2 className={styles.Title}>
            <FormattedMessage defaultMessage="¿Cómo quieres compartir este video?" />
          </h2>
          <a
            href={shareInstantlyLink}
            target="_blank"
            rel="noreferrer"
            onClick={closeModal}
          >
            <button
              className={classes(
                "btn",
                styles.ShareButton,
                getShareButtonClass(type)
              )}
            >
              <FormattedMessage defaultMessage="Enviar inmediatamente" />
            </button>
          </a>
          <p className={classes(styles.InfoText, styles.ShareInstantlyInfo)}>
            <Maybe
              it={isWhatsappType}
              orElse={
                <FormattedMessage defaultMessage="Se abrirá tu aplicación de correo para que lo envíes directamente." />
              }
            >
              <FormattedMessage defaultMessage="Se abrirá tu aplicación de Whatsapp para que lo envíes directamente." />
            </Maybe>
          </p>
          <Link href={scheduleShareLink} onClick={closeModal}>
            <button
              className={classes(
                "btn btn-primary",
                styles.ShareButton,
                styles.ScheduleButton
              )}
            >
              <FormattedMessage defaultMessage="Programar envío" />
            </button>
          </Link>
          <p
            className={classes(
              styles.InfoText,
              styles.ScheduleInfo,
              itCanAddMessage && styles.ExtendedInfoText
            )}
          >
            <Maybe
              it={itCanAddMessage}
              orElse={
                <FormattedMessage defaultMessage="Elige una fecha y hora para que Famosos envíe tu video." />
              }
            >
              <FormattedMessage defaultMessage="Elige una fecha y hora para que Famosos envíe tu video, puedes agregar un texto adicional." />
            </Maybe>
          </p>
        </section>
      )}
    </AnimatedPopup>
  );
}

const _ShareModeSelectorModal = forwardRef(ShareModeSelectorModal);

export { _ShareModeSelectorModal as ShareModeSelectorModal };
