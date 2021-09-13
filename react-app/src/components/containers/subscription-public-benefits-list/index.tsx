import usePublicListSubscriptionBenefits from "lib/hooks/usePublicListSubscriptionBenefits";
import { useEffect, useRef } from "react";
import { CelebritySubscriptionBenefitsInfinityList } from "../../layouts/celebrity-subscription-benefits-infinity-list";
import { SubscriptionContentSection } from "../../layouts/subscription-posts";

const offsetInitialValue = 0;
const resultsLimit = 5;

type SubscriptionPublicBenefitsListProps = {
  currentChoice: number;
  isSubscribed?: boolean;
};

function SubscriptionPublicBenefitsList({
  currentChoice,
  isSubscribed = false,
}: SubscriptionPublicBenefitsListProps) {
  const celebrityId = currentChoice?.toString?.();
  const {
    benefits,
    totalResults,
    status,
    currentParams: { offset },
    setOffset,
  } = usePublicListSubscriptionBenefits({
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

  return (
    <SubscriptionContentSection>
      <CelebritySubscriptionBenefitsInfinityList
        isLoading={showLoading}
        benefits={benefits}
        onNext={setNewOffset}
        hasMore={hasMoreBenefits}
        isSubscribed={isSubscribed}
      />
    </SubscriptionContentSection>
  );
}

export { SubscriptionPublicBenefitsList };
