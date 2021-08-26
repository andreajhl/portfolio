import { SUBSCRIPTION_BENEFITS } from "constants/paths";
import { GetServerSideProps } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { SubscriptionBenefitDetails } from "react-app/src/components/pages/subscription-benefit-details";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const benefitId = params?.benefit_id;

  if (typeof benefitId === "undefined") {
    return {
      redirect: { destination: SUBSCRIPTION_BENEFITS, permanent: false },
    };
  }
  return {
    props: {
      benefitId,
    },
  };
};

function BenefitDetails({ benefitId }) {
  return (
    <>
      <CustomHead />
      <SubscriptionBenefitDetails benefitId={benefitId} />
    </>
  );
}

export default BenefitDetails;
