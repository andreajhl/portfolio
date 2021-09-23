import { getReferrerInviteLink } from "constants/paths";
import { useAuth } from "lib/famosos-auth";
import { getFirstName } from "react-app/src/utils/getFirstName";
import getWindow from "react-app/src/utils/getWindow";

function useReferralLink() {
  const { user, isLoading } = useAuth();
  const referralLink =
    getWindow().location.origin +
    getReferrerInviteLink({
      referrerCode: user?.userId,
      referrerName: getFirstName(user?.fullName || ""),
    });
  const isReady = !isLoading && typeof user?.userId === "number";

  return { referralLink, isReady };
}

export default useReferralLink;
