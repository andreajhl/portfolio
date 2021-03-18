import styles from "./styles.module.scss";
const CelebritiesFormCTA = () => {
  return (
    <div className={styles.CelebritiesFormCTA}>
      <p>¿Eres una celebridad o influencer? ¡Haz parte de nuestra familia!</p>
      <button className={`btn btn-tertiary ${styles.SubmitButton}`}>
        Quiero Unirme
      </button>
    </div>
  );
};

export default CelebritiesFormCTA;
