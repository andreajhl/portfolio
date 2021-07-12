import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { FormattedMessage } from "react-intl";

type NextStepsAfterPaymentBannerProps = {
  celebrityName: string;
  deliveryContact: string;
};

const ContainerBanner = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  height: 100%;
  justify-content: center;
  @media (min-width: 600px) {
    align-items: flex-start;
  }
`;
const TextSteps = styled.span`
  font-size: 16px;
  color: #535353;
`;
const LinkSteps = styled(TextSteps)`
  text-decoration-line: underline;
`;

const ButtonBlack = styled.button`
  width: 100%;
  background-color: black;
  border-radius: "5px";
  margin-top: 20px;
  height: 55px;
  &:hover {
    color: white;
  }
  @media (min-width: 1024px) {
    width: 40%;

    height: 62px;
  }
`;
const BannerTitle = styled.span`
  align-self: flex-start;
  font-weight: bold;
  color: black;
  @media (min-width: 1024px) {
    align-items: flex-start;
    font-size: 1.4rem;
  }
`;

const ContainerNavigationButtons = styled.div`
  display: flex;
  flex-flow: column;
  width: 80%;
  align-items: center;
  @media (min-width: 600px) {
    margin-top: 1.2rem;
    width: 90%;
    align-items: center;
  }
  @media (min-width: 1024px) {
    flex-flow: row;
  }
`;

const SpanLink = styled.span`
  color: white;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;
const SpanWithMousePointer = styled.span`
  color: black;
  font-weight: bold;
  cursor: pointer;
  @media (min-width: 1024px) {
    margin-left: auto;
  }
`;
const NextStepsAfterPaymentBanner = ({
  celebrityName,
  deliveryContact,
}: NextStepsAfterPaymentBannerProps) => {
  return (
    <ContainerBanner>
      <BannerTitle>
        <FormattedMessage defaultMessage="Siguientes pasos:" />
      </BannerTitle>
      <br></br>
      <div className="mt-3">
        <TextSteps>
          <FormattedMessage
            defaultMessage="{celebrityName} tiene un plazo de 7 días para grabar tu video a partir
          de ahora."
            values={{
              celebrityName: celebrityName,
            }}
          />
        </TextSteps>
      </div>
      <div className="mt-3">
        <TextSteps>
          <FormattedMessage
            defaultMessage="Recibirás una notificación a {deliveryContact} cuando tu video
          esté listo."
            values={{
              deliveryContact: deliveryContact,
            }}
          />
        </TextSteps>
      </div>
      <div className="mt-3">
        <TextSteps>
          <FormattedMessage
            defaultMessage="El cargo que percibirás en tu cuenta es una autorización de pago
             que tu banco hace para asegurarse que existen fondos suficientes, sin embargo 
             Famosos no hará el cobro hasta que {celebrityName} grabe tu video."
            values={{
              celebrityName: celebrityName,
            }}
          />
        </TextSteps>
      </div>
      <div className="mt-3">
        <a
          target="_blank"
          referrerPolicy="no-referrer"
          rel="noreferrer"
          href="https://pagos.famosos.com/autorizaciondepago"
        >
          <LinkSteps>
            <FormattedMessage defaultMessage="¿Qué significa una autorización de pago?" />
          </LinkSteps>
        </a>
      </div>
      <div className="mt-3">
        <TextSteps>
          <FormattedMessage
            defaultMessage="Si todo está bien con tu solicitud de acuerdo a nuestra políticas, muy
          pronto podrás disfrutar de tu videomensaje."
          />
        </TextSteps>
      </div>
      <div className="mt-3">
        <TextSteps>
          <FormattedMessage
            defaultMessage="Si por alguna razón tu video no pudo ser grabado, nos pondremos en
          contacto contigo para notificarte."
          />
        </TextSteps>
      </div>
      <ContainerNavigationButtons>
        <Link href="/">
          <ButtonBlack className="btn mb-4">
            <SpanLink>
              <FormattedMessage defaultMessage="Seguir Comprando" />
            </SpanLink>
          </ButtonBlack>
        </Link>
        <Link href="/my-account/hirings">
          <SpanWithMousePointer>
            <FormattedMessage defaultMessage="Ir a Mis Contrataciones" />
            <i className="fas fa-long-arrow-alt-right"></i>
          </SpanWithMousePointer>
        </Link>
      </ContainerNavigationButtons>
    </ContainerBanner>
  );
};

export default NextStepsAfterPaymentBanner;
