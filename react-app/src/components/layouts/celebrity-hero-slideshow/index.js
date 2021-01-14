import React, { useState, useRef, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { connect } from "react-redux";
import fullscreen from "fscreen";
import * as GTM from "../../../state/utils/gtm";
import { VideoSlideLayout } from "../video-slide";
import { contractOperations } from "../../../state/ducks/contracts";
import "./styles.scss";

const CelebrityHeroSlideshow = ({
  celebrityAvatar,
  celebrityMainVideo,
  celebrityPublicContracts,
  setPlayingVideo
}) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [videoIsMuted, setVideoIsMuted] = useState(true);
  const [videoIsFullscreen, setVideoIsFullscreen] = useState(false);

  const handleSelect = (selectedIndex, event) => {
    setPlayingVideo({ contract_reference: null });
    setActiveSlideIndex(selectedIndex);
    GTM.tagManagerDataLayer("CHANGE_CELEBRITY_HERO_SLIDESHOW_SLIDE", {
      ...analyticsData,
      selectedIndex
    });
  };

  const analyticsData = {
    widget: "CelebrityHeroSlideshow",
    path: window.location.pathname,
    activeSlideIndex,
    videoIsMuted,
    videoIsFullscreen,
    isPlayingVideo
  };

  const sectionRef = useRef();

  useEffect(() => {
    if (!fullscreen.fullscreenEnabled) return;
    const onFullscreenChange = () => {
      if (fullscreen.fullscreenElement === sectionRef.current) {
        setVideoIsFullscreen(true);
        GTM.tagManagerDataLayer("ENTER_FULLSCREEN_VIDEO_SLIDE", {
          ...analyticsData,
          videoIsFullscreen: true
        });
      } else {
        setVideoIsFullscreen(false);
        GTM.tagManagerDataLayer("EXIT_FULLSCREEN_VIDEO_SLIDE", {
          ...analyticsData,
          videoIsFullscreen: false
        });
      }
    };
    fullscreen.addEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    const sectionElement = sectionRef.current;
    if (fullscreen.fullscreenElement === sectionElement) {
      fullscreen.exitFullscreen();
    } else {
      fullscreen.requestFullscreen(sectionElement);
    }
  };

  const registerCelebrityHeroSlideshowHover = () => {
    GTM.tagManagerDataLayer(
      "HOVER_CELEBRITY_HERO_SLIDESHOW_SLIDE",
      analyticsData
    );
  };

  return (
    <section
      className={`CelebrityHeroSlideshow container p-0 bg-dark ${
        videoIsFullscreen ? "CelebrityHeroSlideshow--is-fullscreen" : ""
      }`}
      onMouseOver={registerCelebrityHeroSlideshowHover}
      ref={sectionRef}
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
              videoPosterUrl={celebrityAvatar}
              videoUrl={celebrityMainVideo}
              videoReference={"SLIDESHOW-MAIN_VIDEO"}
              autoPlayOnCanPlay
              autoPlayVideo={activeSlideIndex === 0 && isPlayingVideo}
              videoIsMuted={videoIsMuted}
              setVideoIsMuted={setVideoIsMuted}
              setIsPlayingVideo={setIsPlayingVideo}
              isPlayingVideo={isPlayingVideo}
              videoIsFullscreen={videoIsFullscreen}
              toggleFullscreen={toggleFullscreen}
              showFullscreenToggler={fullscreen.fullscreenEnabled}
            />
          </Carousel.Item>
        ) : null}
        {celebrityPublicContracts.map((publicContract, index) => (
          <Carousel.Item key={publicContract.contract_reference}>
            <VideoSlideLayout
              shouldLoadPoster={index < activeSlideIndex + 2}
              videoUrl={publicContract.contract_media}
              videoReference={"SLIDESHOW-" + publicContract.contract_reference}
              videoPosterUrl={
                publicContract.video_poster_url || celebrityAvatar
              }
              autoPlayVideo={index + 1 === activeSlideIndex && isPlayingVideo}
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
