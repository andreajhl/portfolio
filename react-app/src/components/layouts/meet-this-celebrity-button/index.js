import React from "react";
import { Button } from "react-bootstrap";

const MeetThisCelebrityButton = ({ text, celebrityFullName, width }) => {
  return (
    <div>
      <Button
        style={{
          backgroundColor: "#FFE1F0",
          color: "#FB177D",
          border: "none",
          width
        }}
        className="font-weight-bold"
      >
        {text} {celebrityFullName.split(" ")[0]}
      </Button>
    </div>
  );
};

export { MeetThisCelebrityButton as MeetThisCelebrity };
