import React, { useEffect } from "react";
import { CallToActionButton } from "../call-to-action-button";
import { parseFullName } from "parse-full-name";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { useLoginHandler } from "react-app/src/utils/useLoginHandler";
import { subscribeToEmailNotifications } from "react-app/src/state/ducks/subscription-celebrity-alarm/actions";
import { connect } from "react-redux";
import { subscriptionCelebrityAlarmOperations } from "../../../state/ducks/subscription-celebrity-alarm";

type SubscriptionToAvailabilityNotificationProps = {
  className?: string;
  text?: string | React.ReactNode;
  celebrityFullName: string;
  celebrityUsername: string;
  showCelebrityName: boolean;
  fontSize: string;
  width: string;
  celebrityId: number;
  userSubscriptionsCelebrityAlarmsFetchCompleted: boolean;
  userSubscriptionsCelebrityAlarmsData: {
    results: Array<any>;
    totalResults: number;
  };
  userSubscriptionsCelebrityAlarmsErrorData: { error: string };
  userSubscriptionsCelebrityAlarmsIsLoading: boolean;
  listUsersSubscriptionsAlarms: () => {};
};

const SubscriptionToAvailabilityNotification = ({
  className,
  text,
  celebrityFullName,
  celebrityUsername,
  showCelebrityName,
  fontSize,
  width,
  celebrityId,
  userSubscriptionsCelebrityAlarmsFetchCompleted,
  userSubscriptionsCelebrityAlarmsData,
  userSubscriptionsCelebrityAlarmsErrorData,
  userSubscriptionsCelebrityAlarmsIsLoading,
  listUsersSubscriptionsAlarms
}: SubscriptionToAvailabilityNotificationProps) => {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuth0();
  const fullNameWords = celebrityFullName.split(" ");
  const triggerLogin = useLoginHandler();
  useEffect(() => {
    listUsersSubscriptionsAlarms();
  }, [listUsersSubscriptionsAlarms]);
  const handleSuscriptionRequest = async () => {
    if (!isAuthenticated) {
      triggerLogin();
    } else {
      await subscribeToEmailNotifications(celebrityId)
        .then((res) => {
          router.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const checkSubscriptionToThisCelebrity = () => {
    const result = userSubscriptionsCelebrityAlarmsData.results.some(
      (celebrityData) => celebrityData.celebrityId === celebrityId
    );
    return result;
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

  return userSubscriptionsCelebrityAlarmsFetchCompleted ? (
    <CallToActionButton
      onClick={handleSuscriptionRequest}
      fontSize={fontSize}
      width={width}
      className={className}
    >
      {text}
      {checkSubscriptionToThisCelebrity()
        ? "No recibir notificación cuando este disponible"
        : "Notificarme cuando este disponible"}
      {celebrityFullName && showCelebrityName ? " " + displayName : ""}
    </CallToActionButton>
  ) : null;
};

const mapStateToProps = ({ subscriptionCelebrityAlarm }) => {
  return {
    userSubscriptionsCelebrityAlarmsFetchCompleted:
      subscriptionCelebrityAlarm.userSubscriptionsCelebrityAlarms.completed,
    userSubscriptionsCelebrityAlarmsData:
      subscriptionCelebrityAlarm.userSubscriptionsCelebrityAlarms.data,
    userSubscriptionsCelebrityAlarmsErrorData:
      subscriptionCelebrityAlarm.userSubscriptionsCelebrityAlarms.error_data,
    userSubscriptionsCelebrityAlarmsIsLoading:
      subscriptionCelebrityAlarm.userSubscriptionsCelebrityAlarms.loading
  };
};
const mapDispatchToProps = {
  listUsersSubscriptionsAlarms:
    subscriptionCelebrityAlarmOperations.listUsersSubscriptionsAlarms
};

const _SubscriptionToAvailabilityNotification = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionToAvailabilityNotification);

export { _SubscriptionToAvailabilityNotification as SubscriptionToAvailabilityNotification };
