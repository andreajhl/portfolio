import { Link } from "desktop-app/components/common/routing/link";
import styles from "./styles.module.scss";
const CelebritiesFormCTA = () => {
  return (
    <div className={styles.CelebritiesFormCTA}>
      <p>¿Eres una celebridad o influencer? ¡Haz parte de nuestra familia!</p>
      <Link href={"/forms/aplicar"}>
        <button className={`btn btn-tertiary ${styles.SubmitButton}`}>
          Quiero Unirme
        </button>
      </Link>
    </div>
  );
};

export default CelebritiesFormCTA;
