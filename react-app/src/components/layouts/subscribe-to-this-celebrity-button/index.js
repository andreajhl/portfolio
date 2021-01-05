import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import { SUBSCRIPTION } from "../../../routing/Paths";
import * as GTM from "../../../state/utils/gtm";

const SubscribeToThisCelebrityButton = ({
  className,
  text,
  celebrityFullName,
  celebrityUsername,
  fontSize,
  width
}) => {
 
  return (
    <NavLink
      to={SUBSCRIPTION.replace(':celebrity_username', celebrityUsername)}
    >
      <Button
        style={{
          backgroundColor: '#FB177D',
          borderRadius: '5px',
          color: 'white',
          border: 'none',
          padding: '0.75em',
          fontSize,
          width,
        }}
        className={`font-weight-bold ${className ? className : ''}`}
      >
        {text}
        {celebrityFullName ? ' ' + celebrityFullName.split(' ')[0] : ''}
      </Button>
    </NavLink>
  );
};

export {  SubscribeToThisCelebrityButton };
