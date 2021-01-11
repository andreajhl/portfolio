import { useState, useRef, useEffect } from "react";
import { setPlayingVideo } from "../state/ducks/celebrity-sections/actions";
import { useSelector, useDispatch } from "react-redux";

const useVideoPlayer = (videoKey, { onPlayVideo, onPauseVideo }) => {
  const currentVideoKey = useSelector(
    ({ celebritySections }) => celebritySections.playVideoReducer
  );
  const dispatch = useDispatch();
  const videoRef = useRef();
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);

  const playVideo = () => {
    videoRef.current.play();
    setVideoIsPlaying(true);
    dispatch(setPlayingVideo(videoKey));
  };

  const pauseVideo = () => {
    videoRef.current.pause();
    setVideoIsPlaying(false);
    dispatch(setPlayingVideo(null));
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
    if (currentVideoKey && currentVideoKey !== videoKey) pauseVideo();
    return () => {
      if (currentVideoKey === videoKey) setPlayingVideo(null);
    };
  }, [currentVideoKey]);

  return {
    videoRef,
    videoIsPlaying,
    playVideo,
    pauseVideo,
    togglePlay
  };
};

export default useVideoPlayer;
