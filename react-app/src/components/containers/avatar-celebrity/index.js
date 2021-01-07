import React from 'react';
import {Image} from 'react-bootstrap';
import './styles.scss';
const AvatarCelebrity = () => {
    return (
      <div className='carousel-subscription-avatar'>
        <Image
          src='/assets/img/avatar-blank.png'
          className='carousel-subscription-avatar__image'
          roundedCircle
        ></Image>
        <div className='carousel-subscription-avatar__celebrity-name'>
          <span>eliiannydsoteldo</span>
        </div>
      </div>
    );
}

export default AvatarCelebrity;
