import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { TrendingPage } from "react-app/src/components/pages/trending";

const Trending = () => {
  return (
    <>
      <CustomHead
        title="Famosos.com - Tendencias"
        description="Estos son los videos que están siendo tendencia en Famosos.com. Reserva tu video y disfruta de experiencias únicas."
      />
      <TrendingPage />
    </>
  );
};

export default Trending;
