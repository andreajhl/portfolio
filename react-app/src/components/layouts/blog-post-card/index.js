import React from "react";
import {Card,Button} from "react-bootstrap";
import limitString from "../../../utils/limitString";
import { withRouter } from 'react-router-dom';
import {BLOG_ENTRY} from '../../../routing/Paths';

import "./styles.scss";

const BlogPostCardLayout = ({ title, imageUrl, description, postUrl, idPost,history }) => {
  var plainString = description.replace(/<[^>]+>/g, '');
  return (
    <Card className="BlogPostCardLayout">
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body className="px-0" >
        <Card.Title className="font-weight-bold" style={{minHeight:'50px'}}>{title}</Card.Title>
        <Card.Text>
          <span className="d-sm-none">{limitString(plainString, 80)}</span>
          <span className="d-none d-sm-block">
            {limitString(plainString, 150)}
          </span>
        </Card.Text>
        
        <Button variant='primary' onClick={()=>{
          history.push(BLOG_ENTRY.replace(':id',idPost))
        }}>
          Leer mas...
        </Button>
      </Card.Body>
    </Card>
  );
};

export default withRouter(BlogPostCardLayout);
