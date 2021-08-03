import React, { Component } from "react";
import { PageContainer } from "../../layouts/page-container";
import * as GTM from "../../../state/utils/gtm";
import { FormattedMessage } from "react-intl";
import { injectIntl } from "react-intl";
import { transformUserNavigatorLanguageToISO2Code } from "react-app/src/utils/transformUserNavigatorLanguageToISO2Code";

class PoliciesPage extends Component {
  componentDidMount() {
    GTM.tagManagerDataLayer("POLICIES_PAGE_VIEW", this.props.match);
  }

  render() {
    const { locale } = this.props.intl;
    const userLang = transformUserNavigatorLanguageToISO2Code(locale);
    if (userLang === "en") {
      return (
        <div className="PoliciesPage">
          <PageContainer>
            <div className="container-text">
              <h5> PRIVACY POLICY FAMOSOS INC, FIRST (1st.) OCTOBER 2019. </h5>
              <p>
                We are Famous, Inc. , located at 10800 Biscayne Blvd, Suite 560,
                Miami, Florida, 33161.
              </p>
              <p>
                {" "}
                For your timely and complete information, we allow ourselves to
                accompany the Privacy Policy of Famous Inc, hereinafter the
                Policy.
              </p>
              <p>
                {" "}
                The importance of this Policy lies in the fact that to provide
                you with our services through our Site, it is necessary that you
                provide us with your personal information, then it is necessary
                that you know, accept and/or reject what we do with it. It is
                also important for us to know who you are and whether your
                interests are compatible with our
              </p>
              <p>
                This Policy is subject to permanent changes, so we reserve the
                right to update, modify and publish it chronologically, to make
                it known to you, for the purposes outlined above
              </p>
              <p>
                The Policy relates specifically to the way we request, store,
                analyze, guard, protect, use and share your personal information
                on our servers, on the occasion of linking to our page
              </p>
              <p>
                It is important to note that if you make the decision to link to
                our site, we understand that you have unconditionally and
                irrevocably read and accepted this Policy as well as the
                so-called Terms of Use which are also available on our page for
                your knowledge, acceptance or rejection{" "}
              </p>
              <p>
                The personal information to which we have access, is that
                related to your city of origin, country, IP address, the type of
                equipment you use, your email, address, phone number,
                registration date, user name, personal key, bank account,
                electronic payments, bank cards, user number on Instagram when
                you access our page via this, type of material requested, kind
                of videos uploaded, downloaded, consulted, photos, emails,
                letters, texts, audios, social media traffic, platform searches,
                purchases of goods and/or services made, purchase history, trade
                preferences, cookies, hardware, software, among other things,
                information is required beforehand, for you to link to our page
                and/or create an account on it, for the purpose of providing you
                with a better service{" "}
              </p>
              <p>
                The purpose of the above is to provide a better service, so we
                will be able to offer you better services, technical support and
                assistance, according to the interests that you have expressed
                to us, in relation to advertising topics, raffles, sweepstakes,
                contests and promotions, provision of certain specific content,
                according to your market preferences, to customize your
                experience on our platform, as well as to comply with legal
                requirements, business practices, back-up operations and for
                other reasons that may be of interest to you, as well as ours{" "}
              </p>{" "}
              <p>
                {" "}
                This information will only be disclosed to third parties,
                including other countries, when required by us and/or by our
                vendors, for the fulfillment of the interests that you have
                expressed to us, Therefore, you must also consult with them the
                type of Privacy Policy that they themselves apply and for which
                we do not respond, nor can we do so. In relation to the
                disclosure of information to other countries, we have taken
                relevant technological measures to ensure that your personal
                information enjoys the same protection as contained in this
                Policy{" "}
              </p>
              <p>
                This information will also be disclosed to third parties, when
                you expressly request it, for which you must send the respective
                request, in the terms indicated in this Policy{" "}
              </p>
              <p>
                You may also object to us processing your personal information,
                based on your legitimate interest and for particular reasons.
                Likewise, you can rank the parameters and/or scope of our
                marketing to you, and even request that promotional material not
                be sent to you, at any time, through the methods contained in
                this Policy{" "}
              </p>
              <p>
                For the exercise of the rights recognized in this Policy, you
                must formulate the respective requirement, through the tools
                provided here, and the mechanisms established for that purpose
                in it. It is important to note that your right to submit
                complaints and claims to any competent authority for the
                protection and supervision of personal information in the
                country where you are located, remains current{" "}
              </p>{" "}
              <p>
                {" "}
                Our page allows you to interact with other pages, platforms,
                social networks, such as Facebook, Instagram and Twitter, so
                some of your personal information will be shared with third
                parties, for the purpose of allowing the respective
                communication{" "}
              </p>
              <p>
                Each visit to our site allows you to track your activities on
                the network, through technologies known as web beacons, embedded
                scripts, location data services, which may provide us with more
                information about your browsing preferences stored on your
                computer and record cookies on your computer, or even copy codes
                from your computer, or your computer and employ various
                mechanisms related to your navigation preferences{" "}
              </p>{" "}
              <p>
                {" "}
                This technology allows to know, for example, date and time of
                your visit to our platform, areas visits in your navigation,
                Links to which you have accessed, Websites, propaganda visited,
                modality under which you have accessed, IP address, mobile
                number, information from your computer, such as your location,
                Computer Connection Type, Search Engine, Version, Operating
                System, Platform, Message Query Information{" "}
              </p>{" "}
              <p>
                {" "}
                If you are a customer providing content to our platform, we will
                process such information, in order to massively offer videos and
                other material that is uploaded and/or uploaded on our site.
                Likewise, we will process all the information that is necessary
                for you to receive direct payments from third parties, as
                indicated in the Terms of Use contained in our platform{" "}
              </p>{" "}
              <p>
                {" "}
                From elsewhere, the information related to the payments made to
                them, will also be kept in accordance with our Policy, in order
                to ensure the correct processing of the same, effectiveness,
                efficiency, safety, transparency and traceability, and in the
                event of any related observations. Likewise, the information
                related to the means and payment mechanisms chosen by us is
                subject to the same Policy as that of the respective paying
                entities, that may be completely different and therefore need to
                be reviewed by you{" "}
              </p>{" "}
              <p>
                {" "}
                We may sometimes share your personal information with third
                parties, in order to serve your browsing interests. However, we
                will never share your personal information to be used for
                purposes other than those mentioned here, without your consent,
                which will be requested if necessary. It is necessary to
                remember that the handling of your personal information is based
                on your acceptance and authorization, in the terms expressed in
                our Policy, and that you always have the right to withdraw your
                consent, at any time, through the tools and procedures set out
                on our page{" "}
              </p>{" "}
              <p>
                {" "}
                In relation to children under thirteen (13) years of age, our
                Policy determines that we do not keep any personal information.
                If you, as a parent or attendant, notice that for some reason we
                do so, please contact us immediately to make the necessary
                adjustments: at 10800 Biscayne Blvd, Suite 560, Miami, Florida,
                33161. The above is because our site is designed for widespread
                use, and it is possible that eventually and involuntarily, we
                have been able to collect such information
              </p>
              <p>
                We will disclose personal information about you, even against
                your will, when required to do so by law, justice or any
                competent authority in any jurisdiction, in the course of a
                fraud investigation, violation of the intellectual, copyright or
                literary property rights related to you and that may harm our
                interests, always in the exercise of our legal rights and in the
                event of possible accusations of hacking, breach of the Policy,
                of the Terms of Use or Services for legal or governmental
                reasons{" "}
              </p>
              <p>
                We will also disclose, transfer, assign your personal
                information in the event of a merger, acquisition,
                reorganization, agreement, bankruptcy and/or any other
                transaction involving Celebrity Inc{" "}
              </p>
              <p>
                If you expressly request it, we may transform your personal
                information into another technological modality that prevents
                identifying you, such as converting your email into an
                alphanumeric code, which would no longer be your personal
                information{" "}
              </p>
              <p>
                If you want to access, review, correct, edit or update your own
                personal information, simply access your account on the page, or
                through the app on your mobile and make the changes you want to
                make{" "}
              </p>
              <p>
                When you request us to delete your personal information, we will
                take concrete actions to remove it from our active databases,
                but we will retain the original information, in accordance with
                our Policy, for eventual cases of dispute, compliance with legal
                regulations, recording preservation, back up. In any case, we
                will never retain your information longer than is necessary to
                comply with our Policy{" "}
              </p>
              <p>
                If you are a visitor to our site and are located outside the
                United States of America, the personal information you provide
                will be collected, processed, retained, transferred to our
                servers in that country, or others where we or our vendors
                conduct their business operation{" "}
              </p>{" "}
              <p>
                {" "}
                No matter where the information is located, we take reasonable
                steps to protect the privacy of your rights, in the terms of
                this policy{" "}
              </p>
              <p>
                We take reasonable security measures to protect the information
                submitted to us, according to the technological facilities
                existing to date{" "}
              </p>
              <p>
                {" "}
                Although no system of transmission and/or administration of data
                through the global internet network is completely secure, we
                have taken reasonable technological security measures to protect
                the information held by us, which must be known and taken into
                account by you whenever you use our site, so that such knowledge
                is under your responsibility{" "}
              </p>{" "}
              <p>
                {" "}
                Accordingly, if you have any security related questions on our
                page, please contact us, through the respective communication
                channels provided in our Policy{" "}
              </p>{" "}
              <p>
                {" "}
                If you wish to deactivate your account, Contact us for this
                purpose at 10800 Biscayne Blvd, Suite 560, Miami, Florida,
                33161, USA{" "}
              </p>{" "}
              <p>
                {" "}
                If you want to work with us, or for us as an official and/or
                work under the modality of partners, you can apply by contacting
                us through the channels and people informed in this Policy, so
                that you are informed about our Policy in this regard. We may
                share personal information about you, for the exclusive purposes
                mentioned in this paragraph, or to improve our selection
                processes, or to protect us from work claims
              </p>
              <p>
                Again we reiterate that if you make the decision to link to our
                site, we understand that you have unconditionally and
                irrevocably read and accepted this Policy as well as the
                so-called Terms of Use which are also available on our page for
                your knowledge, acceptance or rejection{" "}
              </p>{" "}
              <p>
                {" "}
                However, if you do not wish to receive any information from us
                again, but without withdrawing from our site, through the
                channels and people informed in this Policy and you will only
                receive information from us related to the payment status of
                your account{" "}
              </p>
              <p>
                If you require more information about this Policy, you can
                contact us at 10800 Biscayne Blvd, Suite 560, Miami, Florida,
                33161.{" "}
              </p>
            </div>
          </PageContainer>
        </div>
      );
    }
    return (
      <div className="PoliciesPage">
        <PageContainer>
          <div className="container-text">
            <h5>
              {`POLÍTICA DE PRIVACIDAD “FAMOSOS INC”, PRIMERO (1º.) DE OCTUBRE DE
              2019.`}
            </h5>
            <p>
              {`Somos “Famosos, Inc.”, ubicados en 10800 Biscayne Blvd, Suite 560,
              Miami, Florida, 33161.`}
            </p>
            <p>
              {`Para su oportuna y completa información, nos permitimos acompañar
              la “Política de Privacidad de “Famosos Inc”, en adelante la
              “Política”.`}
            </p>
            <p>
              {`La importancia de esta “Política” radica en el hecho que para
              prestarle nuestros servicios a través de nuestra Página, es
              necesario que usted nos entregue información personal suya, luego
              es necesario que usted conozca, acepte y/o rechace lo que hacemos
              con la misma. Asimismo, para nosotros también es importante saber
              quién es usted y si sus intereses son compatibles con los nuestros`}
            </p>
            <p>
              {`Esta “Política” está sujeta a cambios permanentes, por lo cual nos
              reservamos el derecho de actualizarla, modificarla y publicarla
              cronológicamente, para que sea conocida por usted, para los
              propósitos anteriormente señalados`}
            </p>
            <p>
              {`La “Política” se relaciona específicamente, con la forma en que
              solicitamos, almacenamos, analizamos, custodiamos, protegemos,
              utilizamos y compartimos su información personal en nuestros
              servidores, con ocasión de su vinculación a nuestra página`}
            </p>
            <p>
              {`Es importante tener en cuenta que si usted toma la decisión de
              vincularse a nuestra página, nosotros entendemos que usted ha
              leído y aceptado en forma incondicional e irrevocable esta
              “Política”, así como los llamados “Términos de Uso” que también se
              encuentran disponibles en nuestra página para su conocimiento,
              aceptación o rechazo`}
            </p>
            <p>
              {`La información personal a la cual tenemos acceso, es la
              relacionada con su ciudad de origen, país, “Dirección IP”, el tipo
              de equipo que usted utiliza, su correo electrónico, domicilio,
              número telefónico, fecha de registro, nombre de usuario, clave
              personal, cuenta bancaria, pagos electrónicos, tarjetas bancarias,
              número de usuario en Instagram cuando accede a nuestra página por
              esta vía, tipo de material solicitado, clase de videos subidos,
              bajados, consultados, fotos, correos electrónicos, cartas, textos,
              audios, tráfico en redes sociales, búsquedas en plataformas,
              compras de bienes y/o servicios realizadas, historial de compras,
              preferencias comerciales, cookies, hardware, software, entre otros
              aspectos, información esta que es requerida previamente, para que
              usted se vincule a nuestra página y/o crea una cuenta en la misma,
              con el propósito de prestarle un mejor servicio`}
            </p>
            <p>
              {`El propósito de lo anterior consiste en brindarle un mejor
              servicio, pues al conocer la anterior información, estaremos en
              capacidad de ofrecerle mejores servicios, soporte técnico y
              asistencia, de acuerdo con los intereses que usted nos haya
              manifestado, en relación con temas publicitarios, rifas, sorteos,
              concursos y promociones, suministro de determinados contenidos
              específicos, de acuerdo con sus preferencias de mercado, para
              personalizar su experiencia en nuestra plataforma, así como para
              cumplir con requerimientos legales, prácticas comerciales,
              operaciones de back-up y por otras razones que puedan ser de su
              interés, así como del nuestro`}
            </p>
            <p>
              {`Esta información sólo será revelada a terceras personas, incluso a
              otros países, cuando sea requerido por nosotros y/o por nuestros
              vendedores, para el cumplimiento de los intereses que usted nos
              haya manifestado, por lo cual usted también deberá consultar con
              ellos el tipo de Política de Privacidad que ellos a su vez aplican
              y respecto de las cuales no respondemos, ni podemos hacerlo. En
              relación con la revelación de información a otros países, hemos
              tomados medidas tecnológicas pertinentes para que su información
              personal goce de la misma protección contenida en esta “Política”`}
            </p>
            <p>
              {`Esta información también será revelada a terceras personas, cuando
              usted lo solicite en forma expresa, para lo cual usted deberá
              enviar el respectivo requerimiento, en los términos indicados en
              esta “Política”`}
            </p>
            <p>
              {`Usted también puede oponerse a que nosotros procesemos de su
              información personal, basado en su legítimo interés y por razones
              particulares. Igualmente, usted puede graduar los parámetros y/o
              alcance de nuestro mercadeo hacia usted, e incluso solicitar que
              no le sea enviado material promocional, en cualquier momento, a
              través de los métodos contenidos en esta “Política”`}
            </p>
            <p>
              {`Para el ejercicio de los derechos reconocidos en esta “Política”,
              usted debe formular el respectivo requerimiento, a través de las
              herramientas aquí previstas, y de los mecanismos establecidos para
              tal efecto en la misma. Es importante que tenga en cuenta, que su
              derecho de enviar peticiones quejas y reclamos ante cualquier
              autoridad competente de protección y supervisión de información
              personal en el país donde usted se encuentre, permanece vigente`}
            </p>
            <p>
              {`Nuestra página le permite interactuar con otras páginas,
              plataformas, redes sociales, como Facebook, Instagram y Twitter,
              por lo cual, alguna de su información personal será compartida con
              terceras personas, para el efecto de permitir la respectiva
              comunicación`}
            </p>
            <p>
              {`Cada visita a nuestra página permite rastrear sus actividades en
              la red, a través de tecnologías conocidas como “web beacons”,
              “embedded scripts”, “location data services”, las cuales podrán
              brindarnos mayor información acerca de sus preferencias en la
              navegación archivadas en su equipo y grabar “cookies” en su
              equipo, o incluso copiar códigos de su equipo, o a su equipo y
              emplear diversos mecanismos relacionados con sus preferencias de
              navegación`}
            </p>
            <p>
              {`Esta tecnología permite conocer, por ejemplo, fecha y hora de su
              visita a nuestra plataforma, áreas visitas en su navegación, Links
              a los cuales haya accedido, Websites, propaganda visitada,
              modalidad bajo la cual haya tenido accedido, Dirección IP, número
              de móvil, información de su equipo, como su ubicación, Tipo de
              Conexión del Equipo, Buscador, Versión, Sistema operativo,
              plataforma, Información de consulta de mensajes`}
            </p>
            <p>
              {`Si usted es un cliente que proporciona contenido a nuestra
              plataforma, nosotros procesaremos dicha información, con el objeto
              de ofrecer masivamente videos y demás material que sea cargado y/o
              subido en nuestra página. Igualmente, procesaremos toda la
              información que sea necesaria para que usted pueda recibir pagos
              en forma directa por parte de terceras personas, tal como se
              indica en los “Términos de Uso” contenidos en nuestra plataforma`}
            </p>
            <p>
              {`De otra parte, la información relacionada con los pagos realizados
              a su favor, también será conservada de acuerdo con nuestra
              “Política”, para efecto de garantizar el correcto procesamiento de
              los mismos, eficacia, eficiencia, seguridad, transparencia y
              trazabilidad, así como en caso de presentarse cualquier
              observación relacionada con los mismos. De igual manera, la
              información relacionada con los medios y mecanismos de pago
              escogidos por nosotros, se encuentra sometida a la misma
              “Política”, así como a la de las respectivas entidades pagadoras,
              que pueden ser completamente diferentes y que en consecuencia deba
              ser revisada por su parte`}
            </p>
            <p>
              {`Es posible que en algunas ocasiones compartamos información
              personal suya con terceras personas, para atender sus intereses de
              navegación. Sin embargo, nunca compartiremos su información
              personal para sea utilizada para propósitos diferentes a los aquí
              mencionados, sin su consentimiento, el cual será solicitado en
              caso de ser necesario. Es necesario recordar que el manejo de su
              información personal se encuentra fundamentado en su aceptación y
              autorización, en los términos expresados en nuestra “Política”, y
              que usted siempre tiene el derecho de retirar su consentimiento,
              en cualquier momento, a través de las herramientas y
              procedimientos establecidos en nuestra página`}
            </p>
            <p>
              {`En relación con los menores de trece (13) años de edad, nuestra
              “Política” determina que no conservamos ningún tipo de información
              personal. Si usted, en calidad de padre o acudiente, observa que
              por alguna razón lo hacemos, por favor comuníquese con nosotros
              inmediatamente para realizar las adecuaciones del caso: en 10800
              Biscayne Blvd, Suite 560, Miami, Florida, 33161. Lo anterior por
              cuanto nuestra página está diseñada para uso generalizado, y es
              posible que eventualmente y de manera involuntaria, hayamos podido
              recopilar dicha información`}
            </p>
            <p>
              {`Revelaremos información personal suya, aún en contra de su
              voluntad, cuando así sea exigido por la parte de la ley, la
              justicia o de cualquier autoridad competente de cualquier
              jurisdicción, con ocasión de una investigación por fraude,
              violación de los derechos de propiedad intelectual, de autor o
              literaria, relacionada con usted y que pueda perjudicar nuestros
              intereses, siempre en ejercicio de nuestros derechos legales y
              ante eventuales acusaciones de “hackeo”, incumplimiento de la
              “Política”, de los “Términos de Uso o Servicios”, por razones
              legales o gubernamentales`}
            </p>
            <p>
              {`También revelaremos, transferiremos, cederemos información
              personal suya, en caso de presentarse una fusión, adquisición,
              reorganización, concordato, quiebra y/o cualquier otra transacción
              que involucre a “Famosos Inc”`}
            </p>
            <p>
              {`Si usted expresamente lo solicita, podríamos transformar su
              información personal, en otra modalidad tecnológica que impida
              identificarlo a usted, como por ejemplo convertir su correo
              electrónico en un código alfanumérico, la cual ya no sería
              información personal suya`}
            </p>
            <p>
              {`Si usted desea acceder, revisar, corregir, editar o actualizar su
              propia información personal, simplemente acceda a su cuenta en la
              página, o a través de la aplicación en su móvil y realice los
              cambios que desea introducir`}
            </p>
            <p>
              {`Cuando nos solicite que borremos su información personal,
              tomaremos acciones concretas para removerla de nuestras bases de
              datos activas, pero conservaremos la información original, de
              acuerdo con nuestra “Política”, para eventuales casos de disputa,
              cumplimiento de normas legales, conservación de grabaciones, back
              up. En todo caso, nunca conservaremos su información más tiempo
              del que sea necesario para el cumplimiento de nuestra “Política”`}
            </p>
            <p>
              {`Si usted es un visitante de nuestra página y está ubicado fuera de
              los Estados Unidos de Norteamérica, la información personal que
              usted suministre será recopilada, procesada, conservada,
              transferida a nuestros servidores en dicho país, u otros donde
              nosotros o nuestros vendedores realizan su operación comercial`}
            </p>
            <p>
              {`Sin importar dónde se encuentre localizada la información, tomamos
              medidas razonables de protección de la privacidad de sus derechos,
              en los términos de esta política`}
            </p>
            <p>
              {`Tomamos medidas razonables de seguridad para proteger la
              información remitida a nosotros, de acuerdo con las facilidades
              tecnológicas existentes a la fecha`}
            </p>
            <p>
              {`Aunque ningún sistema de transmisión y/o administración de datos a
              través de la red mundial de internet es completamente seguro,
              hemos tomado medidas tecnológicas razonables de seguridad para
              proteger la información conservada por nosotros, lo cual debe ser
              conocido y tenido en cuenta por usted siempre que utilice nuestra
              página, para que dicho conocimiento quede bajo su responsabilidad`}
            </p>
            <p>
              {`En consecuencia, si tiene alguna pregunta relacionada con la
              seguridad en nuestra página, póngase en contacto con nosotros, a
              través de los respectivos canales de comunicación proporcionados
              en nuestra “Política”`}
            </p>
            <p>
              {`Si usted desea desactivar su cuenta, comuníquese con nosotros para
              tal efecto, en 10800 Biscayne Blvd, Suite 560, Miami, Florida,
              33161, USA`}
            </p>
            <p>
              {`Si usted desea trabajar con nosotros, o para nosotros como
              “funcionario” y/o trabajar bajo la modalidad de “socios”, puede
              aplicar comunicándose con nosotros a través de los canales y
              personas informadas en esta “Política”, para que sea informado
              acerca de nuestra “Política” al respecto. Es posible que
              compartamos información personal suya, para los propósitos
              exclusivos mencionados en este párrafo, o para mejorar nuestros
              procesos de selección, o para protegernos frente a reclamaciones
              laborales`}
            </p>
            <p>
              {`Nuevamente le reiteramos que si usted toma la decisión de
              vincularse a nuestra página, nosotros entendemos que usted ha
              leído y aceptado en forma incondicional e irrevocable esta
              “Política”, así como los llamados “Términos de Uso” que también se
              encuentran disponibles en nuestra página para su conocimiento,
              aceptación o rechazo`}
            </p>
            <p>
              {`Sin embargo, si usted no desea volver a recibir ningún tipo de
              información de parte nuestra, pero sin retirarse de nuestra
              página, a través de los canales y personas informadas en esta
              “Política” y solo recibirá información nuestra relacionado con el
              estado de pago de su cuenta`}
            </p>
            <p>
              {`Si usted requiere mayor información acerca de esta “Política”,
              podrá contactarse con nosotros, en 10800 Biscayne Blvd, Suite 560,
              Miami, Florida, 33161`}
            </p>
          </div>
        </PageContainer>
      </div>
    );
  }
}

const _PoliciesPage = injectIntl(PoliciesPage);

export { _PoliciesPage as PoliciesPage };
