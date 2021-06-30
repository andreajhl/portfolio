import React, { Component } from "react";
import { PageContainer } from "../../layouts/page-container";
import * as GTM from "../../../state/utils/gtm";
import { FormattedMessage } from "react-intl";
import { withRouter } from "next/router";
import Maybe from "../../common/helpers/maybe";
class TermsPage extends Component {
  componentDidMount() {
    GTM.tagManagerDataLayer("TERMS_PAGE_VIEW", this.props.match);
  }
  render() {
    return (
      <div className="TermsPage">
        <PageContainer>
          <div className="container-text">
            {
              <Maybe it={this.props.router.locale === "es"}>
                <>
                  <h5 className="font-weight-bold">
                    FAMOSOS INC - Términos de servicio de usuario
                  </h5>
                  <p>Revisado: 28 de Marzo 2020</p>
                  <p>
                    Estos Términos de Servicio ( “Términos”) regulan el uso del
                    sitio web Famosos ( “Sitio”) y cualquier aplicación móvil
                    Famosos y otros servicios ofrecidos por Famosos, Inc. (
                    “Servicios”). Famosos, Inc. ( “nosotros.” “nos” o “famosos”)
                    proporciona el sitio y los servicios. “Usted” se refiere a
                    usted como usuario del Sitio o los Servicios.
                  </p>
                  <p>
                    AL UTILIZAR EL SITIO O LOS SERVICIOS, USTED ACEPTA ESTOS
                    TÉRMINOS. POR FAVOR LEA CON CUIDADO.
                  </p>
                  <ul>
                    <li>
                      <span className="font-weight-bold">Famosos Videos</span>
                      <p>
                        A través del Sitio y los Servicios, usted tiene la
                        oportunidad de comprar vídeos personalizados (“Famosos”)
                        Vídeos de los atletas y personas influyentes ( “Usuarios
                        de talento”). Usted va a presentar una solicitud de un
                        vídeo Famosos a un usuario Talento. El Usuario Talento
                        tiene hasta 10 dias hábiles para aceptar o rechazar su
                        solicitud. Su pago se hará efectivo apenas complete su
                        contratación y cree su solicitud. En el caso tal de que
                        el talento o Famosos rechaze su solicitud, se le hará el
                        reembolso a su metodo de pago elegido (el reembolso
                        podría tardar hasta un máximo de 21 días hábiles en
                        aparecer). En el caso tal de que su solicitud sea
                        aceptada, no habrán devoluciones ni reembolsos.
                      </p>
                      <p>
                        Al recibir el pago total de su Famosos vídeo, se le
                        concede una licencia no exclusiva, a nivel mundial para
                        utilizar el vídeo Famosos para sus propios fines
                        personales, no comerciales, y no promocionales. Los
                        Famosos Videos tienen licencia y no se vende. El usuario
                        no puede volver a vender sus derechos en el vídeo
                        Famosos. Sólo se puede sublicenciar sus derechos según
                        sea necesario para que pueda utilizar el vídeo Famosos
                        de lo permitido en estas Condiciones. Sólo se puede
                        utilizar el vídeo Famosos de conformidad con estas
                        Condiciones, incluyendo las restricciones de uso
                        aceptable en la Sección 5 más adelante. Si usted no
                        cumple con cualquiera de las disposiciones de las
                        Condiciones, se termina su licencia a la Famosos vídeo.
                      </p>
                      <p>
                        Usted otorga a nosotros una licencia no exclusiva, libre
                        de regalías, totalmente pagada, sin límite, en todo el
                        mundo, sublicenciable (a través de múltiples niveles de
                        sublicencias), licencia perpetua, irrevocable, en todas
                        y cada una manera y los medios de comunicación, ya sea
                        conocido o inventado (incluyendo pero no limitado a los
                        canales de medios sociales y otros sitios web y
                        plataformas), para reproducir, licenciar, distribuir,
                        modificar, adaptar, ejecutar públicamente, mostrar
                        públicamente, crear trabajos derivados, y de otra manera
                        utilice el siguiente a efectos de funcionamiento y la
                        disponibilidad del sitio y servicios para usted y otros
                        usuarios, para desarrollar y mejorar nuestros productos
                        y servicios, y para publicitar, comercializar y promover
                        el sitio, servicios, y cualesquiera otros productos y
                        servicios de Famosos: (i) cualquier solicitud que haga a
                        cualquier Talento Usuario; y (ii) cualquier presentación
                        que haga a Famosos a través del Sitio, incluyendo los
                        Servicios, a través de cualquier medio de comunicación
                        social o de otra cuenta utilizada por Famosos, o de otra
                        manera, incluyendo cualquier vídeo de reacción, opinión,
                        foto, correo electrónico, texto, correo, u otra
                        comunicación, ya sea relacionada con usted, el
                        destinatario de cualquier vídeo FAMOSOS, o cualquier
                        otro tercero ((i) y (ii) colectivamente una
                        “Presentación”). Usted se compromete a indemnizar y
                        mantener indemne Famosos Famosos dba, Inc. con respecto
                        a la Presentación y todo uso de la comunicación de
                        conformidad con los términos del artículo 13 de las
                        Condiciones de servicio de usuario.
                      </p>
                    </li>
                    <li>
                      <span className="font-weight-bold">
                        Términos adicionales
                      </span>
                      <p>
                        Algunos de nuestros servicios tienen términos y
                        condiciones ( “Términos Adicionales”) adicionales.
                        Cuando las Condiciones adicionales se aplican a un
                        servicio, vamos a hacer que estén disponibles para su
                        lectura a través del uso de ese servicio. Mediante el
                        uso de ese Servicio, acepta los términos adicionales.
                      </p>
                    </li>
                    <li>
                      <span className="font-weight-bold">Elegibilidad</span>
                      <p>
                        Debe tener al menos 13 años para utilizar el Sitio o los
                        Servicios. Si usted es menor de edad en su estado de
                        residencia, un menor de edad, su padre o tutor legal
                        deben estar de acuerdo con estos términos en su nombre y
                        que sólo pueden acceder y utilizar el Sitio y los
                        Servicios con el permiso de su padre o tutor legal.
                      </p>
                    </li>
                    <li>
                      <span className="font-weight-bold">Propiedad</span>
                      <p>
                        Somos propietarios o licencia todos los derechos,
                        títulos e intereses sobre y para (a) el Sitio y los
                        Servicios, incluyendo todo el software, texto,
                        multimedia y otros contenidos disponibles en el Sitio y
                        los Servicios ( “OurContent”); y (b) las marcas
                        registradas, logotipos y elementos de marca ( “Marcas”).
                        El sitio y los servicios, nuestro contenido, y Marks
                        están protegidos por las leyes estadounidenses e
                        internacionales. El aspecto y la sensación del sitio y
                        los servicios son los derechos de autor © Famosos, Inc.
                        Todos los derechos reservados. El usuario no puede
                        duplicar, copiar, reutilizar o cualquier parte del HTML
                        / CSS, Javascript, o elementos de diseño visual o
                        conceptos sin autorización expresa por escrito de
                        nosotros.
                      </p>
                    </li>
                    <li>
                      <span className="font-weight-bold">
                        Uso aceptable del sitio y los servicios
                      </span>
                      <p>
                        Usted es responsable de su uso del Sitio y los
                        Servicios, y para cualquier uso del Sitio o servicios
                        puestos a través de tu cuenta. Nuestro objetivo es crear
                        una experiencia de usuario positiva, útil y segura. Para
                        promover este objetivo, prohibimos ciertos tipos de
                        conducta que pueden ser perjudiciales para otros
                        usuarios o para nosotros. Cuando se utiliza el Sitio o
                        los Servicios, usted no puede:
                      </p>
                      <ul>
                        <li>violar cualquier ley o regulación;</li>
                        <li>
                          violar, infringir, o apropiarse indebidamente de otras
                          personas de la propiedad intelectual, privacidad,
                          publicidad, u otros derechos legales;
                        </li>
                        <li>
                          enviar comunicaciones publicitarias o comerciales no
                          solicitados o no autorizados, tales como correo no
                          deseado;
                        </li>
                        <li>
                          participar en rastreo o cosecha, o participar en el
                          uso de software, como software espía, diseñado para
                          recoger datos del Sitio o los Servicios;
                        </li>
                        <li>
                          transmitir cualquier tipo de virus u otras
                          instrucciones de ordenador o medios tecnológicos cuyo
                          propósito es alterar, dañar o interferir con el uso de
                          ordenadores o sistemas relacionados;
                        </li>
                        <li>acechar, acosar o dañar a otra persona;</li>
                        <li>
                          hacerse pasar por otra persona o entidad o realizar
                          cualquier otra actividad fraudulenta similar, como
                          phishing;
                        </li>
                        <li>
                          utilizar cualquier medio para raspar o rastrear las
                          páginas web contenidas en el sitio;
                        </li>
                        <li>
                          intentar eludir cualquier medida tecnológica
                          implementada por nosotros o alguno de nuestros
                          proveedores o cualquier otro tercero (incluyendo otro
                          usuario) para proteger el Sitio o los Servicios;
                        </li>
                        <li>
                          intentar descifrar, compilar o realizar ingeniería
                          inversa a cualquiera del software u otro código
                          subyacente utilizado para proporcionar el Sitio o los
                          Servicios;
                        </li>
                        <li>
                          Abogado, alentar o ayudar a un tercero en hacer
                          cualquiera de las anteriores.
                        </li>
                      </ul>
                      <p>
                        Usted reconoce que no estamos obligados a controlar su
                        (o de cualquier otra persona) el acceso o uso del Sitio
                        o los Servicios, pero tenemos el derecho de hacerlo con
                        el fin de operar el sitio o servicios, para asegurar su
                        cumplimiento con los presentes Términos , o para cumplir
                        con la ley aplicable o la orden o requerimiento de un
                        tribunal, agencia administrativa u otra entidad
                        gubernamental.
                      </p>
                    </li>
                    <li>
                      <span className="font-weight-bold">
                        Los derechos de autor y Política de Propiedad
                        Intelectual
                      </span>
                      <p>
                        Respondemos a los avisos de supuestas infracciones de
                        copyright y la cancelación de las cuentas de los
                        infractores reincidentes según el procedimiento
                        establecido en la Ley de Derechos de Autor del Milenio
                        Digital. Si usted cree que su trabajo ha sido copiado de
                        una manera que constituye una infracción de copyright,
                        por favor envíe la siguiente información al Agente de
                        Derechos de Autor se menciona a continuación:
                      </p>
                      <ul>
                        <li>
                          Su dirección, número de teléfono y dirección de correo
                          electrónico.
                        </li>
                        <li>
                          Una descripción de la obra con derechos de autor que
                          usted afirma han sido violadas.
                        </li>
                        <li>
                          Una descripción de donde se encuentra el presunto
                          material infractor.
                        </li>
                        <li>
                          Una declaración suya de que usted tiene una creencia
                          de buena fe que el uso disputado no está autorizado
                          por usted, el propietario del copyright, su agente o
                          la ley.
                        </li>
                        <li>
                          Una firma electrónica o física de la persona
                          autorizada para actuar en nombre del propietario de
                          los derechos de autor.
                        </li>
                        <li>
                          Una declaración suya, hecha bajo pena de perjurio, que
                          la información anterior es exacta y que usted es el
                          propietario del copyright o autorizado para actuar en
                          nombre del propietario del copyright.
                        </li>
                      </ul>
                      <p>Agente de derechos de autor:</p>
                      <p>
                        Famosos
                        <br />
                        10800 Biscayne Blvd Suite 560
                        <br />
                        Miami, Florida, 33161
                        <br />
                        experiencias@famosos.com
                        <br />
                      </p>
                      <p>
                        Para mayor claridad, las notificaciones de infracción de
                        derechos de autor sólo se deben ir a nuestro Agente de
                        Derechos de Autor. Usted reconoce que si usted no cumple
                        con todos los requisitos de esta sección de su
                        notificación no puede ser válida.
                      </p>
                      <p>
                        Si cree que el contenido que se retiró (o cuyo acceso se
                        ha desactivado) no está en infracción, o que tiene la
                        autorización del propietario del copyright, el agente
                        del propietario del copyright, o de conformidad con la
                        ley, para publicar y utilizar dicho contenido, pueden
                        presentar una respuesta a una notificación a la
                        dirección indicada anteriormente, que contiene la
                        siguiente información:
                      </p>
                      <ul>
                        <li>Tu firma física o electrónica;</li>
                        <li>
                          Identificación del contenido que ha sido eliminado o
                          cuyo acceso ha sido inhabilitado y el lugar en el que
                          aparecía antes de ser eliminado o desactivado el
                          contenido;
                        </li>
                        <li>
                          Una declaración de que usted cree de buena fe que el
                          contenido ha sido eliminado o inhabilitado como
                          consecuencia de un error o una identificación errónea
                          del contenido;
                        </li>
                        <li>
                          Su nombre, dirección física, número de teléfono y
                          dirección de correo electrónico, una declaración en la
                          que consienta a la jurisdicción de la corte federal de
                          Miami, Florida, y una declaración de que acepta el
                          servicio del proceso de la persona que presentó la
                          notificación de la supuesta infracción.
                        </li>
                      </ul>
                      <p>
                        Después de haber recibido su contranotificación, la
                        remitiremos a la parte que presentó la reclamación
                        original de infracción de derechos de autor. Tenga en
                        cuenta que cuando remitamos la contranotificación, que
                        incluye su información personal. Al presentar una
                        contra-notificación, consentimiento para que se revele
                        su información de esta manera. No vamos a pasar la
                        contra-notificación a cualquier parte que no sea el
                        demandante original.
                      </p>
                      <p>
                        Después de enviar el aviso en contrario, el reclamante
                        deberá notificar dentro de los 10 días que él o ella ha
                        presentado una acción de obtener una orden judicial que
                        prohíba tu actividad infractora en relación con el
                        contenido que se ha eliminado o desactivado. Si
                        recibimos dicha notificación no seremos capaces de
                        restaurar el material. Si no recibimos dicha
                        notificación, podremos restablecer el material.
                      </p>
                    </li>
                    <li>
                      <span className="font-weight-bold">Intimidad</span>
                      <p>
                        Su privacidad es muy importante para nosotros. Nuestra
                        política de privacidad[1]explica cómo recopilamos,
                        usamos, protegemos, y cuando compartimos información
                        personal y otros datos con otros. Usted es responsable
                        de mantener la confidencialidad de la información de su
                        cuenta, incluyendo su nombre de usuario y contraseña.
                        Usted es responsable de todas las actividades que
                        ocurran bajo su cuenta y usted se compromete a
                        notificarnos inmediatamente de cualquier acceso o uso no
                        autorizado de su cuenta. No somos responsables por
                        cualquier daño o pérdida relacionada con cualquier
                        acceso o uso no autorizado de su cuenta.
                      </p>
                    </li>
                    <li>
                      <span className="font-weight-bold">
                        Contenido de terceros e Interacciones
                      </span>
                      <p>
                        El Sitio y los Servicios pueden contener características
                        y funcionalidades que pueden vincular usted o
                        proporcionar usted con el acceso a contenidos de
                        terceros, incluyendo los Famosos Videos, que es
                        completamente independiente de nosotros, incluyendo
                        sitios web, directorios, servidores, redes, sistemas,
                        información y bases de datos, aplicaciones, software,
                        programas, productos o servicios, y de Internet en
                        general. Sus interacciones con las organizaciones o
                        individuos, incluyendo los usuarios de talento, que se
                        encuentran en oa través del sitio y los servicios son
                        exclusivamente entre usted y tales organizaciones o
                        individuos. Usted debe hacer las investigaciones que
                        considere necesaria o apropiada antes de proceder con
                        cualquier interacción con cualquiera de estos terceros.
                        Usted acepta que nosotros no somos responsables por
                        cualquier pérdida o daño de cualquier tipo o naturaleza
                        que resulte de dichos tratos. Si hay un conflicto entre
                        los usuarios del sitio o servicios, o entre usuarios y
                        terceros, usted entiende y acepta que no tenemos ninguna
                        obligación de participar. En el caso de que usted tiene
                        una disputa con cualquier otro usuario del Sitio o los
                        Servicios, por la presente nosotros y nuestros
                        afiliados, y todos nuestros funcionarios, empleados,
                        agentes y sucesores de las reclamaciones, demandas y
                        daños de liberación (reales o resultantes) de cualquier
                        tipo o naturaleza, conocidos y desconocidos, sospechados
                        e insospechados, revelados y no revelados, que surjan de
                        o en cualquier forma relacionados con dichos conflictos
                        o el sitio y los Servicios. Por la presente renuncia de
                        California Sección Civil Código 1542 (y cualquier otro
                        de naturaleza similar aplicables ESTATUTO DEL ESTADO),
                        que dispone:
                      </p>
                    </li>
                    <li>
                      <span className="font-weight-bold">Otros campos</span>
                      <p>
                        El Sitio y los Servicios pueden contener enlaces a otros
                        sitios web y recursos en línea. Un enlace a la página
                        web de un tercero no significa que estamos de acuerdo
                        con ella o que la que están afiliados con ella. No somos
                        responsables por cualquier daño o pérdida relacionada
                        con el uso de cualquier sitio web de terceros. Siempre
                        debe leer los términos y condiciones y la política de
                        privacidad de un sitio web de terceros antes de usarlo.
                      </p>
                    </li>
                    <li>
                      <span className="font-weight-bold">
                        Los cambios en el Sitio o los Servicios
                      </span>
                      <p>
                        Mejoramos y actualizar el sitio y servicios a menudo.
                        Podemos cambiar o interrumpir el Sitio o los Servicios
                        en cualquier momento, con o sin previo aviso.
                      </p>
                    </li>
                    <li>
                      <span className="font-weight-bold">Terminación</span>
                      <p>
                        Usted puede cancelar su cuenta en cualquier momento a
                        través de un enlace que aparece en su cuenta en el
                        sitio. Nos reservamos el derecho de no proporcionar el
                        Sitio o los Servicios para cualquier persona. También
                        nos reservamos el derecho de suspender el derecho de
                        cualquier usuario para acceder al sitio o servicios en
                        cualquier momento, a nuestra discreción. Si usted viola
                        cualquiera de estos Términos, su permiso para utilizar
                        el sitio y los servicios se termina automáticamente.
                      </p>
                    </li>
                    <li>
                      <span className="font-weight-bold">
                        Descargo de responsabilidad y limitaciones de nuestra
                        responsabilidad
                      </span>
                      <p>
                        USAR EL SITIO Y SERVICIOS bajo su propio riesgo. EL
                        SITIO y servicios, incluyendo cualquier vídeo FAMOSOS,
                        SE PROPORCIONAN “COMO ES” Y “COMO DISPONIBLE”. A la
                        extensión permitida por LEY, FAMOSOS Y sus oficiales,
                        empleados, directores, accionistas, matrices,
                        subsidiarias, afiliados, agentes, y agentes (
                        “afiliados”) declinan TODAS garantías, condiciones, y
                        representaciones de CUALQUIER TIPO, EXPRESS, IMPLÍCITAS
                        , LEY, O DE OTRO MODO, incluidos los relacionados
                        RELACIÓN A lA APTITUD PARA UN FIN PARTICULAR, Y NO
                        INFRACCIÓN Y las derivadas de CURSO DE GESTIÓN O USO DE
                        COMERCIO.
                      </p>
                      <p>
                        EN PARTICULAR, FAMOSOS Y SUS AFILIADOS, NO representa ni
                        garantiza la exactitud o integridad de contenido
                        disponible en oa través del sitio o servicios, o el
                        contenido de los sitios web o servicios en línea
                        vinculados o integrado con el SITIO o servicios. FAMOSOS
                        y sus afiliados RESPONSABLE DE CUALQUIER: ERRORES (A),
                        errores, o inexactitudes de los contenidos; (B) LESIONES
                        O daños materiales ocasionados por SU ACCESO O USO DEL
                        SITIO o servicios; (C) cualquier acceso no autorizado o
                        uso de nuestros servidores o de cualquier información
                        personal o datos de usuario; (D) cualquier interrupción
                        de la transmisión A, O DESDE EL SITIO o servicios; (E)
                        cualquier error, virus, troyanos, O SIMILARES que pueden
                        transmitirse EN O MEDIANTE EL SITIO o servicios por
                        cualquier tercero;
                      </p>
                      <p>
                        USTED entiende y acepta que cualquier material o
                        información descargados u obtenidos mediante el uso DEL
                        SITIO o servicios, incluyendo sin limitación, vídeos
                        famosos, se realiza bajo su propio riesgo y que USTED
                        será el único responsable de los daños causados ​​de
                        hacerlo. NO CONSEJO O INFORMACIÓN, ORAL O ESCRITA,
                        obtenido por usted de EE.UU. O MEDIANTE EL SITIO O LOS
                        SERVICIOS GARANTÍA NO expresamente
                      </p>
                      <p>
                        EN LA MEDIDA MÁXIMA PERMITIDA POR LEY, en ningún caso se
                        SOMOS RESPONSABLE A USTED OA TERCEROS por daños
                        incidentales, PUNITIVOS O DERIVADOS INDIRECTOS,
                        ESPECIALES, (incluyendo la pérdida de beneficios,
                        ingresos, O DATOS) O POR El costo de obtener productos
                        de sustitución DERIVADOS DE O EN relación con estos
                        términos, CAUSADOS, SI TAL responsabilidades son
                        consecuencia de cualquier reclamación BASADO EN
                        CONTRATO, GARANTÍA, AGRAVIO (INCLUYENDO NEGLIGENCIA),
                        RESPONSABILIDAD ESTRICTA o no, y O NO hemos SIDO
                        INFORMADOS DE LA posibilidad de tales daños.
                      </p>
                      <p>
                        EN LA MEDIDA MÁXIMA PERMITIDA POR LA LEY, NUESTRA
                        responsabilidad total acumulada ante usted o cualquier
                        tercero bajo estos términos, DE TODAS LAS CAUSAS DE
                        ACCIÓN Y TODAS LAS TEORÍAS DE RESPONSABILIDAD, SERÁ
                        LIMITADO A, y no excederá los honorarios que en realidad
                        han pagado US DURANTE los doce (12) meses anteriores a
                        la que da lugar a dicha responsabilidad.
                      </p>
                      <p>
                        Usted entiende y acepta que nosotros hemos puesto
                        nuestros precios y entró en estas condiciones con usted
                        en dependencia de las limitaciones de responsabilidad
                        establecidas en estos Términos, que asignan el riesgo
                        entre nosotros y forman la base de una negociación entre
                        las partes.
                      </p>
                    </li>
                    <li>
                      <span className="font-weight-bold">Indemnización</span>
                      <p>
                        Usted se compromete a indemnizar y mantener indemne
                        Famosos y sus afiliados de y contra cualquier y todo
                        reclamo, costos, procedimientos, demandas, pérdidas,
                        daños y gastos (incluyendo, sin limitación, de los
                        honorarios y gastos legales razonables de abogados) de
                        cualquier tipo o naturaleza, derivados de o relacionados
                        a, (a) cualquier violación real o supuesta de estos
                        Términos por usted o cualquier persona que utilice su
                        cuenta, (b) su, o cualquier persona que utilice su
                        cuenta, la violación de las leyes o reglamentos, o (c)
                        su negligencia grave o dolo. Si asumimos la defensa de
                        un asunto tan, usted deberá cooperar razonablemente con
                        nosotros en dicha defensa.
                      </p>
                    </li>
                    <li>
                      <span className="font-weight-bold">
                        Acuerdo de Arbitraje y de exención de ciertos derechos
                      </span>
                      <p>
                        Usted y Famosos acepta que vamos a resolver cualquier
                        disputa entre nosotros a través de un arbitraje
                        vinculante y definitivo en lugar de a través de los
                        procesos judiciales. Usted y Famosos presente renuncia a
                        cualquier derecho a un juicio con jurado de cualquier
                        reclamación (se define a continuación). Todas las
                        controversias, reclamos, reconvenciones, u otros
                        conflictos que surjan entre usted y Famosos relacionada
                        con estos Términos, el Sitio y los Servicios (cada una
                        “Demanda”) serán sometidas a arbitraje de acuerdo con
                        las Reglas de la Asociación Americana de Arbitraje (
                        “Reglas AAA”). El arbitraje se resolverá de por un solo
                        árbitro. La decisión del árbitro "s en dicho arbitraje
                        será definitiva y vinculante para las partes y puede ser
                        ejecutada en cualquier tribunal de jurisdicción
                        competente.
                      </p>
                      <p>
                        Si usted demuestra que las costas del arbitraje serán
                        prohibitivos en comparación con los costos del litigio,
                        Famosos pagará la suma de los costos administrativos y
                        los honorarios del árbitro necesario para el arbitraje
                        como lo considere necesario, el árbitro para evitar que
                        el costo del arbitraje de ser prohibitivo . En el premio
                        final, el árbitro puede prorratear los costes de
                        arbitraje y la compensación del árbitro entre las partes
                        en cantidades tales que el árbitro considere apropiado.
                      </p>
                      <p>
                        Este acuerdo de arbitraje no le impide o Famosos de
                        buscar qué acción federal, estatal, o agencias
                        gubernamentales locales. Usted y Famosos también tiene
                        el derecho a presentar reclamaciones de clasificación en
                        la corte de reclamos. Además, usted y Famosos retiene el
                        derecho de solicitar a cualquier tribunal de
                        jurisdicción competente para el alivio provisional,
                        incluidos los accesorios pre-arbitrales o de medidas
                        cautelares, y dicha solicitud no se considerará
                        incompatible con estos términos, ni una renuncia al
                        derecho de tienen controversias sometidas a arbitraje
                        conforme a lo dispuesto en las presentes Condiciones.
                      </p>
                      <p>
                        Ni usted ni Famosos puede actuar como un representante
                        de la clase o el abogado general privado, ni participar
                        como miembro de un grupo de demandantes, con respecto a
                        cualquier reclamación. Reclamaciones no pueden ser
                        arbitradas en una clase o base representativa. El
                        árbitro puede decidir solamente sus reclamaciones
                        individuales y / o Famosos'. El árbitro no podrá
                        consolidar ni unir los reclamos de otras personas o
                        partes que pueden estar situados de manera similar.
                      </p>
                      <p>
                        Si no se encuentra ninguna disposición de esta sección
                        es inválida o inaplicable, dicha disposición específica
                        será de ninguna fuerza y ​​efecto y será separada, pero
                        el resto de esta sección continuará en pleno vigor y
                        efecto. Ninguna renuncia a cualquier disposición de esta
                        sección de los Términos será eficaz o ejecutable a menos
                        registrados en un escrito firmado por la parte que
                        renuncia un derecho o requisito. tal renuncia no se
                        dejará sin efecto o afectar a cualquier otra parte de
                        estos Términos. Esta sección de los Términos sobrevivirá
                        la finalización de su relación con Famosos.
                      </p>
                      <p>
                        ESTE sección Límites CIERTOS DERECHOS, INCLUYENDO el
                        derecho de mantener una acción judicial, el derecho a
                        juicio por jurado, el derecho a PARTICIPAR EN CUALQUIER
                        FORMA DE CLASE O RECLAMO representante, el derecho a
                        participar en DISCOVERY SALVO AS previsto en las reglas
                        AAA, Y EL DERECHO DE RECURSOS Y FORMAS DE SOCORRO
                        CIERTAS. OTROS DERECHOS QUE USTED O FAMOSOS tendría al
                        tribunal también no estar disponibles EN EL ARBITRAJE.
                      </p>
                    </li>
                    <li>
                      <span className="font-weight-bold">
                        Otras provisiones
                      </span>
                      <p>
                        Bajo ninguna circunstancia se hace responsable de
                        cualquier retraso o fallo en el rendimiento debido en su
                        totalidad o en parte, a ningún acto de la naturaleza o
                        por otras causas fuera de nuestro control.
                      </p>
                      <p>
                        Estos Términos se regirán e interpretarán de conformidad
                        con las leyes del Estado de Florida, sin dar efecto a
                        cualquier conflicto de leyes o disposiciones.
                      </p>
                      <p>
                        Usted acepta que cualquier acción de cualquier
                        naturaleza derivados de o relacionados con estos
                        Términos, el Sitio o Servicios será presentado sólo en
                        los tribunales estatales o federales ubicados en Miami,
                        Florida. Usted acepta y se somete a la jurisdicción
                        personal de dichos tribunales a los efectos de dicha
                        acción.
                      </p>
                      <p>
                        Si se determina que alguna disposición de estas
                        Condiciones sea ilegal o no ejecutable, dicha
                        disposición se considerará separable de estos Términos y
                        no afectará a la aplicabilidad de las demás
                        disposiciones.
                      </p>
                      <p>
                        El hecho de que nosotros para hacer valer cualquier
                        derecho o disposición de estas Condiciones no nos va a
                        impedir la aplicación de tal derecho o disposición en el
                        futuro.
                      </p>
                      <p>
                        Podemos ceder nuestros derechos y obligaciones bajo
                        estos términos, incluso en relación con una fusión,
                        adquisición, venta de activos o patrimonio, o por
                        ministerio de la ley.
                      </p>
                    </li>
                    <li>
                      <span className="font-weight-bold">
                        Los cambios en estos Términos
                      </span>
                      <p>
                        De vez en cuando, podemos cambiar estas Condiciones. Si
                        cambiamos estas condiciones, vamos a darle un aviso
                        mediante la publicación de los términos revisados ​​en
                        el sitio. Estos cambios entrarán en vigor en la fecha de
                        revisión se muestra en los términos revisados. Al
                        continuar utilizando el Sitio o los Servicios, usted
                        está de acuerdo con los términos revisados.
                      </p>
                    </li>
                  </ul>
                  <p className="font-weight-bold">
                    Por favor imprima una copia de estos Términos para usted los
                    registros y consulte el sitio con frecuencia para cualquier
                    cambio a estos Términos.
                  </p>

                  <h5 className="font-weight-bold">
                    Talento Condiciones del servicio
                  </h5>
                  <p>Revisado: 28 de Marzo 2020</p>
                  <p>
                    Estos Términos de Servicio (“Términos") regulan el uso del
                    sitio web Famosos (“Sitio") y cualquier aplicación móvil
                    Famosos y otros servicios ofrecidos por Famosos, Inc.
                    (“Servicios"). Famosos, Inc. (“nosotros." "Nos" o "famosos")
                    proporciona el sitio y los servicios. "Usted" se refiere a
                    usted como un usuario atleta o persona influyente del Sitio
                    o los Servicios.
                  </p>
                  <p>
                    Haciendo clic en "ACEPTO" O AL UTILIZAR EL SITIO O
                    SERVICIOS, usted acepta estos términos. POR FAVOR LEA CON
                    CUIDADO.
                  </p>
                  <ul>
                    <li>
                      <span className="font-weight-bold">Sus obligaciones</span>
                      <p>
                        Usted se compromete a grabar y subir al sitio utilizando
                        los servicios de un (1) de grabación de vídeo para cada
                        usuario (“Usuario Final”) que solicite dicha grabación
                        de usted (“Famosos Vídeo"); siempre y cuando, en el caso
                        de una programación u otro conflicto, puede rechazar la
                        solicitud en un plazo de siete (7) días. Cada
                        videomensaje será aproximadamente quince segundos (15)
                        en la duración y se hará de acuerdo con las
                        instrucciones generales y peticiones del usuario final
                        (¡por ejemplo, mensaje de cumpleaños, o un mensaje de
                        “buena suerte!”). Tendrá sola discreción sobre el guion
                        y el contenido de cualquier videomensaje. Usted puede
                        negarse a crear o subir un videomensaje si la petición
                        de un usuario final es objetable u ofensivo para usted
                        en su propia discreción. Debe rechazar la solicitud en
                        un plazo de siete (7) días. Todos videomensajes deben
                        ser subidos dentro de siete (7) días siguientes a la
                        solicitud.
                      </p>
                      <p>
                        Materiales adicionales promocionales. Usted nos
                        proporcione los siguientes materiales promocionales
                        (“Materiales de Promoción") tras la finalización del
                        registro de la cuenta y la creación de: (1) a diez (10)
                        imágenes de alta resolución del mismo y (2) Sitio perfil
                        bio. De vez en cuando podemos solicitar materiales
                        promocionales adicionales.
                      </p>
                    </li>
                    <li>
                      <span className="font-weight-bold">Cuotas y Pago</span>
                      <p>
                        Matrícula: Sujeto a estos Términos, vamos a pagar el
                        setenta y cinco por ciento (75%) de los ingresos
                        recibidos por Famosos de cada usuario final; vídeo
                        vendido por usted en el sitio web. Usted fija su propio
                        precio para cada famoso vídeo, a condición, sin embargo,
                        que el precio debe ser de al menos cinco dólares ($5)
                        por videomensaje. Famosos Videos son actividades no
                        gremio y no habrá residual o cualquier otro tipo de pago
                        a vencer en relación con ellos.
                      </p>
                      <p>
                        Pago: Usted debe registrarse con Zelle o PayPal y
                        proporcionar la información requerida cuenta bancaria
                        con el fin de recibir el pago de Famosos. El pago se
                        efectuará dentro de los cinco (5) días hábiles
                        siguientes a la recepción de pago por parte del usuario
                        final. Zelle o PayPal no es operado por o asociada con
                        Famosos y su uso de Zelle o PayPal está sujeto a sus
                        términos. Nos reservamos el derecho de cambiar los
                        proveedores de pago en cualquier momento y para requerir
                        que se registre con ese nuevo proveedor de pago. No
                        somos responsables de los retrasos o fallos a recibir el
                        pago causados ​​por un proveedor de pago de terceros o
                        por su falta de información oportuna y adecuadamente
                        configurar una cuenta con el proveedor de pago o
                        proporcionar de otro modo solicitado para el pago.
                      </p>
                    </li>
                    <li>
                      <span className="font-weight-bold">
                        Contenido de usuario
                      </span>
                      <p>
                        El sitio y algunos de nuestros servicios le permiten
                        cargar, enviar, almacenar, enviar o recibir contenido y
                        datos, incluyendo sus videomensajes y materiales
                        promocionales (“Contenido de Usuario"). Usted conserva
                        la propiedad de los derechos de propiedad intelectual
                        que usted tiene en su contenido de usuario.
                      </p>
                      <p>
                        Al cargar, enviar, almacenar, enviar o recibir contenido
                        de usuario a través del sitio o los servicios, usted nos
                        da permiso para reproducir y utilizar su contenido de
                        usuario de la siguiente manera: se otorga a nosotros y
                        aquellos que trabajamos con una licencia de uso, alojar,
                        almacenar, reproducir, modificar, crear trabajos
                        derivados (tales como traducciones, adaptaciones u otros
                        cambios que hacemos para que el contenido del usuario
                        funciona mejor con el sitio y los servicios), ejecutar
                        públicamente, mostrar públicamente y distribuir su
                        contenido de usuario en el sitio y también en las redes
                        sociales y en otros sitios web y medios de comunicación.
                        Esta licencia es para el propósito limitado de operar,
                        promover y mejorar el sitio y los servicios, y para
                        desarrollar nuevos servicios. Nuestra licencia para su
                        contenido de usuario no es exclusiva, lo que significa
                        que puede usar el contenido de usuario para sus propios
                        fines o dejar que otros utilizan su contenido de usuario
                        para sus propósitos. Esta licencia es totalmente pagada
                        y libre de regalías, lo que significa que no te debo
                        nada más en relación con el uso de su contenido de
                        usuario. Podemos ejercer nuestros derechos bajo esta
                        licencia en cualquier parte del mundo. Podemos
                        sublicenciar nuestros derechos a los usuarios finales y
                        de otra manera, según sea necesario para proporcionar el
                        sitio y los servicios. Por último, esta licencia es
                        perpetua, lo que significa que nuestros derechos bajo
                        esta licencia continúan incluso después de dejar de
                        utilizar el Sitio y Servicios. Usted acepta que podemos
                        mostrar publicidad con o en conexión con su contenido de
                        usuario. lo que significa que nuestros derechos bajo
                        esta licencia continúan incluso después de dejar de
                        utilizar el Sitio y Servicios. Usted acepta que podemos
                        mostrar publicidad con o en conexión con su contenido de
                        usuario. lo que significa que nuestros derechos bajo
                        esta licencia continúan incluso después de dejar de
                        utilizar el Sitio y Servicios. Usted acepta que podemos
                        mostrar publicidad con o en conexión con su contenido de
                        usuario.
                      </p>
                      <p>Usted manifiesta y garantiza que:</p>
                      <ul>
                        <li>
                          Es el propietario de todos los derechos y de su
                          contenido de usuario y que tiene el derecho de darnos
                          los derechos antes mencionados; que ha pagado y pagará
                          la totalidad de los honorarios u otros pagos que
                          pueden estar relacionados con el uso de su contenido
                          de usuario; y su contenido de usuario no infringe los
                          derechos de propiedad intelectual, derechos de
                          privacidad, derechos de publicidad, u otros derechos
                          legales de terceros.
                        </li>
                        <li>
                          Cualquier contenido de usuario será no confidencial y
                          no propietaria y no será responsable de cualquier uso
                          o divulgación de contenido de usuario. Usted reconoce
                          y acepta que su relación con nosotros no es un tipo
                          confidencial, fiduciaria, o de otro tipo de relación
                          especial, y que su decisión de presentar cualquier
                          contenido de usuario no nos coloca en una posición que
                          es diferente de la posición mantenida por los miembros
                          del público en general, en particular con respecto a
                          su contenido de usuario. Ninguno de su contenido de
                          usuario estará sujeto a ninguna obligación de
                          confidencialidad por nuestra parte y no será
                          responsable de cualquier uso o divulgación de
                          cualquier Contenido de Usuario que usted proporcione.
                        </li>
                        <li>
                          Podemos negarnos a aceptar o transmitir Contenido de
                          Usuario por cualquier razón. Podemos eliminar el
                          Contenido de Usuario del Sitio o los Servicios por
                          cualquier motivo.
                        </li>
                        <li>
                          Si cancela su cuenta Famosos, usted puede solicitar
                          que ya no se muestren en el sitio web sus videos y
                          tampoco se reciben solicitudes para nuevos videos. No
                          podemos, sin embargo, restringir el uso de los
                          videomensajes por los usuarios finales para el que los
                          creó y no podemos quitar cualesquiera otros usos
                          existentes de sus videomensajes.
                        </li>
                      </ul>
                    </li>
                    <li>
                      <span className="font-weight-bold">Propiedad</span>
                      <p>
                        Aparte de contenido de usuario, poseemos o licencia
                        todos los derechos, títulos e intereses sobre y para (a)
                        el sitio y los servicios, incluyendo todo el software,
                        texto, multimedia y otros contenidos disponibles en el
                        sitio y los servicios (“Nuestro contenido") ; y (b) las
                        marcas registradas, logotipos y elementos de marca (
                        "Marcas"). El sitio y los servicios, nuestro contenido,
                        y Marks están protegidos por las leyes estadounidenses e
                        internacionales. El aspecto y la sensación del sitio y
                        los servicios son los derechos de autor © Famosos, Inc.
                        Todos los derechos reservados. El usuario no puede
                        duplicar, copiar, reutilizar o cualquier parte del HTML
                        / CSS, JavaScript, o elementos de diseño visual o
                        conceptos sin autorización expresa por escrito de
                        nosotros.
                      </p>
                    </li>
                    <li>
                      <span className="font-weight-bold">
                        Términos adicionales
                      </span>
                      <p>
                        Algunos de nuestros servicios tienen términos y
                        condiciones (“Términos Adicionales") adicionales. Cuando
                        las Condiciones adicionales se aplican a un servicio,
                        vamos a hacer que estén disponibles para su lectura a
                        través del uso de ese servicio. Mediante el uso de ese
                        Servicio, acepta los términos adicionales.
                      </p>
                    </li>
                    <li>
                      <span className="font-weight-bold">Elegibilidad</span>
                      <p>
                        Debe tener al menos 13 años para utilizar el sitio o los
                        servicios. Si usted es menor de edad en su estado de
                        residencia, un menor de edad, su padre o tutor legal
                        deben estar de acuerdo con estos términos en su nombre y
                        que sólo pueden acceder y utilizar el sitio y los
                        servicios con el permiso de su padre o tutor legal.
                      </p>
                    </li>
                    <li>
                      <span className="font-weight-bold">
                        Uso aceptable del sitio y los servicios
                      </span>
                      <p>
                        Usted es responsable del uso del sitio y los servicios,
                        y para cualquier uso del sitio o servicios puestos a
                        través de tu cuenta. Nuestro objetivo es crear una
                        experiencia de usuario positiva, útil y segura. Para
                        promover este objetivo, prohibimos ciertos tipos de
                        conducta que pueden ser perjudiciales para otros
                        usuarios o para nosotros. Cuando se utiliza el sitio o
                        los servicios, usted no puede: Violar cualquier ley o
                        regulación; violar, infringir, o apropiarse
                        indebidamente de otras personas de la propiedad
                        intelectual, privacidad, publicidad, u otros derechos
                        legales; publicar o compartir cualquier cosa que sea
                        ilegal, abusivo, acosador, perjudicial para la
                        reputación, pornográfico, indecente, profano, obsceno,
                        odioso, racista, o de cualquier otra forma; enviar
                        comunicaciones publicitarias o comerciales no
                        solicitados o no autorizados, tales como correo no
                        deseado; participar en el rastreo o la cosecha, o
                        participar en el uso de software, como software espía,
                        diseñado para recoger datos del sitio o los servicios;
                        transmitir cualquier tipo de virus u otras instrucciones
                        de ordenador o medios tecnológicos cuyo propósito es
                        alterar, dañar o interferir con el uso de ordenadores o
                        sistemas relacionados; acechar, acosar o dañar a otra
                        persona; hacerse pasar por otra persona o entidad, o
                        realizar cualquier otra actividad fraudulenta similar,
                        como el phishing;
                      </p>
                      <p>
                        utilizar cualquier medio para raspar o rastrear ninguna
                        página web contenidas en el sitio;
                      </p>
                      <p>
                        intento de eludir cualquier medida tecnológica
                        implementada por nosotros o alguno de nuestros
                        proveedores o cualquier otro tercero (incluyendo otro
                        usuario) para proteger el Sitio o los Servicios;
                      </p>
                      <p>
                        intento de descifrar, compilar o realizar ingeniería
                        inversa a cualquiera del software u otro código
                        subyacente utilizado para proporcionar el Sitio o los
                        Servicios; o promover, alentar o ayudar a un tercero en
                        hacer cualquiera de las anteriores.
                      </p>
                      <p>
                        Usted reconoce que no estamos obligados a controlar su
                        (o de cualquier otra persona) el acceso o uso del Sitio
                        o los Servicios, pero tenemos el derecho de hacerlo con
                        el fin de operar el sitio o servicios, para asegurar su
                        cumplimiento con los presentes Términos, o para cumplir
                        con la ley aplicable o la orden o requerimiento de un
                        tribunal, agencia administrativa u otra entidad
                        gubernamental.
                      </p>
                    </li>
                    <li>
                      <span className="font-weight-bold">
                        Los derechos de autor y Política de Propiedad
                        Intelectual
                      </span>
                      <p>
                        Respondemos a los avisos de supuestas infracciones de
                        copyright y la cancelación de las cuentas de los
                        infractores reincidentes según el procedimiento
                        establecido en la Ley de Derechos de Autor del Milenio
                        Digital. Si usted cree que su trabajo ha sido copiado de
                        una manera que constituye una infracción de copyright,
                        por favor envíe la siguiente información al Agente de
                        Derechos de Autor se menciona a continuación:
                      </p>
                      <ul>
                        <li>
                          Su dirección, número de teléfono y dirección de correo
                          electrónico.
                        </li>
                        <li>
                          Una descripción de la obra con derechos de autor que
                          usted afirma ha sido violada.
                        </li>
                        <li>
                          Una descripción de donde se encuentra el presunto
                          material infractor.
                        </li>
                        <li>
                          Una declaración suya de que usted tiene una creencia
                          de buena fe que el uso disputado no está autorizado
                          por usted, el propietario del copyright, su agente o
                          la ley.
                        </li>
                        <li>
                          Una firma electrónica o física de la persona
                          autorizada para actuar en nombre del propietario de
                          los derechos de autor.
                        </li>
                        <li>
                          Una declaración suya, hecha bajo pena de perjurio, que
                          la información anterior es exacta y que usted es el
                          propietario del copyright o autorizado para actuar en
                          nombre del propietario del copyright.
                        </li>
                      </ul>
                      <p>Agente de derechos de autor:</p>
                      <p>
                        Famosos
                        <br />
                        10800 Biscayne Blvd Suite 560
                        <br />
                        Miami, Florida, 33161
                        <br />
                        experiencias@famosos.com
                        <br />
                      </p>
                      <p>
                        Para mayor claridad, las notificaciones de infracción de
                        derechos de autor sólo se deben ir a nuestro Agente de
                        Derechos de Autor. Usted reconoce que si usted no cumple
                        con todos los requisitos de esta sección de su
                        notificación no puede ser válida.
                      </p>
                      <p>
                        Si cree que el contenido que se retiró (o cuyo acceso se
                        ha desactivado) no está en infracción, o que tiene la
                        autorización del propietario del copyright, el agente
                        del propietario del copyright, o de conformidad con la
                        ley, para publicar y utilizar dicho contenido, pueden
                        presentar una respuesta a una notificación a la
                        dirección indicada anteriormente, que contiene la
                        siguiente información:
                      </p>
                      <ul>
                        <li>Tu firma física o electrónica;</li>
                        <li>
                          Identificación del contenido que ha sido eliminado o
                          cuyo acceso ha sido inhabilitado y el lugar en el que
                          aparecía antes de ser eliminado o desactivado el
                          contenido;
                        </li>
                        <li>
                          Una declaración de que usted cree de buena fe que el
                          contenido ha sido eliminado o inhabilitado como
                          consecuencia de un error o una identificación errónea
                          del contenido; y su nombre, dirección física, número
                          de teléfono y dirección de correo electrónico, una
                          declaración en la que consienta a la jurisdicción de
                          la corte federal de Miami, Florida, y una declaración
                          de que acepta el servicio del proceso de la persona
                          que presentó la notificación de la supuesta
                          infracción.
                        </li>
                      </ul>
                      <p>
                        Después de haber recibido su contra-notificación, la
                        remitiremos a la parte que presentó la reclamación
                        original de infracción de derechos de autor. Tenga en
                        cuenta que cuando remitamos la contra-notificación, que
                        incluye su información personal. Al presentar una
                        contra-notificación, consentimiento para que se revele
                        su información de esta manera. No vamos a pasar la
                        contra-notificación a cualquier parte que no sea el
                        demandante original.
                      </p>
                      <p>
                        Después de enviar el aviso en contrario, el reclamante
                        deberá notificar dentro de los 10 días que él o ella ha
                        presentado una acción de obtener una orden judicial que
                        prohíba tu actividad infractora en relación con el
                        contenido que se ha eliminado o desactivado. Si
                        recibimos dicha notificación no seremos capaces de
                        restaurar el material. Si no recibimos dicha
                        notificación, podremos restablecer el material.
                      </p>
                    </li>
                    <li>
                      <span className="font-weight-bold">Intimidad</span>
                      <p>
                        Su privacidad es muy importante para nosotros. Nuestra
                        política de privacidad explica cómo recopilamos, usamos,
                        protegemos, y cuando compartimos información personal y
                        otros datos con otros. Usted es responsable de mantener
                        la confidencialidad de la información de su cuenta,
                        incluyendo su nombre de usuario y contraseña. Usted es
                        responsable de todas las actividades que ocurran bajo su
                        cuenta y usted se compromete a notificarnos
                        inmediatamente de cualquier acceso o uso no autorizado
                        de su cuenta. No somos responsables por cualquier daño o
                        pérdida relacionada con cualquier acceso o uso no
                        autorizado de su cuenta.
                      </p>
                    </li>
                    <li>
                      <span className="font-weight-bold">
                        Contenido de terceros e Interacciones
                      </span>
                      <p>
                        El Sitio y los Servicios pueden contener características
                        y funcionalidades que pueden vincular usted o le
                        proporcionan acceso a contenido de terceros que es
                        completamente independiente de nosotros, incluyendo
                        sitios web, directorios, servidores, redes, sistemas,
                        información y bases de datos, aplicaciones, software,
                        programas, productos o servicios, y el Internet en
                        general. Sus interacciones con las organizaciones o
                        individuos, incluidos los usuarios finales, que se
                        encuentran en o a través del sitio y los servicios son
                        exclusivamente entre usted y tales organizaciones o
                        individuos. Usted debe hacer las investigaciones que
                        considere necesaria o apropiada antes de proceder con
                        cualquier interacción con cualquiera de estos terceros.
                        Usted acepta que nosotros no somos responsables por
                        cualquier pérdida o daño de cualquier tipo o naturaleza
                        que resulte de dichos tratos. Si hay un conflicto entre
                        los usuarios del sitio o servicios, o entre usuarios y
                        terceros, usted entiende y acepta que no tenemos ninguna
                        obligación de participar. En el caso de que usted tiene
                        una disputa con cualquier otro usuario del Sitio o los
                        Servicios, por la presente nosotros y nuestros
                        afiliados, y todos nuestros funcionarios, empleados,
                        agentes y sucesores de las reclamaciones, demandas y
                        daños de liberación (reales o resultantes) de cualquier
                        tipo o naturaleza, conocidos y desconocidos, sospechados
                        e insospechados, revelados y no revelados, que surjan de
                        o en cualquier forma relacionados con dichos conflictos
                        o el sitio y los Servicios. SI USTED ES UN RESIDENTE DE
                        CALIFORNIA, RENUNCIA California Código civil, sección
                        1542, que dispone: UNA LIBERACIÓN GENERAL NO SE EXTIENDE
                        A LOS RECLAMOS QUE EL ACREEDOR NO sabe o sospecha que
                        existen a su favor EN EL MOMENTO DE EJECUTAR LA
                        LIBERACIÓN, el cual,
                      </p>
                    </li>
                    <li>
                      <span className="font-weight-bold">
                        Contratista independiente
                      </span>
                      <p>
                        Usted y Famosos acepta y declara que estas condiciones
                        de crear una relación de contratista independiente y es
                        intención expresa de las partes de que su relación se
                        interpreta y se mantuvo a ser la de contratista
                        independiente a todos los efectos. Usted no está en
                        negociaciones de franquicia, ni es socio, agente o
                        empleado de Famosos. Usted es el único y exclusivo
                        responsable de determinar la forma, el método, detalles
                        y medio de su rendimiento bajo estas condiciones. No
                        tenemos derecho a, y no será, controlar la manera o
                        determinar el método para lograr su rendimiento. Usted
                        asume la responsabilidad exclusiva para y pagará todos
                        los impuestos de empleo (incluida la seguridad social),
                        impuestos sobre la renta y otros informes requeridos por
                        sus actividades en virtud de estos Términos y cumplirá
                        con todas las leyes federales, estatales y locales que
                        rigen las leyes de su funcionamiento bajo estas
                        condiciones. Que va a utilizar su propio equipo para
                        llevar a cabo sus obligaciones bajo estos términos.
                        Usted es el único responsable de cualquier información
                        requerida por la ley o cualquier acuerdo que pueda tener
                        con terceros a cualquier persona o entidad en relación
                        con el cumplimiento de este Acuerdo. relación entre las
                        partes es no exclusiva, lo que significa que puede
                        proporcionar servicios similares a otras organizaciones
                        en términos y tiempos determinados por usted y que
                        podemos y no involucrar a otros para proporcionar
                        servicios similares a los contemplados en las presentes
                        Condiciones.
                      </p>
                    </li>
                    <li>
                      <span className="font-weight-bold">Otros campos</span>
                      <p>
                        El Sitio y los Servicios pueden contener enlaces a otros
                        sitios web y recursos en línea. Un enlace a la página
                        web de un tercero no significa que estamos de acuerdo
                        con ella o que la que están afiliados con ella. No somos
                        responsables por cualquier daño o pérdida relacionada
                        con el uso de cualquier sitio web de terceros. Siempre
                        debe leer los términos y condiciones y la política de
                        privacidad de un sitio web de terceros antes de usarlo.
                      </p>
                    </li>
                    <li>
                      <span className="font-weight-bold">Otros campos</span>
                      <p>
                        Mejoramos y actualizar el sitio y servicios a menudo.
                        Podemos cambiar o interrumpir el Sitio o los Servicios
                        en cualquier momento, con o sin previo aviso.
                      </p>
                    </li>
                    <li>
                      <span className="font-weight-bold">Terminación</span>
                      <p>
                        Usted puede cancelar su cuenta en cualquier momento a
                        través de un enlace que aparece en su cuenta en el
                        sitio. Nos reservamos el derecho de no proporcionar el
                        Sitio o los Servicios para cualquier persona. También
                        nos reservamos el derecho de suspender el derecho de
                        cualquier usuario para acceder al sitio o servicios en
                        cualquier momento, a nuestra discreción. Si usted viola
                        cualquiera de estos Términos, su permiso para utilizar
                        el sitio y los servicios se termina automáticamente.
                      </p>
                    </li>
                    <li>
                      <span className="font-weight-bold">
                        Descargo de responsabilidad y limitaciones de nuestra
                        responsabilidad
                      </span>
                      <p>
                        USAR EL SITIO Y SERVICIOS bajo su propio riesgo. EL
                        SITIO y servicios son proporcionados "COMO ES" Y "COMO
                        DISPONIBLE". A la extensión permitida por LEY, FAMOSOS Y
                        sus oficiales, empleados, directores, accionistas,
                        matrices, subsidiarias, afiliados, agentes, y agentes
                        (“afiliados") declinan TODAS garantías, condiciones, y
                        representaciones de CUALQUIER TIPO, EXPRESS, IMPLÍCITAS,
                        LEY, O DE OTRO MODO, incluidos los relacionados RELACIÓN
                        A la APTITUD PARA UN FIN PARTICULAR, Y NO INFRACCIÓN Y
                        las derivadas de CURSO DE GESTIÓN O USO DE COMERCIO.
                      </p>
                      <p>
                        EN PARTICULAR, FAMOSOS Y SUS AFILIADOS, NO representa ni
                        garantiza la exactitud o integridad de contenido
                        disponible a través del sitio o servicios, o el
                        contenido de los sitios web o servicios en línea
                        vinculados o integrado con el SITIO o servicios. FAMOSOS
                        y sus afiliados RESPONSABLE DE CUALQUIER: ERRORES (A),
                        errores, o inexactitudes de los contenidos; (B) LESIONES
                        O daños materiales ocasionados por SU ACCESO O USO DEL
                        SITIO o servicios; (C) cualquier acceso no autorizado o
                        uso de nuestros servidores o de cualquier información
                        personal o datos de usuario; (D) cualquier interrupción
                        de la transmisión A, O DESDE EL SITIO o servicios; (E)
                        cualquier error, virus, troyanos, O SIMILARES que pueden
                        transmitirse EN O MEDIANTE EL SITIO o servicios por
                        cualquier tercero;
                      </p>
                      <p>
                        USTED entiende y acepta que cualquier material o
                        información DESCARGADO U OBTENIDO MEDIANTE EL USO DEL
                        SITIO o servicios se realiza bajo su propio riesgo y que
                        USTED será el único responsable de los daños causados
                        ​​de hacerlo. NO CONSEJO O INFORMACIÓN, ORAL O ESCRITA,
                        obtenido por usted de EE.UU. O MEDIANTE EL SITIO O LOS
                        SERVICIOS GARANTÍA NO expresamente
                      </p>
                      <p>
                        EN LA MEDIDA MÁXIMA PERMITIDA POR LEY, en ningún caso se
                        SOMOS RESPONSABLE A USTED OA TERCEROS por daños
                        incidentales, PUNITIVOS O DERIVADOS INDIRECTOS,
                        ESPECIALES, (incluyendo la pérdida de beneficios,
                        ingresos, O DATOS) O POR El costo de obtener productos
                        de sustitución DERIVADOS DE O EN relación con estos
                        términos, CAUSADOS, SI TAL responsabilidades son
                        consecuencia de cualquier reclamación BASADO EN
                        CONTRATO, GARANTÍA, AGRAVIO (INCLUYENDO NEGLIGENCIA),
                        RESPONSABILIDAD ESTRICTA o no, y O NO hemos SIDO
                        INFORMADOS DE LA posibilidad de tales daños.
                      </p>
                      <p>
                        EN LA MEDIDA MÁXIMA PERMITIDA POR LA LEY, NUESTRA
                        responsabilidad total acumulada ante usted o cualquier
                        tercero bajo estos términos, DE TODAS LAS CAUSAS DE
                        ACCIÓN Y TODAS LAS TEORÍAS DE RESPONSABILIDAD, SERÁ
                        LIMITADO A, y no excederá los honorarios que en realidad
                        han pagado US DURANTE los doce (12) meses anteriores a
                        la que da lugar a dicha responsabilidad.
                      </p>
                      <p>
                        Usted entiende y acepta que nosotros hemos puesto
                        nuestros precios y entró en estas condiciones con usted
                        en dependencia de las limitaciones de responsabilidad
                        establecidas en estos Términos, que asignan el riesgo
                        entre nosotros y forman la base de una negociación entre
                        las partes.
                      </p>
                    </li>
                    <li>
                      <span className="font-weight-bold">Indemnización</span>
                      <p>
                        Usted se compromete a indemnizar y mantener indemne
                        Famosos y sus afiliados de y contra cualquier y todo
                        reclamo, costos, procedimientos, demandas, pérdidas,
                        daños y gastos (incluyendo, sin limitación, de los
                        honorarios y gastos legales razonables de abogados) de
                        cualquier tipo o naturaleza, derivados de o relacionados
                        a, (a) cualquier violación real o supuesta de estos
                        Términos por usted o cualquier persona que utilice su
                        cuenta, (b) su, o cualquier persona que utilice su
                        cuenta, la violación de las leyes o reglamentos, o (c)
                        su negligencia grave o dolo. Si asumimos la defensa de
                        un asunto tan, usted deberá cooperar razonablemente con
                        nosotros en dicha defensa.
                      </p>
                    </li>
                    <li>
                      <span className="font-weight-bold">
                        Acuerdo de Arbitraje y de exención de ciertos derechos
                      </span>
                      <p>
                        Usted y Famosos acepta que vamos a resolver cualquier
                        disputa entre nosotros a través de un arbitraje
                        vinculante y definitivo en lugar de a través de los
                        procesos judiciales. Usted y Famosos presente renuncia a
                        cualquier derecho a un juicio con jurado de cualquier
                        reclamación (se define a continuación). Todas las
                        controversias, reclamos, reconvenciones, u otros
                        conflictos que surjan entre usted y Famosos relacionada
                        con estos Términos, el Sitio y los Servicios (cada una
                        "Demanda") serán sometidas a arbitraje de acuerdo con
                        las Reglas de la Asociación Americana de Arbitraje (
                        "Reglas AAA"). El arbitraje se resolverá de por un solo
                        árbitro. La decisión del árbitro en dicho arbitraje será
                        definitiva y vinculante para las partes y puede ser
                        ejecutada en cualquier tribunal de jurisdicción
                        competente.
                      </p>
                      <p>
                        Si usted demuestra que las costas del arbitraje serán
                        prohibitivas en comparación con los costos del litigio,
                        Famosos pagará la suma de los costos administrativos y
                        los honorarios del árbitro necesario para el arbitraje
                        como lo considere necesario, el árbitro para evitar que
                        el costo del arbitraje de ser prohibitivo. En el premio
                        final, el árbitro puede prorratear los costes de
                        arbitraje y la compensación del árbitro entre las partes
                        en cantidades tales que el árbitro considere apropiado.
                      </p>
                      <p>
                        Este acuerdo de arbitraje no le impide o Famosos de
                        buscar qué acción federal, estatal, o agencias
                        gubernamentales locales. Usted y Famosos también tiene
                        el derecho a presentar reclamaciones de clasificación en
                        la corte de reclamos. Además, usted y Famosos retiene el
                        derecho de solicitar a cualquier tribunal de
                        jurisdicción competente para el alivio provisional,
                        incluidos los accesorios pre-arbitrales o de medidas
                        cautelares, y dicha solicitud no se considerará
                        incompatible con estos términos, ni una renuncia al
                        derecho de tienen controversias sometidas a arbitraje
                        conforme a lo dispuesto en las presentes Condiciones.
                      </p>
                      <p>
                        Ni usted ni Famosos puede actuar como un representante
                        de la clase o el abogado general privado, ni participar
                        como miembro de un grupo de demandantes, con respecto a
                        cualquier reclamación. Reclamaciones no pueden ser
                        arbitradas en una clase o base representativa. El
                        árbitro puede decidir solamente sus reclamaciones
                        individuales y / o Famosos'. El árbitro no podrá
                        consolidar ni unir los reclamos de otras personas o
                        partes que pueden estar situados de manera similar.
                      </p>
                      <p>
                        Si no se encuentra ninguna disposición de esta sección
                        es inválida o inaplicable, dicha disposición específica
                        será de ninguna fuerza y ​​efecto y será separada, pero
                        el resto de esta sección continuará en pleno vigor y
                        efecto. Ninguna renuncia a cualquier disposición de esta
                        sección de los Términos será eficaz o ejecutable a menos
                        registrados en un escrito firmado por la parte que
                        renuncia un derecho o requisito. tal renuncia no se
                        dejará sin efecto o afectar a cualquier otra parte de
                        estos Términos. Esta sección de los Términos sobrevivirá
                        la finalización de su relación con Famosos
                      </p>
                      <p>
                        ESTA sección Límites CIERTOS DERECHOS, INCLUYENDO el
                        derecho de mantener una acción judicial, el derecho a
                        juicio por jurado, el derecho a PARTICIPAR EN CUALQUIER
                        FORMA DE CLASE O RECLAMO representante, el derecho a
                        participar en DISCOVERY SALVO AS previsto en las reglas
                        AAA, Y EL DERECHO DE RECURSOS Y FORMAS DE SOCORRO
                        CIERTAS. OTROS DERECHOS QUE USTED O FAMOSOS tendría al
                        tribunal también no estar disponibles EN EL ARBITRAJE.
                      </p>
                    </li>
                    <li>
                      <span className="font-weight-bold">
                        Otras provisiones
                      </span>
                      <p>
                        Bajo ninguna circunstancia se hace responsable de
                        cualquier retraso o fallo en el rendimiento debido en su
                        totalidad o en parte, a ningún acto de la naturaleza o
                        por otras causas fuera de nuestro control.
                      </p>
                      <p>
                        Estos Términos se regirán e interpretarán de conformidad
                        con las leyes del Estado de Florida, sin dar efecto a
                        cualquier conflicto de leyes o disposiciones.
                      </p>
                      <p>
                        Usted acepta que cualquier acción de cualquier
                        naturaleza derivados de o relacionados con estos
                        Términos, el Sitio o Servicios será presentado sólo en
                        los tribunales estatales o federales ubicados en Miami,
                        Florida. Usted acepta y se somete a la jurisdicción
                        personal de dichos tribunales a los efectos de dicha
                        acción.
                      </p>
                      <p>
                        Si se determina que alguna disposición de estas
                        Condiciones sea ilegal o no ejecutable, dicha
                        disposición se considerará separable de estos Términos y
                        no afectará a la aplicabilidad de las demás
                        disposiciones.
                      </p>
                      <p>
                        El hecho de que nosotros para hacer valer cualquier
                        derecho o disposición de estas Condiciones no nos va a
                        impedir la aplicación de tal derecho o disposición en el
                        futuro.
                      </p>
                      <p>
                        Podemos ceder nuestros derechos y obligaciones bajo
                        estos términos, incluso en relación con una fusión,
                        adquisición, venta de activos o patrimonio, o por
                        ministerio de la ley.
                      </p>
                    </li>
                    <li>
                      <span className="font-weight-bold">
                        Los cambios en estos Términos
                      </span>
                      <p>
                        De vez en cuando, podemos cambiar estas Condiciones. Si
                        cambiamos estas condiciones, vamos a darle un aviso
                        mediante la publicación de los términos revisados ​​en
                        el sitio. Estos cambios entrarán en vigor en la fecha de
                        revisión se muestra en los términos revisados. Al
                        continuar utilizando el Sitio o los Servicios, usted
                        está de acuerdo con los términos revisados.
                      </p>
                    </li>
                  </ul>
                </>
              </Maybe>
            }
            {
              <Maybe it={this.props.router.locale === "en"}>
                <>
                  <h5 className="font-weight-bold">
                    <strong>FAMOSOS INC - User Terms of Service</strong>
                  </h5>
                  <p>Revised: March 28, 2020</p>
                  <p>
                    These Terms of Service ("Terms") govern your use of the
                    Famosos website ("Site") and any Famosos mobile applications
                    and other services offered by Famosos, Inc.
                    ("Services").&nbsp;Famosos, Inc. ("we." "Us" or
                    "celebrities") provides the site and services.&nbsp;"You"
                    refers to you as a user of the Site or Services.
                  </p>
                  <p>
                    BY USING THE SITE OR THE SERVICES, YOU AGREE TO THESE
                    TERMS.&nbsp;PLEASE READ CAREFULLY.
                  </p>
                  <ul>
                    <li>
                      <span className="font-weight-bold">Famosos Videos</span>
                    </li>
                    <p>
                      Through the Site and the Services, you have the
                      opportunity to purchase personalized videos
                      (&ldquo;Celebrities&rdquo;) Videos of athletes and
                      influencers (&ldquo;Talent Users&rdquo;).&nbsp;You are
                      submitting a request for a Celebrity video to a Talent
                      user.&nbsp;The Talent User has up to 10 business days to
                      accept or reject their request.&nbsp;Your payment will be
                      effective as soon as you complete your contract and create
                      your application.&nbsp;In the event that the talent or
                      Celebrities reject your application, a refund will be made
                      to your chosen payment method (the refund could take up to
                      21 business days to appear).&nbsp;In the event that your
                      application is accepted, there will be no returns or
                      refunds.
                    </p>
                    <p>
                      Upon receiving full payment for your Celebrity Video, you
                      are granted a non-exclusive, worldwide license to use the
                      Celebrity video for your own personal, non-commercial, and
                      non-promotional purposes.&nbsp;The Famosos Videos are
                      licensed and not sold.&nbsp;The user cannot sell his
                      rights to the Famosos video again.&nbsp;You can only
                      sublicense your rights as necessary for you to use
                      Celebrity video as permitted in these Terms.&nbsp;You may
                      only use the Celebrity video in accordance with these
                      Terms, including the acceptable use restrictions in
                      Section 5 below.&nbsp;If you do not comply with any of the
                      provisions of the Conditions, your license to Famosos
                      Video is terminated.
                    </p>
                    <p>
                      (i) any request you make to any User Talent;&nbsp;and (ii)
                      any presentation you make to Famosos through the Site,
                      including the Services, through any social media or other
                      account used by Famosos, or otherwise, including any
                      reaction video, opinion, photo, email, text, mail, or
                      other communication, whether related to you, the recipient
                      of any FAMOSOS video, or any other third party ((i) and
                      (ii) collectively a "Submission").&nbsp;You agree to
                      indemnify and hold Famosos Famosos dba, Inc. harmless with
                      respect to the Submission and any use of the communication
                      in accordance with the terms of article 13 of the User
                      Terms of Service.&nbsp;and (ii) any presentation you make
                      to Famosos through the Site, including the Services,
                      through any social media or other account used by Famosos,
                      or otherwise, including any reaction video, opinion,
                      photo, email, text, mail, or other communication, whether
                      related to you, the recipient of any FAMOSOS video, or any
                      other third party ((i) and (ii) collectively a
                      "Submission").&nbsp;You agree to indemnify and hold
                      Famosos Famosos dba, Inc. harmless with respect to the
                      Submission and any use of the communication in accordance
                      with the terms of article 13 of the User Terms of
                      Service.&nbsp;and (ii) any presentation you make to
                      Famosos through the Site, including the Services, through
                      any social media or other account used by Famosos, or
                      otherwise, including any reaction video, opinion, photo,
                      email, text, mail, or other communication, whether related
                      to you, the recipient of any FAMOSOS video, or any other
                      third party ((i) and (ii) collectively a
                      "Submission").&nbsp;You agree to indemnify and hold
                      Famosos Famosos dba, Inc. harmless with respect to the
                      Submission and any use of the communication in accordance
                      with the terms of article 13 of the User Terms of
                      Service.&nbsp;including any reaction video, opinion,
                      photo, email, text, mail, or other communication, whether
                      related to you, the recipient of any FAMOSOS video, or any
                      other third party ((i) and (ii) collectively a
                      "Presentation &rdquo;).&nbsp;You agree to indemnify and
                      hold Famosos Famosos dba, Inc. harmless with respect to
                      the Submission and any use of the communication in
                      accordance with the terms of article 13 of the User Terms
                      of Service.&nbsp;including any reaction video, opinion,
                      photo, email, text, mail, or other communication, whether
                      related to you, the recipient of any FAMOSOS video, or any
                      other third party ((i) and (ii) collectively a
                      "Presentation &rdquo;).&nbsp;You agree to indemnify and
                      hold Famosos Famosos dba, Inc. harmless with respect to
                      the Submission and any use of the communication in
                      accordance with the terms of article 13 of the User Terms
                      of Service.
                    </p>
                  </ul>
                  <ul>
                    <li>
                      <span className="font-weight-bold">Additional terms</span>
                    </li>
                    <p>
                      Some of our services have additional terms and conditions
                      ("Additional Terms").&nbsp;When the Additional Terms apply
                      to a service, we will make them available for reading
                      through the use of that service.&nbsp;By using that
                      Service, you agree to the additional terms.
                    </p>
                  </ul>
                  <ul>
                    <li>
                      <span className="font-weight-bold">Eligibility</span>
                    </li>
                    <p>
                      You must be at least 13 years old to use the Site or the
                      Services.&nbsp;If you are a minor in your state of
                      residence, a minor, your parent or legal guardian must
                      agree to these terms on your behalf and that you may only
                      access and use the Site and Services with your parent's
                      permission. or legal guardian.
                    </p>
                  </ul>
                  <ul>
                    <li>
                      <span className="font-weight-bold">Property</span>
                    </li>
                    <p>
                      We own or license all rights, titles and interests in and
                      to (a) the Site and the Services, including all software,
                      text, multimedia and other content available on the Site
                      and the Services (&ldquo;OurContent&rdquo;);&nbsp;and (b)
                      trademarks, logos and brand elements ("Brands").&nbsp;The
                      site and services, our content, and Marks are protected by
                      US and international laws.&nbsp;The look and feel of the
                      site and services are copyright &copy; Famosos, Inc. All
                      rights reserved.&nbsp;The user may not duplicate, copy,
                      reuse or any part of the HTML / CSS, Javascript, or visual
                      design elements or concepts without express written
                      permission from us.
                    </p>
                  </ul>
                  <ul>
                    <li>
                      <span className="font-weight-bold">
                        Acceptable use of the site and services
                      </span>
                    </li>
                    <p>
                      You are responsible for your use of the Site and the
                      Services, and for any use of the Site or services placed
                      through your account.&nbsp;Our goal is to create a
                      positive, helpful and safe user experience.&nbsp;To
                      further this goal, we prohibit certain types of conduct
                      that may be harmful to other users or to us.&nbsp;When
                      using the Site or the Services, you may not:
                    </p>

                    <ul>
                      <li>violate any law or regulation;</li>
                      <li>
                        violate, infringe, or misappropriate other people's
                        intellectual property, privacy, publicity, or other
                        legal rights;
                      </li>
                      <li>
                        send unsolicited or unauthorized advertising or
                        commercial communications, such as spam;
                      </li>
                      <li>
                        participate in tracking or harvesting, or participate in
                        the use of software, such as spyware, designed to
                        collect data from the Site or the Services;
                      </li>
                      <li>
                        transmit any type of virus or other computer
                        instructions or technological means whose purpose is to
                        alter, damage or interfere with the use of computers or
                        related systems;
                      </li>
                      <li>stalk, harass or harm another person;</li>
                      <li>
                        impersonate another person or entity or carry out any
                        other similar fraudulent activity, such as phishing;
                      </li>
                      <li>
                        use any means to scrape or track the web pages contained
                        in the site;
                      </li>
                      <li>
                        attempt to circumvent any technological measure
                        implemented by us or one of our suppliers or any other
                        third party (including another user) to protect the Site
                        or the Services;
                      </li>
                      <li>
                        attempt to decrypt, compile, or reverse engineer any of
                        the software or other underlying code used to provide
                        the Site or the Services;
                      </li>
                      <li>
                        Advocate, encourage or assist a third party in doing any
                        of the above.
                      </li>
                    </ul>

                    <p>
                      You acknowledge that we are not required to control your
                      (or anyone else's) access to or use of the Site or the
                      Services, but we have the right to do so in order to
                      operate the site or services, to ensure your compliance
                      with these Terms. , or to comply with applicable law or
                      the order or requirement of a court, administrative
                      agency, or other governmental entity.
                    </p>
                  </ul>
                  <ul>
                    <li>
                      <span className="font-weight-bold">
                        Copyright and Intellectual Property Policy
                      </span>
                    </li>
                    <p>
                      We respond to notices of alleged copyright infringements
                      and the cancellation of the accounts of repeat infringers
                      according to the procedure established in the Digital
                      Millennium Copyright Law.&nbsp;If you believe that your
                      work has been copied in a way that constitutes copyright
                      infringement, please submit the following information to
                      the Copyright Agent mentioned below:
                    </p>
                    <ul>
                      <li>Your address, telephone number and email address.</li>
                      <li>
                        A description of the copyrighted work that you claim has
                        been infringed.
                      </li>
                      <li>
                        A description of where the alleged infringing material
                        is located.
                      </li>
                      <li>
                        A statement by you that you have a good faith belief
                        that the disputed use is not authorized by you, the
                        copyright owner, its agent, or the law.
                      </li>
                      <li>
                        An electronic or physical signature of the person
                        authorized to act on behalf of the copyright owner.
                      </li>
                      <li>
                        A statement by you, made under penalty of perjury, that
                        the above information is accurate and that you are the
                        copyright owner or authorized to act on behalf of the
                        copyright owner.
                      </li>
                    </ul>
                    <p>Copyright Agent:</p>
                    <p>
                      Famosos
                      <br />
                      10800 Biscayne Blvd Suite 560
                      <br />
                      Miami, Florida, 33161
                      <br />
                      experiences@famosos.com
                    </p>
                    <p>
                      For clarity, notifications of copyright infringement
                      should only go to our Copyright Agent.&nbsp;You
                      acknowledge that if you do not meet all the requirements
                      of this section your notice may not be valid.
                    </p>
                    <p>
                      If you believe that the content that has been removed (or
                      to which access has been disabled) is not infringing, or
                      that you have permission from the copyright owner, the
                      copyright owner's agent, or in accordance with the law, to
                      post and use such content, they can submit a response to a
                      notification to the address indicated above, which
                      contains the following information:
                    </p>
                    <ul>
                      <li>Your physical or electronic signature;</li>
                      <li>
                        Identification of the content that has been removed or
                        to which access has been disabled and the place where it
                        appeared before the content was removed or disabled;
                      </li>
                      <li>
                        A statement that you have a good faith belief that the
                        content has been removed or disabled as a result of an
                        error or misidentification of the content;
                      </li>
                      <li>
                        Your name, physical address, telephone number, and email
                        address, a statement consenting to the jurisdiction of
                        the federal court in Miami, Florida, and a statement
                        that you accept service of process from the person who
                        submitted the notice of the alleged infringement.
                      </li>
                    </ul>
                    <p>
                      After we have received your counter-notification, we will
                      forward it to the party that filed the original claim of
                      copyright infringement.&nbsp;Please note that when we
                      forward the counter notification, it includes your
                      personal information.&nbsp;By submitting a
                      counter-notification, you consent to the disclosure of
                      your information in this manner.&nbsp;We will not pass the
                      counter-notification to any party other than the original
                      plaintiff.
                    </p>
                    <p>
                      After sending the notice to the contrary, the claimant
                      must notify within 10 days that he or she has filed an
                      action to obtain a court order prohibiting your infringing
                      activity in relation to the content that has been removed
                      or disabled.&nbsp;If we receive such notification we will
                      not be able to restore the material.&nbsp;If we do not
                      receive such notification, we may reinstate the material.
                    </p>
                  </ul>
                  <ul>
                    <li>
                      <span className="font-weight-bold">Privacy</span>
                    </li>
                    <p>
                      Your privacy is very important for us.&nbsp;Our privacy
                      policy [1] explains how we collect, use, protect, and when
                      we share personal information and other data with
                      others.&nbsp;You are responsible for maintaining the
                      confidentiality of your account information, including
                      your username and password.&nbsp;You are responsible for
                      all activities that occur under your account and you agree
                      to notify us immediately of any unauthorized access or use
                      of your account.&nbsp;We are not responsible for any
                      damage or loss related to any unauthorized access or use
                      of your account.
                    </p>
                  </ul>
                  <ul>
                    <li>
                      <span className="font-weight-bold">
                        Third Party Content and Interactions
                      </span>
                    </li>
                    <p>
                      The Site and the Services may contain features and
                      functionalities that may link you or provide you with
                      access to third party content, including Famosos Videos,
                      which is completely independent from us, including
                      websites, directories, servers, networks, systems,
                      information. and databases, applications, software,
                      programs, products or services, and the Internet in
                      general.&nbsp;Your interactions with organizations or
                      individuals, including talented users, found on or through
                      the site and services are solely between you and such
                      organizations or individuals.&nbsp;You should do whatever
                      research you deem necessary or appropriate before
                      proceeding with any interaction with any of these third
                      parties.&nbsp;You agree that we are not responsible for
                      any loss or damage of any kind or nature resulting from
                      such dealings.&nbsp;If there is a conflict between users
                      of the site or services, or between users and third
                      parties, you understand and agree that we have no
                      obligation to participate.&nbsp;In the event that you have
                      a dispute with any other user of the Site or Services, we
                      hereby and our affiliates, and all of our officers,
                      employees, agents and successors of the claims, demands
                      and damages of release (actual or consequential) ) of any
                      kind or nature, known and unknown, suspected and
                      unsuspected, disclosed and undisclosed, arising out of or
                      in any way related to such conflicts or the site and the
                      Services.
                    </p>
                  </ul>
                  <ul>
                    <li>
                      <span className="font-weight-bold">Other fields</span>
                    </li>
                    <p>
                      The Site and the Services may contain links to other
                      websites and online resources.&nbsp;A link to the website
                      of a third party does not mean that we agree with it or
                      that they are affiliated with it.&nbsp;We are not
                      responsible for any damage or loss related to the use of
                      any third party website.&nbsp;You should always read the
                      terms and conditions and privacy policy of a third party
                      website before using it.
                    </p>
                  </ul>
                  <ul>
                    <li>
                      <span className="font-weight-bold">
                        Changes to the Site or Services
                      </span>
                    </li>
                    <p>
                      We improve and update the site and services often.&nbsp;We
                      may change or discontinue the Site or the Services at any
                      time, with or without prior notice.
                    </p>
                  </ul>
                  <ul>
                    <li>
                      <span className="font-weight-bold">Termination</span>
                    </li>
                    <p>
                      You can cancel your account at any time through a link
                      that appears in your account on the site.&nbsp;We reserve
                      the right not to provide the Site or the Services to
                      anyone.&nbsp;We also reserve the right to suspend the
                      right of any user to access the site or services at any
                      time, at our discretion.&nbsp;If you violate any of these
                      Terms, your permission to use the site and services
                      automatically terminates.
                    </p>
                  </ul>
                  <ul>
                    <li>
                      <span className="font-weight-bold">
                        Disclaimer and limitations of our liability
                      </span>
                    </li>{" "}
                    <p>
                      USE THE SITE AND SERVICES at your own risk.&nbsp;THE SITE
                      and services, including any FAMOSOS videos, ARE PROVIDED
                      "AS IS" AND "AS AVAILABLE".&nbsp;To the extent permitted
                      by LAW, FAMOSOS AND its officers, employees, directors,
                      shareholders, parents, subsidiaries, affiliates, agents,
                      and agents ("affiliates") decline ALL warranties,
                      conditions, and representations of ANY KIND, EXPRESS,
                      IMPLIED, LAW , OR OTHERWISE, including those related TO
                      FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT AND
                      those derived from COURSE OF MANAGEMENT OR USE OF
                      COMMERCE.
                    </p>
                    <p>
                      IN PARTICULAR, FAMOSOS AND ITS AFFILIATES, DOES NOT
                      represent or guarantee the accuracy or completeness of
                      content available on or through the site or services, or
                      the content of the websites or online services linked to
                      or integrated with the SITE or services.&nbsp;FAMOSOS and
                      its affiliates RESPONSIBLE FOR ANY: ERRORS (A), errors, or
                      inaccuracies of the contents;&nbsp;(B) INJURY OR property
                      damage caused by YOUR ACCESS OR USE OF THE SITE or
                      services;&nbsp;(C) any unauthorized access or use of our
                      servers or of any personal information or user
                      data;&nbsp;(D) any interruption of transmission TO, OR
                      FROM THE SITE or services;&nbsp;(E) any errors, viruses,
                      Trojans, OR SIMILAR that may be transmitted ON OR THROUGH
                      THE SITE or services by any third party;
                    </p>
                    <p>
                      YOU understand and agree that any material or information
                      downloaded or obtained through the use of THE SITE or
                      services, including without limitation, famous videos, is
                      done at your own risk and that YOU will be solely
                      responsible for any damages caused by doing so.&nbsp;NO
                      ADVICE OR INFORMATION, ORAL OR WRITTEN, OBTAINED BY YOU
                      FROM THE US OR THROUGH THE SITE OR THE SERVICES WARRANTY
                      NOT expressly
                    </p>
                    <p>
                      TO THE FULLEST EXTENT PERMITTED BY LAW, WE ARE IN NO EVENT
                      LIABLE TO YOU OR THIRD PARTIES for incidental, PUNITIVE,
                      OR INDIRECT, SPECIAL, CONSEQUENTIAL, (including loss of
                      profits, income, OR DATA) OR FOR THE cost of obtaining
                      replacement products. DERIVED FROM OR IN CONNECTION WITH
                      THESE TERMS, CAUSED, IF SUCH LIABILITIES ARE THE
                      CONSEQUENCE OF ANY CLAIM BASED ON CONTRACT, WARRANTY, TORT
                      (INCLUDING NEGLIGENCE), STRICT LIABILITY or not, and OR WE
                      HAVE NOT BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGES.
                    </p>
                    <p>
                      TO THE FULLEST EXTENT PERMITTED BY LAW, OUR total
                      liability accrued to you or any third party under these
                      terms, FOR ALL CAUSES OF ACTION AND ALL THEORIES OF
                      LIABILITY, WILL BE LIMITED TO, and will not exceed the
                      fees actually paid by US DURING the twelve (12) months
                      prior to the one that gives rise to said responsibility.
                    </p>
                    <p>
                      You understand and accept that we have set our prices and
                      entered into these conditions with you depending on the
                      limitations of liability established in these Terms, which
                      allocate the risk between us and form the basis of a
                      negotiation between the parties.
                    </p>
                  </ul>
                  <ul>
                    <li>
                      <span className="font-weight-bold">Compensation</span>
                    </li>
                    <p>
                      You agree to indemnify and hold Famosos and its affiliates
                      harmless from and against any and all claims, costs,
                      proceedings, demands, losses, damages, and expenses
                      (including, without limitation, reasonable attorneys' fees
                      and expenses) of any kind. or nature, arising from or
                      related to, (a) any actual or alleged violation of these
                      Terms by you or anyone who uses your account, (b) your, or
                      anyone who uses your account, violation of laws or
                      regulations , or (c) your gross negligence or
                      intent.&nbsp;If we assume the defense of such a matter,
                      you must reasonably cooperate with us in that defense.
                    </p>
                  </ul>
                  <ul>
                    <li>
                      <span className="font-weight-bold">
                        Arbitration Agreement and exemption of certain rights
                      </span>
                    </li>
                    <p>
                      You and Famosos agree that we will resolve any dispute
                      between us through binding and final arbitration rather
                      than through court process.&nbsp;You and Celebrities
                      present waive any right to a jury trial of any claim
                      (defined below).&nbsp;All controversies, claims,
                      counterclaims, or other conflicts that arise between you
                      and Celebrities related to these Terms, the Site and the
                      Services (each a "Claim") will be submitted to arbitration
                      in accordance with the Rules of the American Arbitration
                      Association ( "AAA Rules").&nbsp;The arbitration will be
                      resolved by a single arbitrator.&nbsp;The arbitrator's
                      decision in said arbitration will be final and binding for
                      the parties and can be enforced in any court of competent
                      jurisdiction.
                    </p>
                    <p>
                      If you show that the costs of the arbitration will be
                      prohibitive compared to the costs of the litigation,
                      Famosos will pay the sum of the administrative costs and
                      the arbitrator's fees necessary for the arbitration as it
                      deems necessary, the arbitrator to prevent the cost of
                      arbitration from be prohibitive.&nbsp;In the final award,
                      the arbitrator may prorate the arbitration costs and
                      arbitrator's compensation between the parties in such
                      amounts as the arbitrator deems appropriate.
                    </p>
                    <p>
                      This arbitration agreement does not prevent you or Famosos
                      from seeking action by federal, state, or local government
                      agencies.&nbsp;You and Celebrities also have the right to
                      file classification claims in claims
                      court.&nbsp;Furthermore, you and Famosos retain the right
                      to apply to any court of competent jurisdiction for
                      provisional relief, including pre-arbitration or
                      injunctive relief accessories, and such request shall not
                      be deemed inconsistent with these terms, nor a waiver of
                      the right to have disputes submitted to arbitration in
                      accordance with the provisions of these Conditions.
                    </p>
                    <p>
                      Neither you nor Famosos may act as a class representative
                      or private attorney general, or participate as a member of
                      a plaintiff class, with respect to any claim.&nbsp;Claims
                      cannot be arbitrated on a representative class or
                      basis.&nbsp;The arbitrator can only decide your individual
                      and / or Famosos claims'.&nbsp;The arbitrator may not
                      consolidate or unite the claims of other persons or
                      parties that may be similarly situated.
                    </p>
                    <p>
                      If no provision of this section is found to be invalid or
                      unenforceable, that specific provision will be of no force
                      and effect and will be severed, but the remainder of this
                      section will continue in full force and effect.&nbsp;No
                      waiver of any provision of this section of the Terms will
                      be effective or enforceable unless recorded in a writing
                      signed by the party waiving a right or
                      requirement.&nbsp;Such waiver will not be null and void or
                      affect any other part of these Terms.&nbsp;This section of
                      the Terms will survive the termination of your
                      relationship with Celebrities.
                    </p>
                    <p>
                      THIS section Limits CERTAIN RIGHTS, INCLUDING the right to
                      pursue a legal action, the right to trial by jury, the
                      right to PARTICIPATE IN ANY FORM OF CLASS OR CLAIM
                      representative, the right to participate in DISCOVERY
                      SALVO AS provided in the AAA rules, AND THE RIGHT OF
                      RESOURCES AND CERTAIN FORMS OF HELP.&nbsp;OTHER RIGHTS
                      THAT YOU OR FAMOSOS WOULD HAVE TO COURT ALSO NOT BE
                      AVAILABLE IN THE ARBITRATION.
                    </p>
                  </ul>
                  <ul>
                    <li>
                      <span className="font-weight-bold">Other provisions</span>
                    </li>
                    <p>
                      Under no circumstances is it liable for any delay or
                      failure in performance due in whole or in part to any act
                      of nature or other causes beyond our control.
                    </p>
                    <p>
                      These Terms shall be governed by and construed in
                      accordance with the laws of the State of Florida, without
                      giving effect to any conflict of laws or provisions.
                    </p>
                    <p>
                      You agree that any action of any nature arising out of or
                      related to these Terms, the Site or Services will be
                      brought only in the state or federal courts located in
                      Miami, Florida.&nbsp;You agree to and submit to the
                      personal jurisdiction of such courts for the purposes of
                      such action.
                    </p>
                    <p>
                      If any provision of these Terms is found to be illegal or
                      unenforceable, such provision will be deemed severable
                      from these Terms and will not affect the applicability of
                      the other provisions.
                    </p>
                    <p>
                      The fact that we to enforce any right or provision of
                      these Conditions will not prevent us from applying such
                      right or provision in the future.
                    </p>
                    <p>
                      We may assign our rights and obligations under these
                      terms, including in connection with a merger, acquisition,
                      sale of assets or patrimony, or by operation of law.
                    </p>
                  </ul>
                  <ul>
                    <li>
                      <span className="font-weight-bold">
                        Changes to these Terms
                      </span>
                    </li>
                    <p>
                      From time to time, we may change these Terms.&nbsp;If we
                      change these conditions, we will give you notice by
                      posting the revised terms on the site.&nbsp;These changes
                      will take effect on the revision date shown in the revised
                      terms.&nbsp;By continuing to use the Site or the Services,
                      you agree to the revised terms.
                    </p>
                    <p className="font-weight-bold">
                      Please print a copy of these Terms for your records and
                      check the site frequently for any changes to these Terms.
                    </p>
                  </ul>
                  <h5 className="text-align-center">
                    <strong>Talent Terms of Service</strong>
                  </h5>
                  <p>Revised: March 28, 2020</p>
                  <p>
                    These Terms of Service ("Terms") govern your use of the
                    Famosos website ("Site") and any Famosos mobile applications
                    and other services offered by Famosos, Inc. ("Services").
                    Famosos, Inc. ("we." "Us" or "celebrities") provides the
                    site and services.&nbsp;"You" refers to you as a user
                    athlete or influencer of the Site or the Services.
                  </p>
                  <p>
                    By clicking "I AGREE" OR BY USING THE SITE OR SERVICES, you
                    agree to these terms.&nbsp;PLEASE READ CAREFULLY.
                  </p>
                  <ul>
                    <li>
                      <span className="font-weight-bold">Obligations</span>
                    </li>
                    <p>
                      You agree to record and upload to the site using the
                      services of one (1) video recording for each user ("End
                      User") who requests said recording of you ("Famosos
                      Video"); as long as, in the case of a schedule or other
                      conflict, you can reject the request within a period of
                      seven (7) days. Each video message will be approximately
                      fifteen seconds (15) in duration and will be made in
                      accordance with the general instructions and requests of
                      the end user (please! example, birthday message, or a
                      &ldquo;good luck!&rdquo; message). You will have sole
                      discretion over the script and content of any video
                      message. You may refuse to create or upload a video
                      message if an end user's request is objectionable or
                      offensive. for you at your own discretion.You must reject
                      the request within seven (7) days.All video messages must
                      be uploaded within seven (7) days of the request.
                    </p>
                    <p>
                      Additional promotional materials.&nbsp;You provide us with
                      the following promotional materials ("Promotion
                      Materials") upon completion of account registration and
                      creation of: (1) to ten (10) high resolution images of the
                      same and (2) Site profile bio. From time to time we may
                      request additional promotional materials.
                    </p>
                  </ul>
                  <ul>
                    <li>
                      <span className="font-weight-bold">Fees and Payment</span>
                      <p>
                        Tuition: Subject to these Terms, we will pay
                        seventy-five percent (75%) of the revenue received by
                        Celebrities from each end user;&nbsp;video sold by you
                        on the website.&nbsp;You set your own price for each
                        famosos video, provided, however, that the price must be
                        at least five dollars ($ 5) per video
                        message.&nbsp;Famosos Videos are non-guild activities
                        and there will be no residual or any other type of
                        payment to be due in connection with them.
                      </p>
                      <p>
                        Payment: You must register with Zelle or PayPal and
                        provide the required bank account information in order
                        to receive payment from Famosos.&nbsp;Payment will be
                        made within five (5) business days after receipt of
                        payment by the end user.&nbsp;Zelle or PayPal is not
                        operated by or associated with Famosos and your use of
                        Zelle or PayPal is subject to their terms.&nbsp;We
                        reserve the right to change payment providers at any
                        time and to require you to register with that new
                        payment provider.&nbsp;We are not responsible for delays
                        or failures to receive payment caused by a third party
                        payment provider or due to your lack of timely
                        information and properly setting up an account with the
                        payment provider or otherwise providing requested for
                        payment.
                      </p>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <span className="font-weight-bold">User content</span>
                    </li>
                    <p>
                      The site and some of our services allow you to upload,
                      send, store, send or receive content and data, including
                      your video messages and promotional materials ("User
                      Content"). You retain ownership of the intellectual
                      property rights that you have in your user content.
                    </p>
                    <p>
                      By uploading, sending, storing, sending or receiving user
                      content through the site or services, you give us
                      permission to reproduce and use your user content as
                      follows: it is granted to us and those of us who work
                      under a license of use, host, store, reproduce, modify,
                      create derivative works (such as translations, adaptations
                      or other changes we make so that user content works better
                      with the site and services), publicly perform, publicly
                      display and distribute your content from user on the site
                      and also on social networks and on other websites and
                      media.&nbsp;This license is for the limited purpose of
                      operating, promoting and improving the site and services,
                      and to develop new services.&nbsp;Our license for your
                      user content is not exclusive,&nbsp;which means that you
                      can use user content for their own purposes or let others
                      use your user content for their purposes.&nbsp;This
                      license is fully paid and royalty-free, which means that I
                      do not owe you anything else in connection with the use of
                      your user content.&nbsp;We can exercise our rights under
                      this license anywhere in the world.&nbsp;We may sublicense
                      our rights to end users and otherwise as necessary to
                      provide the site and services.&nbsp;Finally, this license
                      is perpetual, which means that our rights under this
                      license continue even after we stop using the Site and
                      Services.&nbsp;You agree that we may display advertising
                      with or in connection with your user content.&nbsp;which
                      means that our rights under this license continue even
                      after you stop using the Site and Services.&nbsp;You agree
                      that we may display advertising with or in connection with
                      your user content.&nbsp;which means that our rights under
                      this license continue even after you stop using the Site
                      and Services.&nbsp;You agree that we may display
                      advertising with or in connection with your user content.
                    </p>
                    <p>You represent and warrant that:</p>
                    <ul>
                      <li>
                        You are the owner of all rights and your user content
                        and you have the right to give us the aforementioned
                        rights;&nbsp;that you have paid and will pay all fees or
                        other payments that may be related to the use of your
                        user content;&nbsp;and its user content does not
                        infringe the intellectual property rights, privacy
                        rights, publicity rights, or other legal rights of third
                        parties.
                      </li>
                      <li>
                        Any user content will be non-confidential and
                        non-proprietary and you will not be responsible for any
                        use or disclosure of user content.&nbsp;You acknowledge
                        and agree that your relationship with us is not a
                        confidential, fiduciary, or other type of special
                        relationship, and that your decision to present any user
                        content does not place us in a position that is
                        different from the position held by the members of the
                        general public, in particular with regard to your user
                        content.&nbsp;None of your User Content will be subject
                        to any obligation of confidentiality on our part and you
                        will not be responsible for any use or disclosure of any
                        User Content that you provide.
                      </li>
                      <li>
                        We may refuse to accept or transmit User Content for any
                        reason.&nbsp;We may remove User Content from the Site or
                        Services for any reason.
                      </li>
                      <li>
                        If you cancel your Famosos account, you can request that
                        your videos no longer be displayed on the website and
                        requests for new videos are not received.&nbsp;We
                        cannot, however, restrict the use of video messages by
                        the end users for whom you created them and we cannot
                        remove any other existing uses of your video messages.
                      </li>
                    </ul>
                    <li>
                      <span className="font-weight-bold">Property</span>
                    </li>
                    <p>
                      Apart from user content, we own or license all rights,
                      titles and interests in and to (a) the site and services,
                      including all software, text, multimedia and other content
                      available on the site and services (&ldquo;Our content ");
                      and (b) trademarks, logos, and brand features (" Marks ").
                      The site and services, our content, and Marks are
                      protected by US and international law. The look and feel
                      of the site and Services are copyright &copy; Famosos,
                      Inc. All rights reserved User may not duplicate, copy,
                      reuse or any part of HTML / CSS, JavaScript, or visual
                      design elements or concepts without express written
                      permission from us .
                    </p>
                    <li>
                      <span className="font-weight-bold">Additional terms</span>
                      <p>
                        Some of our services have additional terms and
                        conditions ("Additional Terms"). When Additional
                        Conditions apply to a service, we will make them
                        available for reading through the use of that service.
                        By using that Service, accept the additional terms.
                      </p>
                    </li>
                    <li>
                      <span className="font-weight-bold">Eligibility</span>
                    </li>
                    <p>
                      You must be at least 13 years old to use the site or
                      services.&nbsp;If you are a minor in your state of
                      residence, a minor, your parent or legal guardian must
                      agree to these terms on your behalf and that you can only
                      access and use the site and services with your parent's
                      permission. or legal guardian.
                    </p>
                  </ul>
                  <ul>
                    <li>
                      <span className="font-weight-bold">
                        Acceptable use of the site and services
                      </span>
                    </li>
                    <p>
                      You are responsible for the use of the site and services,
                      and for any use of the site or services placed through
                      your account.&nbsp;Our goal is to create a positive,
                      helpful and safe user experience.&nbsp;To further this
                      goal, we prohibit certain types of conduct that may be
                      harmful to other users or to us.&nbsp;When using the site
                      or services, you cannot: Violate any law or
                      regulation;&nbsp;violate, infringe, or misappropriate
                      other people's intellectual property, privacy, publicity,
                      or other legal rights;&nbsp;post or share anything that is
                      illegal, abusive, harassing, damaging to reputation,
                      pornographic, indecent, profane, obscene, hateful, racist,
                      or in any other way;&nbsp;send unsolicited or unauthorized
                      advertising or commercial communications,&nbsp;such as
                      spam;&nbsp;participate in tracking or harvesting, or
                      participate in the use of software, such as spyware,
                      designed to collect data from the site or
                      services;&nbsp;transmit any type of virus or other
                      computer instructions or technological means whose purpose
                      is to alter, damage or interfere with the use of computers
                      or related systems;&nbsp;stalk, harass or harm another
                      person;&nbsp;impersonate another person or entity, or
                      carry out any other similar fraudulent activity, such as
                      phishing;&nbsp;damage or interfere with the use of
                      computers or related systems;&nbsp;stalk, harass or harm
                      another person;&nbsp;impersonate another person or entity,
                      or carry out any other similar fraudulent activity, such
                      as phishing;&nbsp;damage or interfere with the use of
                      computers or related systems;&nbsp;stalk, harass or harm
                      another person;&nbsp;impersonate another person or entity,
                      or carry out any other similar fraudulent activity, such
                      as phishing;
                    </p>
                    <p>
                      use any means to scrape or track any web page contained in
                      the site;
                    </p>
                    <p>
                      attempt to circumvent any technological measure
                      implemented by us or one of our suppliers or any other
                      third party (including another user) to protect the Site
                      or the Services;
                    </p>
                    <p>
                      attempt to decipher, compile, or reverse engineer any of
                      the software or other underlying code used to provide the
                      Site or the Services;&nbsp;or promote, encourage or assist
                      a third party in doing any of the above.
                    </p>
                    <p>
                      You acknowledge that we are not required to control your
                      (or anyone else's) access to or use of the Site or the
                      Services, but we have the right to do so in order to
                      operate the site or services, to ensure your compliance
                      with these Terms. , or to comply with applicable law or
                      the order or requirement of a court, administrative
                      agency, or other governmental entity.
                    </p>
                  </ul>
                  <ul>
                    <li>
                      <span className="font-weight-bold">
                        Copyright and Intellectual Property Policy
                      </span>
                    </li>
                    <p>
                      We respond to notices of alleged copyright infringements
                      and the cancellation of the accounts of repeat infringers
                      according to the procedure established in the Digital
                      Millennium Copyright Law.&nbsp;If you believe that your
                      work has been copied in a way that constitutes copyright
                      infringement, please submit the following information to
                      the Copyright Agent mentioned below:
                    </p>
                    <ul>
                      <li>Your address, telephone number and email address.</li>
                      <li>
                        A description of the copyrighted work that you claim has
                        been infringed.
                      </li>
                      <li>
                        A description of where the alleged infringing material
                        is located.
                      </li>
                      <li>
                        A statement by you that you have a good faith belief
                        that the disputed use is not authorized by you, the
                        copyright owner, its agent, or the law.
                      </li>
                      <li>
                        An electronic or physical signature of the person
                        authorized to act on behalf of the copyright owner.
                      </li>
                      <li>
                        A statement by you, made under penalty of perjury, that
                        the above information is accurate and that you are the
                        copyright owner or authorized to act on behalf of the
                        copyright owner.
                      </li>
                    </ul>
                    <p>Copyright Agent:</p>
                    <p>
                      Famosos
                      <br />
                      10800 Biscayne Blvd Suite 560
                      <br />
                      Miami, Florida, 33161
                      <br />
                      experiences@famosos.com
                    </p>
                    <p>
                      For clarity, notifications of copyright infringement
                      should only go to our Copyright Agent.&nbsp;You
                      acknowledge that if you do not meet all the requirements
                      of this section your notice may not be valid.
                    </p>
                    <p>
                      If you believe that the content that has been removed (or
                      to which access has been disabled) is not infringing, or
                      that you have permission from the copyright owner, the
                      copyright owner's agent, or in accordance with the law, to
                      post and use such content, they can submit a response to a
                      notification to the address indicated above, which
                      contains the following information:
                    </p>
                    <ul>
                      <ul>
                        <li>Your physical or electronic signature;</li>
                        <li>
                          Identification of the content that has been removed or
                          to which access has been disabled and the place where
                          it appeared before the content was removed or
                          disabled;
                        </li>
                        <li>
                          A statement that you have a good faith belief that the
                          content has been removed or disabled as a result of an
                          error or misidentification of the content;&nbsp;and
                          your name, physical address, telephone number, and
                          email address, a statement consenting to the
                          jurisdiction of the federal court in Miami, Florida,
                          and a statement that you accept service of process
                          from the person who filed the notification of the
                          alleged infringement.
                        </li>
                      </ul>
                    </ul>
                    <p>
                      After we have received your counter-notification, we will
                      forward it to the party that filed the original claim of
                      copyright infringement.&nbsp;Please note that when we
                      forward the counter-notification, it includes your
                      personal information.&nbsp;By submitting a
                      counter-notification, you consent to the disclosure of
                      your information in this manner.&nbsp;We will not pass the
                      counter-notification to any party other than the original
                      plaintiff.
                    </p>
                    <p>
                      After sending the notice to the contrary, the claimant
                      must notify within 10 days that he or she has filed an
                      action to obtain a court order prohibiting your infringing
                      activity in relation to the content that has been removed
                      or disabled.&nbsp;If we receive such notification we will
                      not be able to restore the material.&nbsp;If we do not
                      receive such notification, we may reinstate the material.
                    </p>
                  </ul>
                  <ul>
                    <li>
                      <span className="font-weight-bold">Privacy</span>
                    </li>
                    <p>
                      Your privacy is very important for us.&nbsp;Our privacy
                      policy explains how we collect, use, protect, and when we
                      share personal information and other data with
                      others.&nbsp;You are responsible for maintaining the
                      confidentiality of your account information, including
                      your username and password.&nbsp;You are responsible for
                      all activities that occur under your account and you agree
                      to notify us immediately of any unauthorized access or use
                      of your account.&nbsp;We are not responsible for any
                      damage or loss related to any unauthorized access or use
                      of your account.
                    </p>
                  </ul>
                  <ul>
                    <li>
                      <span className="font-weight-bold">
                        Third Party Content and Interactions
                      </span>
                    </li>
                    <p>
                      The Site and the Services may contain features and
                      functionality that may link you to or provide you with
                      access to third-party content that is completely
                      independent from us, including websites, directories,
                      servers, networks, systems, information and databases,
                      applications, software , programs, products or services,
                      and the Internet in general.&nbsp;Your interactions with
                      organizations or individuals, including end users, found
                      on or through the site and services are solely between you
                      and such organizations or individuals.&nbsp;You should do
                      whatever research you deem necessary or appropriate before
                      proceeding with any interaction with any of these third
                      parties.&nbsp;You agree that we are not responsible for
                      any loss or damage of any kind or nature resulting from
                      such dealings.&nbsp;If there is a conflict between users
                      of the site or services, or between users and third
                      parties, you understand and agree that we have no
                      obligation to participate.&nbsp;In the event that you have
                      a dispute with any other user of the Site or Services, we
                      hereby and our affiliates, and all of our officers,
                      employees, agents and successors of the claims, demands
                      and damages of release (actual or consequential) ) of any
                      kind or nature, known and unknown, suspected and
                      unsuspected, disclosed and undisclosed, arising out of or
                      in any way related to such conflicts or the site and the
                      Services.&nbsp;IF YOU ARE A CALIFORNIA RESIDENT,
                    </p>
                  </ul>
                  <ul>
                    <li>
                      <span className="font-weight-bold">
                        Independent contractor
                      </span>
                    </li>
                    <p>
                      You and Famosos accept and declare that these conditions
                      create an independent contractor relationship and it is
                      the express intention of the parties that their
                      relationship is interpreted and maintained to be that of
                      an independent contractor for all purposes.&nbsp;You are
                      not in franchise negotiations, nor are you a partner,
                      agent or employee of Famosos.&nbsp;You are solely and
                      exclusively responsible for determining the manner,
                      method, details and means of your performance under these
                      conditions.&nbsp;We do not have the right to, and will not
                      be, control the manner or determine the method of
                      achieving its performance.&nbsp;You assume sole
                      responsibility for and will pay all employment taxes
                      (including social security), income taxes, and other
                      reports required for your activities under these Terms and
                      will comply with all federal laws,&nbsp;state and local
                      laws governing its operation under these
                      conditions.&nbsp;That you will use your own equipment to
                      carry out your obligations under these terms.&nbsp;You are
                      solely responsible for any information required by law or
                      any agreement you may have with third parties to any
                      person or entity in connection with the performance of
                      this Agreement.&nbsp;The relationship between the parties
                      is non-exclusive, which means that you can provide similar
                      services to other organizations on terms and times
                      determined by you and that we can and do not involve
                      others to provide services similar to those contemplated
                      in these Conditions.&nbsp;You are solely responsible for
                      any information required by law or any agreement you may
                      have with third parties to any person or entity in
                      connection with the performance of this
                      Agreement.&nbsp;The relationship between the parties is
                      non-exclusive, which means that you can provide similar
                      services to other organizations on terms and times
                      determined by you and that we can and do not involve
                      others to provide services similar to those contemplated
                      in these Conditions.&nbsp;You are solely responsible for
                      any information required by law or any agreement you may
                      have with third parties to any person or entity in
                      connection with the performance of this
                      Agreement.&nbsp;The relationship between the parties is
                      non-exclusive, which means that you can provide similar
                      services to other organizations on terms and times
                      determined by you and that we can and do not involve
                      others to provide services similar to those contemplated
                      in these Conditions.
                    </p>
                  </ul>
                  <ul>
                    <li>
                      <span className="font-weight-bold">Other fields</span>
                    </li>
                    <p>
                      The Site and the Services may contain links to other
                      websites and online resources.&nbsp;A link to the website
                      of a third party does not mean that we agree with it or
                      that they are affiliated with it.&nbsp;We are not
                      responsible for any damage or loss related to the use of
                      any third party website.&nbsp;You should always read the
                      terms and conditions and privacy policy of a third party
                      website before using it.
                    </p>
                  </ul>
                  <ul>
                    <li>
                      <span className="font-weight-bold">Other fields</span>
                    </li>
                    <p>
                      We improve and update the site and services often.&nbsp;We
                      may change or discontinue the Site or the Services at any
                      time, with or without prior notice.
                    </p>
                  </ul>
                  <ul>
                    <li>
                      <span className="font-weight-bold">Termination</span>
                    </li>
                    <p>
                      You can cancel your account at any time through a link
                      that appears in your account on the site.&nbsp;We reserve
                      the right not to provide the Site or the Services to
                      anyone.&nbsp;We also reserve the right to suspend the
                      right of any user to access the site or services at any
                      time, at our discretion.&nbsp;If you violate any of these
                      Terms, your permission to use the site and services
                      automatically terminates.
                    </p>
                  </ul>
                  <ul>
                    <li>
                      <span className="font-weight-bold">
                        Disclaimer and limitations of our liability
                      </span>
                    </li>
                    <p>
                      USE THE SITE AND SERVICES at your own risk.&nbsp;THE SITE
                      and services are provided "AS IS" AND "AS
                      AVAILABLE".&nbsp;To the extent permitted by LAW, FAMOSOS
                      AND its officers, employees, directors, shareholders,
                      parents, subsidiaries, affiliates, agents, and agents
                      ("affiliates") decline ALL warranties, conditions, and
                      representations of ANY KIND, EXPRESS, IMPLIED, LAW , OR
                      OTHERWISE, including those related TO FITNESS FOR A
                      PARTICULAR PURPOSE, AND NON-INFRINGEMENT AND those derived
                      from COURSE OF MANAGEMENT OR USE OF TRADE.
                    </p>
                    <p>
                      IN PARTICULAR, FAMOSOS AND ITS AFFILIATES, DOES NOT
                      represent or guarantee the accuracy or completeness of
                      content available through the site or services, or the
                      content of the websites or online services linked to or
                      integrated with the SITE or services.&nbsp;FAMOSOS and its
                      affiliates RESPONSIBLE FOR ANY: ERRORS (A), errors, or
                      inaccuracies of the contents;&nbsp;(B) INJURY OR property
                      damage caused by YOUR ACCESS OR USE OF THE SITE or
                      services;&nbsp;(C) any unauthorized access or use of our
                      servers or of any personal information or user
                      data;&nbsp;(D) any interruption of transmission TO, OR
                      FROM THE SITE or services;&nbsp;(E) any errors, viruses,
                      Trojans, OR SIMILAR that may be transmitted ON OR THROUGH
                      THE SITE or services by any third party;
                    </p>
                    <p>
                      YOU understand and agree that any material or information
                      DOWNLOADED OR OBTAINED THROUGH THE USE OF THE SITE or
                      services is done at your own risk and that YOU will be
                      solely responsible for any damages caused by doing
                      so.&nbsp;NO ADVICE OR INFORMATION, ORAL OR WRITTEN,
                      OBTAINED BY YOU FROM THE US OR THROUGH THE SITE OR THE
                      SERVICES WARRANTY NOT expressly
                    </p>
                    <p>
                      TO THE FULLEST EXTENT PERMITTED BY LAW, WE ARE IN NO EVENT
                      LIABLE TO YOU OR THIRD PARTIES for incidental, PUNITIVE,
                      OR INDIRECT, SPECIAL, CONSEQUENTIAL, (including loss of
                      profits, income, OR DATA) OR FOR THE cost of obtaining
                      replacement products. DERIVED FROM OR IN CONNECTION WITH
                      THESE TERMS, CAUSED, IF SUCH LIABILITIES ARE THE
                      CONSEQUENCE OF ANY CLAIM BASED ON CONTRACT, WARRANTY, TORT
                      (INCLUDING NEGLIGENCE), STRICT LIABILITY or not, and OR WE
                      HAVE NOT BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGES.
                    </p>
                    <p>
                      TO THE FULLEST EXTENT PERMITTED BY LAW, OUR total
                      liability accrued to you or any third party under these
                      terms, FOR ALL CAUSES OF ACTION AND ALL THEORIES OF
                      LIABILITY, WILL BE LIMITED TO, and will not exceed the
                      fees actually paid by US DURING the twelve (12) months
                      prior to the one that gives rise to said responsibility.
                    </p>
                    <p>
                      You understand and accept that we have set our prices and
                      entered into these conditions with you depending on the
                      limitations of liability established in these Terms, which
                      allocate the risk between us and form the basis of a
                      negotiation between the parties.
                    </p>
                  </ul>
                  <ul>
                    <li>
                      <span className="font-weight-bold">Compensation</span>
                    </li>
                    <p>
                      You agree to indemnify and hold Famosos and its affiliates
                      harmless from and against any and all claims, costs,
                      proceedings, demands, losses, damages, and expenses
                      (including, without limitation, reasonable attorneys' fees
                      and expenses) of any kind. or nature, arising from or
                      related to, (a) any actual or alleged violation of these
                      Terms by you or anyone who uses your account, (b) your, or
                      anyone who uses your account, violation of laws or
                      regulations , or (c) your gross negligence or
                      intent.&nbsp;If we assume the defense of such a matter,
                      you must reasonably cooperate with us in that defense.
                    </p>
                  </ul>
                  <ul>
                    <li>
                      <span className="font-weight-bold">
                        Arbitration Agreement and exemption of certain rights
                      </span>
                    </li>
                    <p>
                      You and Famosos agree that we will resolve any dispute
                      between us through binding and final arbitration rather
                      than through court process.&nbsp;You and Celebrities
                      present waive any right to a jury trial of any claim
                      (defined below).&nbsp;All controversies, claims,
                      counterclaims, or other conflicts that arise between you
                      and Celebrities related to these Terms, the Site and the
                      Services (each a "Claim") will be submitted to arbitration
                      in accordance with the Rules of the American Arbitration
                      Association ( "AAA Rules").&nbsp;The arbitration will be
                      resolved by a single arbitrator.&nbsp;The arbitrator's
                      decision in said arbitration will be final and binding on
                      the parties and can be enforced in any court of competent
                      jurisdiction.
                    </p>
                    <p>
                      If you demonstrate that the costs of the arbitration will
                      be prohibitive compared to the costs of the litigation,
                      Famosos will pay the sum of the administrative costs and
                      the arbitrator's fees necessary for the arbitration as it
                      deems necessary, the arbitrator to prevent the cost of the
                      arbitration from be prohibitive.&nbsp;In the final award,
                      the arbitrator may prorate the arbitration costs and
                      arbitrator's compensation between the parties in such
                      amounts as the arbitrator deems appropriate.
                    </p>
                    <p>
                      This arbitration agreement does not prevent you or Famosos
                      from seeking action by federal, state, or local government
                      agencies.&nbsp;You and Celebrities also have the right to
                      file classification claims in claims
                      court.&nbsp;Furthermore, you and Famosos retain the right
                      to apply to any court of competent jurisdiction for
                      provisional relief, including pre-arbitration or
                      injunctive relief accessories, and such request shall not
                      be deemed inconsistent with these terms, nor a waiver of
                      the right to have disputes submitted to arbitration in
                      accordance with the provisions of these Conditions.
                    </p>
                    <p>
                      Neither you nor Famosos may act as a class representative
                      or private attorney general, or participate as a member of
                      a plaintiff class, with respect to any claim.&nbsp;Claims
                      cannot be arbitrated on a representative class or
                      basis.&nbsp;The arbitrator can only decide your individual
                      and / or Famous claims'.&nbsp;The arbitrator may not
                      consolidate or unite the claims of other persons or
                      parties that may be similarly situated.
                    </p>
                    <p>
                      If no provision of this section is found to be invalid or
                      unenforceable, that specific provision will be of no force
                      and effect and will be severed, but the remainder of this
                      section will continue in full force and effect.&nbsp;No
                      waiver of any provision of this section of the Terms will
                      be effective or enforceable unless recorded in a writing
                      signed by the party waiving a right or
                      requirement.&nbsp;Such waiver will not be null and void or
                      affect any other part of these Terms.&nbsp;This section of
                      the Terms will survive the termination of your
                      relationship with Celebrities
                    </p>
                    <p>
                      THIS SECTION LIMITS CERTAIN RIGHTS, INCLUDING the right to
                      pursue a legal action, the right to trial by jury, the
                      right to PARTICIPATE IN ANY FORM OF CLASS OR CLAIM
                      representative, the right to participate in DISCOVERY
                      SALVO AS provided in the AAA rules, AND THE RIGHT OF
                      RESOURCES AND CERTAIN FORMS OF HELP.&nbsp;OTHER RIGHTS
                      THAT YOU OR FAMOUS PEOPLE WOULD HAVE TO COURT ALSO NOT BE
                      AVAILABLE IN THE ARBITRATION.
                    </p>
                  </ul>
                  <ul>
                    <li>
                      <span className="font-weight-bold">Other provisions</span>
                    </li>
                    <p>
                      Under no circumstances is it liable for any delay or
                      failure in performance due in whole or in part to any act
                      of nature or other causes beyond our control.
                    </p>
                    <p>
                      These Terms shall be governed by and construed in
                      accordance with the laws of the State of Florida, without
                      giving effect to any conflict of laws or provisions.
                    </p>
                    <p>
                      You agree that any action of any nature arising out of or
                      related to these Terms, the Site or Services will be
                      brought only in the state or federal courts located in
                      Miami, Florida.&nbsp;You agree to and submit to the
                      personal jurisdiction of such courts for the purposes of
                      such action.
                    </p>
                    <p>
                      If any provision of these Terms is found to be illegal or
                      unenforceable, such provision will be deemed severable
                      from these Terms and will not affect the applicability of
                      the other provisions.
                    </p>
                    <p>
                      The fact that we to enforce any right or provision of
                      these Conditions will not prevent us from applying such
                      right or provision in the future.
                    </p>
                    <p>
                      We may assign our rights and obligations under these
                      terms, including in connection with a merger, acquisition,
                      sale of assets or patrimony, or by operation of law.
                    </p>
                  </ul>
                  <ul>
                    <li>
                      <span className="font-weight-bold">
                        Changes to these Terms
                      </span>
                    </li>
                    <p>
                      From time to time, we may change these Terms.&nbsp;If we
                      change these conditions, we will give you notice by
                      posting the revised terms on the site.&nbsp;These changes
                      will take effect on the revision date shown in the revised
                      terms.&nbsp;By continuing to use the Site or the Services,
                      you agree to the revised terms.
                    </p>
                  </ul>
                  <p>&nbsp;</p>
                </>
              </Maybe>
            }
          </div>
        </PageContainer>
      </div>
    );
  }
}

const _TermsPage = withRouter(TermsPage);

export { _TermsPage as TermsPage };
