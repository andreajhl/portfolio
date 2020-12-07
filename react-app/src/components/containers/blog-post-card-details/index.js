import React from 'react';
import {Card, Button} from 'react-bootstrap';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import {BLOG_ENTRY} from '../../../routing/Paths';
import { withRouter } from 'react-router-dom';
function transform(node,index) {
  if(index >1){
    return null;
  }
  // do not render any <figure>  or <img> tags 
   if (node.type === 'tag' && node.name === 'p') {
    node.name = 'span';
    return convertNodeToElement(node, index, transform);
  }
  if (node.type === 'tag' && node.name === 'figure') {
    return null;
  }
  if (node.type === 'tag' && node.name === 'img') {
    return null;
  }
}
const index = ({title, thumbnail, description, link,pubDate,idPost,history}) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const pubDateParse= new Date(pubDate);
  return (
    <Card className='mb-5'>
      <Card.Img variant='top' alt={title} fluid='true' src={thumbnail} />
      <Card.Body>
        <Card.Title className='mb-5' as='h2'>{title}</Card.Title>
        <Card.Text>{ReactHtmlParser(description, {transform})}...</Card.Text>
        <Button variant='primary' onClick={()=>{
          history.push(BLOG_ENTRY.replace(':id',idPost))
        }}>
          Leer mas...
        </Button>
      </Card.Body>
    <Card.Footer className='text-muted'>{pubDateParse.toLocaleDateString(undefined,options)}</Card.Footer>
    </Card>
  );
};

export default withRouter(index);
