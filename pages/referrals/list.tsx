import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { defineMessages } from "react-intl";
import { ReferralsListPage } from "react-app/src/components/pages/referrals-list";
import { withAuthenticationRequired } from "lib/famosos-auth";
import LoadingPage from "react-app/src/components/layouts/loading-page";

const headMessages = defineMessages({
  title: {
    defaultMessage: "Famosos.com - Tus referidos confirmados",
  },
});

function ReferralsList() {
  return (
    <>
      <CustomHead title={headMessages.title} />
      <ReferralsListPage />
    </>
  );
}

export default withAuthenticationRequired(ReferralsList, {
  onRedirecting: LoadingPage,
});
