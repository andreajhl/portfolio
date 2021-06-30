import React, { useEffect } from "react";
import { PageContainer } from "react-app/src/components/layouts/page-container";
import { FormattedMessage } from "react-intl";
import * as GTM from "../../../state/utils/gtm";

const FaqsPage = () => {
  useEffect(() => {
    GTM.tagManagerDataLayer("FAQS_PAGE_VIEW");
  }, []);

  return (
    <div className="PoliciesPage">
      <PageContainer>
        <div className="container-text">
          <h5 className="font-weight-bold">
            <FormattedMessage defaultMessage="FAQS" />
          </h5>
          <ul>
            <li>
              <span className="font-weight-bold">
                <FormattedMessage defaultMessage="¿Qué es Famosos?" />
              </span>
              <p>
                <FormattedMessage
                  defaultMessage="  Famosos es una plataforma en dónde puedes comprar video-mensajes
                de tus famosos favoritos. Un video-mensaje puede ser un mensaje
                de cumpleaños, un mensaje de felicitaciones, una mensaje de
                recupérate pronto, una pregunta al famoso entre otras. Nuestra
                misión es entregar experiencias a través de video-mensajes."
                />
              </p>
            </li>
            <li>
              <span className="font-weight-bold">
                <FormattedMessage defaultMessage="¿Cómo puedo contactar al equipo de Famosos?" />
              </span>
              <p>
                <FormattedMessage
                  defaultMessage=" Puedes escribirnos cualquier cosa a hola@famosos.com. Uno de
                nosotros se pondrá en contacto contigo lo antes posible."
                />
              </p>
            </li>
            <li>
              <span className="font-weight-bold">
                <FormattedMessage defaultMessage="¿Cómo puedo trabajar con Famosos?" />
              </span>
              <p>
                <FormattedMessage
                  defaultMessage=" Si deseas hacer parte de nuestro equipo envíanos una carta de
                motivación de por qué quieres unirte a nuestro equipo de Rock
                stars a jobs@famosos.com"
                />
              </p>
            </li>
            <li>
              <span className="font-weight-bold">
                <FormattedMessage defaultMessage="¿Dónde encuentro mas información sobre sus políticas?" />
              </span>
              <p>
                <FormattedMessage
                  defaultMessage="Puedes leer nuestra política de privacidad y nuestros términos
                de servicio para conocer más información."
                />
              </p>
            </li>
            <li>
              <span className="font-weight-bold">
                <FormattedMessage defaultMessage="¿Me pueden notificar si mi famoso favorito se une a Famosos.com?" />
              </span>
              <p>
                <FormattedMessage
                  defaultMessage=" Si! Te invitamos a crear una cuenta y escribir tus famosos
                favoritos. Cada vez que uno de tus famosos favoritos se una a
                Famosos.com vas a recibir un correo informándote. También te
                invitamos a que sugieras famosos a través de tus redes sociales."
                />
              </p>
            </li>
            <li>
              <span className="font-weight-bold">
                <FormattedMessage
                  defaultMessage="¿Cuanto cuesta un video en Famosos.com?
"
                />{" "}
              </span>
              <p>
                <FormattedMessage
                  defaultMessage="El costo del video depende de tu famoso. Nosotros somos la
                tecnología que hace posible la entrega oportuna de tu video."
                />
              </p>
            </li>
            <li>
              <span className="font-weight-bold">
                <FormattedMessage defaultMessage="¿Cómo puedo comprar un video?" />
              </span>
              <p>
                <FormattedMessage
                  defaultMessage="  Ingresa a Famosos.com, selecciona o busca a tu famoso favorito.
                Haz click en contratar a mi famoso. Estamos trabajando en
                diversos métodos de pago para que puedas adquirir tu video."
                />
              </p>
            </li>
            <li>
              <span className="font-weight-bold">
                <FormattedMessage defaultMessage="¿Puedo editar mi solicitud de video después de realizarla?" />
              </span>
              <p>
                <FormattedMessage
                  defaultMessage="Actualmente no se puede modificar la solicitud pero muy pronto
                podrás hacerlo!"
                />
              </p>
            </li>
            <li>
              <span className="font-weight-bold">
                <FormattedMessage defaultMessage="¿Cuanto tiempo tarda un video en ser grabado?" />
              </span>
              <p>
                <FormattedMessage
                  defaultMessage=" El tiempo depende de tu famoso, los videos son personalizados.
                Nosotros te mostramos el tiempo promedio que tarda tu famoso en
                grabar un video-mensaje."
                />
              </p>
            </li>
            <li>
              <span className="font-weight-bold">
                <FormattedMessage defaultMessage="¿Me garantizan que mi video va a ser grabado?" />
              </span>
              <p>
                <FormattedMessage
                  defaultMessage=" Nosotros te garantizamos que tu famoso va a ver tu solicitud si
                cumple con nuestras políticas. Nos reservamos el derecho de no
                mostrarle al famoso solicitudes que consideremos inapropiadas,
                en ese caso te devolvemos tu dinero. También te garantizamos que
                te devolvemos tu dinero si el video no es grabado antes de 10
                días."
                />
              </p>
            </li>
            <li>
              <span className="font-weight-bold">
                <FormattedMessage defaultMessage="¿El famoso puede no grabar mi solicitud?" />
              </span>
              <p>
                <FormattedMessage
                  defaultMessage="El famoso tiene libertad para aceptar o rechazar los videos.
                Nosotros somos una plataforma tecnológica de medio y no de
                resultado. Si la solicitud es rechazada, el dinero sera
                reembolsado."
                />
              </p>
            </li>
            <li>
              <span className="font-weight-bold">
                <FormattedMessage defaultMessage="¿Puedo bajar mi video?" />
              </span>
              <p>
                <FormattedMessage defaultMessage="Si! El video es tuyo! Puedes compartirlo en dónde quieras!" />
              </p>
            </li>
            <li>
              <span className="font-weight-bold">
                <FormattedMessage defaultMessage="¿Cuándo me cobran por mi video?" />
              </span>
              <p>
                <FormattedMessage
                  defaultMessage="Si pagas con tarjeta de crédito internacional, nosotros hacemos
                una autorización del cobro y únicamente hacemos el cobro real
                cuando se completa la solicitud por parte del famoso. Si
                utilizas otro método de pago debes pagar antes de que te
                realicen tu video."
                />
              </p>
            </li>
            <li>
              <span className="font-weight-bold">
                <FormattedMessage defaultMessage="¿Puedo realizar video promocionales?" />
              </span>
              <p>
                <FormattedMessage
                  defaultMessage="Actualmente no puedes realizar videos promocionales. Los videos
                que cumplen nuestras políticas son netamente video-mensajes."
                />
              </p>
            </li>
            <li>
              <span className="font-weight-bold">
                <FormattedMessage defaultMessage="¿Qué es un video promocional?" />
              </span>
              <p>
                <FormattedMessage
                  defaultMessage="Un video promocional es un video que promueve una
                compañia/organización/producto en las redes sociales o en la
                página de dicha compañia."
                />
              </p>
            </li>
            <li>
              <span className="font-weight-bold">
                <FormattedMessage defaultMessage="¿La marca de agua de Famosos se tiene que quedar?" />
              </span>
              <p>
                <FormattedMessage defaultMessage="Si, remover la marca de agua va en contra de nuestras políticas." />
              </p>
            </li>
            <li>
              <span className="font-weight-bold">
                <FormattedMessage defaultMessage="¿Qué pasa si no me gusta mi video?" />
              </span>
              <p>
                <FormattedMessage
                  defaultMessage="Consulta nuestros términos y condiciones para ver si tu caso
                aplica para un reembolso."
                />
              </p>
            </li>
            <li>
              <span className="font-weight-bold">
                <FormattedMessage defaultMessage="¿Cuanto tiempo se demora el reembolso?" />
              </span>
              <p>
                <FormattedMessage
                  defaultMessage="La solicitud de reembolso se realiza de forma automática, el
                tiempo en el que se vera reflejado en tu tarjeta depende de tu
                banco y puede llegar a ser un plazo máximo de 21 dias hábiles."
                />
              </p>
            </li>
          </ul>
        </div>
      </PageContainer>
    </div>
  );
};

export { FaqsPage };
