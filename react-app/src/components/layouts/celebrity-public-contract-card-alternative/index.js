import React, { useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-app/src/components/common/routing";
import * as GTM from "../../../state/utils/gtm";
import { HIRING_PREVIEW } from "../../../routing/Paths";
import getWindow from "react-app/src/utils/getWindow";
import useVideoPlayer from "react-app/src/utils/useVideoPlayer";

function CelebrityPublicContractCardAlternativeLayout({
  publicContract,
  celebrityFullName,
  celebrityAvatar,
  videoKey
}) {
  const analyticsData = {
    widget: "CelebrityPublicContractCardAlternativeLayout",
    path: getWindow().location.pathname,
    ...publicContract,
    videoKey
  };

  const registerCelebrityUsernameClick = () =>
    GTM.tagManagerDataLayer(
      "CLICK_CELEBRITY_PUBLIC_CONTRACT_CARD_ALTERNATIVE_CELEBRITY_NAME",
      analyticsData
    );

  const { videoRef, togglePlay, videoIsPlaying } = useVideoPlayer(videoKey);
  const [videoIsLoaded, setVideoIsLoaded] = useState(false);

  return (
    <div className="CelebrityPublicContractCardAlternativeLayout">
      <div className="video-card">
        <section className="video-card__media">
          {!videoIsLoaded ? (
            <img
              className="video-card__poster"
              src={
                publicContract.video_poster_url ||
                celebrityAvatar ||
                "/assets/img/avatar-blank.png"
              }
              alt={`Poster de vídeo de ${celebrityFullName}`}
              onClick={togglePlay}
            />
          ) : null}
          <video
            className="video-card__video"
            style={{ opacity: videoIsLoaded ? 1 : 0 }}
            src={publicContract.contract_media}
            preload="none"
            playsInline
            onClick={togglePlay}
            onLoadedData={() => setVideoIsLoaded(true)}
            ref={videoRef}
          />
        </section>
        <section className="video-card__overlay">
          <header className="d-flex justify-content-between align-items-center">
            <i
              className={`fa fa-2x text-white fa-${
                videoIsPlaying ? "pause" : "play"
              } ml-2 mt-2`}
              onClick={togglePlay}
            />
          </header>
          <footer className="d-flex align-items-center px-2 video-card__footer">
            <NavLink
              className="d-flex align-items-center video-card__celebrity-profile-link"
              to={HIRING_PREVIEW.replace(
                ":contract_reference",
                publicContract.contract_reference
              )}
              onClick={registerCelebrityUsernameClick}
            >
              <h6 className="video-card__delivery-to text-with-ellipsis">
                Para: {publicContract.contract_delivery_to.toLowerCase()}
              </h6>
            </NavLink>
          </footer>
        </section>
      </div>
    </div>
  );
}

CelebrityPublicContractCardAlternativeLayout.defaultProps = {
  publicContract: {}
};

CelebrityPublicContractCardAlternativeLayout.propTypes = {
  celebrityFullName: PropTypes.string,
  celebrityAvatar: PropTypes.string,
  videoKey: PropTypes.string.isRequired
};

export { CelebrityPublicContractCardAlternativeLayout };
