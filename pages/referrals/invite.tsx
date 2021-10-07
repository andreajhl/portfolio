import { withAuthenticationRequired } from "lib/famosos-auth";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import LoadingPage from "react-app/src/components/layouts/loading-page";
import { ReferralsInvitePage } from "react-app/src/components/pages/referrals-invite";
import { defineMessages } from "react-intl";

const headMessages = defineMessages({
  title: {
    defaultMessage: "Famosos.com - Refiere y gana estrellas por cada amigo",
  },
});

function ReferralsInvite() {
  return (
    <>
      <CustomHead title={headMessages.title} />
      <ReferralsInvitePage />
    </>
  );
}

export default withAuthenticationRequired(ReferralsInvite, {
  onRedirecting: LoadingPage,
});
