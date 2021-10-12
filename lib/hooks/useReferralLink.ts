import { getReferrerInviteLink } from "constants/paths";
import { useAuth } from "lib/famosos-auth";
import { getFirstName } from "react-app/src/utils/getFirstName";
import getWindow from "react-app/src/utils/getWindow";
import useGetReferralCode from "./useGetReferralCode";

function useReferralLink() {
  const { code, status } = useGetReferralCode();
  const { user } = useAuth();
  const userFullName = user?.fullName || "";
  const referralLink =
    getWindow().location.origin +
    getReferrerInviteLink({
      referrerCode: code,
      referrerName: getFirstName(userFullName),
    });
  const isReady = userFullName && status === "completed";

  return { referralLink, isReady };
}

export default useReferralLink;
