import { celebrityType } from "desktop-app/types/celebrityType";
import { useEffect, useRef } from "react";
import { analytics } from "react-app/src/state/utils/gtm";

type AnalyticsDataType = {
  isReadyToTrack?: boolean;
  celebrity: celebrityType;
  [key: string]: any;
};
export function useTrackCelebrityPageView({
  celebrity,
  isReadyToTrack = true,
  ...analyticsData
}: AnalyticsDataType) {
  const analyticsDataRef = useRef<AnalyticsDataType>();
  analyticsDataRef.current = {
    celebrity,
    ...analyticsData,
  };

  useEffect(() => {
    if (!isReadyToTrack || !analyticsDataRef?.current) return;
    analytics.trackCelebrityProfileView(analyticsDataRef.current);
  }, [isReadyToTrack]);
}
