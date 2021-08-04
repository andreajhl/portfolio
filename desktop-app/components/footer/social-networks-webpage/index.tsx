import styles from "./styles.module.scss";
const SocialNetWorksWebPage = () => {
  return (
    <div className={styles.SocialNetWorksWebPage}>
      <a
        href="https://www.instagram.com/famosos/"
        target="_blank"
        rel="noreferrer"
      >
        <i className="fab fa-instagram"></i>
      </a>
      <a
        href="https://www.facebook.com/contratafamosos"
        target="_blank"
        rel="noreferrer"
      >
        <i className="fab fa-facebook-f"></i>
      </a>
      <a
        href="https://www.linkedin.com/company/famosos-inc/"
        target="_blank"
        rel="noreferrer"
      >
        <i className="fab fa-linkedin-in"></i>
      </a>
    </div>
  );
};

export default SocialNetWorksWebPage;
