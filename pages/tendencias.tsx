import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { TrendingPage } from "react-app/src/components/pages/trending";
import { defineMessages } from "react-intl";

const headData = defineMessages({
  titleTrending: { defaultMessage: "Famosos.com - Tendencias" },
  descriptionTrending: { defaultMessage: "Famosos.com - Tendencias" },
});

const Trending = () => {
  return (
    <>
      <CustomHead
        title={headData.titleTrending}
        description={headData.descriptionTrending}
      />
      <TrendingPage />
    </>
  );
};

export default Trending;
