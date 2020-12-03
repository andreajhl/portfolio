import React from 'react';
import {Card, Button} from 'react-bootstrap';
const index = () => {
  return (
    <Card className='mb-5'>
      <Card.Img variant='top' height='300' src='https://cdn-images-1.medium.com/max/1024/1*YerBirk-i5j6rdXX9dAmEA.png' />
      <Card.Body>
        <Card.Title as='h2'>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant='primary'>Go somewhere</Button>
      </Card.Body>
      <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>
  );
};

export default index;
