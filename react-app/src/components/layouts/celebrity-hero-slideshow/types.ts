import { OccasionType } from "constants/occasions";
import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type ButtonComponent = ElementType<ComponentPropsWithoutRef<"button">>;

type VideoOverlaySectionRenderPropType = (
  components: {
    MuteToggler: ButtonComponent;
    PlayToggler: ButtonComponent;
    FullscreenToggler: ButtonComponent;
    LikeToggler: ButtonComponent;
    ShareButton: ButtonComponent;
  },
  videoDetails?: {
    occasion: OccasionType;
    reference: string;
  }
) => ReactNode;

export type ComponentProps = {
  className?: string;
  celebrityAvatar: string;
  celebrityMainVideo: string;
  videoOverlayHeader: VideoOverlaySectionRenderPropType;
  videoOverlayFooter: VideoOverlaySectionRenderPropType;
};
