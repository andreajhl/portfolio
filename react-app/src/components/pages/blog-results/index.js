import React, { Component, Fragment,useState, useEffect } from 'react';
import {connect} from 'react-redux';
import { PageContainer } from '../../layouts';
import './styles.scss';
import {Container,Row, Col} from 'react-bootstrap';
import BlogPostCards from '../../containers/blog-post-card-details';
import BlogPostCardShimmer from '../../layouts/blog-post-card-shimmer';
import MetaTags from "react-meta-tags";
import * as mediumApiService from "../../../state/utils/mediumApiService";
import { blogOperations } from "../../../state/ducks/blog";


const Blog = ({blogsData,blogsDataLoading,blogsDataCompleted, saveBlogData,getBlogData}) => { 
  useEffect(() => {
    if(!blogsDataCompleted){
      getBlogData();
    }
  }, []);
  let renderPosts;

  if(blogsDataLoading){
    renderPosts =(<Fragment><BlogPostCardShimmer/><BlogPostCardShimmer/><BlogPostCardShimmer/></Fragment>);
  }
  else{   
    renderPosts = blogsData.map(({ title, thumbnail, description, link,pubDate},index) => (
      <BlogPostCards
        title={title}
        thumbnail={thumbnail}
        description={description}
        link={link}
        pubDate={pubDate}
        idPost={index}
        key={index}
      />
    )); 
  }

  return (  
    <Fragment>
      <MetaTags>
        <title>"Famosos.com - Videos personalizados de tus famosos favoritos.",</title>
        <meta name='description' content='Un blog acerca de tus famosos favoritos que forman parte de nuestra plataforma. Entérate con quien puedes conectarte' />
      </MetaTags>
      <PageContainer>
        <Container>
          <Row>
            <Col md='9' className='mx-auto'>
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
  blogsData: blog.blogsPostMediumReducer.data,
  blogsDataLoading: blog.blogsPostMediumReducer.loading,
  isBlogsDataFetch: blog.blogsPostMediumReducer.completed,
  blogsDataCompleted: blog.blogsPostMediumReducer.completed
});

const mapDispatchToProps = {
  saveBlogData: blogOperations.saveBlogData,
  getBlogData: blogOperations.getBlogData,
};

const _Blog = connect(
  mapStateToProps,mapDispatchToProps)(Blog);
export {_Blog as Blog_Results};
