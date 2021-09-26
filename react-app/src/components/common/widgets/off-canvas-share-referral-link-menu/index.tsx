import useReferralLink from "lib/hooks/useReferralLink";
import referralMessages from "lib/messages/referrals";
import {
  OffCanvasShareLinkMenu,
  OffCanvasShareLinkMenuProps,
} from "react-app/src/components/common/widgets/off-canvas-share-link-menu";
import { useIntl } from "react-intl";

type OffCanvasShareReferralLinkMenuProps = {} & Omit<
  OffCanvasShareLinkMenuProps,
  "link" | "message" | "mailSubject"
>;

function OffCanvasShareReferralLinkMenu(
  props: OffCanvasShareReferralLinkMenuProps
) {
  const { formatMessage } = useIntl();
  const { referralLink } = useReferralLink();
  const shareMessage = formatMessage(referralMessages.shareMessage, {
    referralLink,
  });
  const shareMailSubject = formatMessage(referralMessages.shareMailSubject);

  return (
    <OffCanvasShareLinkMenu
      {...props}
      link={referralLink}
      message={shareMessage}
      mailSubject={shareMailSubject}
    />
  );
}

export { OffCanvasShareReferralLinkMenu };
