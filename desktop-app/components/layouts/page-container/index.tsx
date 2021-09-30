import Maybe from "react-app/src/components/common/helpers/maybe";
import PageLayoutProps from "../page-layout/types";
import dynamic from "next/dynamic";
import { useDesktopClass } from "lib/hooks/useDesktopClass";
import { useIsOnMobileScreen } from "lib/is-on-mobile-screen";
import useUserLocation from "lib/hooks/useUserLocationCookie";
import useBotMaker from "lib/hooks/useBotmaker";
import { useFetchCountries } from "lib/hooks/useFetchCountries";
import { useIubendaCookiesConsent } from "desktop-app/components/docs/CookiesConsentES";
import { useState } from "react";
import useTimeout from "lib/hooks/useTimeout";

const COUNTRIES_WHERE_SHOULD_ALWAYS_DISPLAY_BOTMAKER = ["BR"];

const RECOMMENDED_TIME_TO_DISPLAY_POPUPS = 6000;

const isCountryWhereShouldAlwaysDisplayBotMaker = (userLocation) =>
  COUNTRIES_WHERE_SHOULD_ALWAYS_DISPLAY_BOTMAKER.includes(userLocation);

type PageLayoutMobileProps = {
  [key: string]: any;
};

const MobilePageContainer = dynamic<PageLayoutMobileProps>(
  import("react-app/src/components/layouts/page-layout").then(
    (mod) => mod.PageContainer
  )
);

const DesktopPageContainer = dynamic(import("../page-layout"));

const NewsletterPopup = dynamic(
  import("react-app/src/components/containers/newsletter-popup").then(
    (mod) => mod.NewsletterPopup
  ),
  { ssr: false }
);

type PageContainerProps = PageLayoutProps & PageLayoutMobileProps;

function PageContainer(props: PageContainerProps) {
  const isOnMobile = useIsOnMobileScreen();
  useFetchCountries();
  const showSearch = props.showSearchInMobile ?? props.showSearch;
  const userLocation = useUserLocation();
  const forceShowBotMakerFrame = isCountryWhereShouldAlwaysDisplayBotMaker(
    userLocation
  );
  useBotMaker(props.showBotMakerFrame || forceShowBotMakerFrame);
  useDesktopClass(!isOnMobile);
  useIubendaCookiesConsent();
  const [
    shouldRenderNewsletterPopup,
    setShouldRenderNewsletterPopup,
  ] = useState(false);

  useTimeout(() => {
    setShouldRenderNewsletterPopup(true);
  }, RECOMMENDED_TIME_TO_DISPLAY_POPUPS);

  return (
    <>
      <Maybe it={isOnMobile} orElse={<DesktopPageContainer {...props} />}>
        <MobilePageContainer {...props} showSearch={showSearch} />
      </Maybe>
      <Maybe it={shouldRenderNewsletterPopup}>
        <NewsletterPopup />
      </Maybe>
    </>
  );
}

export default PageContainer;
