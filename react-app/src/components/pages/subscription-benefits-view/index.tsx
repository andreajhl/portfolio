import classes from "classnames";
import { BackstageBenefitCard } from "react-app/src/components/layouts/backstage-benefit-card";
import { PoweredByFamososBanner } from "../../layouts/powered-by-famosos-banner";
import useListSubscriptionBenefits from "lib/hooks/useListSubscriptionBenefits";
import { LoaderLayout } from "../../layouts/loader";
import styles from "./styles.module.scss";
import Maybe from "../../common/helpers/maybe";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { FormattedMessage } from "react-intl";
import { NotResults } from "../../layouts/not-results";

const offsetInitialValue = 0;
const resultsLimit = 5;

type SubscriptionBenefitsViewProps = {
  currentChoice: number;
};

function SubscriptionBenefitsView({
  currentChoice,
}: SubscriptionBenefitsViewProps) {
  const celebrityId = currentChoice?.toString?.();
  const {
    benefits,
    totalResults,
    status,
    currentParams: { offset },
    setOffset,
  } = useListSubscriptionBenefits({
    limit: resultsLimit,
    celebrityId,
  });
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    // To prevent offset change on mount and re-fetching the currently loaded benefits.
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
    } else {
      setOffset(offsetInitialValue);
    }
  }, [celebrityId]);

  function setNewOffset() {
    const nextOffset = offset + resultsLimit;
    const newOffset = nextOffset < totalResults ? nextOffset : totalResults;
    setOffset(newOffset);
  }

  const showLoading = offset <= 0 && status === "loading";
  const hasMoreBenefits = benefits?.length < totalResults;
  const hasBenefits = benefits?.length > 0;

  return (
    <div className={styles.SubscriptionBenefitsView}>
      <div className={classes("container", styles.Container)}>
        <Maybe it={!showLoading} orElse={<LoaderLayout />}>
          <InfiniteScroll
            dataLength={benefits?.length}
            next={setNewOffset}
            hasMore={hasMoreBenefits}
            loader={<LoaderLayout />}
            endMessage={
              <PoweredByFamososBanner
                className={styles.BenefitsViewFamososBanner}
              />
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
                />
              ))}
            </Maybe>
          </InfiniteScroll>
        </Maybe>
      </div>
    </div>
  );
}

export { SubscriptionBenefitsView };
