import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { SubscriptionViews } from "react-app/src/components/pages/subscription-views";
import { withAuthenticationRequired } from "lib/famosos-auth";
import LoadingPage from "react-app/src/components/layouts/loading-page";
import { defineMessages } from "react-intl";
import {
  SUBSCRIPTION_BENEFITS_VIEW_NAME,
  SUBSCRIPTION_FEED_VIEW_NAME,
} from "constants/paths";
import { useRouter } from "next/router";

const headData = {
  [SUBSCRIPTION_FEED_VIEW_NAME]: defineMessages({
    title: {
      defaultMessage: "Las ultimas publicaciones de tus famosos favoritos.",
    },
  }),
  [SUBSCRIPTION_BENEFITS_VIEW_NAME]: defineMessages({
    title: {
      defaultMessage: "Los últimos beneficios de tus famosos favoritos.",
    },
  }),
};

function Subscription() {
  const { query } = useRouter();
  const viewName =
    query?.view_name?.toString?.() || SUBSCRIPTION_FEED_VIEW_NAME;

  return (
    <>
      <CustomHead description={headData?.[viewName]?.title} />
      <SubscriptionViews currentView={viewName} />
    </>
  );
}

export default withAuthenticationRequired(Subscription, {
  onRedirecting: LoadingPage,
});
