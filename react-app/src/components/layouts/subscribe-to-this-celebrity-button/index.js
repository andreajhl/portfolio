import React from "react";
import { NavLink } from "react-app/src/components/common/routing";
import { CELEBRITY_SUBSCRIBE } from "../../../routing/Paths";
import * as GTM from "../../../state/utils/gtm";
import { parseFullName } from "parse-full-name";
import { LessImportantCallToActionButton } from "../less-important-call-to-action-button";

const SubscribeToThisCelebrityButton = ({
  className,
  text,
  celebrityFullName,
  celebrityUsername,
  fontSize,
  width
}) => {
  const registerSubscribeToThisCelebrityButtonEvent = (eventName) => {
    GTM.tagManagerDataLayer(eventName + "_SUBSCRIBE_TO_THIS_CELEBRITY_BUTTON", {
      path: window.location.pathname,
      widget: "SubscribeToThisCelebrityButton",
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
      to={CELEBRITY_SUBSCRIBE.replace(":celebrity_username", celebrityUsername)}
      onClick={() => registerSubscribeToThisCelebrityButtonEvent("CLICK")}
      onMouseOver={() => registerSubscribeToThisCelebrityButtonEvent("HOVER")}
    >
      {
        <LessImportantCallToActionButton
          fontSize={fontSize}
          width={width}
          className={className}
        >
          {text}
          {celebrityFullName ? " " + displayName : ""}
        </LessImportantCallToActionButton>
      }
    </NavLink>
  );
};

export { SubscribeToThisCelebrityButton };
