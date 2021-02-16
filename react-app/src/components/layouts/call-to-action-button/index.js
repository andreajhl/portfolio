import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "./styles.scss";

const CallToActionButton = ({
  fontSize,
  width,
  className,
  children,
  onClick,
  onHover
}) => {
  return (
    <Button
      style={{
        fontSize,
        width
      }}
      className={`CallToActionButton ${className}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

CallToActionButton.propTypes = {
  fontSize: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  onHover: PropTypes.func
};

CallToActionButton.defaultProps = {
  fontSize: "1rem",
  width: "auto",
  className: "",
  children: null,
  onClick: () => {},
  onClick: () => {}
};

export { CallToActionButton };
