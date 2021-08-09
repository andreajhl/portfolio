import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { ClientSubscriptions } from "react-app/src/components/pages/client-subscriptions";
import { defineMessages } from "react-intl";

const headData = defineMessages({
  titleFeed: {
    defaultMessage: "Las ultimas publicaciones de tus famosos favoritos."
  }
});
const Subscriptions = () => {
  return (
    <>
      <CustomHead description={headData.titleFeed} />
      <ClientSubscriptions />
    </>
  );
};
export default Subscriptions; /* withAuthenticationRequired(Subscriptions, {
  onRedirecting: () => <LoadingPage></LoadingPage>
}); */
