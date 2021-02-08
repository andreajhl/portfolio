import React from "react";
import { Image } from "react-bootstrap";

const AvatarCelebrity = (props) => {
  const { celebrity, onClickHandler, isSelected } = { ...props };
  return (
    <div
      className="carousel-subscription-avatar "
      onClick={() => onClickHandler(celebrity.celebrityId)}
    >
      <Image
        src={`${
          celebrity.celebrityAvatar
            ? celebrity.celebrityAvatar
            : "/assets/img/avatar-blank.png"
        }`}
        className={`carousel-subscription-avatar__image  ${
          isSelected ? "selected" : ""
        }`}
        roundedCircle
      ></Image>
      <div className="carousel-subscription-avatar__celebrity-name">
        <span>{celebrity.celebrityFullName}</span>
      </div>
    </div>
  );
};

export default AvatarCelebrity;
