import React from "react";
import { NavLink } from "react-app/src/components/common/routing";
import { SUBSCRIPTION } from "../../../routing/Paths";
import * as GTM from "../../../state/utils/gtm";
import { parseFullName } from "parse-full-name";
import { CallToActionButton } from "../call-to-action-button";

const SubscribeToThisCelebrityButton = ({
  className,
  text,
  celebrityFullName,
  celebrityUsername,
  fontSize,
  width
}) => {
  // PARA REMOVER TEMPORALMENTE ESTE COMPONENTE.
  return null;
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
      to={SUBSCRIPTION.replace(":celebrity_username", celebrityUsername)}
      onClick={() => registerSubscribeToThisCelebrityButtonEvent("CLICK")}
      onMouseOver={() => registerSubscribeToThisCelebrityButtonEvent("HOVER")}
    >
      {
        <CallToActionButton
          fontSize={fontSize}
          width={width}
          className={className}
        >
          {text}
          {celebrityFullName ? " " + displayName : ""}
        </CallToActionButton>
      }
    </NavLink>
  );
};

export { SubscribeToThisCelebrityButton };
