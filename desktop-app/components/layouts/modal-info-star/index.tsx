import { FormattedMessage } from "react-intl";
import { StarDobleLine } from "desktop-app/components/common/icons";
import styles from "./styles.module.scss";

type ModalInfoStarProps = {
  closeModal: () => void;
};

function ModalInfoStar({ closeModal }: ModalInfoStarProps) {
  return (
    <div className={styles.modalInfoStar_Div}>
      <div className={styles.modalInfoStar}>
        <p className={styles.modal_btn}>
          <button onClick={closeModal} className={styles.modal_btn_i}>
            <i className="fa fa-times" />
          </button>
        </p>
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
          <p>
            <FormattedMessage defaultMessage="*** Las estrellas sólo serán válidas para uso personal, no son transferibles o canjeables con otros usuarios dentro de la plataforma***" />
          </p>
        </footer>
      </div>
    </div>
  );
}

export default ModalInfoStar;
