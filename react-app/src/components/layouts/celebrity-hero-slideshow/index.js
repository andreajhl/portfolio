import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { connect } from "react-redux";
import { CelebrityMainVideoSection } from "../main-video-section";
import { VideoSlideLayout } from "../video-slide";
import "./styles.scss";

const CelebrityHeroSlideshow = ({
  celebrityMainVideo,
  celebrityPublicContracts
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const handleSelect = (selectedIndex, event) => {
    setActiveSlideIndex(selectedIndex);
  };

  return (
    <section className="CelebrityHeroSlideshow container p-0 bg-dark">
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
            <VideoSlideLayout videoUrl={celebrityMainVideo} autoPlayOnCanPlay />
          </Carousel.Item>
        ) : null}
        {celebrityPublicContracts.map((publicContract, index) => (
          <Carousel.Item key={publicContract.contract_reference}>
            <VideoSlideLayout
              videoUrl={publicContract.contract_media}
              videoReference={publicContract.contract_reference}
              autoPlayVideo={index + 1 === activeSlideIndex}
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

const _CelebrityHeroSlideshow = connect(mapStateToProps)(
  CelebrityHeroSlideshow
);

export { _CelebrityHeroSlideshow as CelebrityHeroSlideshow };
