import React from "react";
import { CallToActionButton } from "../call-to-action-button";
import { parseFullName } from "parse-full-name";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { useLoginHandler } from "react-app/src/utils/useLoginHandler";
import { subscribeToEmailNotifications } from "react-app/src/state/ducks/celebrities/actions";

type SubscriptionToAvailabilityNotificationProps = {
  className?: string;
  text: string | React.ReactNode;
  celebrityFullName: string;
  celebrityUsername: string;
  showCelebrityName: boolean;
  fontSize: string;
  width: string;
};

const SubscriptionToAvailabilityNotification = ({
  className,
  text,
  celebrityFullName,
  celebrityUsername,
  showCelebrityName,
  fontSize,
  width
}: SubscriptionToAvailabilityNotificationProps) => {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuth0();
  const fullNameWords = celebrityFullName.split(" ");
  const triggerLogin = useLoginHandler();

  const handleSuscriptionRequest = () => {
    // registerThisEventClick("CLICK");
    if (!isAuthenticated) {
      // TODO: En caso de ser login con redirect, se ha de setear en localStorage un key para realizar la suscripción al retornar
      //   localStorage.setItem(
      //     "finalRedirect",
      //     "/" + celebrityUsername + "/contratar"
      //   );
      triggerLogin();
    } else {
      // TODO: agregar celebrity_id
      // subscribeToEmailNotifications()
      console.log("Trigger dispatch");
    }
  };

  const parsedFullName = parseFullName(
    celebrityFullName,
    "all",
    true,
    false,
    true
  );
  const displayName =
    parsedFullName.first.length <= 4
      ? fullNameWords.slice(0, 2).join(" ")
      : parsedFullName.first || parsedFullName.last;

  return (
    <CallToActionButton
      onClick={handleSuscriptionRequest}
      fontSize={fontSize}
      width={width}
      className={className}
    >
      {text}
      {celebrityFullName && showCelebrityName ? " " + displayName : ""}
    </CallToActionButton>
  );
};

export default SubscriptionToAvailabilityNotification;
