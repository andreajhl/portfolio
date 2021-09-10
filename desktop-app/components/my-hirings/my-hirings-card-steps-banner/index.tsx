import { PAYMENT_AUTHORIZATION_INFO } from "constants/paths";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { Link } from "desktop-app/components/common/routing/link";
import { StepsGrayBanner } from "desktop-app/components/layouts/steps-gray-banner";
import MyHiringsContract from "desktop-app/types/myHiringsContract";
import { FormattedMessage } from "react-intl";
import styles from "./styles.module.scss";

type MyHiringsCardStepsBannerProps = {
  contractData: MyHiringsContract;
};

const getStepsItems = ({
  celebrityData,
  deliveryContact,
  deliveryContactCellphone,
}: MyHiringsContract) => [
  {
    iconAlternativeText: "El famoso recibe",
    iconName: "celebrity-receive",
    description: (
      <>
        <FormattedMessage
          defaultMessage="Hemos enviado tu solicitud a {celebrityFullName}, tu video será
        grabado en un plazo de
        <textBold>1 a 7 días</textBold>."
          values={{
            celebrityFullName: celebrityData.fullName,
            textBold: (chunk) => (
              <span className={styles.TextBold}>{chunk}</span>
            ),
          }}
        />
      </>
    ),
  },

  {
    iconAlternativeText: "Te notificaremos",
    iconName: "notification",
    description: (
      <>
        <FormattedMessage
          defaultMessage="Te notificaremos a 
        <textBold>{deliveryContact}</textBold> {cellPhoneNumber}
        cuando tu video esté listo."
          values={{
            textBold: (chunk) => (
              <span className={styles.TextBold}>{chunk}</span>
            ),
            deliveryContact: deliveryContact,
            cellPhoneNumber: Boolean(deliveryContactCellphone)
              ? `y a +${deliveryContactCellphone?.replace?.("+", "")}`
              : "",
          }}
        />
      </>
    ),
  },
  {
    iconAlternativeText: "Te respaldamos",
    iconName: "refund",
    description: (
      <>
        <FormattedMessage
          defaultMessage=" Si por alguna razón tu video no pudo ser grabado, tu dinero estará
        nuevamente disponible en un plazo máximo de 21 días hábiles, dependiendo
        de tu banco."
        />
        <br />
        <a
          href={PAYMENT_AUTHORIZATION_INFO}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.LearnMoreLink}
        >
          <FormattedMessage defaultMessage="Conoce más acerca de esto." />
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
