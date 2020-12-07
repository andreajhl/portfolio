import React from "react";
import {Card,Button} from "react-bootstrap";
import limitString from "../../../utils/limitString";
import { withRouter } from 'react-router-dom';
import {BLOG_ENTRY} from '../../../routing/Paths';

import "./styles.scss";

const BlogPostCardLayout = ({ title, imageUrl, description, postUrl, idPost,history }) => {
  var plainString = description.replace(/<[^>]+>/g, '');
  const goToBlog= ()=>{
    history.push(BLOG_ENTRY.replace(':id',idPost))
  }
  return (
    <Card className="BlogPostCardLayout">
      <Card.Img variant="top" onClick={()=> goToBlog()} src={imageUrl} />
      <Card.Body className="px-0" >
        <Card.Title className='BlogPostCardLayout__Title' onClick={()=> goToBlog()} className="font-weight-bold" style={{minHeight:'50px'}}>{limitString(title, 70)}</Card.Title>
        <Card.Text>
          <span className="d-sm-none">{limitString(plainString, 80)}</span>
          <span className="d-none d-sm-block">
            {limitString(plainString, 150)}
          </span>
        </Card.Text>
        
        <Button variant='primary' onClick={()=> goToBlog()}>
          Leer mas...
        </Button>
      </Card.Body>
    </Card>
  );
};

export default withRouter(BlogPostCardLayout);
