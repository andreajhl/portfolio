import useReferralLink from "lib/hooks/useReferralLink";
import {
  OffCanvasShareLinkMenu,
  OffCanvasShareLinkMenuProps,
} from "react-app/src/components/common/widgets/off-canvas-share-link-menu";
import { defineMessages, useIntl } from "react-intl";

const messages = defineMessages({
  shareMessage: {
    defaultMessage:
      "¡Hola! Te invito a ganar premios junto a mi en Famosos.com. Ingresa ya a {link}.",
  },
  shareMailSubject: {
    defaultMessage: "Me gustaría invitarte a Famosos.com",
  },
});

type OffCanvasShareReferralLinkMenuProps = {} & Omit<
  OffCanvasShareLinkMenuProps,
  "link" | "message" | "mailSubject"
>;

function OffCanvasShareReferralLinkMenu(
  props: OffCanvasShareReferralLinkMenuProps
) {
  const { formatMessage } = useIntl();
  const { referralLink } = useReferralLink();
  const shareMessage = formatMessage(messages.shareMessage, {
    link: referralLink,
  });
  const shareMailSubject = formatMessage(messages.shareMailSubject);

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
