import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { FaqsPage } from "react-app/src/components/pages/faqs";
import { defineMessages } from "react-intl";

const headData = defineMessages({
  titleFaqs: {
    defaultMessage: "Famosos.com - Preguntas frecuentes",
  },
  descriptionFaqs: {
    defaultMessage:
      "¿Qué es Famosos.com? Famosos es una plataforma en dónde puedes comprar video-mensajes de tus famosos favoritos. ¿Cómo puedo comprar un video?",
  },
});
const Faqs = () => {
  return (
    <>
      <CustomHead
        title={headData.titleFaqs}
        description={headData.descriptionFaqs}
      />
      <FaqsPage />
    </>
  );
};

export default Faqs;
