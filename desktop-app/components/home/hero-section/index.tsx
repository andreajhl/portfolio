import styles from "./styles.module.scss";
import { TypingEffectLooped } from "../../common/helpers/typing-effect-looped";
import { HeroSectionVideo } from "../hero-section-video";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";

const lineBreak = <br />;

const messages = defineMessages({
  adjectiveWord1: {
    defaultMessage: "músicos",
  },
  adjectiveWord2: {
    defaultMessage: "influencers",
  },
  adjectiveWord3: {
    defaultMessage: "deportistas",
  },
  adjectiveWord4: {
    defaultMessage: "actores",
  },
});

function HeroSection({ userLocation }: { userLocation: string }) {
  const { formatMessage } = useIntl();
  const adjectiveWord1 = formatMessage(messages.adjectiveWord1);
  const adjectiveWord2 = formatMessage(messages.adjectiveWord2);
  const adjectiveWord3 = formatMessage(messages.adjectiveWord3);
  const adjectiveWord4 = formatMessage(messages.adjectiveWord4);

  const adjectives = (
    <>
      <TypingEffectLooped
        words={[adjectiveWord1, adjectiveWord2, adjectiveWord3, adjectiveWord4]}
        className={styles.HeroSectionAnimatedText}
      />
      <noscript>
        <span
          className={`${styles.HeroSectionAnimatedText} ${styles.HeroSectionTextAnimation}`}
        />
      </noscript>
    </>
  );

  return (
    <section className={styles.HeroSection}>
      <div className={"container " + styles.HeroSectionContainer}>
        <header className={styles.HeroSectionHeader}>
          <h1 className={styles.HeroSectionTitle}>
            <FormattedMessage
              defaultMessage="Los {adjectives} {lineBreak} a un clic de distancia."
              values={{ adjectives, lineBreak }}
            />
          </h1>
          <p className={styles.HeroSectionCopy}>
            <FormattedMessage
              defaultMessage="Experiencias personalizadas {lineBreak} con tus famosos favoritos."
              values={{ lineBreak }}
            />
          </p>
          <ul className={styles.HeroSectionSteps}>
            <li>
              <i className="fa fa-star" />
              <p>
                <FormattedMessage defaultMessage="Elije a tu Famoso" />
              </p>
            </li>
            <li>
              <i className="fa fa-comment-alt" />
              <p>
                <FormattedMessage defaultMessage="Personaliza el mensaje" />
              </p>
            </li>
            <li>
              <i className="fa fa-play" />
              <p>
                <FormattedMessage defaultMessage="¡Disfruta tu video!" />
              </p>
            </li>
          </ul>
        </header>
        <div className={styles.HeroSectionVideoContainer}>
          <HeroSectionVideo userLocation={userLocation} />
          <div className={styles.HeroSectionOverlay}></div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
