import { withAuthenticationRequired } from "lib/famosos-auth";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import LoadingPage from "react-app/src/components/layouts/loading-page";
import { ReferralsHomePage } from "react-app/src/components/pages/referrals-home";
import { defineMessages } from "react-intl";

const headMessages = defineMessages({
  title: {
    defaultMessage: "Famosos.com - Resumen de tus referidos",
  },
});

function ReferralsHome() {
  return (
    <>
      <CustomHead title={headMessages.title} />
      <ReferralsHomePage />
    </>
  );
}

export default withAuthenticationRequired(ReferralsHome, {
  onRedirecting: LoadingPage,
});
