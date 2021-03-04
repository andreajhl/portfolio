import React from "react";
import styled from "styled-components";
import ResumenStatusPayment from "../../containers/resumen-status-payment";
import { useRouter } from "next/router";
import { HIRING_EDITOR, PAYMENT_METHODS } from "../../../routing/Paths";

const ResumenContractRejected = ({ resumen }) => {
  const HeroDiv = styled.div`
    background-color: black;
    height: 180px;
    display: flex;
    justify-content: center;
    flex-flow: column;
    align-items: center;
  `;
  const HeroTextApproved = styled.div`
    h2 {
      text-align: center;
      color: white;
      font-weight: bold;
      margin-top: 20px;
      font-size: 22px;
    }
    /* font-weight: bold; */
  `;

  const ResumendContractDiv = styled.div`
    display: flex;
    height: min-height;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    margin: 0 auto;
    height: 75vh;
  `;

  const ContainerDetailsContractDiv = styled.div`
    display: flex;
    flex: 1 1 40%;
    padding-top: 40px;
    align-content: center;
    background-color: #fcfcfc;
    flex-flow: column;
    justify-content: center;
  `;

  const DetailsContracDiv = styled.div`
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    max-width: 500px;
  `;

  const InstructionsDetails = styled.div`
    display: flex;
    flex-flow: column;
  `;

  const SpanBoldGray = styled.span`
    font-weight: bold;
    color: #535353;
  `;

  const SpanGray = styled.span`
    color: #535353;
  `;

  const CelebrityDetails = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    img {
      height: 70px;
    }
    div {
      flex: 0 1 200px;
      span {
        font-weight: bold;
        text-align: center;
        font-size: 0.85rem;
      }
    }
  `;

  const ResumenContainer = styled.div`
    @media (min-width: 600px) {
      width: 80%;
      margin: 0 auto;
    }
  `;

  const ResumenPaymentRejected = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    flex: 0 0 80%;
    @media (min-width: 600px) {
      flex: 0 0 50%;
      width: 100%;
      align-items: center;
      justify-content: center;
    }
    @media (min-width: 1024px) {
      flex: 0 0 50%;
      width: 80%;
      align-items: flex-start;
      justify-content: center;
    }
  `;
  const PaymentRejectedActions = styled.div`
    display: flex;
    flex-flow: column;
    margin-top: 20px;
  `;

  const ButtonPink = styled.button`
    width: "80%";
    background-color: #fb177d;
    border-radius: "5px";
    margin-top: 20px;
    height: 55px;
    span {
      color: white;
    }
    @media (min-width: 768px) {
      width: 70%;
      height: 60px;
    }
    @media (min-width: 1024px) {
      width: 50%;
      height: 60px;
    }
  `;
  const router = useRouter();
  const redirectToEditContract = () => {
    router.push(
      HIRING_EDITOR.replace(":contract_reference", resumen.contract.reference)
    );
  };

  const redirectToPaymentMethods = () => {
    router.push(
      PAYMENT_METHODS.replace(":contract_reference", resumen.contract.reference)
    );
  };

  return (
    <>
      <HeroDiv>
        <i
          style={{
            fontSize: "48px",
            color: "white"
          }}
          className="fas fa-exclamation"
        />

        <HeroTextApproved>
          <h2>Tu pago ha sido Rechazado.</h2>
        </HeroTextApproved>
      </HeroDiv>

      <ResumendContractDiv>
        <ContainerDetailsContractDiv>
          <DetailsContracDiv>
            <CelebrityDetails>
              <img
                className="rounded-circle"
                src={resumen.celebrity.avatar}
                alt="Avatar Famoso"
              ></img>

              <span
                className="text-center font-weight-bold"
                style={{
                  color: "black"
                }}
              >
                Video personalizado de {resumen.celebrity.fullName}
              </span>
            </CelebrityDetails>
            <hr className="w-100"></hr>
            <InstructionsDetails>
              <div className="d-flex">
                <div
                  className="d-flex"
                  style={{
                    width: "70%"
                  }}
                >
                  {resumen.contract.deliveryTo ? (
                    <SpanBoldGray>
                      Para : <SpanGray>{resumen.contract.deliveryTo}</SpanGray>
                    </SpanBoldGray>
                  ) : null}
                  {resumen.contract.deliveryFrom ? (
                    <SpanBoldGray>
                      De : <SpanGray>{resumen.contract.deliveryFrom}</SpanGray>
                    </SpanBoldGray>
                  ) : null}
                </div>
                <div
                  className="cursor-pointer font-weight-bold"
                  onClick={() => redirectToEditContract()}
                >
                  Editar
                </div>
              </div>
              <div className="d-flex mt-3 flex-column">
                <SpanBoldGray>Mensaje</SpanBoldGray>
                <SpanGray className="mt-2">
                  {resumen.contract.instructions}
                </SpanGray>
              </div>
            </InstructionsDetails>
            <hr className="w-100"></hr>
            <span
              style={{
                fontSize: "12px",
                color: "#535353"
              }}
            >
              *Puedes editar las instrucciones de tu video mientras está
              pendiente de grabación.
            </span>
            <hr className="w-100"></hr>
          </DetailsContracDiv>
        </ContainerDetailsContractDiv>
        <ResumenPaymentRejected>
          <ResumenContainer>
            <ResumenStatusPayment
              status={resumen.lastPayment?.status}
              idFollow={resumen.contract?.reference}
              idTransaction={resumen.lastPayment?.transactionChargeId}
              paymentDate={resumen.contract?.createdAt}
            />
            <PaymentRejectedActions>
              <div>
                <span
                  style={{
                    color: "#535353"
                  }}
                >
                  Si quieres saber más sobre el estado de tu transacción puedes
                  contactar a nuestro equipo de soporte.
                </span>
              </div>
              <ButtonPink
                className="btn"
                onClick={() => redirectToPaymentMethods()}
              >
                <span className="font-weight-bold">
                  Hacer nuevo intento de pago
                </span>
              </ButtonPink>
            </PaymentRejectedActions>
          </ResumenContainer>
        </ResumenPaymentRejected>
      </ResumendContractDiv>
    </>
  );
};

export default ResumenContractRejected;
