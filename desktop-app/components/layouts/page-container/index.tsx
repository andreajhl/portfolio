import Maybe from "react-app/src/components/common/helpers/maybe";
import PageLayoutProps from "../page-layout/types";
import dynamic from "next/dynamic";
import { useDesktopClass } from "lib/hooks/useDesktopClass";
import useIsOnDesktop from "../../../../lib/hooks/useIsOnDesktop";

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
  const isOnDesktop = useIsOnDesktop();
  const showSearch = props.showSearchInMobile ?? props.showSearch;

  useDesktopClass(isOnDesktop);

  return (
    <Maybe
      it={isOnDesktop}
      orElse={<MobilePageContainer {...props} showSearch={showSearch} />}
    >
      <DesktopPageContainer {...props} />
    </Maybe>
  );
}

export default PageContainer;
