import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { BlogResults } from "../../react-app/src/components/pages/blog-results";
import { defineMessages } from "react-intl";

const headData = defineMessages({
  titleBlog: { defaultMessage: "Famosos.com - Blog" },
});

const Blog = () => {
  return (
    <>
      <CustomHead title={headData.titleBlog} />
      <BlogResults />
    </>
  );
};

export default Blog;
