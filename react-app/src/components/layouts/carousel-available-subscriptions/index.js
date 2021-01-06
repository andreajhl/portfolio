import React,{useRef, useState,useEffect} from 'react';
import AvatarCelebrity from '../../containers/avatar-celebrity/index';
import debounce from "lodash.debounce";

import './styles.scss';
const CarouselAvailableSubscriptions = () => {
  const [showLeftScrollButton, setShowLeftScrollButton] = useState(false);
  const [showRightScrollButton, setShowRightScrollButton] = useState(false);
  
  const subscriptionListRef= useRef(null)
  
  useEffect(() => {
    const cardListElement = subscriptionListRef.current;
    setShowRightScrollButton(
      cardListElement.scrollWidth > cardListElement.offsetWidth
    );
  }, []);

  const setScrollButtonsVisibility = debounce(() => {
  
    const {
      scrollLeft,
      offsetWidth,
      scrollWidth,
    } = subscriptionListRef.current;
    setShowLeftScrollButton(scrollLeft !== 0);
    setShowRightScrollButton(scrollLeft + offsetWidth !== scrollWidth);
  }, 100);
    
  const scrollTo = (direction) => () => {
    const subscriptionListElement = subscriptionListRef.current;
    const { offsetWidth } = subscriptionListElement;
    subscriptionListElement.scrollBy({
      left: direction === 'right' ? offsetWidth : offsetWidth * -1,
      behavior: 'smooth',
    });
  };
    
    return (
      <div className='carousel-available-subscriptions container'>
        {showLeftScrollButton ? (
          <button
            className='carousel-available-subscriptions__scroll-button  d-none d-md-block'
            onClick={scrollTo('left')}
          >
            <i className='fa fa-chevron-left text-white' />
          </button>
        ) : null}

        <ul
          onScroll={setScrollButtonsVisibility}
          className='carousel-available-subscriptions__celebrities-list'
          ref={subscriptionListRef}
        >
          <li className='carousel-available-subscriptions__item'>
            <AvatarCelebrity />
          </li>
          <li className='carousel-available-subscriptions__item'>
            <AvatarCelebrity />
          </li>
          <li className='carousel-available-subscriptions__item'>
            <AvatarCelebrity />
          </li>
          <li className='carousel-available-subscriptions__item'>
            <AvatarCelebrity />
          </li>
          <li className='carousel-available-subscriptions__item'>
            <AvatarCelebrity />
          </li>
          <li className='carousel-available-subscriptions__item'>
            <AvatarCelebrity />
          </li>
          <li className='carousel-available-subscriptions__item'>
            <AvatarCelebrity />
          </li>
          <li className='carousel-available-subscriptions__item'>
            <AvatarCelebrity />
          </li>{' '}
          <li className='carousel-available-subscriptions__item'>
            <AvatarCelebrity />
          </li>
          <li className='carousel-available-subscriptions__item'>
            <AvatarCelebrity />
          </li>
          <li className='carousel-available-subscriptions__item'>
            <AvatarCelebrity />
          </li>{' '}
          <li className='carousel-available-subscriptions__item'>
            <AvatarCelebrity />
          </li>
          <li className='carousel-available-subscriptions__item'>
            <AvatarCelebrity />
          </li>
          <li className='carousel-available-subscriptions__item'>
            <AvatarCelebrity />
          </li>
        </ul>
        {showRightScrollButton ? (
          <button
            className='carousel-available-subscriptions__scroll-button scroll-to-right-button  d-none d-md-block'
            onClick={scrollTo('right')}
          >
            <i className='fa fa-chevron-right text-white' />
          </button>
        ) : null}
      </div>
    );
}

export { CarouselAvailableSubscriptions };
