import CustomHead from "react-app/components/common/helpers/custom-head";
import { BlogResults } from "../../react-app/components/pages/blog-results";

const Blog = () => {
  return (
    <>
      <CustomHead title="Famosos.com - Blog" />
      <BlogResults />
    </>
  );
};

export default Blog;
