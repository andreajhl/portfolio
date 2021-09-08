import { ComponentPropsWithoutRef } from "react";
import classes from "classnames";
import styles from "./styles.module.scss";

type VimeoIframeProps = {
  vimeoId: number | string;
  autoPauseOnPlayAnother?: boolean;
  autoPlay?: boolean;
  mutedOnLoad?: boolean;
  initialTimeLapsed?: string;
} & ComponentPropsWithoutRef<"iframe">;

function VimeoIframe({
  vimeoId,
  className,
  autoPauseOnPlayAnother = true,
  autoPlay = false,
  mutedOnLoad = true,
  initialTimeLapsed = "0m",
  ...props
}: VimeoIframeProps) {
  return (
    <iframe
      className={classes(styles.VideoIframe, className)}
      title={`VimeoIframe-${vimeoId}`}
      src={`https://player.vimeo.com/video/${vimeoId}?badge=0&amp;autopause=${autoPauseOnPlayAnother}&autoplay=${autoPlay}&muted=${mutedOnLoad}&#t=${initialTimeLapsed}&amp;player_id=0&amp;app_id=224546&amp;h=d2364fe822`}
      frameBorder={0}
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
      {...props}
    />
  );
}

export { VimeoIframe };
