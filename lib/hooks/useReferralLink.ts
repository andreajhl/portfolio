import { getSignInFromPath } from "constants/paths";
import { useAuth } from "lib/famosos-auth";
import getWindow from "react-app/src/utils/getWindow";

function useReferralLink() {
  const { user, isLoading } = useAuth();
  const referralLink =
    getWindow().location.origin +
    getSignInFromPath({ referrer: user?.userId, referrerName: user?.fullName });
  const isReady = !isLoading && typeof user?.userId === "number";

  return { referralLink, isReady };
}

export default useReferralLink;
