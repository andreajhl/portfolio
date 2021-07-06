import Maybe from "react-app/src/components/common/helpers/maybe";
import PageLayoutProps from "../page-layout/types";
import useGetViewportWidthOnResize from "react-app/src/utils/useGetViewportWidthOnResize";
import dynamic from "next/dynamic";

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
  const windowWidth = useGetViewportWidthOnResize();
  const isOnDesktop = windowWidth >= 1024;
  const showSearch = props.showSearchInMobile ?? props.showSearch;

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
