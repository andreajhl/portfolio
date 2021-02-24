import React from "react";
import styled from "styled-components";
import NextStepsAfterPaymentBanner from "../../containers/next-steps-after-payment-banner";
import ResumenStatusPayment from "../../containers/resumen-status-payment";
import { useRouter } from "next/router";
import { HIRING_EDITOR } from "../../../routing/Paths";

const ResumenContractAuthorized = ({ resumen }) => {
  const HeroDiv = styled.div`
    background-color: #fb177d;
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
    margin-bottom: 2rem;
    @media (min-width: 1024px) {
      min-height: 66vh;
    }
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

  const ContractsSteps = styled.div`
    display: flex;
    flex: 1 1 60%;
    align-content: center;
    justify-content: center;
    background-color: white;
  `;

  const InstructionsDetails = styled.div`
    display: flex;
    flex-flow: column;
  `;

  const SpanBoldGray = styled.span`
    font-weight: bold;
    color: #535353;
  `;

  const ContainerNextStepsAfterPayment = styled.div`
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    @media (min-width: 1024px) {
      margin-top: 0px;
    }
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

  const router = useRouter();
  const redirectToEditContract = () => {
    router.push(
      HIRING_EDITOR.replace(":contract_reference", resumen.contract.reference)
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
          className="far fa-check-circle"
        />
        <HeroTextApproved>
          <h2>
            ¡Felicidades! <br className="d-sm-none" /> La autorización de tu
            pago se ha realizado con éxito.
          </h2>
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
            <ResumenStatusPayment
              status={resumen.lastPayment.status}
              idFollow={resumen.contract.reference}
              idTransaction={resumen.lastPayment.transactionChargeId}
              paymentDate={resumen.contract.createdAt}
            />
            <hr className="w-100"></hr>
          </DetailsContracDiv>
        </ContainerDetailsContractDiv>
        <ContractsSteps>
          <ContainerNextStepsAfterPayment>
            <NextStepsAfterPaymentBanner
              celebrityName={resumen.celebrity.fullName}
            ></NextStepsAfterPaymentBanner>
          </ContainerNextStepsAfterPayment>
        </ContractsSteps>
      </ResumendContractDiv>
    </>
  );
};

export default ResumenContractAuthorized;
