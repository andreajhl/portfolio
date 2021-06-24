import { PAYMENT_AUTHORIZATION_INFO } from "constants/paths";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { Link } from "desktop-app/components/common/routing/link";
import { StepsGrayBanner } from "desktop-app/components/layouts/steps-gray-banner";
import MyHiringsContract from "desktop-app/types/myHiringsContract";
import styles from "./styles.module.scss";

type MyHiringsCardStepsBannerProps = {
  contractData: MyHiringsContract;
};

const getStepsItems = ({
  celebrityData,
  deliveryContact,
}: MyHiringsContract) => [
  {
    iconAlternativeText: "El famoso recibe",
    iconName: "celebrity-receive",
    description: (
      <>
        Hemos enviado tu solicitud a {celebrityData.fullName}, tu video será
        grabado en un plazo de{" "}
        <span className={styles.TextBold}>1 a 7 días</span>.
      </>
    ),
  },
  {
    iconAlternativeText: "Te notificaremos",
    iconName: "notification",
    description: (
      <>
        Te notificaremos a{" "}
        <span className={styles.TextBold}>{deliveryContact}</span>{" "}
        <Maybe it={false}>
          y a <span className={styles.TextBold}>+52 55 4375 0949</span>{" "}
        </Maybe>
        cuando tu video esté listo.
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
        <a
          href={PAYMENT_AUTHORIZATION_INFO}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.LearnMoreLink}
        >
          Conoce más acerca de esto.
        </a>
      </>
    ),
  },
];

function MyHiringsCardStepsBanner({
  contractData,
}: MyHiringsCardStepsBannerProps) {
  return (
    <StepsGrayBanner
      direction="column"
      iconSize="medium"
      className={styles.MyHiringsCardStepsBanner}
      steps={getStepsItems(contractData)}
      renderContainer={false}
    />
  );
}

export { MyHiringsCardStepsBanner };
