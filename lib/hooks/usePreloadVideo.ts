import { useState, useEffect } from "react";
import waitFor from "react-app/src/utils/waitFor";

const LOADED = 4;

export function usePreloadVideo(src: string) {
  const [isReady, setIsReady] = useState(false);

  function changeIsReady() {
    setIsReady(true);
  }

  useEffect(() => {
    if (!src) {
      setIsReady(true);
      return;
    }
    const video = document.createElement("video");
    video.preload = "metadata";
    video.muted = true;
    video.autoplay = true;
    video.addEventListener("loadeddata", changeIsReady);
    video.src = src;
    const videoIsLoaded: any = waitFor(
      () => video?.readyState === LOADED,
      1000,
      100
    );
    videoIsLoaded?.then?.(changeIsReady);

    return () => {
      videoIsLoaded?.cancel?.();
      video.remove();
    };
  }, []);

  return isReady;
}
