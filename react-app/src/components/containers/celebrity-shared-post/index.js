import React,{useState} from 'react';
import {Image, Carousel,ResponsiveEmbed,VideoSlide } from 'react-bootstrap';
import {VideoSlideLayout} from '../../layouts/video-slide/index';
import './styles.scss';
const CelebritySharedPost = (props) => {
    const {celebrityId, description, id, urls} = props;
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
      };
    return (
      <div className='celebrity-shared-post'>
        <div className='celebrity-shared-post__user-avatar'>
          <Image
            src='/assets/img/avatar-blank.png'
            className='user-avatar-image'
            roundedCircle
          />
          <div className='celebrity-shared-post__user-name'>
            <span>{celebrityId}</span>
          </div>
        </div>
        <div className='celebrity-shared-post__media-files'>
          <Carousel interval={null} activeIndex={index} onSelect={handleSelect}>
            {urls.map((media,index) => {
              return (
                <Carousel.Item className='celebrity-shared-post__media-files__item'>
                  {media.type === 'video' ? (
                    <VideoSlideLayout videoUrl={media.value} />
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
