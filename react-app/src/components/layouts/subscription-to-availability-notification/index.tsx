import React, { useEffect } from "react";
import { CallToActionButton } from "../call-to-action-button";
import { parseFullName } from "parse-full-name";
import { useAuth } from "lib/famosos-auth";
import { useRouter } from "next/router";
import { useLoginHandler } from "react-app/src/utils/useLoginHandler";
import { subscribeToEmailNotifications } from "react-app/src/state/ducks/subscription-celebrity-alarm/actions";
import { connect } from "react-redux";
import { subscriptionCelebrityAlarmOperations } from "../../../state/ducks/subscription-celebrity-alarm";
import styled from "styled-components";
import { Session } from "react-app/src/state/utils/session";
import { FormattedMessage } from "react-intl";
const ContainerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  background-color: #f1f8ff;
  border-radius: 10px;
  font-size: 1rem;
  /* height: 2rem; */
  padding: 10px;
  text-align: center;
`;
const SpanCTA = styled.span`
  font-size: 0.8rem;
  text-decoration: underline;
  cursor: pointer;
`;

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
  const session = new Session();
  const { isLoading, isAuthenticated } = useAuth();
  const fullNameWords = celebrityFullName.split(" ");
  const triggerLogin = useLoginHandler();
  let setTimeoutStatus = false;
  const handleListSubscriptionsAlarms = () => {
    if (
      localStorage.getItem(session.sessionName) &&
      !userSubscriptionsCelebrityAlarmsIsLoading
    ) {
      listUsersSubscriptionsAlarms();
    } else {
      setTimeoutStatus = true;
      setTimeout(() => {
        handleListSubscriptionsAlarms();
      }, 3000);
    }
  };
  useEffect(() => {
    if (!isLoading && isAuthenticated && !setTimeoutStatus) {
      handleListSubscriptionsAlarms();
    }
  }, [listUsersSubscriptionsAlarms, isAuthenticated, isLoading]);
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
    if (!isAuthenticated) {
      return true;
    }
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

  return !isAuthenticated ||
    (userSubscriptionsCelebrityAlarmsFetchCompleted &&
      !checkSubscriptionToThisCelebrity()) ? (
    <CallToActionButton
      onClick={handleSuscriptionRequest}
      fontSize={fontSize}
      width={width}
      className={className}
    >
      {text}
      {
        <FormattedMessage
          defaultMessage="Notificarme cuando esté disponible"
          description=""
        />
      }
      {celebrityFullName && showCelebrityName ? " " + displayName : ""}
    </CallToActionButton>
  ) : (
    userSubscriptionsCelebrityAlarmsFetchCompleted && (
      <ContainerDiv>
        <FormattedMessage
          defaultMessage="Te notificaremos cuando se active."
          description=""
        />{" "}
        <br />
        <SpanCTA onClick={() => handleSuscriptionRequest()}>
          <FormattedMessage
            defaultMessage="Desactivar Notificación"
            description=""
          />
        </SpanCTA>
      </ContainerDiv>
    )
  );
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
