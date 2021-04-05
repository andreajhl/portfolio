import { useState, useEffect } from "react";

export function usePreloadVideo(src: string) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!src) {
      setIsReady(true);
      return;
    }
    const video = document.createElement("video");
    video.preload = "metadata";
    video.addEventListener("loadeddata", () => {
      setIsReady(true);
      console.log(video);
    });

    video.src = src;
    return () => {
      video.remove();
    };
  }, []);

  return isReady;
}
