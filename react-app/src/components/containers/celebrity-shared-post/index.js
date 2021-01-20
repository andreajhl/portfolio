import React,{useState} from 'react';
import {Image, Carousel,ResponsiveEmbed,VideoSlide } from 'react-bootstrap';
import {VideoSlideLayout} from '../../layouts/video-slide/index';
import './styles.scss';
import propTypes from 'prop-types';


const VideoLayout = ({
  videoIsMuted,
  setVideoIsMuted,
  media,
  setSlideshowIsPlaying,
  classNameSlideLayoutVideo
}) => {
  return (
    <VideoSlideLayout
      preload='true'
      classNameVideoSlideButtons='celebrity-shared-post__media-files__video-control'
      classNameSlideLayoutVideo={classNameSlideLayoutVideo}
      videoIsMuted={videoIsMuted}
      shouldLoadPoster={false}
      setVideoIsMuted={setVideoIsMuted}
      videoReference={'celebrity-shared-post' + media.value}
      setSlideshowIsPlaying={setSlideshowIsPlaying}
      videoUrl={media.value}
    />
  );
};

const ImageLayout = ({ media, index, classNameImage}) => {
  return (
    <Image
      className={classNameImage}
      src={media.value}
      alt={`media-${index}`}
    />
  );
};

const CarouselItemsLayout = ({index, handleSelect, urls, setSlideshowIsPlaying, videoIsMuted,setVideoIsMuted}) =>{
  return (
    <Carousel
    interval={null}
    activeIndex={index}
    onSelect={handleSelect}
    fade
    interval={null}
    prevIcon={<i className='fa fa-chevron-left controls-icon' />}
    prevLabel='Anterior'
    nextIcon={<i className='fa fa-chevron-right controls-icon' />}
    nextLabel='Siguiente'
  >
    {urls.map((media, index) => {
      return (
        <Carousel.Item
          key={index}
          className='celebrity-shared-post__media-files__item'
        >
          {media.type === 'video' ? (
            <VideoLayout
              videoIsMuted={videoIsMuted}
              setVideoIsMuted={setVideoIsMuted}
              media={media}
              setSlideshowIsPlaying={setSlideshowIsPlaying}
              classNameSlideLayoutVideo='celebrity-shared-post__media-files__item-video'
            />
          ) : (
            <ImageLayout
              media={media}
              index={index}
              classNameImage='celebrity-shared-post__media-files__item-image'
            />
          )}
        </Carousel.Item>
      );
    })}
  </Carousel>
  )
}

const MediaItemLayout = ({
  urls,
  videoIsMuted,
  setVideoIsMuted,
  setSlideshowIsPlaying,
}) => {
  return urls.map((media, index) => {
    return media.type === 'video' ? (
      <VideoLayout
        videoIsMuted={videoIsMuted}
        setVideoIsMuted={setVideoIsMuted}
        media={media}
        setSlideshowIsPlaying={setSlideshowIsPlaying}
        classNameSlideLayoutVideo='celebrity-shared-post__media-file__item-video'
      />
    ) : (
      <ImageLayout
        media={media}
        index={index}
        classNameImage='celebrity-shared-post__media-file__item-image'
      />
    );
  });
};

const CelebritySharedPost = (props) => {
    const {celebrityId, description, id, urls,celebrityData} = {...props};
    const [videoIsMuted, setVideoIsMuted] = useState(true);
    const [slideshowIsPlaying, setSlideshowIsPlaying] = useState(false);
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
      };
    return (
      <div className='celebrity-shared-post'>
        <div className='celebrity-shared-post__user-avatar'>
          <Image
            src={
              celebrityData?.celebrityAvatar
                ? celebrityData?.celebrityAvatar
                : `/assets/img/avatar-blank.png`
            }
            className='user-avatar-image'
            roundedCircle
          />
          <div className='celebrity-shared-post__user-name'>
            <span>
              {celebrityData?.celebrityFullName
                ? celebrityData?.celebrityFullName
                : ''}
            </span>
          </div>
        </div>
        <div className='celebrity-shared-post__media-files'>
          {urls.length > 1 ? (
            <CarouselItemsLayout
              index={index}
              handleSelect={handleSelect}
              urls={urls}
              setSlideshowIsPlaying={setSlideshowIsPlaying}
              setVideoIsMuted={setVideoIsMuted}
              videoIsMuted={videoIsMuted}
            />
          ) : (
            <MediaItemLayout
              urls={urls}
              setSlideshowIsPlaying={setSlideshowIsPlaying}
              setVideoIsMuted={setVideoIsMuted}
              videoIsMuted={videoIsMuted}
            />
          )}
        </div>
        <div className='celebrity-shared-post__description'>
          <span>{description}</span>
        </div>
      </div>
    );
}

CelebritySharedPost.propTypes = {
  urls: propTypes.array,
};

export default CelebritySharedPost;
