import React from "react";
import Card from "react-bootstrap/Card";
import limitString from "../../../utils/limitString";
import "./styles.scss";

const BlogPostCardLayout = () => {
  return (
    <div className='card br'>
      <div className='wrapper'>
        <div className='picture animate'></div>
        <div className='comment br animate w80'></div>
        <div className='comment br animate'></div>
        <div className='comment br animate'></div>
      </div>
    </div>
  );
};

export default BlogPostCardLayout;
