import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import { CELEBRITY_PROFILE_CONTRACT } from "../../../routing/Paths";

const HireThisCelebrityButton = ({
  text,
  celebrityFullName,
  celebrityUsername,
  fontSize,
  width
}) => {
  return (
    <NavLink
      to={CELEBRITY_PROFILE_CONTRACT.replace(
        ":celebrity_username",
        celebrityUsername
      )}
    >
      <Button
        style={{
          backgroundColor: "#FB177D",
          borderRadius: "5px",
          color: "white",
          border: "none",
          padding: "0.75em",
          fontSize,
          width
        }}
        className="font-weight-bold"
      >
        {text} {celebrityFullName.split(" ")[0]}
      </Button>
    </NavLink>
  );
};

export { HireThisCelebrityButton };
