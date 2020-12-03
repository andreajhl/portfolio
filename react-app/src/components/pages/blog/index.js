import React, { Component, Fragment } from 'react';
import { PageContainer } from '../../layouts';
import './styles.scss';
import {Container,Row, Col, Card} from 'react-bootstrap';
import BlogPostCards from '../../../components/containers/blog-post-card-details';
import MetaTags from "react-meta-tags";

const Blog = () => {
  return (
    <Fragment>
       <MetaTags>
              <title>Famosos Blog</title>
              <meta
                name="description"
                content='Agregar descripcion'
              />
            </MetaTags>
    <PageContainer>
    <Container>
      <Row>
        <Col md='8'>
          <h1 className='font-weight-bold'>Blogs</h1>
          <BlogPostCards></BlogPostCards>
          <BlogPostCards></BlogPostCards>
          <BlogPostCards></BlogPostCards>
        </Col>
      </Row>
    </Container>
  </PageContainer>
    </Fragment>
  );
}


export {Blog};
