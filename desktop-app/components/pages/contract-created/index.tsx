import ContractSummaryApproved from "desktop-app/components/contract/summary/approved";
import ContractSummaryAuthorized from "desktop-app/components/contract/summary/authorized";
import ContractSummaryPending from "desktop-app/components/contract/summary/pending";
import ContractSummaryRejected from "desktop-app/components/contract/summary/rejected";
import PageContainer from "desktop-app/components/layouts/page-container";
import React from "react";

type ContractWithPaymentsProps = {
  resumen: {
    contract: {
      isPublic: boolean;
      instructions: string;
      deliveryContact: string;
      deliveryContactCellphone: string;
      deliveryTo: string;
      reference: string;
      status: number;
      authorizationDate: string;
    };
    celebrity: {
      username: string;
      avatar: string;
      fullName: string;
    };
    user: {
      id: number;
      fullName: string;
    };
    lastPayment: {
      id: number;
      createdAt: string;
      price: number;
      status: number;
      transactionChargeId: string;
      paymentMethodLogo: string;
    };
  };
  isLoading: boolean;
  getContract: Function;
  contractToPayClear: Function;
};

const mockData = {
  contract: {
    isPublic: true,
    instructions:
      "¡Hola Enrique Arce Testing! Estos días he estado con los ánimos muy bajos. ¿Podrías por favor mandarme un mensaje de ánimo? Muchas gracias.",
    deliveryContact: "isaac@famosos.com",
    deliveryContactCellphone: "",
    deliveryTo: "Juanito",
    reference: "202103021446-8009920-10031",
    status: 25,
    authorizationDate: "2021-03-02T09:46:49.311534-05:00"
  },
  celebrity: {
    username: "enriquearce",
    avatar:
      "https://dqb0851cl2gjs.cloudfront.net/celebrities/609/avatar/famosos-videos-personalizados-enriquearce-compressed.jpg",
    fullName: "Enrique Arce Testing"
  },
  user: {
    id: 461,
    fullName: "Enrique Arce Testing"
  },
  lastPayment: {
    id: 1063,
    createdAt: "2021-03-02T09:46:49.311534-05:00",
    status: 70,
    price: 0,
    transactionChargeId: "ch_1IQZUrBr69O3Zf7hDT0JHpBP",
    paymentMethodLogo: "https://famosos-media.s3.amazonaws.com/Logo_stripe.jpg"
  }
};
function ContractCreated({ resumen = mockData }: ContractWithPaymentsProps) {
  return (
    <PageContainer showFooter={false}>
      {/* <ContractSummaryApproved
        lastPayment={resumen.lastPayment}
        contract={resumen.contract}
        celebrity={resumen.celebrity}
      /> */}
      {/* <ContractSummaryAuthorized
        lastPayment={resumen.lastPayment}
        contract={resumen.contract}
        celebrity={resumen.celebrity}
      /> */}
      {/* <ContractSummaryRejected
        lastPayment={resumen.lastPayment}
        contract={resumen.contract}
        celebrity={resumen.celebrity}
      /> */}
      {/* <ContractSummaryPending
        lastPayment={resumen.lastPayment}
        contract={resumen.contract}
        celebrity={resumen.celebrity}
      /> */}
    </PageContainer>
  );
}

export { ContractCreated };
