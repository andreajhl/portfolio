import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { defineMessages } from "react-intl";
import { ReferralsPrizesPage } from "react-app/src/components/pages/referrals-prizes";
import { withAuthenticationRequired } from "lib/famosos-auth";
import LoadingPage from "react-app/src/components/layouts/loading-page";

const headMessages = defineMessages({
  title: {
    defaultMessage: "Famosos.com - Tus premios de referidos",
  },
});

function ReferralsPrizes() {
  return (
    <>
      <CustomHead title={headMessages.title} />
      <ReferralsPrizesPage />
    </>
  );
}

export default withAuthenticationRequired(ReferralsPrizes, {
  onRedirecting: LoadingPage,
});
