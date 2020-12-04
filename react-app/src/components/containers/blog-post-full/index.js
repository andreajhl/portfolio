import React from 'react';
import {Card, Button} from 'react-bootstrap';

const index = ({title, thumbnail, description,pubDate}) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const pubDateParse= new Date(pubDate);
  return (
    <Card className='mb-5'>
      <Card.Img variant='top' alt={title} fluid src={thumbnail} />
      <Card.Body>
        <Card.Title className='mb-4' as='h4'>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    <Card.Footer className='text-muted'>{pubDateParse.toLocaleDateString(undefined,options)}</Card.Footer>
    </Card>
  );
};

export default index;
