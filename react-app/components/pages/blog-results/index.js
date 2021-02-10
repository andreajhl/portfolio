import React, { Component, Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import BlogPostCards from "../../containers/blog-post-card-details";
import BlogPostCardShimmer from "../../layouts/blog-post-card-shimmer";
import { blogOperations } from "../../../state/ducks/blog";
import { withRouter } from "react-app/components/common/routing";
import Link from "next/link";
const BlogResults = ({
  blogsData,
  blogsDataLoading,
  blogsDataCompleted,
  getBlogData
}) => {
  useEffect(() => {
    if (!blogsDataCompleted) {
      getBlogData();
    }
  }, []);
  let renderPosts;

  if (blogsDataLoading) {
    renderPosts = (
      <Fragment>
        <BlogPostCardShimmer />
        <BlogPostCardShimmer />
        <BlogPostCardShimmer />
      </Fragment>
    );
  } else {
    renderPosts = blogsData.map(
      ({ title, thumbnail, description, link, pubDate }, index) => (
        <BlogPostCards
          title={title}
          thumbnail={thumbnail}
          description={description}
          link={link}
          pubDate={pubDate}
          idPost={index}
          key={index}
        />
      )
    );
  }

  return (
    <Fragment>
      <Container>
        <Row>
          <Col md="9" className="mx-auto">
            <Link href="/">
              <a>
                <Button className="mb-2" variant="primary">
                  🏠 Inicio
                </Button>
              </a>
            </Link>
            <h2 className="font-weight-bold">Blogs</h2>
            {renderPosts}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

// mapStateToProps
const mapStateToProps = ({ blog }) => ({
  blogsData: blog.blogsPostMediumReducer.data,
  blogsDataLoading: blog.blogsPostMediumReducer.loading,
  isBlogsDataFetch: blog.blogsPostMediumReducer.completed,
  blogsDataCompleted: blog.blogsPostMediumReducer.completed
});

const mapDispatchToProps = {
  getBlogData: blogOperations.getBlogData
};

const _BlogResults = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BlogResults));
export { _BlogResults as BlogResults };
