import Maybe from "desktop-app/components/common/helpers/maybe";
import { celebrityType } from "desktop-app/types/celebrityType";
import { useRef, useState } from "react";
import styles from "./styles.module.scss";
type VideoPlayerProps = {
  celebrity?: celebrityType;
  className?: string;
  style?: object;
};

const testCelebrity = {
  id: 1200,
  fullName: "Alexis Ayala Testing",
  username: "alexisayala",
  avatar: "https://via.placeholder.com/600/19f9f0",
  mainVideo:
    "https://dqb0851cl2gjs.cloudfront.net/main-videos/1200/famosos-videos-personalizados-alexisayala-crf-video480.mp4",
  hashtags: ["Actor", "CDMX"],
  title: "Actores",
  categoryId: 4,
  videoMessagePrice: 12,
  countryCode: "MEX",
  countryId: 25,
  countryName: "Mexico",
  showSimilarCelebrities: false,
  availableForFlashDeliveries: false,
  availableForSubscriptions: false,
  videoPosterUrl:
    "https://d3dxo4xx2lwk55.cloudfront.net/videos/941/14118/famosos-videos-personalizados-sabrinasabrok-202102122322-7467880-14118-crf-video-poster480.jpg",
  videoUrl: "/assets/felipe.mp4",
  occasion: ""
};
const VideoPlayer = ({
  celebrity = testCelebrity,
  style,
  className
}: VideoPlayerProps) => {
  // TODO: Conectar con redux state para manejar reproducción de video
  const videoRef = useRef<HTMLVideoElement>();
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  const playVideo = () => {
    videoRef.current.play();
    setVideoIsPlaying(true);
  };

  const pauseVideo = () => {
    videoRef.current.pause();
    setVideoIsPlaying(false);
  };

  const togglePlay = () => {
    if (!videoIsPlaying) {
      playVideo();
    } else {
      pauseVideo();
    }
  };

  return (
    <div
      className={`${styles.VideoCard} ${className}`}
      style={{
        ...style
      }}
      onClick={togglePlay}
    >
      <Maybe it={!videoIsPlaying}>
        <img
          src={testCelebrity.videoPosterUrl}
          alt={`Poster de vídeo de famoso`}
          className={styles.VideoPoster}
        ></img>
      </Maybe>
      <video
        ref={videoRef}
        src={testCelebrity.videoUrl}
        preload="none"
        className={styles.VideoElement}
      ></video>
    </div>
  );
};

export default VideoPlayer;
