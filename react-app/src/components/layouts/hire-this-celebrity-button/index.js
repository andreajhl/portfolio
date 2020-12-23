import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import { CELEBRITY_PROFILE_CONTRACT } from "../../../routing/Paths";
import * as GTM from "../../../state/utils/gtm";
import { parseFullName } from "parse-full-name";

window.parseFullName = parseFullName;

const HireThisCelebrityButton = ({
  className,
  text,
  celebrityFullName,
  celebrityUsername,
  fontSize,
  width
}) => {
  const registerHireThisCelebrityButtonEvent = (eventName) => {
    GTM.tagManagerDataLayer(eventName + "_HIRE_THIS_CELEBRITY_BUTTON", {
      path: window.location.pathname,
      widget: "HireThisCelebrityButton",
      text,
      celebrityFullName,
      celebrityUsername
    });
  };

  const parsedFullName = parseFullName(
    celebrityFullName,
    "all",
    true,
    false,
    true
  );

  const fullNameWords = celebrityFullName.split(" ");

  const displayName =
    parsedFullName.first === "Papá"
      ? `${fullNameWords[0]} ${fullNameWords[1]}`
      : parsedFullName.first || parsedFullName.last;

  return (
    <NavLink
      to={CELEBRITY_PROFILE_CONTRACT.replace(
        ":celebrity_username",
        celebrityUsername
      )}
      onClick={() => registerHireThisCelebrityButtonEvent("CLICK")}
      onMouseOver={() => registerHireThisCelebrityButtonEvent("HOVER")}
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
        className={`font-weight-bold ${className ? className : ""}`}
      >
        {text}
        {celebrityFullName ? " " + displayName : ""}
      </Button>
    </NavLink>
  );
};

export { HireThisCelebrityButton };
