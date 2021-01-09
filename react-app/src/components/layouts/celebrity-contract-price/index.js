import React, { useMemo } from "react";
import { connect } from "react-redux";
import { ContractPriceLayout } from "../contract-price";

const getContractPrice = (contractTypes, currencyExchangeData) => {
  const videoMessageContract = contractTypes.find(
    ({ contractType }) => contractType === 1
  );

  let videoMessagePrice = 0;
  if (videoMessageContract) {
    videoMessagePrice = videoMessageContract.price;
  }
  if (currencyExchangeData.rate > 1) {
    return videoMessagePrice * currencyExchangeData.rate + videoMessagePrice;
  } else {
    return videoMessagePrice;
  }
};

const CelebrityContractPrice = ({
  className,
  contractTypes,
  currencyExchangeData
}) => {
  const price = useMemo(
    () => getContractPrice(contractTypes, currencyExchangeData),
    [contractTypes, currencyExchangeData]
  );

  return (
    <ContractPriceLayout
      classes={`text-black font-weight-bold ${className}`}
      price={price}
      currency={currencyExchangeData.to}
      rounding={true}
    />
  );
};

CelebrityContractPrice.defaultProps = {
  className: "",
  contractTypes: [],
  currencyExchangeData: {
    rate: 1
  }
};

const mapStateToProps = ({ payments }) => ({
  currencyExchangeData: payments.currencyExchangeReducer.data
});

const _CelebrityContractPrice = connect(mapStateToProps)(
  CelebrityContractPrice
);

export { _CelebrityContractPrice as CelebrityContractPrice };
