import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { SubscriptionSuccess as SubscriptionSuccessPage } from "react-app/src/components/pages/subscribe_success";

const SubscriptionSuccess = () => {
  return (
    <>
      <CustomHead description="Las ultimas publicaciones de tus famosos favoritos." />
      <SubscriptionSuccessPage />
    </>
  );
};

export default SubscriptionSuccess;
