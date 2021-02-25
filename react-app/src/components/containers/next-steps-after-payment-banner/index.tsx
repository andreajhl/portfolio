import React from "react";
import styled from "styled-components";
import Link from "next/link";

type NextStepsAfterPaymentBannerProps = {
  celebrityName: string;
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
  celebrityName
}: NextStepsAfterPaymentBannerProps) => {
  return (
    <ContainerBanner>
      <BannerTitle>Siguientes pasos:</BannerTitle>
      <br></br>
      <div className="mt-3">
        <TextSteps>
          {celebrityName} tiene un plazo de 7 días para grabar tu video a partir
          de ahora.
        </TextSteps>
      </div>
      <div className="mt-3">
        <TextSteps>
          Recibirás una notificación a correocliente@dominio.com cuando tu video
          esté listo.
        </TextSteps>
      </div>
      <div className="mt-3">
        <TextSteps>
          El cobro a tu cuenta se realizará una vez que {celebrityName} grabe tu
          video. (por ahora solo se realizó una autorización por parte de tu
          banco).{" "}
        </TextSteps>
      </div>
      <div className="mt-3">
        <TextSteps>¿Qué significa una autorización de pago?</TextSteps>
      </div>
      <div className="mt-3">
        <TextSteps>
          Si todo está bien con tu solicitud de acuerdo a nuestra políticas, muy
          pronto podrás disfrutar de tu videomensaje.
        </TextSteps>
      </div>
      <div className="mt-3">
        <TextSteps>
          Si por alguna razón tu video no pudo ser grabado, nos pondremos en
          contacto contigo para notificarte.
        </TextSteps>
      </div>
      <ContainerNavigationButtons>
        <ButtonBlack className="btn mb-4">
          <Link href="/">
            <SpanLink>Seguir Comprando</SpanLink>
          </Link>
        </ButtonBlack>
        <Link href="/my-account/hirings">
          <SpanWithMousePointer>
            Ir a Mis Contrataciones{" "}
            <i className="fas fa-long-arrow-alt-right"></i>
          </SpanWithMousePointer>
        </Link>
      </ContainerNavigationButtons>
    </ContainerBanner>
  );
};

export default NextStepsAfterPaymentBanner;
