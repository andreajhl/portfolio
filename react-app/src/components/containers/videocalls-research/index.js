import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { HIDE_VIDEO_CALLS_RESEARCH } from "../../../constants/localStorageKeys";
import { VideoCallsResearchModal } from "../../layouts/video-calls-research-modal";
import { getToken } from "../../../state/ducks/session/actions";
import { Session } from "../../../state/utils/session";
import { connect } from "react-redux";

const VideoCallsResearch = ({ getToken, userDataIsReady }) => {
  const userIsLogged = new Session().getSession();
  const hideVideoCallsResearch = localStorage.getItem(
    HIDE_VIDEO_CALLS_RESEARCH
  );

  const hideVideoCallsResearchInThisSession = sessionStorage.getItem(
    HIDE_VIDEO_CALLS_RESEARCH
  );

  const doNotShowVideoCallsResearchAgain = () => {
    localStorage.setItem(HIDE_VIDEO_CALLS_RESEARCH, true);
  };

  const doNotShowVideoCallsResearchAgainInThisSession = () =>
    sessionStorage.setItem(HIDE_VIDEO_CALLS_RESEARCH, true);

  useEffect(() => {
    if (userIsLogged && !hideVideoCallsResearch) {
      getToken();
    }
  }, []);

  const shouldShowModal =
    !hideVideoCallsResearch && !hideVideoCallsResearchInThisSession;

  if (userIsLogged) {
    return shouldShowModal && userDataIsReady ? (
      <VideoCallsResearchModal
        doNotShowVideoCallsResearchAgain={doNotShowVideoCallsResearchAgain}
        doNotShowVideoCallsResearchAgainInThisSession={
          doNotShowVideoCallsResearchAgainInThisSession
        }
      />
    ) : null;
  }

  return shouldShowModal ? (
    <VideoCallsResearchModal
      doNotShowVideoCallsResearchAgain={doNotShowVideoCallsResearchAgain}
      doNotShowVideoCallsResearchAgainInThisSession={
        doNotShowVideoCallsResearchAgainInThisSession
      }
    />
  ) : null;
};

const mapStateToProps = ({ session }) => ({
  userDataIsReady: session.getSessionReducer.completed
});

const mapDispatchToProps = { getToken };

const _VideoCallsResearch = connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoCallsResearch);

export { _VideoCallsResearch as VideoCallsResearch };
