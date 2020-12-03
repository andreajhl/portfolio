import React, { Component, Fragment,useState, useEffect } from 'react';
import { PageContainer } from '../../layouts';
import './styles.scss';
import {Container,Row, Col} from 'react-bootstrap';
import BlogPostCards from '../../../components/containers/blog-post-card-details';
import MetaTags from "react-meta-tags";
import * as mediumApiService from "../../../state/utils/mediumApiService";


const Blog = () => {
  const [post, setPost] = useState([]);

  const asyncGetPost = async () => {
    const mediumPost = await mediumApiService.getPost();
    setPost(mediumPost);
    
  };
  useEffect(() => {
    asyncGetPost();
  }, []);

  const renderPosts = post.map(({ title, thumbnail, description, link,pubDate }) => (
    <BlogPostCards
      title={title}
      thumbnail={thumbnail}
      description={description}
      link={link}
      pubDate={pubDate}
    />
  )); 

  return (
    <Fragment>
      <MetaTags>
        <title>Famosos Blog</title>
        <meta name='description' content='Agregar descripcion' />
      </MetaTags>
      <PageContainer>
        <Container>
          <Row>
            <Col md='8'>
              <h1 className='font-weight-bold'>Blogs</h1>
              {renderPosts}
            </Col>
          </Row>
        </Container>
      </PageContainer>
    </Fragment>
  );
}


export {Blog};
