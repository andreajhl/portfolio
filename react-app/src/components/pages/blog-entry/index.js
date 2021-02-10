import React from "react";
import { connect } from "react-redux";
import { PageContainer } from "../../layouts/page-container";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Redirect, withRouter } from "react-app/src/components/common/routing";
import { BLOG, HOME_PATH } from "../../../routing/Paths";
import BlogPost from "../../containers/blog-post-full";

const BlogEntry = ({ blogsData, router }) => {
  let redirect;
  let blog;

  const entryId = router.query.entry_id;

  if (typeof blogsData[entryId] === "undefined") {
    redirect = <Redirect to={BLOG}></Redirect>;
  } else {
    const blogSelected = blogsData[entryId];
    blog = (
      <BlogPost
        title={blogSelected.title}
        thumbnail={blogSelected.thumbnail}
        content={blogSelected.content}
        pubDate={blogSelected.pubDate}
      />
    );
  }
  return (
    <>
      {redirect}
      <PageContainer>
        <Container>
          <Row className="justify-content-evenly">
            <Button
              sm
              className="mb-3 ml-5"
              onClick={() => router.push(HOME_PATH)}
            >
              🏠 Inicio
            </Button>
            <Button sm className="mb-3 ml-5" onClick={() => router.push(BLOG)}>
              📰 Ver más noticias
            </Button>
          </Row>
          <Row>
            <Col className="mx-auto" md="8">
              {blog}
            </Col>
          </Row>
        </Container>
      </PageContainer>
    </>
  );
};

const mapStateToProps = ({ blog }) => ({
  blogsData: blog.blogsPostMediumReducer.data
});

const _BlogEntry = connect(mapStateToProps)(withRouter(BlogEntry));

export { _BlogEntry as BlogEntry };
