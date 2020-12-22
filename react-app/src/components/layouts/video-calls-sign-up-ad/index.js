import React from "react";
import Modal from "react-bootstrap/Modal";
import "./styles.scss";

const VideoCallsSignUpAd = ({ modalIsOpen, closeModal, nextModal }) => {
  return (
    <Modal show={modalIsOpen} className="VideoCallsSignUpAd__modal" centered>
      <button
        type="button"
        className="btn VideoCallsSignUpAd__btn"
        onClick={closeModal}
      >
        <i className="fa fa-times text-white fa-2x" />
      </button>
      <img
        src="assets/img/popup-videollamada-mobile.png"
        className="VideoCallsSignUpAd__desktop-img d-md-none"
        alt="Video Calls"
        onClick={nextModal}
      />
      <img
        src="assets/img/popup-videollamada-desktop.png"
        className="VideoCallsSignUpAd__desktop-img d-none d-md-inline"
        alt="Video Calls"
        onClick={nextModal}
      />
    </Modal>
  );
};

export default VideoCallsSignUpAd;
