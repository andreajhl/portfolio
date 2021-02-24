import React from "react";
import styled from "styled-components";
import ResumenStatusPayment from "../../containers/resumen-status-payment";
import Link from "next/link";
import { useRouter } from "next/router";
import { HIRING_EDITOR } from "../../../routing/Paths";

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
  @media (min-width: 1024px) {
    min-height: 78vh;
  }
`;

const ContainerDetailsContractDiv = styled.div`
  display: flex;
  flex: 1 1 40%;
  padding-top: 40px;
  align-content: center;
  justify-content: center;
  background-color: #fcfcfc;
  flex-flow: column;
`;

const DetailsContracDiv = styled.div`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  @media (min-width: 1024px) {
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    height: 70%;
  }
  @media (min-width: 1440px) {
    margin-left: calc(50% + 50px);
    transform: translateX(-50%);
  }
`;

const InstructionsDetails = styled.div`
  display: flex;
  flex-flow: column;
  @media (min-width: 1024px) {
    flex: 0 1 40%;
    display: flex;
    justify-content: space-around;
  }
`;

const SpanBoldGray = styled.span`
  font-weight: bold;
  color: #535353;
  font-size: 1.3rem;
`;
const SpanBoldBlack = styled(SpanBoldGray)`
  color: black;
  text-decoration-line: underline;
`;

const SpanGray = styled.span`
  color: #535353;
`;

const CelebrityDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  img {
    height: 50px;
    @media (min-width: 425px) {
      height: 70px;
    }
    @media (min-width: 1024px) {
      height: 115px;
    }
  }

  span {
    font-weight: bold;
    text-align: initial;
    font-size: 1rem;
    max-width: 180px;
    margin-left: 16%;
    @media (min-width: 1024px) {
      margin-left: 10%;
      max-width: 250px;
      font-size: 1.55rem;
    }
  }
`;
const HorizontalLine = styled.hr`
  width: 100%;
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
  display: flex;
  align-items: center;
  justify-content: space-around;
  span {
    color: white;
  }
  @media (min-width: 768px) {
    width: 70%;
    height: 60px;
  }
  @media (min-width: 1024px) {
    width: 40%;
    height: 60px;
    margin-top: 50px;
  }
`;
const ResumenContainer = styled.div`
  @media (min-width: 600px) {
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    flex: 0 0 80%;
  }
`;
const ResumenContractPending = ({ resumen }) => {
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
          className="far fa-clock"
        />

        <HeroTextApproved>
          <h2>Tu pago esta pendiente de aprobación.</h2>
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
                className="font-weight-bold"
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
                  <SpanBoldBlack>Editar</SpanBoldBlack>
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
                fontSize: "14px",
                color: "#535353"
              }}
            >
              *Puedes editar las instrucciones de tu video mientras está
              pendiente de grabación.
            </span>
            <HorizontalLine></HorizontalLine>
          </DetailsContracDiv>
        </ContainerDetailsContractDiv>
        <ResumenPaymentRejected>
          <ResumenContainer>
            <hr className="d-none d-md-block w-100"></hr>
            <ResumenStatusPayment
              textColor={"#000000"}
              status={resumen.lastPayment.status}
              idFollow={resumen.contract.reference}
              idTransaction={resumen.lastPayment.transactionChargeId}
              paymentDate={resumen.contract.createdAt}
            />
            <hr className="w-100"></hr>

            <PaymentRejectedActions>
              <div className="d-flex flex-column">
                <span
                  className="mt-4"
                  style={{
                    color: "#535353"
                  }}
                >
                  El proceso de aprobación puede tardar alrededor de 24 hrs.
                </span>
                <span
                  className="mt-4"
                  style={{
                    color: "#535353"
                  }}
                >
                  Te notificaremos a correocliente@dominio.com cuando tu pago
                  haya sido aprobado.
                </span>
                <span
                  className="mt-4"
                  style={{
                    color: "#535353"
                  }}
                >
                  Puedes consultar el estado de tu video en “Mis Contrataciones”
                </span>
              </div>
              <Link href="/my-account/hirings">
                <ButtonPink className="btn">
                  <span className="font-weight-bold">
                    Ir a mis contrataciones{" "}
                  </span>
                  <i
                    style={{
                      fontSize: "20px",
                      color: "white"
                    }}
                    className="fas fa-long-arrow-alt-right"
                  ></i>
                </ButtonPink>
              </Link>
            </PaymentRejectedActions>
          </ResumenContainer>
        </ResumenPaymentRejected>
      </ResumendContractDiv>
    </>
  );
};

export default ResumenContractPending;
