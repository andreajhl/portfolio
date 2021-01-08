import React, { Component, Fragment,useState, useEffect } from 'react';
import {connect} from 'react-redux';
import { PageContainer } from '../../layouts';
// import './styles.scss';
import {Container,Row, Col, Button} from 'react-bootstrap';
import {Redirect, withRouter} from 'react-router-dom';
import {BLOG,HOME_PATH} from '../../../routing/Paths';

import BlogPost from '../../containers/blog-post-full';
import MetaTags from "react-meta-tags";


const Blog_entry = ({blogsData,match,history}) => {
    let redirect;
    let blog;
    
    if (typeof(blogsData[match.params.id]) === 'undefined') {
      redirect = <Redirect to={BLOG}></Redirect>;
    }
    else{
        const blogSelected = blogsData[match.params.id];
        blog= (<BlogPost
        title={blogSelected.title}
        thumbnail={blogSelected.thumbnail}
        content={blogSelected.content}
        pubDate={blogSelected.pubDate}
        />)
    }
    return (
      <Fragment>
        {redirect}
        <MetaTags>
          <title>Famosos Blog</title>
          <meta name='description' content='Agregar descripcion' />
        </MetaTags>
        <PageContainer>
          <Container>
            <Row className='justify-content-evenly'>
                <Button sm className='mb-3 ml-5' onClick={()=> history.push(HOME_PATH)}>🏠 Inicio</Button>
                <Button sm className='mb-3 ml-5' onClick={()=> history.push(BLOG)}>📰 Ver más noticias</Button>
            </Row>
            <Row>
              <Col className='mx-auto' md='8'>{blog}</Col>
            </Row>
          </Container>
        </PageContainer>
      </Fragment>
    );
}

// mapStateToProps
const mapStateToProps = ({ blog }) => ({
  blogsData: blog.blogsPostMediumReducer.data,
});

const _Blog = withRouter(connect(mapStateToProps)(Blog_entry));
export { _Blog as Blog_Entry };
