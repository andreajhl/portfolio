import { useState, useRef, useEffect } from "react";
import useCurrentVideoPlaying from "./useCurrentVideoPlaying";

const useVideoPlayer = (
  videoKey,
  {
    onPlayVideo = () => {},
    onPauseVideo = () => {},
    onInterruptPlay = () => {}
  }
) => {
  const [currentVideoKey, setPlayingVideo] = useCurrentVideoPlaying();
  const videoRef = useRef();
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);

  const playVideo = () => {
    const playPromise = videoRef.current.play();
    playPromise
      .then((_) => {})
      .catch((error) => {
        console.log("Error", error);
      });
    setVideoIsPlaying(true);
    setPlayingVideo(videoKey);
  };

  const pauseVideo = () => {
    videoRef.current.pause();
    setVideoIsPlaying(false);
    setPlayingVideo(null);
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
      if (currentVideoKey === videoKey) setPlayingVideo(null);
    };
  }, [currentVideoKey, videoIsPlaying]);

  return {
    videoRef,
    videoIsPlaying,
    playVideo,
    pauseVideo,
    togglePlay
  };
};

export default useVideoPlayer;
