import { setPlayingVideo } from "../state/ducks/celebrity-sections/actions";
import { useSelector, useDispatch } from "react-redux";

const useCurrentVideoPlaying = () => {
  const currentVideoKey = useSelector(
    ({ celebritySections }) => celebritySections.playVideoReducer
  );

  const dispatch = useDispatch();

  const setCurrentPlayingVideo = (videoKey) =>
    dispatch(setPlayingVideo(videoKey));

  return [currentVideoKey, setCurrentPlayingVideo];
};

export default useCurrentVideoPlaying;
