import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

const LessImportantCallToActionButton = ({
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
      className={`LessImportantCallToActionButton ${className}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

LessImportantCallToActionButton.propTypes = {
  fontSize: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func
};

LessImportantCallToActionButton.defaultProps = {
  fontSize: "1rem",
  width: "auto",
  className: "",
  children: null,
  onClick: () => {}
};

export { LessImportantCallToActionButton };
