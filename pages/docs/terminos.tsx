import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { TermsPage } from "react-app/src/components/pages/terms";
import { defineMessages } from "react-intl";

const headData = defineMessages({
  titleTerms: {
    defaultMessage: "Famosos.com - Términos de servicio de usuario"
  },
  descriptionTerms: {
    defaultMessage:
      "Videos personalizados de tus Famosos favoritos. Reserva tu video y disfruta de experiencias únicas."
  }
});
const Terms = () => {
  return (
    <>
      <CustomHead
        title={headData.titleTerms}
        description={headData.descriptionTerms}
      />
      <TermsPage />
    </>
  );
};

export default Terms;
