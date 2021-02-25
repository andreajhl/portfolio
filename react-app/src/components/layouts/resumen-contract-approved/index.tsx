import React from "react";
import styled from "styled-components";
import NextStepsAfterPaymentBanner from "../../containers/next-steps-after-payment-banner";
import ResumenStatusPayment from "../../containers/resumen-status-payment";
import { useRouter } from "next/router";
import { HIRING_EDITOR } from "../../../routing/Paths";

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
`;

const ResumendContractDiv = styled.div`
  display: flex;
  height: min-height;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  height: 76vh;
`;

const ContainerDetailsContractDiv = styled.div`
  display: flex;
  flex: 1 0 45%;
  padding-top: 40px;
  align-content: center;
  background-color: #fcfcfc;
  flex-flow: column;
  min-width: 320px;
  justify-content: center;
  @media (min-width: 1024px) {
    padding-bottom: 1rem;
  }
`;

const DetailsContracDiv = styled.div`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
`;

const ContractsSteps = styled.div`
  display: flex;
  min-width: 320px;

  flex: 1 0 55%;
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
    @media (min-width: 1024px) {
      height: 120px;
    }
  }
  span {
    font-weight: bold;
    font-size: 1rem;
    width: 160px;
    @media (min-width: 375px) {
      width: 180px;
    }
    @media (min-width: 1024px) {
      width: 200px;
      font-size: 1.3rem;
    }
    @media (min-width: 1440px) {
      width: 300px;
    }
  }
`;
const ResumenContractApproved = ({ resumen }) => {
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
          <h2 className="d-md-none">¡Felicidades!</h2>
          <h2 className="d-md-none">Tu pago ha sido aprobado.</h2>
          <h2 className="d-none d-md-block">
            ¡Felicidades! Tu pago ha sido aprobado
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
                className=" text-left font-weight-bold"
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
                  className="cursor-pointer font-weight-bold "
                  onClick={() => redirectToEditContract()}
                >
                  <u>Editar</u>
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
              idFollow={resumen.contract?.reference}
              idTransaction={resumen.lastPayment?.transactionChargeId}
              paymentDate={resumen.contract?.createdAt}
            />
            <hr className="w-100"></hr>
          </DetailsContracDiv>
        </ContainerDetailsContractDiv>
        <ContractsSteps>
          <div
            className="mx-auto d-flex align-items-center mt-4"
            style={{
              width: "80%"
            }}
          >
            <NextStepsAfterPaymentBanner
              celebrityName={resumen.celebrity.fullName}
            ></NextStepsAfterPaymentBanner>
          </div>
        </ContractsSteps>
      </ResumendContractDiv>
    </>
  );
};

export default ResumenContractApproved;
