import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { BlogResults } from "../../react-app/src/components/pages/blog-results";

const Blog = () => {
  return (
    <>
      <CustomHead title="Famosos.com - Blog" />
      <BlogResults />
    </>
  );
};

export default Blog;
