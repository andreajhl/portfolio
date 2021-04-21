import ContractSummaryLayout from "desktop-app/components/layouts/contract-summary";
import React from "react";
import ContractDetails from "../../details";

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
};

function ContractSummaryApproved({ resumen }: ContractWithPaymentsProps) {
  return (
    <ContractSummaryLayout
      contractDetails={
        <>
          <ContractDetails celebrity_name={"Andres Cepeda"} />
        </>
      }
    />
  );
}

export default ContractSummaryApproved;
