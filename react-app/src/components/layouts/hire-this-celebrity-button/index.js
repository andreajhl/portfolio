import React from "react";
import { NavLink } from "react-app/src/components/common/routing";
import { CELEBRITY_PROFILE_CONTRACT } from "../../../routing/Paths";
import * as GTM from "../../../state/utils/gtm";
import { parseFullName } from "parse-full-name";
import { CallToActionButton } from "../call-to-action-button";

const HireThisCelebrityButton = ({
  className,
  text,
  celebrityFullName,
  celebrityUsername,
  showCelebrityName,
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
    parsedFullName.first.length <= 4
      ? fullNameWords.slice(0, 2).join(" ")
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
      {
        <CallToActionButton
          fontSize={fontSize}
          width={width}
          className={className}
        >
          {text}
          {celebrityFullName && showCelebrityName ? " " + displayName : ""}
        </CallToActionButton>
      }
    </NavLink>
  );
};

export { HireThisCelebrityButton };
