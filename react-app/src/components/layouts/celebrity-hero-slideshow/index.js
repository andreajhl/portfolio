import React, { useState, useRef, useEffect, useMemo } from "react";
import Carousel from "react-bootstrap/Carousel";
import { connect } from "react-redux";
import fullscreen from "fscreen";
import * as GTM from "../../../state/utils/gtm";
import { VideoSlideLayout } from "../video-slide";
import { contractOperations } from "../../../state/ducks/contracts";
import useCurrentVideoPlaying from "../../../utils/useCurrentVideoPlaying";
import getWindow from "react-app/src/utils/getWindow";
import { FormattedMessage } from "react-intl";

const CelebrityHeroSlideshow = ({
  celebrityAvatar,
  celebrityMainVideo,
  celebrityPublicContracts,
  setPlayingVideo,
}) => {
  const [slideshowIsPlaying, setSlideshowIsPlaying] = useState(true);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [videoIsMuted, setVideoIsMuted] = useState(true);
  const [videoIsFullscreen, setVideoIsFullscreen] = useState(false);
  const [currentVideoPlayingKey] = useCurrentVideoPlaying();

  const handleSelect = (selectedIndex, event) => {
    setActiveSlideIndex(selectedIndex);
  };

  const analyticsData = {
    widget: "CelebrityHeroSlideshow",
    path: getWindow().location.pathname,
    activeSlideIndex,
    videoIsMuted,
    videoIsFullscreen,
    isPlayingVideo: slideshowIsPlaying,
  };

  const sectionRef = useRef();

  useEffect(() => {
    if (!fullscreen.fullscreenEnabled) return;
    const onFullscreenChange = () => {
      if (fullscreen.fullscreenElement === sectionRef.current) {
        setVideoIsFullscreen(true);
        GTM.tagManagerDataLayer("ENTER_FULLSCREEN_VIDEO_SLIDE", {
          ...analyticsData,
          videoIsFullscreen: true,
        });
      } else {
        setVideoIsFullscreen(false);
        GTM.tagManagerDataLayer("EXIT_FULLSCREEN_VIDEO_SLIDE", {
          ...analyticsData,
          videoIsFullscreen: false,
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

  const slidesVideosReferences = useMemo(
    () =>
      celebrityPublicContracts
        .map(({ contract_reference }) => "SLIDESHOW-" + contract_reference)
        .concat("SLIDESHOW-MAIN_VIDEO"),
    [celebrityPublicContracts]
  );

  useEffect(() => {
    if (!currentVideoPlayingKey) return;
    if (currentVideoPlayingKey.video_key === null) return;
    if (slidesVideosReferences.includes(currentVideoPlayingKey)) return;
    setSlideshowIsPlaying(false);
  }, [currentVideoPlayingKey, slidesVideosReferences]);

  const playNextVideo = () => {
    // Chequear si existen celebrityPublicContracts para reproducir
    // Sino existen, el main video deberia estar en loop
    if (celebrityPublicContracts.length > 0) {
      //
      let nextIndex =
        activeSlideIndex === celebrityPublicContracts.length
          ? 0
          : activeSlideIndex + 1;
      // Sino existe mainVideo y nextIndex === celebrityPublicContracts.length-1, nextIndex debe de ser 0
      if (
        !celebrityMainVideo &&
        nextIndex === celebrityPublicContracts.length
      ) {
        nextIndex = 0;
      }
      setActiveSlideIndex(nextIndex);
    }
  };
  return (
    <section
      className={`CelebrityHeroSlideshow container p-0 bg-dark ${
        videoIsFullscreen ? "CelebrityHeroSlideshow--is-fullscreen" : ""
      }`}
      ref={sectionRef}
    >
      <Carousel
        activeIndex={activeSlideIndex}
        onSelect={handleSelect}
        fade
        interval={null}
        prevIcon={<i className="fa fa-chevron-left controls-icon" />}
        prevLabel={
          <FormattedMessage defaultMessage="Anterior" description="" />
        }
        nextIcon={<i className="fa fa-chevron-right controls-icon" />}
        nextLabel={
          <FormattedMessage defaultMessage="Siguiente" description="" />
        }
      >
        {celebrityMainVideo ? (
          <Carousel.Item>
            <VideoSlideLayout
              videoPosterUrl={celebrityAvatar}
              videoUrl={celebrityMainVideo}
              videoReference={"SLIDESHOW-MAIN_VIDEO"}
              autoPlayOnCanPlay
              autoPlayVideo={activeSlideIndex === 0 && slideshowIsPlaying}
              videoIsMuted={videoIsMuted}
              setVideoIsMuted={setVideoIsMuted}
              setSlideshowIsPlaying={setSlideshowIsPlaying}
              slideshowIsPlaying={slideshowIsPlaying}
              videoIsFullscreen={videoIsFullscreen}
              toggleFullscreen={toggleFullscreen}
              showFullscreenToggler={fullscreen.fullscreenEnabled}
              onEndVideo={playNextVideo}
              shouldLoop={!celebrityPublicContracts.length > 0}
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
              autoPlayVideo={
                (celebrityMainVideo ? index + 1 : index) === activeSlideIndex &&
                slideshowIsPlaying
              }
              videoIsMuted={videoIsMuted}
              setVideoIsMuted={setVideoIsMuted}
              setSlideshowIsPlaying={setSlideshowIsPlaying}
              slideshowIsPlaying={slideshowIsPlaying}
              videoIsFullscreen={videoIsFullscreen}
              toggleFullscreen={toggleFullscreen}
              showFullscreenToggler={fullscreen.fullscreenEnabled}
              onEndVideo={playNextVideo}
              shouldLoop={
                !celebrityMainVideo && celebrityPublicContracts.length === 1
              }
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

const mapStateToProps = ({ celebrities }) => ({
  celebrityMainVideo: celebrities.getCelebrityReducer.data.mainVideo,
  celebrityPublicContracts:
    celebrities.fetchPublicContractsReducer.data.results,
});

const mapDispatchToProps = {
  setPlayingVideo: contractOperations.playVideo,
};

const _CelebrityHeroSlideshow = connect(
  mapStateToProps,
  mapDispatchToProps
)(CelebrityHeroSlideshow);

export { _CelebrityHeroSlideshow as CelebrityHeroSlideshow };
