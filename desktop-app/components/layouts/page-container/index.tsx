import Maybe from "react-app/src/components/common/helpers/maybe";
import PageLayoutProps from "../page-layout/types";
import dynamic from "next/dynamic";
import { useDesktopClass } from "lib/hooks/useDesktopClass";
import { useIsOnMobileScreen } from "lib/is-on-mobile-screen";

type PageLayoutMobileProps = {
  [key: string]: any;
};

const MobilePageContainer = dynamic<PageLayoutMobileProps>(
  import("react-app/src/components/layouts/page-layout").then(
    (mod) => mod.PageContainer
  )
);

const DesktopPageContainer = dynamic(import("../page-layout"));

type PageContainerProps = PageLayoutProps & PageLayoutMobileProps;

function PageContainer(props: PageContainerProps) {
  const isOnMobile = useIsOnMobileScreen();
  const showSearch = props.showSearchInMobile ?? props.showSearch;

  useDesktopClass(!isOnMobile);

  return (
    <Maybe it={isOnMobile} orElse={<DesktopPageContainer {...props} />}>
      <MobilePageContainer {...props} showSearch={showSearch} />
    </Maybe>
  );
}

export default PageContainer;
