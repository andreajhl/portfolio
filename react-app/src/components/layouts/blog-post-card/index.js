import React from "react";
import Card from "react-bootstrap/Card";
import limitString from "../../../utils/limitString";
import "./styles.scss";

const BlogPostCardLayout = ({ title, imageUrl, description, postUrl }) => {
  return (
    <Card className="BlogPostCardLayout">
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body className="px-0">
        <Card.Title className="font-weight-bold">{title}</Card.Title>
        <Card.Text>
          <span className="d-sm-none">{limitString(description, 80)}</span>
          <span className="d-none d-sm-block">
            {limitString(description, 150)}
          </span>
        </Card.Text>
        <Card.Link href={postUrl} target="_blank">
          Leer más
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default BlogPostCardLayout;
