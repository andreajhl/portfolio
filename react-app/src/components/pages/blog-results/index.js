import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import BlogPostCards from "../../containers/blog-post-card-details";
import BlogPostCardShimmer from "../../layouts/blog-post-card-shimmer";
import { blogOperations } from "../../../state/ducks/blog";
import { NavLink, withRouter } from "react-app/src/components/common/routing";
import Link from "next/link";
import { PageContainer } from "react-app/src/components/layouts/page-container";
import { HOME_PATH } from "react-app/src/routing/Paths";

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
      <>
        <BlogPostCardShimmer />
        <BlogPostCardShimmer />
        <BlogPostCardShimmer />
      </>
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
    <PageContainer>
      <Container>
        <Row>
          <Col md="9" className="mx-auto">
            <NavLink to={HOME_PATH}>
              <Button className="mb-2" variant="primary">
                🏠 Inicio
              </Button>
            </NavLink>
            <h2 className="font-weight-bold">Blog</h2>
            {renderPosts}
          </Col>
        </Row>
      </Container>
    </PageContainer>
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
