import React from "react";
import * as GTM from "../../../state/utils/gtm";
import { parseFullName } from "parse-full-name";
import { LessImportantCallToActionButton } from "../less-important-call-to-action-button";
import { history } from "react-app/src/routing/History";
import { CELEBRITY_SUBSCRIBE } from "constants/paths";

function SubscribeToThisCelebrityButton({
  className,
  text,
  celebrityFullName,
  celebrityUsername,
  fontSize,
  width,
}) {
  const registerSubscribeToThisCelebrityButtonEvent = (eventName) => {
    GTM.tagManagerDataLayer(eventName + "_SUBSCRIBE_TO_THIS_CELEBRITY_BUTTON", {
      path: window.location.pathname,
      widget: "SubscribeToThisCelebrityButton",
      text,
      celebrityFullName,
      celebrityUsername,
    });
  };

  function handlerClickToLogin() {
    registerSubscribeToThisCelebrityButtonEvent("CLICK");
    const postLoginPath = CELEBRITY_SUBSCRIBE.replace(
      ":celebrity_username",
      celebrityUsername
    );
    history.push(postLoginPath);
  }

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
    <LessImportantCallToActionButton
      fontSize={fontSize}
      width={width}
      className={className}
      onClick={handlerClickToLogin}
    >
      {text}
      {celebrityFullName ? " " + displayName : ""}
    </LessImportantCallToActionButton>
  );
}

export { SubscribeToThisCelebrityButton };
