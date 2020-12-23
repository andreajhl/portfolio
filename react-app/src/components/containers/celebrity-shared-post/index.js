import React,{useState} from 'react';
import {Image, Carousel} from 'react-bootstrap';
import './styles.scss';
const CelebritySharedPost = () => {
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
            <span>Benito Martinez Ocasio</span>
          </div>
        </div>
        <div className='celebrity-shared-post__media-files'>
          <Carousel interval={null} activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
              <Image
                className='d-block w-100'
                src='/assets/img/index-header-backeground.png'
                alt='First slide'
              />
            </Carousel.Item>
            <Carousel.Item>
              <Image
                className='d-block w-100'
                src='/assets/img/index-header-backeground.png'
                alt='First slide'
              />
            </Carousel.Item>
            <Carousel.Item>
              <Image
                className='d-block w-100'
                src='/assets/img/index-header-backeground.png'
                alt='First slide'
              />
            </Carousel.Item>
            <Carousel.Item>
              <Image
                className='d-block w-100'
                src='/assets/img/index-header-backeground.png'
                alt='First slide'
              />
            </Carousel.Item>
          </Carousel>
        </div>
        <div className='celebrity-shared-post__description'>
          <span>
            Consequat sint ex labore velit veniam fugiat sit enim pariatur
            dolore Lorem qui eu sint. Nisi culpa quis incididunt incididunt
            deserunt sit consequat proident elit in ea. Id commodo irure ullamco
            incididunt sit ipsum quis voluptate labore cillum est. Elit cillum
            irure nulla ut aliquip qui veniam irure Lorem consectetur
            reprehenderit ut anim. Non adipisicing Lorem qui non non.
          </span>
          1
        </div>
      </div>
    );
}

export default CelebritySharedPost;
