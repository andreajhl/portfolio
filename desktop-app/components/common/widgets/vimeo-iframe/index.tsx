import { ComponentPropsWithoutRef } from "react";
import classes from "classnames";
import styles from "./styles.module.scss";
import { jsonToQueryString } from "react-app/src/state/utils/apiService";

type VimeoIframeProps = {
  vimeoId: number | string;
  autoPauseOnPlayAnother?: boolean;
  autoPlay?: boolean;
  mutedOnLoad?: boolean;
  showControls?: boolean;
  allowKeyboardControls?: boolean;
  initialTimeLapsed?: string;
} & ComponentPropsWithoutRef<"iframe">;

function VimeoIframe({
  vimeoId,
  className,
  autoPauseOnPlayAnother = true,
  autoPlay = false,
  mutedOnLoad = true,
  initialTimeLapsed,
  showControls = true,
  allowKeyboardControls = true,
  ...props
}: VimeoIframeProps) {
  const videoPlayerParams = {
    autopause: autoPauseOnPlayAnother,
    autoplay: autoPlay,
    muted: mutedOnLoad,
    controls: showControls,
    keyboard: allowKeyboardControls,
  };

  if (initialTimeLapsed) {
    videoPlayerParams["#t"] = initialTimeLapsed;
  }

  const videoPlayerQueryString = jsonToQueryString(videoPlayerParams);

  return (
    <iframe
      className={classes(styles.VideoIframe, className)}
      title={`VimeoIframe-${vimeoId}`}
      src={`https://player.vimeo.com/video/${vimeoId + videoPlayerQueryString}`}
      frameBorder={0}
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
      {...props}
    />
  );
}

export { VimeoIframe };
