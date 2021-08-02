import Maybe from "react-app/src/components/common/helpers/maybe";
import PageLayoutProps from "../page-layout/types";
import dynamic from "next/dynamic";
import { useDesktopClass } from "lib/hooks/useDesktopClass";
import { useIsOnMobileScreen } from "lib/is-on-mobile-screen";
import useUserLocation from "lib/hooks/useUserLocationCookie";
import useBotMaker from "lib/hooks/useBotmaker";

const COUNTRIES_WHERE_SHOULD_ALWAYS_DISPLAY_BOTMAKER = ["BR"];

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

const CookiesConsent = dynamic(
  import("react-app/src/components/layouts/cookies-consent").then(
    (mod) => mod.CookiesConsent
  ),
  { ssr: false }
);

type PageContainerProps = PageLayoutProps & PageLayoutMobileProps;

function PageContainer(props: PageContainerProps) {
  const isOnMobile = useIsOnMobileScreen();
  const showSearch = props.showSearchInMobile ?? props.showSearch;
  const userLocation = useUserLocation();
  const forceShowBotMakerFrame = isCountryWhereShouldAlwaysDisplayBotMaker(
    userLocation
  );
  useBotMaker(props.showBotMakerFrame || forceShowBotMakerFrame);
  useDesktopClass(!isOnMobile);

  return (
    <>
      <Maybe it={isOnMobile} orElse={<DesktopPageContainer {...props} />}>
        <MobilePageContainer {...props} showSearch={showSearch} />
      </Maybe>
      <NewsletterPopup />
      <CookiesConsent />
    </>
  );
}

export default PageContainer;
