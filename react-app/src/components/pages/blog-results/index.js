import React, { Component, Fragment,useState, useEffect } from 'react';
import {connect} from 'react-redux';
import { PageContainer } from '../../layouts';
import './styles.scss';
import {Container,Row, Col} from 'react-bootstrap';
import BlogPostCards from '../../containers/blog-post-card-details';
import MetaTags from "react-meta-tags";
import * as mediumApiService from "../../../state/utils/mediumApiService";
import { blogOperations } from "../../../state/ducks/blog";


const Blog = ({blogsData, saveBlogData}) => {
  const [post, setPost] = useState([]);
  const asyncGetPost = async () => {
    const mediumPost = await mediumApiService.getPost();
    saveBlogData(mediumPost)
    setPost(mediumPost);
  };
  useEffect(() => {
    asyncGetPost();
  }, []);

  const renderPosts = post.map(({ title, thumbnail, description, link,pubDate},index) => (
    <BlogPostCards
      title={title}
      thumbnail={thumbnail}
      description={description}
      link={link}
      pubDate={pubDate}
      idPost={index}
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
            <Col md='8' className='mx-auto'>
              <h1 className='font-weight-bold'>Blogs</h1>
              {renderPosts}
            </Col>
          </Row>
        </Container>
      </PageContainer>
    </Fragment>
  );
}

// mapStateToProps
const mapStateToProps = ({
  blog,
}) => ({
  blogsData: blog.blogsPostMediumReducer.data
});

const mapDispatchToProps = {
  saveBlogData: blogOperations.saveBlogData,
};

const _Blog = connect(
  mapStateToProps,mapDispatchToProps)(Blog);
export {_Blog as Blog_Results};
