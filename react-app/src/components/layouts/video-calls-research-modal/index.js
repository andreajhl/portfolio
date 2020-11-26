import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import { VideoCallsResearchForm } from "../../containers/video-calls-research-form";
import apiService from "../../../state/utils/apiService";
import { VideoCallsResearchSuccessLayout } from "../video-calls-research-success";
import "./styles.scss";

const formId = "video-calls-research-form";

const VideoCallsResearchModal = ({ doNotShowVideoCallsResearchAgain }) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [doNotShowAgainIsChecked, setDoNotShowAgainIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const toggleDoNotShowAgainIsChecked = () =>
    setDoNotShowAgainIsChecked((isChecked) => !isChecked);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const closeModalFromFooter = () => {
    if (doNotShowAgainIsChecked || isSuccess) {
      doNotShowVideoCallsResearchAgain();
    }
    closeModal();
  };

  const sendVideoCallsResearch = async (body) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiService({
        method: "POST",
        path: "custom-endpoints/forms/videocall-form",
        body
      });
      if (response.data.status === "ERROR") throw response.data;
      setIsSuccess(true);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      show={modalIsOpen}
      onHide={closeModal}
      className="VideoCallsResearchModal__modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Ayudanos con estas preguntas</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isSuccess ? (
          <VideoCallsResearchForm
            formId={formId}
            onSubmit={sendVideoCallsResearch}
          />
        ) : (
          <VideoCallsResearchSuccessLayout />
        )}
        {error ? (
          <p className="text-danger text-center mb-0 mt-2">
            {error.message || error.error}
          </p>
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        {!isSuccess ? (
          <div className="w-100 text-center mb-2">
            <Form.Check
              type="checkbox"
              label="No volver a preguntar"
              id="do-not-show-again-checkbox"
              value={doNotShowAgainIsChecked}
              onChange={toggleDoNotShowAgainIsChecked}
            />
          </div>
        ) : null}
        <Button
          variant="light"
          className="w-100 mr-md-2 order-1 order-md-0 "
          onClick={closeModalFromFooter}
        >
          Cerrar
        </Button>
        {!isSuccess ? (
          <Button
            type="submit"
            form={formId}
            variant="primary"
            className="w-100 mb-2 mb-md-0"
          >
            {isLoading ? (
              <span
                className="text-white spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              <span className="text-white">Participar</span>
            )}
          </Button>
        ) : null}
      </Modal.Footer>
    </Modal>
  );
};

VideoCallsResearchModal.propTypes = {
  doNotShowVideoCallsResearchAgain: PropTypes.func.isRequired
};

export { VideoCallsResearchModal };
