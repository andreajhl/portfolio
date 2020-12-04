import React from 'react';
import {Card, Button} from 'react-bootstrap';
import {BLOG_ENTRY} from '../../../routing/Paths';
import { withRouter } from 'react-router-dom';

const index = ({title, thumbnail, description, link,pubDate,idPost,history}) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const pubDateParse= new Date(pubDate);
  console.log(pubDateParse.toDateString())
  return (
    <Card className='mb-5'>
      <Card.Img variant='top' alt={title} fluid src={thumbnail} />
      <Card.Body>
        <Card.Title className='mb-4' as='h4'>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
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
