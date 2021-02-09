import React from "react";
import { Card, Button } from "react-bootstrap";
import limitString from "../../../utils/limitString";
import { BLOG_ENTRY } from "../../../routing/Paths";
import { withRouter } from "react-app/components/common/routing";

const index = ({
  title,
  thumbnail,
  description,
  link,
  pubDate,
  idPost,
  history
}) => {
  const goToBlog = () => {
    history.push(BLOG_ENTRY.replace(":id", idPost));
  };
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  const pubDateParse = new Date(pubDate);
  var plainString = description.replace(/<[^>]+>/g, "");
  return (
    <Card className="mb-5">
      <Card.Img
        onClick={() => goToBlog()}
        variant="top"
        alt={title}
        fluid="true"
        src={thumbnail}
      />
      <Card.Body>
        <Card.Title onClick={() => goToBlog()} className="mb-3" as="h2">
          {title}
        </Card.Title>
        <Card.Text> {limitString(plainString, 300)}</Card.Text>
        <Button variant="info" onClick={() => goToBlog()}>
          Leer más...
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted">
        {pubDateParse.toLocaleDateString(undefined, options)}
      </Card.Footer>
    </Card>
  );
};

export default withRouter(index);
