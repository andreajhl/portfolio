import styles from "./styles.module.scss";

function HeroSection() {
  return (
    <section className={styles.HeroSection}>
      <div className="container">
        <header className={styles.HeroSectionHeader}>
          <h1 className={styles.HeroSectionTitle}>
            Los <span className="text-primary font-weight-bold ml-2"></span>{" "}
            <br />a un clic de distancia.
          </h1>
          <p className={styles.HeroSectionCopy}>
            Experiencias personalizadas
            <br /> con tus famosos favoritos.
          </p>
          <ul className={styles.HeroSectionSteps}>
            <li>
              <i className="fa fa-star" />
              <p>Elije a tu Famoso</p>
            </li>
            <li>
              <i className="fa fa-comment-alt" />
              <p>Personaliza el mensaje</p>
            </li>
            <li>
              <i className="fa fa-play" />
              <p>¡Disfruta tu video!</p>
            </li>
          </ul>
        </header>
      </div>
      <div className={styles.HeroSectionContent}>
        <img
          src="/assets/img/reinoso-video-cap.jpg"
          alt="Poster de video de Reinoso"
        />
        <img
          src="/assets/img/noel-video-poster.jpg"
          alt="Poster de video de Noel"
        />
      </div>
    </section>
  );
}

export default HeroSection;
