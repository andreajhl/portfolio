import CustomHead from "react-app/components/common/helpers/custom-head";
import { CelebritiesSectionsLayout } from "react-app/components/layouts/celebrities-sections";

const Home = () => {
  return (
    <>
      <CustomHead />
      <CelebritiesSectionsLayout landingId={null} />
    </>
  );
};

export default Home;
