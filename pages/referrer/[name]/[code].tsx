import { STAR_PRICE_IN_DOLLARS } from "constants/referrals";
import { useRouter } from "next/router";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { ReferrerCodePage } from "react-app/src/components/pages/referrer-code";
import { defineMessages, useIntl } from "react-intl";

const starPriceInDollars = `$${STAR_PRICE_IN_DOLLARS}`;

const headMessages = defineMessages({
  title: {
    defaultMessage: "Famosos.com - {referrerName} te ha invitado a Famosos.com",
  },
  description: {
    defaultMessage:
      "Registrate y empieza a referir a tus amigos para acumular estrellas y usarlas a tu disposición. Cada estrella tiene el valor de {starPriceInDollars} dolar.",
  },
  fallbackReferrerName: {
    defaultMessage: "Alguien",
  },
});

function ReferralOnboarding() {
  const { formatMessage } = useIntl();
  const { query } = useRouter();

  const fallbackReferrerName = formatMessage(headMessages.fallbackReferrerName);
  const referrerName = query?.name || fallbackReferrerName;

  const title = formatMessage(headMessages.title, {
    referrerName,
  });
  const description = formatMessage(headMessages.description, {
    starPriceInDollars,
  });

  return (
    <>
      <CustomHead title={title as string} description={description as string} />
      <ReferrerCodePage
        referrerName={referrerName as string}
        referrerCode={query?.code as string}
      />
    </>
  );
}

export default ReferralOnboarding;
