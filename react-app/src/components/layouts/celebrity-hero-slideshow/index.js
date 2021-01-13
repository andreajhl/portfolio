import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { connect } from "react-redux";
import * as GTM from "../../../state/utils/gtm";
import { VideoSlideLayout } from "../video-slide";
import { contractOperations } from "../../../state/ducks/contracts";
import "./styles.scss";

const CelebrityHeroSlideshow = ({
  celebrityMainVideo,
  celebrityPublicContracts,
  setPlayingVideo
}) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const analyticsData = {
    widget: "CelebrityHeroSlideshow",
    path: window.location.pathname
  };

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [videoIsMuted, setVideoIsMuted] = useState(true);

  const handleSelect = (selectedIndex, event) => {
    setPlayingVideo({ contract_reference: null });
    setActiveSlideIndex(selectedIndex);
    GTM.tagManagerDataLayer("CHANGE_CELEBRITY_HERO_SLIDESHOW_SLIDE", {
      ...analyticsData,
      selectedIndex
    });
  };

  const registerCelebrityHeroSlideshowHover = () => {
    GTM.tagManagerDataLayer(
      "HOVER_CELEBRITY_HERO_SLIDESHOW_SLIDE",
      analyticsData
    );
  };

  return (
    <section
      className="CelebrityHeroSlideshow container p-0 bg-dark"
      onMouseOver={registerCelebrityHeroSlideshowHover}
    >
      <Carousel
        activeIndex={activeSlideIndex}
        onSelect={handleSelect}
        fade
        interval={null}
        prevIcon={<i className="fa fa-chevron-left controls-icon" />}
        prevLabel="Anterior"
        nextIcon={<i className="fa fa-chevron-right controls-icon" />}
        nextLabel="Siguiente"
      >
        {celebrityMainVideo ? (
          <Carousel.Item>
            <VideoSlideLayout
              videoUrl={celebrityMainVideo}
              videoReference={"MAIN_VIDEO"}
              autoPlayOnCanPlay
              autoPlayVideo={activeSlideIndex === 0 && isPlayingVideo}
              videoIsMuted={videoIsMuted}
              setVideoIsMuted={setVideoIsMuted}
              setIsPlayingVideo={setIsPlayingVideo}
              isPlayingVideo={isPlayingVideo}
            />
          </Carousel.Item>
        ) : null}
        {celebrityPublicContracts.map((publicContract, index) => (
          <Carousel.Item key={publicContract.contract_reference}>
            <VideoSlideLayout
              videoUrl={publicContract.contract_media}
              videoReference={publicContract.contract_reference}
              autoPlayVideo={
                (celebrityMainVideo ? index + 1 : index) === activeSlideIndex &&
                isPlayingVideo
              }
              videoIsMuted={videoIsMuted}
              setVideoIsMuted={setVideoIsMuted}
              setIsPlayingVideo={setIsPlayingVideo}
              isPlayingVideo={isPlayingVideo}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

const mapStateToProps = ({ celebrities }) => ({
  celebrityMainVideo: celebrities.getCelebrityReducer.data.mainVideo,
  celebrityPublicContracts: celebrities.fetchPublicContractsReducer.data.results
});

const mapDispatchToProps = {
  setPlayingVideo: contractOperations.playVideo
};

const _CelebrityHeroSlideshow = connect(
  mapStateToProps,
  mapDispatchToProps
)(CelebrityHeroSlideshow);

export { _CelebrityHeroSlideshow as CelebrityHeroSlideshow };
