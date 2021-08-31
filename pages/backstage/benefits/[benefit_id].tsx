import { withAuthenticationRequired } from "lib/famosos-auth";
import { useRouter } from "next/router";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import LoadingPage from "react-app/src/components/layouts/loading-page";
import { SubscriptionBenefitDetails } from "react-app/src/components/pages/subscription-benefit-details";

function BenefitDetails() {
  const { query } = useRouter();
  const benefitId = query?.benefit_id?.toString?.();

  return (
    <>
      <CustomHead />
      <SubscriptionBenefitDetails benefitId={benefitId} />
    </>
  );
}

export default withAuthenticationRequired(BenefitDetails, {
  onRedirecting: LoadingPage,
});
