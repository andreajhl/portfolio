import { Link } from "desktop-app/components/common/routing/link";
import { StepsGrayBanner } from "desktop-app/components/layouts/steps-gray-banner";
import styles from "./styles.module.scss";

type MyHiringsCardStepsBannerProps = {};

const stepsItems = [
  {
    iconAlternativeText: "El famoso recibe",
    iconName: "celebrity-receive",
    description: (
      <>
        Hemos enviado tu solicitud a Andrés Cepeda, tu video será grabado en un
        plazo de <span className={styles.TextBold}>1 a 7 días</span>.
      </>
    ),
  },
  {
    iconAlternativeText: "Te notificaremos",
    iconName: "notification",
    description: (
      <>
        Te notificaremos a{" "}
        <span className={styles.TextBold}>erika@famosos.com</span> y a{" "}
        <span className={styles.TextBold}>+52 55 4375 0949</span> cuando tu
        video esté listo.
      </>
    ),
  },
  {
    iconAlternativeText: "Te respaldamos",
    iconName: "refund",
    description: (
      <>
        Si por alguna razón tu video no pudo ser grabado, tu dinero estará
        nuevamente disponible en un plazo de{" "}
        <span className={styles.TextBold}>5 a 10 días hábiles</span>{" "}
        aproximadamente, dependiendo de tu banco.
        <br />
        <Link href="#" className={styles.LearnMoreLink}>
          Conoce más acerca de esto.
        </Link>
      </>
    ),
  },
];

function MyHiringsCardStepsBanner({ ...props }: MyHiringsCardStepsBannerProps) {
  return (
    <StepsGrayBanner
      direction="column"
      iconSize="medium"
      className={styles.MyHiringsCardStepsBanner}
      steps={stepsItems}
    />
  );
}

export { MyHiringsCardStepsBanner };
