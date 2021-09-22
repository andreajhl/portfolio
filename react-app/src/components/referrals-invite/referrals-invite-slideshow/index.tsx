import styles from "./styles.module.scss";
import classes from "classnames";
import Carousel from "react-bootstrap/Carousel";
import { ReactNode, useState } from "react";
import { FormattedMessage } from "react-intl";
import { StarPrice } from "react-app/src/components/common/helpers/star-price";
import { REFERRALS_HOME } from "constants/paths";
import { Link } from "../../common/routing/link";
import { SHOW_BACK_BUTTON_QUERY_PARAM } from "constants/keys";

const starPrice = <StarPrice />;

const REFERRALS_HOME_WITH_BACK_BUTTON = {
  pathname: REFERRALS_HOME,
  query: { [SHOW_BACK_BUTTON_QUERY_PARAM]: true },
};

const referralsCountLink = (chunk: string) => (
  <Link href={REFERRALS_HOME_WITH_BACK_BUTTON}>{chunk}</Link>
);

type SlideElementsType = {
  illustration: ReactNode;
  title: ReactNode;
  text: ReactNode;
};

const slidesElements: SlideElementsType[] = [
  {
    illustration: (
      <img
        src="/assets/img/referrals-invite-slideshow/slide-image-1.png"
        alt="Slideshow 1"
        width="184"
        height="158"
      />
    ),
    title: (
      <FormattedMessage defaultMessage="REFIERE Y GANA ESTRELLAS POR CADA AMIGO" />
    ),
    text: (
      <FormattedMessage
        defaultMessage="Comparte tu link con amigos. Una vez realicen una compra, recibirás tu bonificación de 5 estrellas. Cada estrella equivale al valor de {starPrice}."
        values={{ starPrice }}
      />
    ),
  },
  {
    illustration: (
      <img
        src="/assets/img/referrals-invite-slideshow/slide-image-2.png"
        alt="Slideshow 2"
        width="168"
        height="144.48837280273438"
      />
    ),
    title: (
      <FormattedMessage defaultMessage="REDIME TUS ESTRELLAS POR BENEFICIOS REALES" />
    ),
    text: (
      <FormattedMessage defaultMessage="Canjea tus estrellas por dinero real en tu compra o utilízalas para disfrutar de beneficios únicos y exclusivos." />
    ),
  },
  {
    illustration: (
      <img
        src="/assets/img/referrals-invite-slideshow/slide-image-3.svg"
        alt="Slideshow 3"
        width="203"
        height="197"
      />
    ),
    title: <FormattedMessage defaultMessage="DESCUBRE TUS BENEFICIOS" />,
    text: (
      <FormattedMessage
        defaultMessage="Disfruta de los premios que tenemos para ti según las estrellas que tengas acumuladas.  Revisa tu puntuación <referralsCountLink>aquí</referralsCountLink>."
        values={{ referralsCountLink }}
      />
    ),
  },
];

type ReferralsInviteSlideshowProps = {
  className?: string;
};

function ReferralsInviteSlideshow({
  className,
}: ReferralsInviteSlideshowProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  return (
    <Carousel
      activeIndex={activeSlideIndex}
      onSelect={setActiveSlideIndex}
      interval={null}
      controls={false}
      className={classes(styles.ReferralsInviteSlideshow, className)}
    >
      {slidesElements.map(({ illustration, title, text }, index) => (
        <Carousel.Item key={index}>
          <div className={styles.ReferralsInviteSlideshowItem}>
            <div
              className={styles.ReferralsInviteSlideshowItemIllustrationWrapper}
            >
              {illustration}
            </div>
            <h3 className={styles.ReferralsInviteSlideshowItemTitle}>
              {title}
            </h3>
            <span className={styles.ReferralsInviteSlideshowItemText}>
              {text}
            </span>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export { ReferralsInviteSlideshow };
