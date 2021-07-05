import Maybe from "react-app/src/components/common/helpers/maybe";
import PageLayoutProps from "../page-layout/types";
import useGetViewportWidthOnResize from "react-app/src/utils/useGetViewportWidthOnResize";
import dynamic from "next/dynamic";

const MobilePageContainer = dynamic(
  import("react-app/src/components/layouts/page-layout").then(
    (mod) => mod.PageContainer
  )
);

const DesktopPageContainer = dynamic(import("../page-layout"));

type PageContainerProps = PageLayoutProps & { [key: string]: any };

function PageContainer(props: PageContainerProps) {
  const windowWidth = useGetViewportWidthOnResize();
  const isOnDesktop = windowWidth >= 1024;

  return (
    <Maybe it={isOnDesktop} orElse={<MobilePageContainer {...props} />}>
      <DesktopPageContainer {...props} />
    </Maybe>
  );
}

export default PageContainer;
