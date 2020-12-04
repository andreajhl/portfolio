import React from "react";
import Card from "react-bootstrap/Card";
import limitString from "../../../utils/limitString";
import "./styles.scss";

const BlogPostCardLayout = () => {
  return (
    <div class='card br'>
      <div class='wrapper'>
        <div class='picture animate'></div>
        <div class='comment br animate w80'></div>
        <div class='comment br animate'></div>
        <div class='comment br animate'></div>
      </div>
    </div>
  );
};

export default BlogPostCardLayout;
