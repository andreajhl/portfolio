import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { TermsPage } from "react-app/src/components/pages/terms";

const Terms = () => {
  return (
    <>
      <CustomHead
        title="Famosos.com - Términos de servicio de usuario"
        description="Videos personalizados de tus Famosos favoritos. Reserva tu video y disfruta de experiencias únicas."
      />
      <TermsPage />
    </>
  );
};

export default Terms;
