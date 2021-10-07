import { FormattedMessage } from "react-intl";
import { StarDobleLine } from "desktop-app/components/common/icons";
import styles from "./styles.module.scss";
import classes from "classnames";

type ModalInfoStarProps = {
  closeModal: () => void;
};

function ModalInfoStar({ closeModal }: ModalInfoStarProps) {
  return (
    <div className={styles.modalInfoStar_Div}>
      <div className={styles.modalInfoStar}>
        <div className={styles.modalInfoStar_Header}>
          <h2>
            <FormattedMessage defaultMessage="Ahora puedes pagar con tus estrellas!" />
          </h2>
          <p>
            <FormattedMessage defaultMessage="Tus estrellas, tú dinero." />
          </p>
        </div>
        <div className={styles.modalInfoStar_star}>
          <StarDobleLine />
        </div>
        <div className={styles.modalInfoStar_body}>
          <ol className={styles.modalInfoStar_body_list}>
            <li>
              <FormattedMessage defaultMessage="Invita a tus amigos y compárteles tu link." />
            </li>
            <li>
              <FormattedMessage defaultMessage="Por cada amigo que se registre bajo tu link, y realize su primera compra acumularás estrellas." />
            </li>
            <li>
              <FormattedMessage defaultMessage="canjealas por dinero real a la hora de finalizar tú compra." />
            </li>
          </ol>
        </div>
        <footer className={styles.modalInfoStar_footer}>
          <button
            type="button"
            onClick={closeModal}
            className={classes(
              "btn btn-primary",
              styles.ModalInfoStarCloseButton
            )}
          >
            <FormattedMessage defaultMessage="Cerrar" />
          </button>
          <p>
            <FormattedMessage defaultMessage="*** Las estrellas sólo serán válidas para uso personal, no son transferibles o canjeables con otros usuarios dentro de la plataforma***" />
          </p>
        </footer>
      </div>
    </div>
  );
}

export default ModalInfoStar;
