import React,{useState} from 'react';
import {Image, Carousel,ResponsiveEmbed,VideoSlide } from 'react-bootstrap';
import {VideoSlideLayout} from '../../layouts/video-slide/index';
import './styles.scss';
const CelebritySharedPost = (props) => {
    const [videoIsMuted, setVideoIsMuted] = useState(true);
    const [slideshowIsPlaying, setSlideshowIsPlaying] = useState(false);
    const {celebrityId, description, id, urls,celebrityData} = {...props};
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
                    <VideoSlideLayout
                      preload="true"
                      classNameVideoSlideButtons='celebrity-shared-post__media-files__video-control'
                      videoIsMuted={videoIsMuted}
                      shouldLoadPoster={false}
                      setVideoIsMuted={setVideoIsMuted}
                      videoReference={'celebrity-shared-post' + media.value}
                      setSlideshowIsPlaying={setSlideshowIsPlaying}
                      videoUrl={media.value}
                    />
                  ) : (
                    <Image
                      className='d-block w-100'
                      src={media.value}
                      alt={`media-${index}`}
                    />
                  )}
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
        <div className='celebrity-shared-post__description'>
          <span>{description}</span>
        </div>
      </div>
    );
}

export default CelebritySharedPost;
