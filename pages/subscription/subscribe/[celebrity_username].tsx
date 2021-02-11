import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { Subscription as SubscriptionPage } from "react-app/src/components/pages/subscription";

const Subscription = () => {
  return (
    <>
      <CustomHead description="Las ultimas publicaciones de tus famosos favoritos." />
      <SubscriptionPage />
    </>
  );
};

export default Subscription;
