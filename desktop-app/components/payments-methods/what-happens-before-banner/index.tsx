import { Link } from "desktop-app/components/common/routing/link";
import { ReactNode } from "react";
import styles from "./styles.module.scss";

type WhatHappensBeforeBannerProps = {};

type StepItemType = {
  iconAlternativeText: string;
  iconName: string;
  description: string | ReactNode;
};

const stepsItems: StepItemType[] = [
  {
    iconAlternativeText: "El famoso recibe",
    iconName: "celebrity-receive",
    description:
      "El famoso recibirá tu solicitud y grabará tu video en un plazo de 7 días."
  },
  {
    iconAlternativeText: "Te notificaremos",
    iconName: "notification",
    description:
      "Te notificaremos vía mail o Whatsapp cuando tu video esté listo."
  },
  {
    iconAlternativeText: "Te respaldamos",
    iconName: "refund",
    description: (
      <>
        Si por alguna razón tu video no pudo ser grabado, tu dinero estará
        nuevamente disponible en un plazo de 1 a 10 hábiles aproximadamente.{" "}
        <Link href="#" className={styles.WhatHappensBeforeBannerLink}>
          Conoce más acerca de esto.
        </Link>
      </>
    )
  }
];

const toListItem = ({ iconAlternativeText, iconName, description }) => (
  <li
    key={iconAlternativeText}
    className={styles.WhatHappensBeforeBannerStepItem}
  >
    <figure className={styles.WhatHappensBeforeBannerIconContainer}>
      <img
        className={styles[iconName]}
        src={`/assets/img/what-happens-before-banner/${iconName}.svg`}
        alt={iconAlternativeText}
      />
    </figure>
    <p>{description}</p>
  </li>
);

function WhatHappensBeforeBanner({ ...props }: WhatHappensBeforeBannerProps) {
  return (
    <section className={styles.WhatHappensBeforeBanner}>
      <div className="container">
        <h2 className={styles.WhatHappensBeforeBannerTitle}>
          ¿Qué sucede después de tu compra?
        </h2>
        <ul className={styles.WhatHappensBeforeBannerStepsList}>
          {stepsItems.map(toListItem)}
        </ul>
      </div>
    </section>
  );
}

export { WhatHappensBeforeBanner };
