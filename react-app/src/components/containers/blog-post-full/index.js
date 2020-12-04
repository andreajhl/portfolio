import React from 'react';
import {Card, Button} from 'react-bootstrap';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import './styles.scss';
function transform(node ) {
    // do not render any <span> tags
    if (node.type === 'tag' && node.name === 'figure') {
      return null;
    }
  }
const index = ({title, thumbnail, content,pubDate}) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const pubDateParse= new Date(pubDate);
  const htmlToParse = content;
  console.log(content)
//   const htmlParsed =  ReactHtmlParser(htmlToParse);
  return (
    <Card className='mb-5'>
      <Card.Img variant='top' alt={title} fluid src={thumbnail} />
      <Card.Body>
        <Card.Title className='mb-4 mt-2' as='h2'>{title}</Card.Title>
        <Card.Text className='container-blog'>{ReactHtmlParser(htmlToParse, {transform})}</Card.Text>
      </Card.Body>
    <Card.Footer className='text-muted'>{pubDateParse.toLocaleDateString(undefined,options)}</Card.Footer>
    </Card>
  );
};

export default index;
