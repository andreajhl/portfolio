import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { BlogEntry } from "react-app/src/components/pages/blog-entry";
import { defineMessages } from "react-intl";

const headData = defineMessages({
  titleBlog: {
    defaultMessage: "Famosos.com - Entrada de blog"
  }
});
const Blog = () => {
  return (
    <>
      <CustomHead title={headData.titleBlog} />
      <BlogEntry />
    </>
  );
};

export default Blog;
