import React from 'react';
import AvatarCelebrity from '../../containers/avatar-celebrity/index';
import './styles.scss';
const CarouselAvailableSubscriptions = () => {
    return (
      <div className='carousel-available-subscriptions'>
        <div className='subscription-avatar-celebrity'>
          <AvatarCelebrity />
        </div>
        <div className='subscription-avatar-celebrity'>
          <AvatarCelebrity />
        </div>
        <div className='subscription-avatar-celebrity'>
          <AvatarCelebrity />
        </div>
        <div className='subscription-avatar-celebrity'>
          <AvatarCelebrity />
        </div>
        <div className='subscription-avatar-celebrity'>
          <AvatarCelebrity />
        </div>
        <div className='subscription-avatar-celebrity'>
          <AvatarCelebrity />
        </div>
        <div className='subscription-avatar-celebrity'>
          <AvatarCelebrity />
        </div>
        <div className='subscription-avatar-celebrity'>
          <AvatarCelebrity />
        </div>
      </div>
    );
}

export { CarouselAvailableSubscriptions };
