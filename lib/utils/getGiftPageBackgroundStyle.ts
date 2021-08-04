import HiringPreviewConfigurationType from "desktop-app/types/hiringPreviewConfigurationType";
import { CSSProperties } from "react";

function getGiftPageBackgroundStyle(
  hiringConfiguration: HiringPreviewConfigurationType
): CSSProperties {
  const { pageBackgroundUrl } = hiringConfiguration;
  if (!pageBackgroundUrl) return null;
  return {
    backgroundImage: `url(${pageBackgroundUrl})`,
  };
}

export default getGiftPageBackgroundStyle;
