import React, {useState} from 'react';
import {Collapse} from 'react-bootstrap';
import PropTypes from 'prop-types';
import "./styles.scss";
import limitString from '../../../utils/limitString';
const CelebritiesProfileDescription = ({descriptionText}) => {
    const [showMore, setShowMore] = useState(false);
    const handlerShowMore = () => {
      setShowMore((prevState) => !prevState);
    };
    const textDescription = (
      <span className='container-celebrities-profile__text-span'>
        {descriptionText}
      </span>
    );
    return (
      <div className={`container-celebrities-profile-description`}>
        {descriptionText.length > 200 ? (
          <>
            <Collapse
              className={`container-celebrities-profile-description__collapse`}
              in={showMore}
            >
              <div>{textDescription}</div>
            </Collapse>
            <div className='container-celebrities-profile-description__toggle-description'>
              {showMore ? null : (
                <i
                  className={`fas fa-angle-double-down`}
                  onClick={() => handlerShowMore()}
                ></i>
              )}
            </div>
          </>
        ) : (
          <div>{textDescription}</div>
        )}
      </div>
    );
}

CelebritiesProfileDescription.defaultProps = {
    descriptionText: ""
}
CelebritiesProfileDescription.propTypes = {
    descriptionText: PropTypes.string
}

export {CelebritiesProfileDescription};
