import React from "react";
import styles from "./styles.module.scss";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { celebrityType } from "desktop-app/types/celebrityType";
import { useRef, useState } from "react";
import { LikeButton } from "desktop-app/components/common/button/like";

type ContractVideoProps = {
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
const ContractVideo = ({ celebrity = testCelebrity, style, className }) => {
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
    <div className={styles.ContractVideo}>
      <div className={styles.ContractVideoMedia}>
        <section onClick={togglePlay} className={styles.ContractVideoPlayer}>
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
        </section>
        <section className={styles.ContractVideoOverlay}>
          <div className={styles.ContractVideoDetails}>
            <div className={styles.ContractVideoOcassion}>
              <div className={styles.ContractVideoOcassionIcon}>
                <svg
                  width="10"
                  height="11"
                  viewBox="0 0 10 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.70703 10.3446H9.20027V7.83324C9.35559 7.68985 9.44404 7.48651 9.44404 7.26943V6.42459C9.44404 5.96431 9.07738 5.58981 8.62668 5.58981H8.24422V3.53608C8.24422 3.19276 7.99455 2.91344 7.68766 2.91344H7.65293V2.68871C7.9991 2.55296 8.24813 2.18395 8.24813 1.75086C8.24813 1.60545 8.21033 1.35987 7.91566 0.746289C7.76377 0.430009 7.61408 0.164039 7.60775 0.152854C7.5541 0.0577161 7.46055 0 7.35996 0C7.25937 0 7.16584 0.0577161 7.11217 0.152854C7.10586 0.164039 6.95617 0.430031 6.80426 0.746289C6.50957 1.35987 6.4718 1.60545 6.4718 1.75086C6.4718 2.18393 6.72082 2.55296 7.06699 2.68871V2.91344H7.03227C6.72537 2.91344 6.4757 3.19276 6.4757 3.53608V5.58981H5.88428V3.53608C5.88428 3.19276 5.63459 2.91344 5.3277 2.91344H5.29297V2.68871C5.63912 2.55296 5.88814 2.18395 5.88814 1.75086C5.88814 1.60545 5.85035 1.35987 5.55568 0.746289C5.40381 0.430009 5.25412 0.164039 5.24781 0.152875C5.19414 0.0577161 5.10059 0 5 0C4.89941 0 4.80588 0.0577161 4.75221 0.152854C4.7459 0.164039 4.59621 0.430031 4.4443 0.746289C4.14961 1.35987 4.11184 1.60545 4.11184 1.75086C4.11184 2.18393 4.36086 2.55296 4.70703 2.68871V2.91344H4.6723C4.36541 2.91344 4.11572 3.19276 4.11572 3.53608V5.58981H3.5243V3.53608C3.5243 3.19276 3.27463 2.91344 2.96773 2.91344H2.93301V2.68871C3.27918 2.55296 3.5282 2.18395 3.5282 1.75086C3.5282 1.60545 3.49041 1.35987 3.19574 0.746289C3.04385 0.430009 2.89416 0.164039 2.88783 0.152854C2.83418 0.0577161 2.74062 0 2.64004 0C2.53945 0 2.44592 0.0577161 2.39225 0.152854C2.38594 0.164039 2.23625 0.430031 2.08434 0.746289C1.78965 1.35987 1.75186 1.60545 1.75186 1.75086C1.75186 2.18393 2.00088 2.55296 2.34705 2.68871V2.91344H2.31232C2.00543 2.91344 1.75576 3.19276 1.75576 3.53608V5.58981H1.3733C0.922617 5.58981 0.555938 5.96431 0.555938 6.42459V7.26943C0.555938 7.48651 0.644395 7.68985 0.799707 7.83324V10.3446H0.292969C0.131172 10.3446 0 10.4913 0 10.6723C0 10.8533 0.131172 11 0.292969 11H9.70703C9.86883 11 10 10.8533 10 10.6723C10 10.4913 9.86883 10.3446 9.70703 10.3446ZM7.05773 1.7511C7.05955 1.64644 7.18537 1.33044 7.36002 0.973877C7.53457 1.33024 7.66031 1.64611 7.66219 1.75103C7.66211 1.93749 7.52656 2.08916 7.35996 2.08916C7.19332 2.08916 7.05773 1.9374 7.05773 1.7511ZM7.06164 3.56881H7.6583V5.58793H7.06164V3.56881ZM4.69777 1.7511C4.69959 1.64644 4.82541 1.33046 5.00004 0.973899C5.17459 1.33024 5.30033 1.64611 5.30221 1.75103C5.30213 1.93749 5.1666 2.08916 5 2.08916C4.83336 2.08916 4.69777 1.9374 4.69777 1.7511ZM4.70166 3.56881H5.29834V5.58793H4.70166V3.56881ZM2.33779 1.7511C2.33961 1.64644 2.46543 1.33044 2.64008 0.973877C2.81463 1.33024 2.94037 1.64611 2.94225 1.75103C2.94217 1.93749 2.80662 2.08916 2.64002 2.08916C2.47338 2.08916 2.33779 1.9374 2.33779 1.7511ZM2.3417 3.56881H2.93836V5.58793H2.3417V3.56881ZM8.61434 10.3446H1.38564V8.02251C1.43146 8.01661 1.47715 8.00628 1.52213 7.99138L2.2617 7.74651C2.6891 7.60504 3.1598 7.60504 3.58717 7.74651L4.17092 7.9398C4.43824 8.02832 4.7191 8.07256 4.99996 8.07256C5.28084 8.07256 5.56172 8.02832 5.82902 7.9398L6.41277 7.74651C6.84012 7.60502 7.31086 7.60502 7.73824 7.74651L8.47779 7.99138C8.52277 8.00628 8.56848 8.01661 8.6143 8.02251V10.3446H8.61434ZM8.85811 7.26943C8.85811 7.29671 8.83838 7.31893 8.82186 7.33272C8.7849 7.36356 8.71883 7.3877 8.64416 7.36299L7.90459 7.11813C7.36996 6.94109 6.78111 6.94109 6.24646 7.11813L5.66271 7.31142C5.23537 7.45289 4.76463 7.45293 4.33725 7.31142L3.7535 7.11813C3.48615 7.02959 3.20535 6.98535 2.92443 6.98535C2.64359 6.98535 2.36266 7.02961 2.09539 7.11813L1.3558 7.36299C1.28115 7.38772 1.21506 7.36354 1.17813 7.33272C1.16158 7.31891 1.14188 7.29671 1.14188 7.26943V6.42459C1.14188 6.33972 1.23691 6.24517 1.3733 6.24517H8.6267C8.76307 6.24517 8.85813 6.33972 8.85813 6.42459V7.26943H8.85811Z"
                    fill="black"
                  />
                </svg>
              </div>
              <span className={styles.ContractVideoOcassionName}>
                Cumpleaños
              </span>
            </div>
            <div className={styles.ContractVideoViewsCounter}>
              <svg
                width="14"
                height="13"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.911 6.24718C13.786 6.08831 10.8059 2.35718 6.99993 2.35718C3.19392 2.35718 0.213774 6.08831 0.08884 6.24703C-0.0296133 6.39775 -0.0296133 6.60217 0.08884 6.75289C0.213774 6.91176 3.19392 10.6429 6.99993 10.6429C10.8059 10.6429 13.786 6.91173 13.911 6.75302C14.0296 6.60232 14.0296 6.39775 13.911 6.24718ZM6.99993 9.78575C4.1964 9.78575 1.76824 7.30933 1.04946 6.49974C1.76731 5.68945 4.19038 3.21432 6.99993 3.21432C9.80333 3.21432 12.2313 5.69031 12.9504 6.50033C12.2326 7.31059 9.80948 9.78575 6.99993 9.78575Z"
                  fill="white"
                />
                <path
                  d="M6.99996 3.92859C5.47302 3.92859 4.23071 5.08216 4.23071 6.50003C4.23071 7.9179 5.47302 9.07147 6.99996 9.07147C8.52689 9.07147 9.7692 7.9179 9.7692 6.50003C9.7692 5.08216 8.52689 3.92859 6.99996 3.92859ZM6.99996 8.21431C5.98195 8.21431 5.15381 7.4453 5.15381 6.50003C5.15381 5.55476 5.98197 4.78575 6.99996 4.78575C8.01794 4.78575 8.8461 5.55476 8.8461 6.50003C8.8461 7.4453 8.01797 8.21431 6.99996 8.21431Z"
                  fill="white"
                />
              </svg>
              <span>8,200</span>
            </div>
            <div className={styles.ContractVideoLikeButton}>
              <LikeButton />
            </div>
          </div>
        </section>
      </div>
      <div className={styles.CelebrityInfo}>
        <img
          className={styles.CelebrityAvatar}
          src={testCelebrity.avatar}
          alt="Avatar de Famoso"
        ></img>
        <span className={`${styles.CelebrityName} text-with-ellipsis`}>
          Nombre de Celebrity Nombre de Celebrity Nombre de Celebrity
        </span>
      </div>
    </div>
  );
};

export default ContractVideo;
