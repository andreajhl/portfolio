import CustomHead from "react-app/components/common/helpers/custom-head";
import { FaqsPage } from "react-app/components/pages/faqs";

const Faqs = () => {
  return (
    <>
      <CustomHead
        title="Famosos.com - Preguntas frecuentes"
        description="¿Qué es Famosos.com? Famosos es una plataforma en dónde puedes comprar video-mensajes de tus famosos favoritos. ¿Cómo puedo comprar un video?"
      />
      <FaqsPage />
    </>
  );
};

export default Faqs;
