import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { SubscriptionViews } from "react-app/src/components/pages/subscription-views";
import { withAuthenticationRequired } from "lib/famosos-auth";
import LoadingPage from "react-app/src/components/layouts/loading-page";
import { defineMessages } from "react-intl";
import { GetServerSideProps } from "next";
import {
  SUBSCRIPTION_BENEFITS_VIEW_NAME,
  SUBSCRIPTION_FEED_VIEW_NAME,
} from "constants/paths";

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

export const getServerSideProps: GetServerSideProps = async function ({
  params,
}) {
  return { props: { viewName: params?.view_name || SUBSCRIPTION_FEED_VIEW_NAME } };
};

function Subscription({ viewName }) {
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
