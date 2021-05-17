import { forwardRef, Ref } from "react";
import { AnimatedPopup } from "../../animated-popup";
import classes from "classnames";
import styles from "./styles.module.scss";
import { Link } from "../../routing/link";
import Maybe from "../../helpers/maybe";
import { PopupActions } from "reactjs-popup/dist/types";

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
  return (
    <AnimatedPopup trigger={trigger} modal ref={ref}>
      {(closeModal: () => void) => (
        <section className={styles.ShareModeSelectorModal}>
          <h2 className={styles.Title}>¿Cómo quieres compartir este video?</h2>
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
              Enviar inmediatamente
            </button>
          </a>
          <p className={classes(styles.InfoText, styles.ShareInstantlyInfo)}>
            Se abrirá tu aplicación de{" "}
            <span className={styles.TextCapitalize}>{type}</span> para que lo
            envíes directamente.
          </p>
          <Link href={scheduleShareLink} onClick={closeModal}>
            <button
              className={classes(
                "btn btn-primary",
                styles.ShareButton,
                styles.ScheduleButton
              )}
            >
              Programar envío
            </button>
          </Link>
          <p
            className={classes(
              styles.InfoText,
              styles.ScheduleInfo,
              itCanAddMessage && styles.ExtendedInfoText
            )}
          >
            Elige una fecha y hora para que Famosos envíe tu video
            <Maybe it={itCanAddMessage} orElse=".">
              , puedes agregar un texto adicional.
            </Maybe>
          </p>
        </section>
      )}
    </AnimatedPopup>
  );
}

const _ShareModeSelectorModal = forwardRef(ShareModeSelectorModal);

export { _ShareModeSelectorModal as ShareModeSelectorModal };
