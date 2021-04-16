import React, { useMemo } from "react";
import { connect } from "react-redux";
import Maybe from "../../common/helpers/maybe";
import { ContractPriceLayout } from "../contract-price";

const getContractPrice = (contractTypes, currencyExchangeData) => {
  const videoMessageContract = contractTypes.find(
    ({ contractType }) => contractType === 1
  );

  let videoMessagePrice = 0;
  if (videoMessageContract) {
    videoMessagePrice = videoMessageContract.price;
  }
  if (currencyExchangeData.rate) {
    return videoMessagePrice * currencyExchangeData.rate;
  } else {
    return videoMessagePrice;
  }
};

const CelebrityContractPrice = ({
  className,
  contractTypes,
  currencyExchangeData,
  discountPercentage = 0,
  discountClassName = ""
}) => {
  const price = useMemo(
    () => getContractPrice(contractTypes, currencyExchangeData),
    [contractTypes, currencyExchangeData]
  );

  return (
    <div>
      <ContractPriceLayout
        classes={`text-black font-weight-bold ${className}`}
        price={price}
        currency={currencyExchangeData.to}
        rounding={true}
      />
      <Maybe it={discountPercentage > 0}>
        <br className="d-md-none" />
        <ContractPriceLayout
          classes={`text-black font-weight-bold ${discountClassName}`}
          price={price - price * discountPercentage}
          currency={currencyExchangeData.to}
          rounding={true}
        />
      </Maybe>
    </div>
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
