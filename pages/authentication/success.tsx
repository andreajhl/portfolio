import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { AuthSuccess } from "../../react-app/src/components/pages/auth-success";

const Blog = () => {
  return (
    <>
      <CustomHead title="Famosos.com - Blog" />
      <AuthSuccess />
    </>
  );
};

export default Blog;
