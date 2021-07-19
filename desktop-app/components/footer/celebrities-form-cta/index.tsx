import { Link } from "desktop-app/components/common/routing/link";
import { FormattedMessage } from "react-intl";
import styles from "./styles.module.scss";

const CelebritiesFormCTA = () => {
  return (
    <div className={styles.CelebritiesFormCTA}>
      <p>
        <FormattedMessage defaultMessage="¿Eres una celebridad o influencer? ¡Haz parte de nuestra familia!" />
      </p>
      <Link href={"/forms/aplicar"}>
        <button className={`btn btn-tertiary ${styles.SubmitButton}`}>
          <FormattedMessage defaultMessage="Quiero unirme" />
        </button>
      </Link>
    </div>
  );
};

export default CelebritiesFormCTA;
