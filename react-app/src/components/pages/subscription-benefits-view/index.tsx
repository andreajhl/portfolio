import classes from "classnames";
import { BackstageBenefitCard } from "react-app/src/components/layouts/backstage-benefit-card";
import { PoweredByFamososBanner } from "../../layouts/powered-by-famosos-banner";
import styles from "./styles.module.scss";

const dateFuture = new Date();
const datePass = new Date();

dateFuture.setDate(28);
datePass.setDate(1);

const fakeBenefits = [
  {
    id: 1,
    title: "Sorteo Videollamada 1:1",
    poster:
      "https://dqb0851cl2gjs.cloudfront.net/celebrities/864/avatar/famosos-videos-personalizados-marktacher-compressed.jpg",
    expireAt: dateFuture,
  },
  {
    id: 2,
    title: "10% off en merchandasing",
    poster:
      "https://dqb0851cl2gjs.cloudfront.net/celebrities/864/avatar/famosos-videos-personalizados-marktacher-compressed.jpg",
    expireAt: datePass,
  },
];

type SubscriptionBenefitsViewProps = {};

function SubscriptionBenefitsView(props: SubscriptionBenefitsViewProps) {
  return (
    <div className={styles.SubscriptionBenefitsView}>
      <div className={classes("container", styles.Container)}>
        {fakeBenefits.map((benefit) => (
          <BackstageBenefitCard
            className={styles.BenefitCard}
            benefit={benefit}
          />
        ))}
        <PoweredByFamososBanner className={styles.BenefitsViewFamososBanner} />
      </div>
    </div>
  );
}

export { SubscriptionBenefitsView };
