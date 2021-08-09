import { useRef } from "react";
import { analytics } from "react-app/src/state/utils/gtm";

function useTrackContractVideoView({
                                     minimumProgress = 5,
                                     ...trackData
                                   }: {
  widget: string;
  occasion: string;
  contractReference: string;
  videoUrl: string;
  minimumProgress?: number;
  [key: string]: any;
}) {
  const hasTrackedViewRef = useRef(false);

  function trackView({ target }) {
    const currentProgress = target?.currentTime;
    if (currentProgress < minimumProgress || hasTrackedViewRef.current) return;
    hasTrackedViewRef.current = true;
    analytics.track("CONTRACT_VIDEO_VIEW", trackData);
  }

  return trackView;
}

export default useTrackContractVideoView;
