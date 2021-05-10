import React from "react";
import { Card } from "react-bootstrap";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
import { injectIntl } from "react-intl";

function transform(node, index) {
  // do not render any <span> tags
  if (node.type === "tag" && node.name === "figure") {
    return null;
  }
  if (node.type === "tag" && node.name === "strong") {
    node.attribs.class = "blog__text-bold";
    node.name = "span";
    return convertNodeToElement(node, index, transform);
  }
}
const BlogPostFull = ({ title, thumbnail, content, pubDate, intl }) => {
  const optionsDate = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  const pubDateParse = new Date(pubDate);
  const htmlToParse = content;
  const JSX = ReactHtmlParser(htmlToParse, { transform });
  return (
    <Card className="mb-5">
      <Card.Img variant="top" alt={title} fluid="true" src={thumbnail} />
      <Card.Body>
        <Card.Title className="mb-4 mt-2" as="h2">
          {title}
        </Card.Title>
        <Card.Text className="container-blog">{JSX}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        {pubDateParse.toLocaleDateString(
          intl.locale || intl.defaultLocale,
          optionsDate
        )}
      </Card.Footer>
    </Card>
  );
};

export default injectIntl(BlogPostFull);
