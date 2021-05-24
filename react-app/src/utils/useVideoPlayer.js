import { useState, useRef, useEffect } from "react";
import useCurrentVideoPlaying from "./useCurrentVideoPlaying";

const noVideoPlaying = null;

function useVideoPlayer(
  videoKey,
  {
    onPlayVideo = () => {},
    onPauseVideo = () => {},
    onInterruptPlay = () => {},
  } = {}
) {
  const [currentVideoKey, setPlayingVideo] = useCurrentVideoPlaying();
  const videoRef = useRef();
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);

  const playVideo = () => {
    setPlayingVideo(videoKey);
    setVideoIsPlaying(true);
    videoRef.current.play().catch((error) => {
      console.log("Error", error);
    });
  };

  const pauseVideo = () => {
    setVideoIsPlaying(false);
    setPlayingVideo(noVideoPlaying);
    videoRef.current?.pause?.();
  };

  const togglePlay = () => {
    if (!videoIsPlaying) {
      onPlayVideo();
      playVideo();
    } else {
      onPauseVideo();
      pauseVideo();
    }
  };

  useEffect(() => {
    if (!videoIsPlaying || !currentVideoKey) return;
    if (currentVideoKey !== videoKey) {
      pauseVideo();
    }
    return () => {
      if (currentVideoKey === videoKey) setPlayingVideo(noVideoPlaying);
    };
  }, [currentVideoKey, videoIsPlaying]);

  return {
    videoRef,
    videoIsPlaying,
    playVideo,
    pauseVideo,
    togglePlay,
  };
}

export default useVideoPlayer;
