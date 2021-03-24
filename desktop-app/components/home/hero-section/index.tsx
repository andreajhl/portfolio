import styles from "./styles.module.scss";
import { TypingEffectLooped } from "../../common/helpers/typing-effect-looped";

function HeroSection() {
  return (
    <section className={styles.HeroSection}>
      <div className={"container " + styles.HeroSectionContainer}>
        <header className={styles.HeroSectionHeader}>
          <h1 className={styles.HeroSectionTitle}>
            Los{" "}
            <TypingEffectLooped
              words={["músicos", "influencers", "deportistas", "actores"]}
              className={styles.HeroSectionAnimatedText}
            />
            <noscript>
              <span
                className={`${styles.HeroSectionAnimatedText} ${styles.HeroSectionTextAnimation}`}
              ></span>
            </noscript>{" "}
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
        <div className={styles.HeroSectionVideo}>
          <video
            src="/assets/video/reinoso-hero-video.mp4"
            muted
            autoPlay
            loop
            preload="metadata"
          />
          <video
            src="/assets/video/noel-hero-video.mp4"
            muted
            autoPlay
            loop
            preload="metadata"
          />
          <div className={styles.HeroSectionOverlay}></div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
