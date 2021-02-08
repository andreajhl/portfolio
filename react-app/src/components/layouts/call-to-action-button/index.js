import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

const CallToActionButton = ({
  fontSize,
  width,
  className,
  children,
  onClick
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
  onClick: PropTypes.func
};

CallToActionButton.defaultProps = {
  fontSize: "1rem",
  width: "auto",
  className: "",
  children: null,
  onClick: () => {}
};

export { CallToActionButton };
