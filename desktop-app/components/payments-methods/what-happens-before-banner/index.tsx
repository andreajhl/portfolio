import { PAYMENT_AUTHORIZATION_INFO } from "constants/paths";
import { StepsGrayBanner } from "desktop-app/components/layouts/steps-gray-banner";
import styles from "./styles.module.scss";

type WhatHappensBeforeBannerProps = {
  direction?: "row" | "column";
  className?: string;
};

const stepsItems = [
  {
    iconAlternativeText: "El famoso recibe",
    iconName: "celebrity-receive",
    description:
      "El famoso recibirá tu solicitud y grabará tu video en un plazo de 7 días.",
  },
  {
    iconAlternativeText: "Te notificaremos",
    iconName: "notification",
    description:
      "Te notificaremos vía mail o Whatsapp cuando tu video esté listo.",
  },
  {
    iconAlternativeText: "Te respaldamos",
    iconName: "refund",
    description: (
      <>
        Si por alguna razón tu video no pudo ser grabado, tu dinero estará
        nuevamente disponible en un plazo de 1 a 10 hábiles aproximadamente.{" "}
        <a
          href={PAYMENT_AUTHORIZATION_INFO}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.WhatHappensBeforeBannerLink}
        >
          Conoce más acerca de esto.
        </a>
      </>
    ),
  },
];

function WhatHappensBeforeBanner({ ...props }: WhatHappensBeforeBannerProps) {
  return (
    <StepsGrayBanner
      title="¿Qué sucede después de tu compra?"
      steps={stepsItems}
      {...props}
    />
  );
}

export { WhatHappensBeforeBanner };
