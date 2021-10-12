import PageContainer from "desktop-app/components/layouts/page-container";
import styles from "./styles.module.scss";
import { FormattedMessage } from "react-intl";
import { ReferralsPageHeading } from "react-app/src/components/layouts/referrals-page-heading";
import { CSSProperties, ReactNode } from "react";
import { ReferralsStarIcon } from "desktop-app/components/common/icons";

type PrizeType = {
  starColor: CSSProperties["color"];
  totalStars: string | number;
  description: ReactNode;
};

const prizes: PrizeType[] = [
  {
    description: (
      <FormattedMessage defaultMessage="Cena con alguno de los celebrities de backstage." />
    ),
    totalStars: "1K",
    starColor: "#fb177d",
  },
  {
    description: (
      <FormattedMessage defaultMessage="Balón autografiado por el Pibe Valderrama" />
    ),
    totalStars: "450",
    starColor: "#FE5FA6",
  },
  {
    description: (
      <FormattedMessage defaultMessage="Suscripción a cualquier backstage que elijas." />
    ),
    totalStars: "3",
    starColor: "#feb9d8",
  },
];

function ReferralsPrizesPage() {
  return (
    <PageContainer showSearch={false}>
      <main className={styles.ReferralsPrizesPage}>
        <div className="container">
          <ReferralsPageHeading
            showBackToReferralsHomeButton
            title={<FormattedMessage defaultMessage="MIS PREMIOS" />}
          />
          <section className={styles.ReferralsPrizesPagePrizesList}>
            {prizes.map(({ description, totalStars, starColor }) => (
              <div
                className={styles.ReferralsPrizesPagePrizesListItem}
                key={starColor + totalStars}
              >
                <div className={styles.StarsCountWrapper}>
                  <span
                    className={styles.StarsCountNumber}
                  >{`+${totalStars}`}</span>
                  <ReferralsStarIcon
                    color={starColor}
                    width={79}
                    height={79}
                    className={styles.StarsCountIcon}
                  />
                </div>
                <p className={styles.ReferralsPrizesPagePrizeDescription}>
                  {description}
                </p>
              </div>
            ))}
          </section>
        </div>
      </main>
    </PageContainer>
  );
}

export { ReferralsPrizesPage };
