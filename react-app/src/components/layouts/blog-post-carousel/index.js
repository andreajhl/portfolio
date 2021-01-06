import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import * as CarouselWithButtons from "../../layouts/carousel-with-buttons";
import * as mediumApiService from "../../../state/utils/mediumApiService";
import BlogPostCardLayout from "../../layouts/blog-post-card";
import { blogOperations } from "../../../state/ducks/blog";

const BlogPostCarousel = ({
  blogsData,
  isBlogsDataFetch,
  blogsDataLoading,
  saveBlogData,
  getBlogData
}) => {
  useEffect(() => {
    if (!isBlogsDataFetch) {
      getBlogData();
    }
  }, []);

  return isBlogsDataFetch && blogsData.length > 0 ? (
    <CarouselWithButtons.Container buttonsStyles={{ height: "378px", top: 0 }}>
      <CarouselWithButtons.List>
        <ul>
          {blogsData.map(({ title, thumbnail, description, link }, index) => (
            <li style={{ marginRight: "12px" }} key={index}>
              <BlogPostCardLayout
                title={title}
                imageUrl={thumbnail}
                description={description}
                postUrl={link}
                idPost={index}
              />
            </li>
          ))}
        </ul>
      </CarouselWithButtons.List>
    </CarouselWithButtons.Container>
  ) : null;
};

const mapStateToProps = ({ blog }) => ({
  blogsData: blog.blogsPostMediumReducer.data,
  isBlogsDataFetch: blog.blogsPostMediumReducer.completed,
  blogsDataLoading: blog.blogsPostMediumReducer.loading
});

const mapDispatchToProps = {
  saveBlogData: blogOperations.saveBlogData,
  getBlogData: blogOperations.getBlogData
};

const _BlogPostCarousel = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogPostCarousel);
export { _BlogPostCarousel as BlogPostCarousel };
