import Maybe from "react-app/src/components/common/helpers/maybe";
import { SubscriptionBenefitType } from "react-app/src/types/subscriptionBenefitType";
import InfiniteScroll from "react-infinite-scroll-component";
import { FormattedMessage } from "react-intl";
import { BackstageBenefitCard } from "../backstage-benefit-card";
import { LoaderLayout } from "../loader";
import { NotResults } from "../not-results";
import { PoweredByFamososBanner } from "../powered-by-famosos-banner";
import styles from "./styles.module.scss";

type CelebritySubscriptionBenefitsInfinityListProps = {
  isLoading?: boolean;
  benefits: SubscriptionBenefitType[];
  onNext: () => void;
  hasMore: boolean;
  isSubscribed?: boolean;
};

function CelebritySubscriptionBenefitsInfinityList({
  isLoading = false,
  benefits,
  hasMore,
  onNext,
  isSubscribed,
}: CelebritySubscriptionBenefitsInfinityListProps) {
  const hasBenefits = benefits?.length > 0;

  if (isLoading) {
    return (
      <div
        className="d-flex flex-column justify-content-center"
        style={{ minHeight: "40vh" }}
      >
        <LoaderLayout />
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={benefits?.length}
      next={onNext}
      hasMore={hasMore}
      loader={
        <div className={styles.LoaderWrapper}>
          <LoaderLayout />
        </div>
      }
      endMessage={
        <PoweredByFamososBanner className={styles.BenefitsViewFamososBanner} />
      }
    >
      <Maybe
        it={hasBenefits}
        orElse={
          <NotResults
            message={
              <FormattedMessage defaultMessage="Al parecer no hay beneficios actualmente" />
            }
          />
        }
      >
        {benefits.map((benefit) => (
          <BackstageBenefitCard
            className={styles.BenefitCard}
            benefit={benefit}
            key={benefit?.id}
            isSubscribed={isSubscribed}
          />
        ))}
      </Maybe>
    </InfiniteScroll>
  );
}

export { CelebritySubscriptionBenefitsInfinityList };
